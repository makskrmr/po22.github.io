import { NextRequest, NextResponse } from "next/server";

// Prosta ochrona panelu kuriera na poziomie MVP — pojedyncze hasło dostępu
// współdzielone przez zespół. Przed produkcją zastąp to pełnym systemem
// uwierzytelniania z osobnymi kontami dla każdego kuriera (np. NextAuth).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin_session")?.value;
  if (session !== "ok") {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
