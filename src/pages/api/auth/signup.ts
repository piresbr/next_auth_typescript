//autenticação nativa
import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { Error } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { first_name, last_name, email, phone, password, confirmPassword } =
      req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos por favor." });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Insira um email válido por favor." });
    }
    if (!validator.isMobilePhone(phone)) {
      return res
        .status(400)
        .json({ message: "Insira um telefone válido por favor." });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        message: "Esse email ja foi cadastrado. Por favor utilize outro",
      });
    }
    if (password < 6) {
      return res
        .status(400)
        .json({ message: "A senha precisa ter no mínimo 6 caracteres" });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name: `${first_name} ${last_name} `,
      email,
      phone,
      password: cryptedPassword,
    });
    await newUser.save();
    res.json({
      message:
        "Cadastro realizado com sucesso! Acesse seu email e ative sua conta para iniciar! ",
    });
  } catch (error: any) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}
