"use client";

import type { AnalysisResult } from "@/lib/types";
import { useEffect, useState } from "react";

interface ScoreHeaderProps {
  analysis: AnalysisResult;
}

export default function ScoreHeader({ analysis }: ScoreHeaderProps) {
  const { user, totalScore, tier, careerInterpretation } = analysis;
  const [animatedScore, setAnimatedScore] = useState(0);

  // Count-up animation for the score
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.round(easeProgress * totalScore);
      
      setAnimatedScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [totalScore]);

  // Circle SVG metrics
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Tier color mapping
  const getTierColorClass = (tierName: string) => {
    switch (tierName) {
      case "Beginner": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Explorer": return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
      case "Builder": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Intern Ready": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      case "Junior Ready": return "text-violet-400 bg-violet-500/10 border-violet-500/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top box: Profile info & Circular Score */}
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.22 290 / 10%) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
        />

        {/* Left: User details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left z-10">
          {/* Avatar with ring glow */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] rounded-full opacity-60 blur-sm group-hover:opacity-100 transition duration-300" />
            <img 
              src={user.avatar_url} 
              alt={user.name || user.login} 
              className="relative w-24 h-24 rounded-full border-4 border-background object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 max-w-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                {user.name || user.login}
                <span className="text-sm font-medium text-muted-foreground">@{user.login}</span>
              </h2>
              {user.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-start text-xs text-muted-foreground mt-1">
              <div>
                <strong className="text-foreground">{user.followers}</strong> followers
              </div>
              <span className="text-muted-foreground/30">•</span>
              <div>
                <strong className="text-foreground">{user.following}</strong> following
              </div>
              <span className="text-muted-foreground/30">•</span>
              <div>
                <strong className="text-foreground">{user.public_repos}</strong> repos total
              </div>
            </div>
          </div>
        </div>

        {/* Right: Circular score and tier badge */}
        <div className="flex flex-col items-center gap-4 z-10 shrink-0">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circle track */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-[oklch(1_0_0/6%)] fill-transparent"
                strokeWidth="10"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-[oklch(0.65_0.22_290)] fill-transparent transition-all duration-300 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Value indicator inside the circle */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tighter text-foreground">
                {animatedScore}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Skor total
              </span>
            </div>
          </div>

          {/* Tier badge */}
          <div className={`px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 select-none ${getTierColorClass(tier.name)}`}>
            <span>{tier.emoji}</span>
            <span>{tier.name}</span>
          </div>
        </div>
      </div>

      {/* Bottom box: Career Interpretation / Guidance */}
      <div className="p-6 rounded-2xl bg-[oklch(0.65_0.22_290/6%)] border border-[oklch(0.65_0.22_290/18%)] flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[oklch(0.65_0.22_290/12%)] border border-[oklch(0.65_0.22_290/25%)] flex items-center justify-center text-xl shrink-0">
          💼
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-indigo-400">Analisis Karir & Peluang</h3>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
            &ldquo;{careerInterpretation}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
