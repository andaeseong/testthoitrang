import { NextResponse } from "next/server";
import { orders, type OrderItem } from "@/lib/store";

export async function POST(request: Request) {
  let items: OrderItem[] = [];
  try {
    const body = await request.json();
    items = Array.isArray(body?.items) ? body.items : [];
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "Giỏ hàng đang trống" }, { status: 400 });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: "NF-" + Date.now().toString(36).toUpperCase(),
    items,
    total,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return NextResponse.json({ ok: true, orderId: order.id, total });
}
