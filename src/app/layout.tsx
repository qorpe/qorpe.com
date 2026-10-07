import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE = "https://qorpe.com";
const TITLE = "Qorpe — a delivery platform for regulated industries";
const DESCRIPTION =
  "Qorpe builds the governed, AI-native delivery platform for banks, insurers and telecoms: specifications as the source of truth, deterministic gates, and a decision trail an auditor can read.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Qorpe" },
  description: DESCRIPTION,
  applicationName: "Qorpe",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Qorpe",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/brand/qorpe-mark-black-on-white-2048.png", width: 2048, height: 2048 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/qorpe-mark-black-on-white-2048.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
