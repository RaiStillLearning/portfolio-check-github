import { fetchUser, fetchRepos, fetchReadmeMap } from "@/lib/github";
import { analyzePortfolio } from "@/lib/analyze";
import { generateFeedback } from "@/lib/feedback";
import ReportContent from "@/components/report/ReportContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { username } = await params;
  const cleanUsername = username.trim();

  // Fetch data
  const user = await fetchUser(cleanUsername);
  const repos = await fetchRepos(cleanUsername);
  const readmeMap = await fetchReadmeMap(cleanUsername, repos);

  // Run analysis
  const baseAnalysis = analyzePortfolio(user, repos, readmeMap);
  const feedback = generateFeedback(baseAnalysis, readmeMap);

  const analysisResult = {
    ...baseAnalysis,
    ...feedback,
  };

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

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="border-[oklch(1_0_0/12%)] hover:bg-[oklch(1_0_0/5%)] text-xs md:text-sm font-medium"
            >
              Analisis User Lain
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <ReportContent analysis={analysisResult} />
      </main>

      {/* Footer */}
      <footer className="border-t border-[oklch(1_0_0/8%)] py-8 px-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white text-[8px] font-black">
              P
            </span>
            <span className="font-semibold text-foreground">PortfolioCheck</span>
          </div>
          <p>Dibuat untuk student & junior dev Indonesia 🇮🇩</p>
          <p>© 2026 PortfolioCheck. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
