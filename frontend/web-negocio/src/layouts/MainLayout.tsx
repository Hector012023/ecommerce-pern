import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <h2>Mi Ecommerce</h2>
      </header>
      <main>{children}</main>
      <footer>@2026</footer>
    </div>
  );
}
