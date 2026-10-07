import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const SITE = "https://qorpe.com";
const TITLE = "Qorpe — The delivery system for regulated teams and agents";
const DESCRIPTION =
  "Qorpe Control Room is an on-premises platform that governs how software changes move through banks, insurers and telecoms: specifications, gates, approvals and AI, with a trail your auditor can read.";

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
    images: [{ url: "/brand/qorpe-mark-white-on-black-2048.png", width: 2048, height: 2048 }],
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/brand/qorpe-mark-white-on-black-2048.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#08090a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
