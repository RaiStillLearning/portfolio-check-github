import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ScoreCategories from "@/components/home/ScoreCategories";
import SampleReport from "@/components/home/SampleReport";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-[oklch(1_0_0/8%)] bg-[oklch(0.1_0_0/80%)] backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5 font-bold text-lg" aria-label="PortfolioCheck home">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white text-xs font-black">
              P
            </span>
            <span>
              Portfolio<span className="gradient-text">Check</span>
            </span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">Cara Kerja</a>
            <a href="#categories" className="hover:text-foreground transition-colors">Kategori</a>
            <a href="#sample-report" className="hover:text-foreground transition-colors">Contoh</a>
          </nav>

          <a
            href="#hero"
            className="hidden sm:inline-flex h-9 items-center justify-center px-4 rounded-lg bg-[oklch(0.65_0.22_290/15%)] border border-[oklch(0.65_0.22_290/30%)] text-[oklch(0.75_0.18_285)] text-sm font-medium hover:bg-[oklch(0.65_0.22_290/25%)] transition-colors"
          >
            Analisis Sekarang
          </a>
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="flex-1">
        <HeroSection />

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(1_0_0/12%)] to-transparent" />
        </div>

        <HowItWorks />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(1_0_0/12%)] to-transparent" />
        </div>

        <ScoreCategories />

        <div className="mx-auto max-w-5xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(1_0_0/12%)] to-transparent" />
        </div>

        <SampleReport />
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-[oklch(1_0_0/8%)] py-10 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Footer CTA */}
          <div className="glass-card rounded-2xl p-8 text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Siap Tahu Skor Portfolio Kamu?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Gratis, tanpa login, hasil dalam 10 detik. Mulai analisis sekarang.
            </p>
            <a
              href="#hero"
              id="footer-cta-btn"
              className="inline-flex h-12 items-center justify-center px-8 rounded-xl bg-gradient-to-r from-[oklch(0.60_0.24_285)] to-[oklch(0.65_0.20_310)] text-white font-semibold glow-btn"
            >
              Analisis GitHub Saya →
            </a>
          </div>

          {/* Footer bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white text-[10px] font-black">
                P
              </span>
              <span className="font-medium text-foreground">PortfolioCheck</span>
            </div>
            <p>
              Dibuat oleh{" "}
              <a
                href="https://github.com/RaiStillLearning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline transition-all"
              >
                RaiStillLearning
              </a>{" "}
              (
              <a
                href="https://rakhaarkana.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline transition-all"
              >
                rakhaarkana.my.id
              </a>
              ) untuk student & junior dev Indonesia 🇮🇩
            </p>
            <p>© 2026 PortfolioCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
