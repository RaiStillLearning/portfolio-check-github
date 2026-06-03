"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  username: string;
}

export default function ShareButton({ username }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-bold tracking-tight mb-1">Bagikan Analisis</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tunjukkan pencapaian portfoliomu atau minta masukan dari sesama developer.
        </p>
      </div>

      <Button
        onClick={handleShare}
        className={`w-full h-11 rounded-xl font-bold transition-all duration-300 ${
          copied 
            ? "bg-emerald-600 hover:bg-emerald-600/90 text-white shadow-emerald-500/20" 
            : "bg-[oklch(0.65_0.22_290)] hover:bg-[oklch(0.60_0.24_290)] text-white glow-btn"
        }`}
      >
        {copied ? "✓ Link Tersalin!" : "Bagikan Hasil →"}
      </Button>
    </div>
  );
}
