import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import User from "@/models/User";
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
      message: `Conta foi ativada com sucesso. Realize o login para continuar `,
    });
  } catch (error: any) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}
