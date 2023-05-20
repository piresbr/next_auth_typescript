import jwt from "jsonwebtoken";

const { ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env;

export const createActivationToken = (payload: any) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: "2h",
  });
};

export const createResetToken = (payload: any) => {
  const expiresInMinutes = 30;
  // Converta para segundos
  const expiresIn = expiresInMinutes * 60;
  return jwt.sign(payload, RESET_TOKEN_SECRET as string, {
    expiresIn: "30m",
  });
};
