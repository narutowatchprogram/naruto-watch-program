import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naruto Watch Program",
  description: "A guided watch program for Naruto and Shippuden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black text-white min-h-screen">
        <nav className="border-b border-gray-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight hover:text-orange-300 transition"
            >
              Naruto Watch Program
            </Link>

            <div className="flex items-center gap-5 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <Link href="/program" className="hover:text-white transition">
                Naruto Part 1
              </Link>
              <Link href="/shippuden" className="hover:text-white transition">
                Shippuden
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}