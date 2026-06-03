"use client";

import type { AnalysisResult } from "@/lib/types";
import ScoreHeader from "./ScoreHeader";
import CategoryBreakdown from "./CategoryBreakdown";
import BestProjectSection from "./BestProject";
import FeedbackSection from "./FeedbackSection";
import NextActions from "./NextActions";
import ShareButton from "./ShareButton";

interface ReportContentProps {
  analysis: AnalysisResult;
}

export default function ReportContent({ analysis }: ReportContentProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 flex flex-col gap-8">
      {/* Upper header section: profile info, tier, main score circular chart */}
      <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <ScoreHeader analysis={analysis} />
      </div>

      {/* Grid for Score Breakdown & Career Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown Progress Bars */}
        <div 
          className="lg:col-span-8 animate-fade-up opacity-0 animation-delay-100" 
          style={{ animationFillMode: "forwards" }}
        >
          <CategoryBreakdown breakdown={analysis.breakdown} />
        </div>

        {/* Share & Quick Stats Panel */}
        <div 
          className="lg:col-span-4 flex flex-col gap-6 animate-fade-up opacity-0 animation-delay-200" 
          style={{ animationFillMode: "forwards" }}
        >
          <ShareButton username={analysis.user.login} />
          
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[160px]">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Confidence Level
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: analysis.confidence.color }} 
                />
                <span className="font-bold text-lg">{analysis.confidence.level}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysis.confidence.reason}
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-[oklch(1_0_0/6%)] flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Repos analyzed:</span>
              <span className="font-semibold">{analysis.analyzedCount} public repos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Project Feature */}
      <div className="animate-fade-up opacity-0 animation-delay-300" style={{ animationFillMode: "forwards" }}>
        <BestProjectSection project={analysis.bestProject} />
      </div>

      {/* Strengths & Weaknesses Detailed breakdown */}
      <div className="animate-fade-up opacity-0 animation-delay-400" style={{ animationFillMode: "forwards" }}>
        <FeedbackSection strengths={analysis.strengths} weaknesses={analysis.weaknesses} />
      </div>

      {/* Recommended Next Actions Checklist */}
      <div className="animate-fade-up opacity-0 animation-delay-500" style={{ animationFillMode: "forwards" }}>
        <NextActions actions={analysis.nextActions} />
      </div>
    </div>
  );
}
