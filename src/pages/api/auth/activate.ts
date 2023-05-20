import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import User from "@/models/User";
import { createResetToken } from "@/utils/tokens";
import sendMail from "@/utils/sendMail";
import { resetEmailTemplate } from "./../../../emailTemplates/reset";

const { ACTIVATION_TOKEN_SECRET } = process.env;

interface UserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    //aqui eu recebo o token no corpo da requisição (query). Essa requisição vem do [token].tsx
    //depois de receber o token, eu verifico ele com a senha colocada no env e insiro o true no id do usuario que fez a verificação.

    const { token } = req.body;
    const userToken = jwt.verify(
      token,
      ACTIVATION_TOKEN_SECRET as string
    ) as UserToken;

    // console.log(token);
    const userDb = await User.findById(userToken.id);

    if (!userDb) {
      return res
        .status(400)
        .json({ message: "Esta conta não foi encontrada. " });
    }

    if (userDb.emailVerified == false) {
      await User.findByIdAndUpdate(userDb.id, { emailVerified: true });
      return res.status(400).json({ message: "Conta verificada. " });
    }

    res.json({
      message: `Conta já está ativada. Realize o login para continuar `,
    });
  } catch (error: any) {
    // console.log(error);
    const expiredAt: Date = error.expiredAt;
    const today: Date = new Date();

    if (today > expiredAt) {
      try {
        await connectDb();

        const { token } = req.body;
        const userToken = jwt.verify(
          token,
          ACTIVATION_TOKEN_SECRET as string
        ) as UserToken;

        const userDb = await User.findById(userToken.id);
        console.log(token);

        // if (!userDb) {
        //   return res.status(400).json({ message: "Esse email não existe. " });
        // }

        // const user_id = createResetToken({
        //   id: userDb._id.toString(),
        // });

        // const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`;

        // await sendMail(
        //   email,
        //   user.name,
        //   user.image,
        //   url,
        //   "Recuperação de senha com Token expirado - Next Auth",
        //   resetEmailTemplate
        // );

        res.json({
          message:
            "Foi enviado um email para recuperar sua senha, pois seu token havia expirado. Verifique sua caixa de entrada novamente e ative sua conta corretamente. ",
        });
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }
  }
}
