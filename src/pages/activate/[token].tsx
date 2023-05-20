import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

//token retornado pelo getServerSideProps abaixo
export default function Activate({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");

  useEffect(() => {
    activateAccount();
  }, [token]);
  const activateAccount = async () => {
    try {
      //esse token vem na rota de api/auth/signup
      //quando entrar na rota "activate/asdasdknas", ele insire um token no arquivo do put abaixo e seta um sucesso

      const { data } = await axios.put("/api/auth/activate", { token });
      setSucess(data.message);
    } catch (error: any) {
      setError((error?.response?.data as Error).message);
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center text-center">
      {error && (
        <div className="bg-white p-8 rounded-md">
          <p className="text-green-600 text-xl font-bold">{error}</p>
          <button
            className="mt-4 bg-blue-500 text-white hover:bg-blue-600 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Faça login em vez disso
          </button>
        </div>
      )}
      {success && (
        <div className="bg-white p-8 rounded-md">
          <p className="text-red-500 text-xl font-bold">{success}</p>
          <button
            className="mt-4 bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Fazer login
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  console.log(token);
  return {
    props: { token },
  };
}
