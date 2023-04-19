//tipagem para ser usada no ...next-auth (evitar erros na biblioteca para campos não padrão)
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      provider: string;
    };
  }
}
