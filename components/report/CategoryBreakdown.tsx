"use client";

import type { CategoryScore } from "@/lib/types";
import { useEffect, useState } from "react";

interface CategoryBreakdownProps {
  breakdown: CategoryScore[];
}

export default function CategoryBreakdown({ breakdown }: CategoryBreakdownProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Delay slightly to trigger transition after render
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 h-full">
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-1">Rincian Skor Kategori</h3>
        <p className="text-sm text-muted-foreground">
          Skor didasarkan pada 5 indikator utama kesiapan portfolio.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {breakdown.map((item) => {
          const pct = Math.round((item.score / item.max) * 100);
          
          return (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-bold text-sm md:text-base text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground leading-normal md:leading-relaxed">
                    {item.description}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 text-right shrink-0">
                  <span className="font-extrabold text-base md:text-lg" style={{ color: item.color }}>
                    {item.score}
                  </span>
                  <span className="text-xs text-muted-foreground">/{item.max}</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="h-2.5 w-full bg-[oklch(1_0_0/5%)] rounded-full overflow-hidden border border-[oklch(1_0_0/3%)]">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animate ? `${pct}%` : "0%",
                    backgroundColor: item.color,
                    boxShadow: animate ? `0 0 10px ${item.color}50` : "none"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
