import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TEMPLATES } from "@/lib/templates";

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/**
 * T01: every preview is noindex, nofollow. These are unapproved generated
 * sites for a business that has not authorised publication, so they must
 * never appear in search. Indexing is enabled per-domain at publish only.
 */
export const metadata: Metadata = {
  title: "Site generator",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {TEMPLATES.map((t) => <link key={t.id} rel="stylesheet" href={t.fonts} />)}
      </head>
      <body>{children}</body>
    </html>
  );
}
