"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

const breakdown = [
  { label: "Repository Quality", score: 24, max: 30, color: "oklch(0.65 0.22 290)" },
  { label: "Activity",           score: 16, max: 20, color: "oklch(0.70 0.20 305)" },
  { label: "Documentation",      score: 14, max: 20, color: "oklch(0.72 0.18 315)" },
  { label: "Deployment",         score: 14, max: 15, color: "oklch(0.68 0.19 295)" },
  { label: "Project Diversity",  score: 10, max: 15, color: "oklch(0.75 0.16 280)" },
];

const strengths = ["9 repo publik dengan deskripsi lengkap", "Aktif commit dalam 14 hari terakhir", "2 proyek sudah live di Vercel"];
const weaknesses = ["5 dari 9 repo tidak memiliki README", "Belum ada deployment di 7 repo terbesar", "Teknologi terlalu terpusat di satu stack"];

const totalScore = 78;

function AnimatedScore({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

function AnimatedBar({ score, max, color }: { score: number; max: number; color: string }) {
  const pct = (score / max) * 100;
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current && barRef.current) {
          started.current = true;
          barRef.current.style.transition = "width 1s cubic-bezier(0.25, 1, 0.5, 1)";
          barRef.current.style.width = `${pct}%`;
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="h-1.5 rounded-full bg-[oklch(1_0_0/8%)] overflow-hidden">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{ width: "0%", background: color }}
      />
    </div>
  );
}

export default function SampleReport() {
  return (
    <section id="sample-report" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-[oklch(0.65_0.22_290)] mb-3">
            Contoh Laporan
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Begini Tampilan Hasilnya
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Laporan lengkap dengan skor, breakdown kategori, dan feedback
            yang bisa langsung kamu tindaklanjuti.
          </p>
        </div>

        {/* Report card mockup */}
        <div className="glass-card rounded-3xl p-8 md:p-10 animate-pulse-glow">
          {/* Report header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[oklch(1_0_0/8%)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <div>
                <p className="font-semibold">johndoe</p>
                <p className="text-xs text-muted-foreground">github.com/johndoe</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="self-start sm:self-auto border-[oklch(0.65_0.22_290/40%)] text-[oklch(0.75_0.18_285)] bg-[oklch(0.65_0.22_290/10%)]"
            >
              Dianalisis: 3 Jun 2026
            </Badge>
          </div>

          {/* Score + breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Big score */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44">
                {/* SVG ring */}
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" strokeWidth="8" stroke="oklch(1 0 0 / 8%)" />
                  <circle
                    cx="60" cy="60" r="52" fill="none" strokeWidth="8"
                    stroke="url(#score-gradient)"
                    strokeLinecap="round"
                    strokeDasharray={`${(totalScore / 100) * 326.7} 326.7`}
                    style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.25, 1, 0.5, 1)" }}
                  />
                  <defs>
                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="oklch(0.65 0.22 290)" />
                      <stop offset="100%" stopColor="oklch(0.72 0.18 315)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black gradient-text leading-none">
                    <AnimatedScore target={totalScore} />
                  </span>
                  <span className="text-sm text-muted-foreground mt-1">/ 100</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-[oklch(0.75_0.18_285)]">
                Portfolio Cukup Kuat 💪
              </p>
              <p className="text-xs text-muted-foreground mt-1 text-center max-w-[160px]">
                Beberapa area perlu ditingkatkan sebelum melamar.
              </p>
            </div>

            {/* Category breakdown */}
            <div className="md:col-span-3 space-y-4">
              {breakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {item.score}
                      <span className="text-muted-foreground font-normal">/{item.max}</span>
                    </span>
                  </div>
                  <AnimatedBar score={item.score} max={item.max} color={item.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[oklch(1_0_0/8%)]">
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center">✓</span>
                Kekuatan
              </h4>
              <ul className="space-y-2">
                {strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center">!</span>
                Yang Perlu Diperbaiki
              </h4>
              <ul className="space-y-2">
                {weaknesses.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA below card */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4 text-sm">
            Ini hanyalah contoh. Analisis portfolio kamu sendiri sekarang.
          </p>
          <a
            id="try-now-btn"
            href="#hero"
            className="glow-btn inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[oklch(0.65_0.22_290)] hover:bg-[oklch(0.60_0.24_290)] text-white font-semibold transition-colors"
          >
            Coba Gratis Sekarang →
          </a>
        </div>
      </div>
    </section>
  );
}
