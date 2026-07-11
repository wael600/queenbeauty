"use client";
import Link from "next/link";
import Image from "next/image";
import { CartProvider } from "@/app/_components/CartContext";

function Nav() {
  return (
    <nav className="qb-nav">
      <Link href="/" className="qb-nav__brand">
        <Image src="/logo.jpg" alt="Queen Beauty" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(201,149,108,0.4)" }} />
        <span>Queen Beauty</span>
      </Link>
      <div className="qb-nav__links">
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Nav />
      <div style={{ flex: 1 }}>{children}</div>
      <footer className="qb-footer">
        © {new Date().getFullYear()} Queen Beauty — All rights reserved
      </footer>
    </CartProvider>
  );
}
