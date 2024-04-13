import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_navbar/navbar";
import { Sidedash } from "./_landing-page/side-dash";
import Footer from "./_footer/footer";

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
      <body>
        <Navbar />
        {/* <Sidedash /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
