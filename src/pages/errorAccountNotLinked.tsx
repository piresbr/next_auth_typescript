import { NextPageContext } from "next";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";

export default function error() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        {/*----Form----*/}
        <div className="w-5/6 md:w-2/3 lg:w1/2 xl:w-2/4 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center rounded-md py-6">
          <div className="w-full flex items-center justify-between px-4 lg:px-6">
            <div className="w-full p-6">
              <h2 className="text-center text-2xl font-bold tracking-wide text-gray-900">
                Essa conta ja está cadastrada.
              </h2>
              <p className="text-center text-sm text-gray-600 mt-2 mb-8">
                Esse email ja foi utilizado por alguns de nossos provedores de
                login. Utilize o mesmo email, porém com algum outro provedor
                disponível.
                <Link
                  className="text-bold text-blue-500 ml-1"
                  href="?tab=signup"
                >
                  Clique aqui para tentar realizar o login novamente.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
