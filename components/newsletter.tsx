"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("Đang gửi...");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus(data.message || "Đăng ký thành công!");
        setEmail("");
      } else {
        setStatus(data.error || "Đăng ký thất bại.");
      }
    } catch {
      setStatus("Lỗi kết nối server.");
    }
  }

  return (
    <section className="newsletter" id="contact">
      <h2>
        Stay
        <br />
        Unusual.
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">→</button>
      </form>

      {status && <p className="newsletter-status">{status}</p>}
    </section>
  );
}
