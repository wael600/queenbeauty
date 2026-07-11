import Link from "next/link";
import { PageHeader } from "./_components/PageHeader";

export default function AdminPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "4rem auto", padding: "0 1.5rem" }}>
      <PageHeader>Admin</PageHeader>
      <Link href="/admin/products/new" className="qb-btn qb-btn--gold" style={{ display: "inline-flex", marginTop: "1rem" }}>
        + Add New Product
      </Link>
    </div>
  );
}
