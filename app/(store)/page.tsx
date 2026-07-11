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
            <h2>About Queen Beauty</h2>
            <p>
              Born from a passion for luxury and self-care, Queen Beauty
              curates the finest beauty products for those who deserve nothing
              but the best. Every product in our collection is carefully
              selected to enhance your natural beauty and elevate your daily
              ritual.
            </p>
            <br />
            <p>
              We believe beauty is a form of self-expression — and every queen
              deserves to shine in her own unique way.
            </p>
            <br />
            <Link href="/products" className="qb-btn qb-btn--gold" style={{ display: "inline-flex", marginTop: "1rem" }}>
              Shop Now
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
        <h2>Get in Touch</h2>
        <p>We are here to help you find your perfect beauty routine.</p>
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
