import type { Metadata } from "next";
import DocsSidebar from "@/components/docs/sidebar";
import SiteNavbar from "@/components/site/navbar";

export const metadata: Metadata = {
  title: "Docs — Minimalist Components",
  description: "Documentation for Minimalist Components.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <SiteNavbar
        className="sticky top-0 shrink-0"
        maxWidthClassName="max-w-6xl"
      />
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col md:flex-row">
        <DocsSidebar />
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          <main className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
            <div className="mx-auto max-w-2xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
