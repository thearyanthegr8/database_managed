import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_navbar/navbar";
import { Sidedash } from "./_landing-page/side-dash";
import Footer from "./_footer/footer";
import { Toaster } from "@/components/ui/toaster";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Database Managed",
  description: "Inventory Management Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <Toaster />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
