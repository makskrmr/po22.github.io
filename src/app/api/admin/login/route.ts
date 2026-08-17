import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessKey } = await req.json();

  if (!process.env.ADMIN_ACCESS_KEY || accessKey !== process.env.ADMIN_ACCESS_KEY) {
    return NextResponse.json({ error: "Nieprawidłowy klucz dostępu." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12 // 12 godzin
  });
  return res;
}
