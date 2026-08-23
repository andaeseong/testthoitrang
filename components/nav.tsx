"use client";

import { useCart } from "./cart-context";

export function Nav() {
  const { count, openCart } = useCart();

  return (
    <header>
      <a href="#" className="logo">
        NOIR<span>/</span>FORM
      </a>

      <nav>
        <a href="#shop">Sản phẩm</a>
        <a href="#story">Về chúng tôi</a>
        <a href="#contact">Liên hệ</a>
      </nav>

      <div className="header-actions">
        <span>VN / VND</span>
        <button className="cart-button" onClick={openCart}>
          Giỏ hàng
          <span className="cart-count">{count}</span>
        </button>
      </div>
    </header>
  );
}
