import { NextPageContext } from "next";
import Image from "next/image";
import { useSession, signOut, getSession } from "next-auth/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const text: string =
    "Esse ambiente utiliza React js, Next js, Mongodb, Mongoose, Typecript, Next auth,React-hook-form, Zod,Axios, Nodemailer, Smtp service, Gmail stmp, Axios, React-toastify, Zxcvbn, Handlebars e BcryptJs";

  return (
    <div className="home bg-slate-100 min-h-screen text-gray-800 flex items-center justify-center">
      <div className="container mx-auto">
        <div className=" relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button
                  className="bg-red-500 hover:bg-red-700 text-md uppercase font-bold px-6 py-2 rounded-sm sm:mr-2 mb-1 ease-linear transition-all duration-150 text-white text-sm"
                  onClick={() => signOut()}
                >
                  Sair
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Image
                className="rounded-full h-40 w-40"
                loader={() => session?.user?.image!}
                src={session?.user?.image!}
                alt={session?.user?.name!}
                width="200"
                height="200"
                unoptimized
              />
            </div>
            <div className="text-center mt-12 w-full">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-10">
                Você está logado utilizando o
                <span className="capitalize bg-blue-400 text-white px-4 py-1 ml-2 font-bold italix text-lg rounded-md">
                  {session?.user?.provider}
                </span>
              </div>
            </div>
            <div className="mt-10 py-10 border-t text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="font-bold text-xs">{text}</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    Acesse o código fonte: &nbsp;
                    <Link
                      href="https://github.com/piresbr/next_auth_typescript"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-4xl"
                    >
                      <AiFillGithub />
                    </Link>
                  </div>
                  <div className="flex justify-center gap-4  mt-4 pt-6 text-3xl ">
                    <Link
                      href="https://github.com/piresbr/"
                      target="_blank"
                      className="hover:scale-[1.1] transition ease-in-out"
                    >
                      <AiFillGithub />
                    </Link>
                    <Link
                      href="https://www.instagram.com/pires.br/"
                      target="_blank"
                      className="hover:scale-[1.1] transition ease-in-out"
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/bruno-pires-de-oliveira/"
                      target="_blank"
                      className="hover:scale-[1.1] transition ease-in-out"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      href="https://www.facebook.com/profile.php?id=100021352578761"
                      target="_blank"
                      className="hover:scale-[1.1] transition ease-in-out"
                    >
                      <FaFacebook />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
