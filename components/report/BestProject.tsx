"use client";

import type { BestProject } from "@/lib/types";

interface BestProjectProps {
  project: BestProject | null;
}

export default function BestProjectSection({ project }: BestProjectProps) {
  if (!project) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-3xl mb-3">🛠️</div>
        <h3 className="text-lg font-bold mb-1">Belum Ada Proyek Unggulan</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Kami tidak menemukan proyek original di akunmu. Coba buat satu repository publik original
          (bukan fork) dan tambahkan README serta deskripsi untuk menjadikannya proyek unggulan.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between gap-6">
      {/* Top decorative gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[oklch(0.65_0.22_290)] via-[oklch(0.72_0.18_315)] to-[oklch(0.60_0.24_285)]" />

      {/* Left: Info */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[oklch(0.65_0.22_290/12%)] border border-[oklch(0.65_0.22_290/25%)] text-[oklch(0.75_0.18_285)] text-xs font-bold uppercase tracking-wider">
            ⭐ Proyek Terbaik
          </span>
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded">
              ★ {project.stars} {project.stars === 1 ? 'star' : 'stars'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-2xl font-black tracking-tight text-foreground">
            {project.name}
          </h3>
          {project.description ? (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/60 italic">
              Tidak ada deskripsi repository. Menambahkan deskripsi singkat membantu orang lain memahami proyekmu.
            </p>
          )}
        </div>

        {/* Badges/Tags */}
        <div className="flex flex-wrap gap-2">
          {project.languages.map((lang) => (
            <span 
              key={lang} 
              className="px-2.5 py-0.5 rounded-md bg-[oklch(1_0_0/5%)] border border-[oklch(1_0_0/10%)] text-xs font-medium text-foreground/80"
            >
              {lang}
            </span>
          ))}
          {project.hasReadme ? (
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
              ✓ README Ada
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-400">
              ⚠ README Kosong
            </span>
          )}
          {project.homepage ? (
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
              ✓ Live Demo Ready
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
              ⚠ Belum Live
            </span>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex md:flex-col justify-end gap-3 shrink-0 pt-4 md:pt-0">
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none text-center inline-flex h-11 items-center justify-center px-5 rounded-xl bg-gradient-to-r from-[oklch(0.60_0.24_285)] to-[oklch(0.65_0.20_310)] text-white text-sm font-semibold glow-btn"
          >
            Lihat Live Demo ↗
          </a>
        )}
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 md:flex-none text-center inline-flex h-11 items-center justify-center px-5 rounded-xl border border-[oklch(1_0_0/12%)] hover:bg-[oklch(1_0_0/5%)] text-sm font-semibold transition-colors"
        >
          Lihat Source Code ↗
        </a>
      </div>
    </div>
  );
}
