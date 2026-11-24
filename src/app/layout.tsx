import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://otherform.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OTHER/FORM — Digital experiences with a pulse",
    template: "%s — OTHER/FORM",
  },
  description:
    "OTHER/FORM is an independent creative studio shaping bold brands, digital products, and interactive experiences through strategy, design, and technology.",
  keywords: [
    "creative studio",
    "digital design",
    "interactive experiences",
    "web development",
    "brand strategy",
    "3D motion design",
  ],
  authors: [{ name: "OTHER/FORM Studio" }],
  creator: "OTHER/FORM Studio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "OTHER/FORM",
    title: "OTHER/FORM — Digital experiences with a pulse",
    description: "Strategy, design, and code for brands that refuse to blend in.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTHER/FORM — Digital experiences with a pulse",
    description: "Strategy, design, and code for brands that refuse to blend in.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#151711",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
