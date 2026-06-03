"use client";

interface NextActionsProps {
  actions: string[];
}

export default function NextActions({ actions }: NextActionsProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <span>🎯</span> Langkah Selanjutnya
        </h3>
        <p className="text-sm text-muted-foreground">
          Selesaikan 3 langkah prioritas ini untuk meningkatkan kualitas portfolio kamu secara signifikan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <div 
            key={index}
            className="relative p-6 rounded-xl bg-[oklch(1_0_0/3%)] border border-[oklch(1_0_0/8%)] flex flex-col gap-4 overflow-hidden"
          >
            {/* Background huge number */}
            <div className="absolute -right-2 -bottom-6 text-8xl font-black text-[oklch(1_0_0/3%)] select-none pointer-events-none">
              {index + 1}
            </div>

            {/* Number circle badge */}
            <div className="w-8 h-8 rounded-full bg-[oklch(0.65_0.22_290)] text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-[oklch(0.65_0.22_290/25%)] shrink-0 z-10">
              {index + 1}
            </div>

            <p className="text-sm font-semibold text-foreground/90 leading-relaxed min-h-[44px] z-10">
              {action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
