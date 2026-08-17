import type { Metadata } from "next";
import type React from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeGateModal from "@/components/AgeGateModal";
import { brand } from "@/lib/config";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: `${brand.name} — nocna dostawa w ${brand.deliveryPromiseMinutes} minut`,
  description:
    "Zamów alkohol i przekąski w nocy. Ty zamawiasz, my jedziemy — płatność online z góry, odbiór za okazaniem dowodu osobistego."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <AgeGateModal />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
