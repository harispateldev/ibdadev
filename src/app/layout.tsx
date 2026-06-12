import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/ui/NavBar";
import { FooterSection } from "@/components/sections/FooterSection";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IbdaDev | Code with Creativity",
  description: "Where Innovation Meets Development — crafting unique, modern digital experiences through creative coding and immersive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-ibda-bg text-white`}>
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
