import SocialButton from "@/components/buttons/SocialButtons";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";

export default function auth({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
        {/*----Form----*/}
        <div className="w-5/6 md:w-2/3 lg:w1/2 xl:w-2/4 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center rounded-md py-6">
          <div className="w-full flex items-center justify-between px-4 lg:px-6">
            <div className="w-full p-6">
              {tab == "signin" ? (
                <LoginForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
              ) : (
                <RegisterForm />
              )}
              <div className="w-full flex items-center justify-between px-12">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <span className="text-sm uppercase mx-6 text-gray-400">OU</span>
                <div className="w-full h-[1px] bg-gray-300"></div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
                {providers.map((provider: any) => {
                  if (provider.name == "Credentials") return;
                  return (
                    <SocialButton
                      key={provider.id}
                      id={provider.id}
                      text={
                        tab == "signup"
                          ? `Entre com ${provider.name}`
                          : `Entre com ${provider.name}`
                      }
                      csrfToken={csrfToken}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  const providers = await getProviders();
  return {
    props: {
      providers: Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}
