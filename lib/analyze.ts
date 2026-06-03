import type {
  GitHubUser,
  GitHubRepo,
  CategoryScore,
  ConfidenceLevel,
  PortfolioTier,
  BestProject,
  AnalysisResult,
} from "./types";

// ── Tier System ────────────────────────────────────────
const TIERS: PortfolioTier[] = [
  {
    name: "Beginner",
    emoji: "🌱",
    range: "0–30",
    description: "Baru memulai perjalanan sebagai developer",
  },
  {
    name: "Explorer",
    emoji: "🔍",
    range: "31–50",
    description: "Mulai menemukan arah dan minat teknologi",
  },
  {
    name: "Builder",
    emoji: "🔨",
    range: "51–70",
    description: "Aktif membangun proyek dan mengembangkan skill",
  },
  {
    name: "Intern Ready",
    emoji: "🎯",
    range: "71–85",
    description: "Portfolio kompetitif untuk posisi internship",
  },
  {
    name: "Junior Ready",
    emoji: "🚀",
    range: "86–100",
    description: "Siap bersaing untuk posisi junior developer",
  },
];

function getTier(score: number): PortfolioTier {
  if (score <= 30) return TIERS[0];
  if (score <= 50) return TIERS[1];
  if (score <= 70) return TIERS[2];
  if (score <= 85) return TIERS[3];
  return TIERS[4];
}

// ── Confidence Score ───────────────────────────────────
function getConfidence(repoCount: number): ConfidenceLevel {
  if (repoCount <= 3) {
    return {
      level: "Low",
      reason: "Terlalu sedikit repo untuk penilaian yang akurat",
      color: "oklch(0.72 0.18 45)",
    };
  }
  if (repoCount <= 10) {
    return {
      level: "Medium",
      reason: "Data cukup untuk gambaran umum portfolio",
      color: "oklch(0.78 0.17 80)",
    };
  }
  return {
    level: "High",
    reason: "Data memadai untuk penilaian komprehensif",
    color: "oklch(0.72 0.20 145)",
  };
}

// ── Category Scorers ───────────────────────────────────

function scoreRepositories(repos: GitHubRepo[]): number {
  const max = 25;
  if (repos.length === 0) return 0;

  const nonForks = repos.filter((r) => !r.fork);
  const withDesc = repos.filter((r) => r.description && r.description.trim().length > 5);

  // Up to 15pt for repo count (non-fork)
  const countScore = Math.min(nonForks.length / 8, 1) * 15;
  // Up to 10pt for description completeness
  const descScore = (withDesc.length / repos.length) * 10;

  return Math.round(Math.min(countScore + descScore, max));
}

function scoreActivity(repos: GitHubRepo[]): number {
  const max = 20;
  if (repos.length === 0) return 0;

  const now = Date.now();
  const dayMs = 86_400_000;

  // Find the most recent push
  const latestPush = repos.reduce((latest, repo) => {
    const d = new Date(repo.pushed_at).getTime();
    return d > latest ? d : latest;
  }, 0);

  const daysSincePush = (now - latestPush) / dayMs;

  if (daysSincePush <= 7) return max;
  if (daysSincePush <= 14) return Math.round(max * 0.85);
  if (daysSincePush <= 30) return Math.round(max * 0.70);
  if (daysSincePush <= 60) return Math.round(max * 0.50);
  if (daysSincePush <= 180) return Math.round(max * 0.30);
  return Math.round(max * 0.10);
}

function scoreDocumentation(
  repos: GitHubRepo[],
  readmeMap: Record<string, boolean>
): number {
  const max = 25;
  if (repos.length === 0) return 0;

  const withReadme = repos.filter((r) => readmeMap[r.name]).length;
  const withDesc = repos.filter((r) => r.description && r.description.trim().length > 10).length;

  // 15pt for README coverage, 10pt for description coverage
  const readmeScore = (withReadme / repos.length) * 15;
  const descScore = (withDesc / repos.length) * 10;

  return Math.round(Math.min(readmeScore + descScore, max));
}

