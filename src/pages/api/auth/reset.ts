import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const { RESET_TOKEN_SECRET } = process.env;
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";

interface UserToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    const { token, password } = req.body;
    const userToken = jwt.verify(token, RESET_TOKEN_SECRET!) as UserToken;

    const userDb = await User.findById(userToken.id);
    if (!userDb) {
      return res.status(400).json({ message: "Essa conta não existe. " });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(userDb.id, { password: cryptedPassword });

    res.json({
      message: "Senha alterada com sucesso. Volte e faça o login. ",
    });

    const router = useRouter();
    setTimeout(() => {
      router.push("/auth");
    }, 5500);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
