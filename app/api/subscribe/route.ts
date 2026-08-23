import { NextResponse } from "next/server";
import { subscribers } from "@/lib/store";

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

  if (subscribers.some((s) => s.email === email)) {
    return NextResponse.json({ ok: true, message: "Email đã được đăng ký trước đó", count: subscribers.length });
  }

  subscribers.push({ email, createdAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, message: "Đăng ký thành công", count: subscribers.length });
}
