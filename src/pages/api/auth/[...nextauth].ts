import NextAuth, { Account, Profile, User } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import { JWT } from "next-auth/jwt";
import { Adapter, AdapterUser } from "next-auth/adapters";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_BASE_URL as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  //save session on cookies
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt", //or save on "database" mongo
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      //se o usuario existir, pega o token de account e atribui em um novo campo que se chama token em provider.
      // Depois de atribuir, eu retorno esse token e utilizo na session caso um usuario exista
      if (user) {
        console.log("aqui user", user);
        token.provider = account?.provider;
        console.log(token.provider, account?.provider);
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
});