function scoreDeployment(repos: GitHubRepo[]): number {
  const max = 15;
  if (repos.length === 0) return 0;

  const deployed = repos.filter(
    (r) => r.homepage && r.homepage.trim().length > 0
  ).length;

  if (deployed === 0) return 0;
  if (deployed === 1) return Math.round(max * 0.45);
  if (deployed === 2) return Math.round(max * 0.70);
  if (deployed === 3) return Math.round(max * 0.88);
  return max; // 4+
}

function scoreDiversity(repos: GitHubRepo[]): number {
  const max = 15;
  if (repos.length === 0) return 0;

  const languages = new Set(
    repos.filter((r) => r.language).map((r) => r.language as string)
  );

  if (languages.size <= 1) return Math.round(max * 0.15);
  if (languages.size === 2) return Math.round(max * 0.35);
  if (languages.size === 3) return Math.round(max * 0.60);
  if (languages.size === 4) return Math.round(max * 0.80);
  return max; // 5+
}

// ── Best Project Detection ─────────────────────────────
function detectBestProject(
  repos: GitHubRepo[],
  readmeMap: Record<string, boolean>
): BestProject | null {
  if (repos.length === 0) return null;

  const scored = repos
    .filter((r) => !r.fork)
    .map((repo) => {
      let pts = 0;
      if (readmeMap[repo.name]) pts += 3;
      if (repo.homepage && repo.homepage.trim()) pts += 4;
      if (repo.description && repo.description.trim()) pts += 2;
      pts += Math.min(repo.stargazers_count, 5);
      if (repo.language) pts += 1;
      return { repo, pts };
    })
    .sort((a, b) => b.pts - a.pts);

  if (scored.length === 0) return null;

  const best = scored[0];
  const languages = best.repo.language ? [best.repo.language] : [];

  return {
    name: best.repo.name,
    description: best.repo.description,
    languages,
    html_url: best.repo.html_url,
    homepage: best.repo.homepage,
    hasReadme: readmeMap[best.repo.name] ?? false,
    stars: best.repo.stargazers_count,
    score: best.pts,
  };
}

// ── Main Entry Point ───────────────────────────────────
export function analyzePortfolio(
  user: GitHubUser,
  repos: GitHubRepo[],
  readmeMap: Record<string, boolean>
): AnalysisResult {
  const repoScore = scoreRepositories(repos);
  const activityScore = scoreActivity(repos);
  const docScore = scoreDocumentation(repos, readmeMap);
  const deployScore = scoreDeployment(repos);
  const diversityScore = scoreDiversity(repos);

  const breakdown: CategoryScore[] = [
    {
      id: "documentation",
      label: "Documentation",
      score: docScore,
      max: 25,
      color: "oklch(0.65 0.22 290)",
      description: "Kualitas README dan deskripsi repo",
    },
    {
      id: "repository",
      label: "Repository Quality",
      score: repoScore,
      max: 25,
      color: "oklch(0.70 0.20 305)",
      description: "Jumlah, kelengkapan, dan kualitas repo",
    },
    {
      id: "activity",
      label: "Activity",
      score: activityScore,
      max: 20,
      color: "oklch(0.72 0.18 315)",
      description: "Konsistensi kontribusi dan push terbaru",
    },
    {
      id: "deployment",
      label: "Deployment",
      score: deployScore,
      max: 15,
      color: "oklch(0.68 0.19 295)",
      description: "Proyek yang sudah live dan bisa diakses",
    },
    {
      id: "diversity",
      label: "Project Diversity",
      score: diversityScore,
      max: 15,
      color: "oklch(0.75 0.16 280)",
      description: "Variasi bahasa pemrograman dan teknologi",
    },
  ];

  const totalScore = breakdown.reduce((sum, c) => sum + c.score, 0);
  const tier = getTier(totalScore);
  const confidence = getConfidence(repos.length);
  const bestProject = detectBestProject(repos, readmeMap);

  return {
    user,
    repos,
    analyzedCount: repos.length,
    totalScore,
    tier,
    confidence,
    breakdown,
    bestProject,
    strengths: [],    // populated by feedback.ts
    weaknesses: [],   // populated by feedback.ts
    nextActions: [],  // populated by feedback.ts
    careerInterpretation: "", // populated by feedback.ts
  };
}
