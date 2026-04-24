import type { Metadata } from "next";
import { Geist_Mono, Zen_Maru_Gothic } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const roundedSans = Zen_Maru_Gothic({
  variable: "--font-rounded-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naruto Watch Program",
  description: "A manga-first way to watch Naruto and Shippuden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roundedSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-black text-white">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}