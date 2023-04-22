import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
    secureCookie: process.env.NODE_ENV === "production",
  });

  //bloqueando o acesso a api diretamente e exibindo mensagem de não autorizado
  if (pathname === "/api" || pathname === "/api/auth") {
    if (
      !req.headers
        .get("referer")
        ?.includes(process.env.NEXT_PUBLIC_URL as string)
    ) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth`);
    }
  }

  //se algumas dessas rotas for acionada, ele faz o redirect para a auth padrão
  if (pathname == "/" || pathname === "/api/auth/signout") {
    if (!session) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth`);
    }
  }

  if (pathname == "/auth") {
    //se for autenticado, local e ve as informações
    if (session) {
      return NextResponse.redirect(`${origin}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)"],
};
