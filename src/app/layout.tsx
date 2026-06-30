import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Bricolage_Grotesque, Manrope } from "next/font/google";

import { NavBar } from "@/components/ui/NavBar";
import { FooterSection } from "@/components/sections/FooterSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BRAND } from "@/constants/brand";
import { CookieConsent } from "@/components/ui/CookieConsent";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibdadev.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | Creative Development Agency & Senior Product Studio`,
    template: `%s | ${BRAND.name}`,
  },
  description: "Where Innovation Meets Development — high-end studio for AI integrations, SaaS applications, custom web systems, dashboards, and automated workflows.",
  keywords: ["Creative Development Agency", "AI Integration", "Next.js Agency", "Custom Web Applications", "React Three Fiber", "Web Systems", "Product Studio"],
  authors: [{ name: `${BRAND.name} Team`, url: siteUrl }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${BRAND.name} | Creative Development Agency & Senior Product Studio`,
    description: "High-end studio for AI tools, custom web systems, dashboards, and automated workflows.",
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Creative Development Agency`,
    description: "High-end studio for AI tools, custom web systems, dashboards, and automated workflows.",
    creator: "@ibdadev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": BRAND.name,
    "url": siteUrl,
    "logo": `${siteUrl}/icon.png`,
    "description": "Senior product studio for AI tools, apps, dashboards, automations, and web systems.",
    "sameAs": [
      "https://twitter.com/ibdadev",
      "https://github.com/harispateldev/ibdadev"
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${bricolage.variable} ${manrope.variable} antialiased bg-ibda-bg text-white`}>
        <CustomCursor />
        <SmoothScroll>
          <NavBar />
          {children}
          <FooterSection />
        </SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
