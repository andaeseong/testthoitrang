"use client";

import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: import("@/lib/products").Product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="product-tag">{product.tag}</span>
        <button
          className="quick-add"
          aria-label={`Thêm ${product.name} vào giỏ`}
          onClick={() => addToCart(product)}
        >
          +
        </button>
      </div>

      <div className="product-info">
        <div>
          <div className="product-name">{product.name}</div>
          <div className="product-category">{product.category}</div>
        </div>
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
    </article>
  );
}
