import axios from "axios";
import { NextPageContext } from "next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

//token retornado pelo getServerSideProps abaixo
export default function activate({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");

  useEffect(() => {
    activateAccount(token);
  }, [token]);
  const activateAccount = async (token: string) => {
    try {
      const { data } = await axios.put("/api/auth/activate", { token });
      setSucess(data);
    } catch (error) {
      setError((error as Error)?.message);
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center text-center">
      {error && (
        <div>
          <p className="text-red-500 text-xl font-bold">{error}</p>
          <button
            className="mt-4 bg-blue-500 text-white hover:bg-blue-700 text-md uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Faça login em vez disso
          </button>
        </div>
      )}
      {success && (
        <div>
          <p className="text-green-500 text-xl font-bold">{success}</p>
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
  //   console.log(query);
  const token = query.token;
  return {
    props: { token },
  };
}
