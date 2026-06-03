import type { GitHubUser, GitHubRepo } from "./types";

const GITHUB_API = "https://api.github.com";
const MAX_REPOS = 20;

// Common headers – add GITHUB_TOKEN env if available to raise rate limit
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    (headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: getHeaders(),
    next: { revalidate: 300 }, // cache 5 minutes
  });

  if (res.status === 404) {
    throw new Error(`USER_NOT_FOUND`);
  }
  if (res.status === 403) {
    throw new Error(`RATE_LIMIT`);
  }
  if (!res.ok) {
    throw new Error(`GITHUB_ERROR:${res.status}`);
  }

  return res.json();
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  // Top 20 by most recently pushed — reduces API calls & response time
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=pushed&direction=desc&per_page=${MAX_REPOS}&type=public`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    }
  );

  if (res.status === 403) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error(`GITHUB_ERROR:${res.status}`);

  const repos: GitHubRepo[] = await res.json();
  return repos;
}

export async function fetchReadme(
  owner: string,
  repo: string
): Promise<boolean> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
      headers: getHeaders(),
      next: { revalidate: 300 },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Fetch readme existence for all repos in parallel
export async function fetchReadmeMap(
  username: string,
  repos: GitHubRepo[]
): Promise<Record<string, boolean>> {
  const results = await Promise.all(
    repos.map((repo) => fetchReadme(username, repo.name))
  );
  return Object.fromEntries(repos.map((repo, i) => [repo.name, results[i]]));
}

export async function fetchLanguages(
  owner: string,
  repo: string
): Promise<string[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/languages`,
      {
        headers: getHeaders(),
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return [];
    const data: Record<string, number> = await res.json();
    return Object.keys(data);
  } catch {
    return [];
  }
}
