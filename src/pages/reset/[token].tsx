import ResetForm from "@/components/forms/Reset";
import { NextPageContext } from "next";

export default function reset({ token }: { token: string }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        {/*----Form----*/}
        <div className="w-5/6 md:w-2/3 lg:w1/2 xl:w-2/4 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center rounded-md py-6">
          <div className="w-full flex items-center justify-between px-12">
            <div className="w-full p-6">
              <ResetForm token={token} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  return {
    props: {},
  };
}
