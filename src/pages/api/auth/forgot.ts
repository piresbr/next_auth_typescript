import { resetEmailTemplate } from "./../../../emailTemplates/reset";
import User from "@/models/User";
import connectDb from "@/utils/connectDb";
import sendMail from "@/utils/sendMail";
import { createResetToken } from "@/utils/tokens";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Esse email não existe. " });
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`;
    await sendMail(
      email,
      user.name,
      user.image,
      url,
      "Recuperação de senha - Next Auth",
      resetEmailTemplate
    );
    res.json({
      message:
        "Foi enviado um email para recuperar sua senha. Verifique sua caixa de entrada. ",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
