import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/store";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email không hợp lệ" }, { status: 400 });
  }

  const { created, count } = await addSubscriber(email);

  return NextResponse.json({
    ok: true,
    message: created ? "Đăng ký thành công" : "Email đã được đăng ký trước đó",
    count,
  });
}
