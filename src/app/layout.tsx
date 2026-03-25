import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/ui/NavBar";
import { FooterSection } from "@/components/sections/FooterSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RefractWeb | Digital Identity",
  description: "Defining Digital Identity through code and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-refract-bg text-white`}>
        <SmoothScroll>
          <NavBar />
          {children}
          <FooterSection />
        </SmoothScroll>
      </body>
    </html>
  );
}
