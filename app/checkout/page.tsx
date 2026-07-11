"use client";
import { useCart } from "@/app/_components/CartContext";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

function fix(p: string) {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  return "/" + p.replace(/^public\//, "").replace(/^\//, "");
}

export default function CheckoutPage() {
  const { items, totalCents, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/cash-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(i => ({ productId: i.id, quantity: i.quantity })), name, phone, place }),
      });
      if (!res.ok) throw new Error();
      setDone(true); clearCart();
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  if (done) return (
    <div className="qb-checkout-success">
      <div style={{ fontSize: "3rem" }}>✅</div>
      <h1>Order Confirmed</h1>
      <p>We will contact you soon. Payment on delivery.</p>
      <Link href="/products" className="qb-btn qb-btn--gold" style={{ marginTop: "1rem" }}>Continue Shopping</Link>
    </div>
  );

  if (items.length === 0) return (
    <div className="qb-checkout-success">
      <ShoppingBag size={36} style={{ color: "var(--primary)" }} />
      <h1>Your cart is empty</h1>
      <Link href="/products" className="qb-btn qb-btn--gold" style={{ marginTop: "1rem" }}>Shop Now</Link>
    </div>
  );

  return (
    <div className="qb-checkout">
      <h1>Complete Your Order</h1>
      <div className="qb-checkout__items">
        {items.map(item => (
          <div key={item.id} className="qb-checkout__item">
            <div className="qb-checkout__item-img">
              {fix(item.imagePath) && <Image src={fix(item.imagePath)} alt={item.name} fill className="object-cover" />}
            </div>
            <div className="qb-checkout__item-info">
              <p>{item.name}</p>
              <span>{item.quantity} × {formatPrice(item.priceInCents / 100)}</span>
            </div>
            <strong style={{ color: "var(--primary)" }}>{formatPrice(item.priceInCents * item.quantity / 100)}</strong>
          </div>
        ))}
      </div>
      <div className="qb-checkout__total">
        <span>Total on delivery</span>
        <strong>{formatPrice(totalCents / 100)}</strong>
      </div>
      <div className="qb-checkout__form">
        <h3 dir="rtl">معلومات التوصيل</h3>
        <input type="text" placeholder="الاسم و اللقب" value={name} onChange={e => setName(e.target.value)} dir="rtl" />
        <input type="tel" placeholder="رقم الهاتف" value={phone} onChange={e => setPhone(e.target.value)} dir="rtl" />
        <input type="text" placeholder="العنوان" value={place} onChange={e => setPlace(e.target.value)} dir="rtl" />
        {error && <p className="qb-checkout__error">{error}</p>}
        <button onClick={submit} disabled={loading} className="qb-btn qb-btn--gold">
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
