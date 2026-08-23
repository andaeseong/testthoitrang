"use client";

import { useState } from "react";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const {
    items,
    total,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function handleCheckout() {
    if (items.length === 0) {
      alert("Bạn chưa có sản phẩm trong giỏ hàng.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();

      if (data.ok) {
        alert(
          `Đặt hàng thành công! Mã đơn: ${data.orderId}\n(Tiền chỉ là demo, chưa thu thật)`.trim(),
        );
        items.forEach((i) => removeFromCart(i.id));
        closeCart();
      } else {
        alert("Có lỗi: " + (data.error || "không xác định"));
      }
    } catch {
      alert("Lỗi kết nối server.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <>
      <div
        className={"overlay" + (isOpen ? " show" : "")}
        onClick={closeCart}
      ></div>

      <aside className={"cart-drawer" + (isOpen ? " open" : "")}>
        <div className="cart-head">
          <h3>Your Cart</h3>
          <button className="close-cart" onClick={closeCart}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p>Giỏ hàng đang trống.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <small>
                    Số lượng:
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label="Giảm số lượng"
                    >
                      −
                    </button>
                    {item.quantity}
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </small>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <div className="cart-total-row">
            <span>Tạm tính</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Đang xử lý..." : "Tiến hành thanh toán"}
          </button>
        </div>
      </aside>
    </>
  );
}
