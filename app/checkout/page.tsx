export default function CheckoutPage() {
  return (
    <div style={{ paddingTop: "7rem", textAlign: "center", maxWidth: "480px", margin: "0 auto", padding: "7rem 1.5rem 4rem" }}>
      <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 400, color: "var(--foreground)", marginBottom: "1rem" }}>Commander</h1>
      <p style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>Pour passer une commande, contactez-nous directement via WhatsApp ou par telephone.</p>
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
        <a href="tel:+21692315488" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.8rem 1.8rem", border: "1px solid rgba(201,149,108,0.3)", borderRadius: "0.4rem", textDecoration: "none", color: "var(--primary)", fontSize: "0.95rem", fontWeight: 500 }}>
          📞 +216 92 315 488
        </a>
        <a href="tel:+21693674641" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.8rem 1.8rem", border: "1px solid rgba(201,149,108,0.3)", borderRadius: "0.4rem", textDecoration: "none", color: "var(--primary)", fontSize: "0.95rem", fontWeight: 500 }}>
          📞 +216 93 674 641
        </a>
      </div>
    </div>
  );
}
