"use client";

import type { FeedbackItem } from "@/lib/types";

interface FeedbackSectionProps {
  strengths: FeedbackItem[];
  weaknesses: FeedbackItem[];
}

export default function FeedbackSection({ strengths, weaknesses }: FeedbackSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Strengths card */}
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
            ✓
          </div>
          <h3 className="text-xl font-bold tracking-tight">Kekuatan Utama</h3>
        </div>

        {strengths.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 italic p-4 text-center border border-dashed border-[oklch(1_0_0/8%)] rounded-xl">
            Belum ada kekuatan menonjol yang terdeteksi. Mulai dengan membuat repository original baru!
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {strengths.map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-emerald-500/[3%] border border-emerald-500/10 flex flex-col gap-1"
              >
                <h4 className="text-sm font-bold text-emerald-400">
                  {item.message}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weaknesses/Improvements card */}
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 text-base">
            ⚠
          </div>
          <h3 className="text-xl font-bold tracking-tight">Perlu Diperbaiki</h3>
        </div>

        {weaknesses.length === 0 ? (
          <div className="p-4 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">🎉</span>
            <h4 className="text-sm font-bold text-emerald-400">Luar biasa!</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Kami tidak menemukan kelemahan berarti. Portfolio kamu sudah memenuhi semua kriteria dasar kami.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {weaknesses.map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-rose-500/[3%] border border-rose-500/10 flex flex-col gap-1"
              >
                <h4 className="text-sm font-bold text-rose-400">
                  {item.message}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
