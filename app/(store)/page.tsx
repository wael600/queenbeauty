import Link from "next/link";
import { Phone } from "lucide-react";

export default async function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="qb-hero">
        <div className="qb-hero__bg" />
        <div className="qb-hero__glow" />
        <div className="qb-hero__content">
          <span className="qb-hero__eyebrow">Luxury Beauty Collection</span>
          <div className="qb-hero__divider" />
          <h1 className="qb-hero__title">
            Discover Your<br /><em>Royal Beauty</em>
          </h1>
          <p className="qb-hero__sub">
            Premium beauty products crafted for those who deserve the finest.
            Elegance, quality, and luxury — all in one place.
          </p>
          <div className="qb-hero__actions">
            <Link href="/products" className="qb-btn qb-btn--gold">
              Explore Collection
            </Link>
            <Link href="/contact" className="qb-btn qb-btn--outline">
              Contact Us
            </Link>
          </div>
          <div className="qb-hero__divider" style={{ marginTop: "0.5rem" }} />
        </div>
      </section>

      {/* About */}
      <section className="qb-about">
        <div className="qb-about__inner">
          <div className="qb-about__text">
            <h2>Notre Histoire</h2>
            <p style={{ fontStyle: "italic", color: "var(--primary)", fontSize: "1.05rem", marginBottom: "1.2rem", lineHeight: 1.8 }}>
              &ldquo; La beaute n&apos;est pas un privilege — c&apos;est un art de vivre. &rdquo;
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.9 }}>
              Nee d&apos;une passion profonde pour l&apos;excellence et le soin de soi,
              <strong style={{ color: "var(--primary)" }}> Queen Beauty </strong>
              est bien plus qu&apos;une boutique — c&apos;est un sanctuaire dedie aux femmes
              qui refusent de faire des compromis sur leur elegance.
            </p>
            <p style={{ marginBottom: "1rem", lineHeight: 1.9 }}>
              Chaque produit de notre collection est selectionne avec une rigueur absolue,
              pour sublimer votre beaute naturelle et transformer votre quotidien
              en un rituel de luxe et de douceur.
            </p>
            <p style={{ lineHeight: 1.9, color: "var(--muted-foreground)" }}>
              Parce que vous le meritez — chaque jour, sans exception.
            </p>
            <br />
            <Link href="/products" className="qb-btn qb-btn--gold" style={{ display: "inline-flex", marginTop: "1rem" }}>
              Decouvrir la Collection
            </Link>
          </div>
          <div className="qb-about__image">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80"
              alt="Queen Beauty"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="qb-contact" id="contact">
        <h2>Nous Contacter</h2>
        <p>Notre equipe est a votre disposition pour vous accompagner.</p>
        <div className="qb-contact__phones">
          <a href="tel:+21692315488" className="qb-contact__phone">
            <Phone size={16} /> +216 92 315 488
          </a>
          <a href="tel:+21693674641" className="qb-contact__phone">
            <Phone size={16} /> +216 93 674 641
          </a>
        </div>
      </section>
    </main>
  );
}
