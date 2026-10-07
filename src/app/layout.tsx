import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });

const SITE = "https://qorpe.com";
const TITLE = "Qorpe: the control room for governed delivery";
const DESCRIPTION =
  "Qorpe Control Room is the on-premises platform that specifies, verifies, approves and releases software changes in banks, insurers and telecoms, with a trail your auditor can read.";

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
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/brand/qorpe-mark-black-on-white-2048.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
