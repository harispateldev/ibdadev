import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Bricolage_Grotesque, Manrope } from "next/font/google";

import { NavBar } from "@/components/ui/NavBar";
import { FooterSection } from "@/components/sections/FooterSection";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BRAND } from "@/constants/brand";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: BRAND.siteLine,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} ${manrope.variable} antialiased bg-ibda-bg text-white`}>
        <CustomCursor />
        <SmoothScroll>
          <NavBar />
          {children}
          <FooterSection />
        </SmoothScroll>
      </body>
    </html>
  );
}
