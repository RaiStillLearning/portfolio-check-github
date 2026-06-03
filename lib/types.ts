// ── GitHub API Types ──────────────────────────────────
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  topics: string[];
  pushed_at: string;
  created_at: string;
  updated_at: string;
  size: number;
}

// ── Analysis Result Types ──────────────────────────────
export interface CategoryScore {
  id: string;
  label: string;
  score: number;
  max: number;
  color: string;
  description: string;
}

export type ConfidenceLevelType = "Low" | "Medium" | "High";

export interface ConfidenceLevel {
  level: ConfidenceLevelType;
  reason: string;
  color: string;
}

export interface PortfolioTier {
  name: string;
  description: string;
  emoji: string;
  range: string;
}

export interface BestProject {
  name: string;
  description: string | null;
  languages: string[];
  html_url: string;
  homepage: string | null;
  hasReadme: boolean;
  stars: number;
  score: number;
}

export interface FeedbackItem {
  message: string;
  detail: string;
}

export interface AnalysisResult {
  user: GitHubUser;
  repos: GitHubRepo[];
  analyzedCount: number;
  totalScore: number;
  confidence: ConfidenceLevel;
  tier: PortfolioTier;
  breakdown: CategoryScore[];
  bestProject: BestProject | null;
  strengths: FeedbackItem[];
  weaknesses: FeedbackItem[];
  nextActions: string[];
  careerInterpretation: string;
}
