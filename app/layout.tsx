import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortfolioCheck — Analisis GitHub Portfolio Kamu",
  description:
    "Cek seberapa siap GitHub portfolio kamu untuk internship atau pekerjaan pertama. Dapatkan skor, feedback, dan rekomendasi konkret dalam hitungan detik.",
  keywords: ["github", "portfolio", "analisis", "junior developer", "internship", "score"],
  openGraph: {
    title: "PortfolioCheck — Analisis GitHub Portfolio Kamu",
    description:
      "Cek seberapa siap GitHub portfolio kamu untuk internship atau pekerjaan pertama.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
