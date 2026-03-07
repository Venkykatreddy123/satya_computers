import type { Metadata } from "next";
import { Bebas_Neue, Raleway } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/whatsapp/WhatsAppWidget";
import GoldNavBar from "@/components/layout/GoldNavBar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "STONE & GOLD | Satya Computers",
  description: "Bold. Premium. Uncompromising. Business laptops, workstations, enterprise peripherals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${bebasNeue.variable} font-body bg-white text-brand-text antialiased`}>
        <CartProvider>
          <header className="sticky top-0 z-50">
            <AnnouncementBar />
            <GoldNavBar />
          </header>
          {children}
          <Footer />
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
