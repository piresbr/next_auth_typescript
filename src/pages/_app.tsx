import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>{session?.user?.name!}</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
