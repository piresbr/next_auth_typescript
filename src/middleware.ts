import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (pathname == "/") {
    if (!session) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/signin`
      );
    }
  }
  if (pathname == "/auth/signin") {
    if (session) {
      return NextResponse.redirect(`${origin}`);
    }
  }
}
