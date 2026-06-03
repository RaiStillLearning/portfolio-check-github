"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "2.4K+", label: "Portfolio Dianalisis" },
  { value: "5", label: "Kategori Scoring" },
  { value: "<10s", label: "Waktu Analisis" },
];

export default function HeroSection() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername) return;
    router.push(`/report/${cleanUsername}`);
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center text-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 290 / 15%) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.18 315 / 10%) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <Badge
          variant="outline"
          className="mb-6 border-[oklch(0.65_0.22_290/40%)] text-[oklch(0.75_0.18_285)] bg-[oklch(0.65_0.22_290/8%)] px-4 py-1.5 text-sm font-medium tracking-wide"
        >
          ✦ Free • Tanpa Login • Hasil Instan
        </Badge>
      </div>

      {/* Headline */}
      <h1
        className="animate-fade-up opacity-0 animation-delay-100 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        style={{ animationFillMode: "forwards" }}
      >
        Seberapa Siap
        <br />
        <span className="gradient-text">GitHub Portfolio</span>
        <br />
        Kamu?
      </h1>

      {/* Sub-text */}
      <p
        className="animate-fade-up opacity-0 animation-delay-200 mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
        style={{ animationFillMode: "forwards" }}
      >
        Analisis mendalam portfolio GitHub kamu dalam hitungan detik.
        Dapatkan skor, identifikasi kelemahan, dan tahu langkah apa
        yang harus diperbaiki selanjutnya.
      </p>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up opacity-0 animation-delay-300 mt-10 flex w-full max-w-md flex-col sm:flex-row gap-3"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">
            github.com/
          </span>
          <Input
            id="github-username-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-[6.75rem] h-12 bg-[oklch(1_0_0/5%)] border-[oklch(1_0_0/12%)] focus-visible:border-[oklch(0.65_0.22_290/60%)] focus-visible:ring-[oklch(0.65_0.22_290/20%)] text-foreground placeholder:text-muted-foreground/50"
            aria-label="GitHub username"
          />
        </div>
        <Button
          id="analyze-btn"
          type="submit"
          className="glow-btn h-12 px-6 bg-[oklch(0.65_0.22_290)] hover:bg-[oklch(0.60_0.24_290)] text-white font-semibold shrink-0"
        >
          Analisis Sekarang →
        </Button>
      </form>

      {/* Stats row */}
      <div
        className="animate-fade-up opacity-0 animation-delay-400 mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6"
        style={{ animationFillMode: "forwards" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold gradient-text">{s.value}</span>
            <span className="text-xs text-muted-foreground tracking-wide uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
