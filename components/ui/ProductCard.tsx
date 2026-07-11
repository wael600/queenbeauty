"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  id: string; name: string; priceInCents?: number;
  discountPriceInCents?: number | null;
  description?: string; imagePath: string;
  images?: string[];
}

export function ProductCard({ id, name, description, imagePath, images }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  let img = imagePath || "";
  if (img && !img.startsWith("http")) img = "/" + img.replace(/^public\//, "").replace(/^\//, "");
  const allImages = (images && images.length > 0) ? images : (img ? [img] : []);

  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i - 1 + allImages.length) % allImages.length); };
  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i + 1) % allImages.length); };

  const openModal = () => { setImgIndex(0); setShowModal(true); };

  return (
    <>
      <div className="qb-product-card" onClick={openModal} style={{ cursor: "pointer" }}>
        <div className="qb-product-card__image">
          {img ? <Image src={img} fill alt={name} className="object-cover" sizes="(max-width:768px) 100vw, 25vw" /> : null}
        </div>
        <div className="qb-product-card__body">
          <h4>{name}</h4>
          {description && <p>{description}</p>}
        </div>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#141414", borderRadius: "16px", width: "100%", maxWidth: "720px", maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(201,149,108,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.7)", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(201,149,108,0.1)", border: "1px solid rgba(201,149,108,0.2)", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", zIndex: 10 }}><X size={18} /></button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ position: "relative", height: "420px", background: "var(--muted)", borderRadius: "16px 0 0 0", overflow: "hidden" }}>
                {allImages.length > 0 && <Image src={allImages[imgIndex]} fill alt={name} style={{ objectFit: "contain", padding: "8px" }} />}
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImg} style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(20,20,20,0.8)", border: "1px solid rgba(201,149,108,0.4)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", zIndex: 5 }}><ChevronLeft size={16} /></button>
                    <button onClick={nextImg} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "rgba(20,20,20,0.8)", border: "1px solid rgba(201,149,108,0.4)", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", zIndex: 5 }}><ChevronRight size={16} /></button>
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px", zIndex: 5 }}>
                      {allImages.map((_, i) => (<div key={i} onClick={e => { e.stopPropagation(); setImgIndex(i); }} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i === imgIndex ? "var(--primary)" : "rgba(201,149,108,0.3)", cursor: "pointer" }} />))}
                    </div>
                    <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.75rem", padding: "2px 8px", borderRadius: "20px", zIndex: 5 }}>{imgIndex + 1}/{allImages.length}</div>
                  </>
                )}
              </div>

              <div style={{ padding: "2rem 2rem 2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.2 }}>{name}</h2>
                <div style={{ width: "3rem", height: "1px", background: "linear-gradient(90deg, var(--primary), transparent)" }} />
                {description && (
                  <div>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Description</p>
                    <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.7 }}>{description}</p>
                  </div>
                )}
                <div style={{ marginTop: "auto", padding: "1rem", background: "rgba(201,149,108,0.05)", borderRadius: "8px", border: "1px solid rgba(201,149,108,0.1)" }}>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", textAlign: "center", lineHeight: 1.6 }}>Pour commander, contactez-nous via WhatsApp ou Instagram</p>
                </div>
              </div>
            </div>

            {allImages.length > 1 && (
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", display: "flex", gap: "8px", overflowX: "auto" }}>
                {allImages.map((src, i) => (
                  <div key={i} onClick={e => { e.stopPropagation(); setImgIndex(i); }} style={{ position: "relative", width: "56px", height: "56px", borderRadius: "6px", overflow: "hidden", flexShrink: 0, border: i === imgIndex ? "2px solid var(--primary)" : "1px solid rgba(201,149,108,0.2)", cursor: "pointer" }}>
                    <Image src={src} fill alt={name + " " + i} style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
