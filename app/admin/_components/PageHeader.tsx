import { ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode }) {
  return <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--foreground)", marginBottom: "1rem" }}>{children}</h1>;
}
