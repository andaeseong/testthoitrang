"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { products as fallbackProducts } from "@/lib/products";
import { ProductCard } from "./product-card";

const FILTERS = [
  { key: "all", label: "Tất cả" },
  { key: "ao", label: "Áo" },
  { key: "quan", label: "Quần" },
  { key: "outerwear", label: "Outerwear" },
  { key: "phukien", label: "Phụ kiện" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export function Shop() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [active, setActive] = useState<FilterKey>("all");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      })
      .catch(() => {
        // keep fallback data on network error
      });
  }, []);

  const filtered =
    active === "all" ? products : products.filter((p) => p.type === active);

  return (
    <section className="section" id="shop">
      <div className="section-heading">
        <h2>
          Selected
          <br />
          Pieces
        </h2>
        <p>
          Những thiết kế nổi bật được tạo ra để kết hợp linh hoạt trong tủ đồ
          hiện đại của bạn.
        </p>
      </div>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={"filter-button" + (active === f.key ? " active" : "")}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
