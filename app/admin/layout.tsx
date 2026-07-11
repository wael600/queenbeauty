export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", padding: "2rem" }}>
      {children}
    </div>
  );
}
