import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });

const SITE = "https://qorpe.com";
const TITLE = "Qorpe: governed software delivery for regulated industries";
const DESCRIPTION =
  "Qorpe Charter is the on-premises workspace where rules, specifications, approvals and AI-assisted development live together, for banks, insurers and telecoms, with a trail your auditor can read.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Qorpe" },
  description: DESCRIPTION,
  applicationName: "Qorpe",
  keywords: [
    "governed delivery", "regulated software delivery", "spec-driven development", "maker-checker approvals",
    "audit trail", "AI-native SDLC", "on-premises", "air-gapped", "banking software", "insurance software", "telecom software",
    "Goldpath", ".NET platform", "specdrift", "SBOM", "provenance",
  ],
  authors: [{ name: "Qorpe", url: SITE }],
  creator: "Qorpe",
  publisher: "Qorpe",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Qorpe",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Qorpe: welcome to governed delivery" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Qorpe",
      url: SITE,
      logo: `${SITE}/brand/qorpe-mark-black-on-white-2048.png`,
      email: "hello@qorpe.com",
      sameAs: ["https://github.com/qorpe"],
      description: "Governed software delivery for regulated industries.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Qorpe Charter",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "On-premises, Linux containers",
      url: SITE,
      description: DESCRIPTION,
      offers: { "@type": "Offer", availability: "https://schema.org/PreOrder", price: "0", priceCurrency: "USD", description: "Private preview" },
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: "Qorpe",
      publisher: { "@id": `${SITE}/#org` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </body>
    </html>
  );
}
