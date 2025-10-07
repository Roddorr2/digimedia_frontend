import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value; //Para leer el cookie

  // Valida si no estas logueado te rederige al login
  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
  //Si ya tiene token y quiere ir al login lo redirige al dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard/main", req.url));
  }

  //Continuar con la nevegacion
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
