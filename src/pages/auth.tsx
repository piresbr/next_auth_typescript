import Register from "@/components/forms/Register";
import Link from "next/link";

export default function auth() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        {/*----Form----*/}
        <div className="w-full sm:w5/6 md:w-2/3 lg:w1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center rounded-md py-6">
          <div className="w-full flex items-center justify-between px-12">
            <div className="w-full p-6">
              <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                Registre-se
              </h2>
              <p className="text-center text-sm text-gray-600 mt-2">
                Você tem uma conta?
                <Link className="text-bold text-blue-500 ml-1" href="/register">
                  Clique aqui para entrar
                </Link>
              </p>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
