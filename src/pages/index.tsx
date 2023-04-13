import { Inter } from "next/font/google";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={`${inter.className} text-4xl font-semibold`}>
        Hello {session?.user?.name}
      </h1>

      {!!session ? (
        <>
          <link rel="preload" as="image" href={session?.user?.image!}></link>
          <Image
            loader={() => session?.user?.image!}
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width="200"
            height="200"
            unoptimized
          />
          <button
            className="bg-red-500 p-3 text-white"
            onClick={() => signOut()}
          >
            Sair
          </button>
        </>
      ) : (
        <>
          <h2>Registre-se ou faça o login</h2>

          <button
            className="bg-blue-500 p-3 text-white"
            onClick={() => signIn()}
          >
            Entrar
          </button>
        </>
      )}
    </main>
  );
}

//remove undefined error on console react devtools backend
export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: { session },
  };
}
