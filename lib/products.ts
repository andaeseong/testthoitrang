export interface Product {
  id: number;
  name: string;
  category: string;
  type: "ao" | "quan" | "outerwear" | "phukien";
  price: number;
  image: string;
  tag: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Asymmetric Utility Shirt",
    category: "Áo",
    type: "ao",
    price: 890000,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=85",
    tag: "New",
  },
  {
    id: 2,
    name: "Wide Leg Cargo Trousers",
    category: "Quần",
    type: "quan",
    price: 1190000,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
    tag: "Best seller",
  },
  {
    id: 3,
    name: "Oversized Raw Denim",
    category: "Outerwear",
    type: "outerwear",
    price: 1590000,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=85",
    tag: "Limited",
  },
  {
    id: 4,
    name: "Concrete Logo Tee",
    category: "Áo",
    type: "ao",
    price: 490000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    tag: "Core",
  },
  {
    id: 5,
    name: "Tactical Nylon Vest",
    category: "Outerwear",
    type: "outerwear",
    price: 980000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
    tag: "New",
  },
  {
    id: 6,
    name: "Distorted Print Hoodie",
    category: "Áo",
    type: "ao",
    price: 790000,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85",
    tag: "Popular",
  },
  {
    id: 7,
    name: "Pleated Parachute Pants",
    category: "Quần",
    type: "quan",
    price: 1090000,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=85",
    tag: "Limited",
  },
  {
    id: 8,
    name: "Metal Frame Sunglasses",
    category: "Phụ kiện",
    type: "phukien",
    price: 390000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
    tag: "New",
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}
