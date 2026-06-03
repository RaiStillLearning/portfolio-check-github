"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Report page error:", error);
  }, [error]);

  const isUserNotFound = error.message?.includes("USER_NOT_FOUND");
  const isRateLimit = error.message?.includes("RATE_LIMIT");

  let title = "Terjadi Kesalahan";
  let message = "Gagal memuat data analisis GitHub. Silakan coba beberapa saat lagi.";

  if (isUserNotFound) {
    title = "User Tidak Ditemukan";
    message = "Username GitHub yang kamu masukkan tidak dapat ditemukan. Pastikan ejaan username sudah benar.";
  } else if (isRateLimit) {
    title = "Batas Request Tercapai";
    message = "API rate limit GitHub sedang penuh karena tingginya trafik. Silakan coba lagi beberapa menit kemudian.";
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[oklch(1_0_0/8%)] bg-[oklch(0.1_0_0/80%)] backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg" aria-label="PortfolioCheck home">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white text-xs font-black">
              P
            </span>
            <span>
              Portfolio<span className="gradient-text">Check</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-md mx-auto">
        {/* Decorative Circle Icon */}
        <div className="w-20 h-20 rounded-full bg-[oklch(0.704_0.191_22.216/10%)] border border-[oklch(0.704_0.191_22.216/20%)] flex items-center justify-center text-[oklch(0.704_0.191_22.216)] text-4xl font-bold mb-8">
          ⚠️
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            onClick={() => reset()}
            className="flex-1 h-12 bg-[oklch(0.65_0.22_290)] hover:bg-[oklch(0.60_0.24_290)] text-white font-semibold"
          >
            Coba Lagi
          </Button>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12 border-[oklch(1_0_0/12%)] hover:bg-[oklch(1_0_0/5%)] font-semibold"
            >
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
