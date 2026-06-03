import type { AnalysisResult, FeedbackItem, GitHubRepo } from "./types";

function pct(n: number, total: number) {
  return total === 0 ? 0 : n / total;
}

function deployedRepos(repos: GitHubRepo[]) {
  return repos.filter((r) => r.homepage && r.homepage.trim().length > 0);
}

function reposWithoutReadme(
  repos: GitHubRepo[],
  readmeMap: Record<string, boolean>
) {
  return repos.filter((r) => !readmeMap[r.name]);
}

export function generateFeedback(
  result: AnalysisResult,
  readmeMap: Record<string, boolean>
): Pick<
  AnalysisResult,
  "strengths" | "weaknesses" | "nextActions" | "careerInterpretation"
> {
  const { repos, breakdown, totalScore, confidence } = result;
  const strengths: FeedbackItem[] = [];
  const weaknesses: FeedbackItem[] = [];
  const nextActions: string[] = [];

  const docScore = breakdown.find((b) => b.id === "documentation")!;
  const actScore = breakdown.find((b) => b.id === "activity")!;
  const depScore = breakdown.find((b) => b.id === "deployment")!;
  const divScore = breakdown.find((b) => b.id === "diversity")!;
  const repScore = breakdown.find((b) => b.id === "repository")!;

  const readmePct = pct(
    repos.filter((r) => readmeMap[r.name]).length,
    repos.length
  );
  const deployed = deployedRepos(repos);
  const nonForks = repos.filter((r) => !r.fork);
  const withDesc = repos.filter((r) => r.description && r.description.trim().length > 5);
  const languages = new Set(repos.filter((r) => r.language).map((r) => r.language!));

  // ── Strengths ────────────────────────────────────────
  if (docScore.score >= 20) {
    strengths.push({
      message: "Dokumentasi yang kuat",
      detail: `${Math.round(readmePct * 100)}% repo memiliki README — ini menunjukkan perhatian pada kualitas kode.`,
    });
  }

  if (actScore.score >= 15) {
    strengths.push({
      message: "Aktif berkontribusi",
      detail: "Aktivitas GitHub yang konsisten menunjukkan passion dan kebiasaan coding yang baik.",
    });
  }

  if (deployed.length >= 2) {
    strengths.push({
      message: `${deployed.length} proyek sudah live`,
      detail: "Kemampuan deploy ke production adalah nilai plus besar di mata recruiter.",
    });
  }

  if (languages.size >= 4) {
    strengths.push({
      message: `Familiar dengan ${languages.size} bahasa pemrograman`,
      detail: `Termasuk: ${Array.from(languages).slice(0, 4).join(", ")}.`,
    });
  }

  if (nonForks.length >= 6) {
    strengths.push({
      message: `${nonForks.length} proyek original`,
      detail: "Banyak proyek buatan sendiri menunjukkan inisiatif dan kreativitas.",
    });
  }

  // ── Weaknesses ───────────────────────────────────────
  if (deployed.length === 0) {
    weaknesses.push({
      message: "Tidak ada proyek yang live",
      detail: "Recruiter ingin melihat hasil nyata — bukan hanya kode di GitHub. Ini sering jadi alasan kandidat tidak dipanggil.",
    });
    nextActions.push("Deploy minimal satu proyek ke Vercel, Netlify, atau Railway");
  }

  if (readmePct < 0.5 && repos.length > 0) {
    const count = repos.filter((r) => !readmeMap[r.name]).length;
    weaknesses.push({
      message: `${count} repo tanpa README`,
      detail: "README adalah kesan pertama proyekmu. Tanpanya, orang tidak tahu apa yang kamu buat atau bagaimana menjalankannya.",
    });
    if (nextActions.length < 3) {
      nextActions.push(`Tambahkan README ke ${Math.min(count, 3)} repo terbesarmu`);
    }
  }

  if (actScore.score < 10) {
    weaknesses.push({
      message: "Kurang aktif dalam 30 hari terakhir",
      detail: "Konsistensi lebih penting dari intensitas. Coding sedikit setiap hari lebih baik dari coding banyak tapi jarang.",
    });
    if (nextActions.length < 3) {
      nextActions.push("Targetkan minimal 3 commit per minggu untuk menjaga momentum");
    }
  }

  if (languages.size <= 1) {
    weaknesses.push({
      message: "Portfolio terlalu fokus pada satu teknologi",
      detail: "Diversifikasi stack membuktikan kemampuan adaptasi — skill yang sangat dihargai perusahaan.",
    });
    if (nextActions.length < 3) {
      nextActions.push("Coba buat satu proyek kecil dengan bahasa atau framework yang berbeda");
    }
  }

  if (withDesc.length < repos.length * 0.5 && repos.length > 0) {
    weaknesses.push({
      message: "Banyak repo tanpa deskripsi",
      detail: "Deskripsi singkat membantu recruiter memahami proyekmu dalam 3 detik pertama.",
    });
    if (nextActions.length < 3) {
      nextActions.push("Tambahkan deskripsi singkat (1-2 kalimat) ke setiap repo");
    }
  }

  // Ensure at least 3 next actions
  if (nextActions.length === 0) {
    nextActions.push("Tambahkan topik/tag ke repo untuk meningkatkan discoverability");
    nextActions.push("Buat satu proyek full-stack yang menggabungkan frontend dan backend");
    nextActions.push("Tulis README yang lengkap dengan screenshot untuk proyek terbaikmu");
  } else if (nextActions.length === 1) {
    nextActions.push("Buat satu proyek full-stack yang menggabungkan frontend dan backend");
    nextActions.push("Pin 6 proyek terbaikmu di profil GitHub");
  } else if (nextActions.length === 2) {
    nextActions.push("Pin 6 proyek terbaikmu di profil GitHub");
  }

  // ── Career Interpretation ────────────────────────────
  let careerInterpretation = "";

  if (totalScore >= 86) {
    careerInterpretation = "Portfolio kamu sangat kuat dan kompetitif untuk posisi junior developer. Fokus sekarang adalah pada kualitas proyek unggulan dan persiapan technical interview.";
  } else if (totalScore >= 71) {
    careerInterpretation = deployed.length === 0
      ? "Kamu sudah siap melamar internship, tapi kemungkinan kehilangan peluang karena belum ada proyek yang bisa langsung dilihat recruiter. Deploy satu proyek sekarang bisa signifikan meningkatkan peluangmu."
      : "Portfolio kamu sudah kompetitif untuk internship. Tingkatkan kualitas dokumentasi dan tambahkan proyek yang menunjukkan problem-solving skill.";
  } else if (totalScore >= 51) {
    careerInterpretation = "Portfolio kamu menunjukkan potensi yang baik, tapi masih ada beberapa gap yang perlu diperbaiki sebelum aktif melamar. Fokus pada 2–3 proyek berkualitas tinggi daripada banyak proyek setengah jadi.";
  } else if (totalScore >= 31) {
    careerInterpretation = "Portfolio kamu masih dalam tahap awal. Ini normal — setiap developer senior pernah di titik ini. Prioritas utama: selesaikan dan deploy minimal satu proyek dari awal hingga akhir.";
  } else {
    careerInterpretation = confidence.level === "Low"
      ? "Kamu baru memulai — dan itu hebat! Mulai dengan membangun satu proyek kecil yang benar-benar kamu selesaikan. Konsistensi lebih penting dari kesempurnaan."
      : "Portfolio kamu masih membutuhkan banyak pengembangan. Jangan berkecil hati — fokuslah pada satu langkah kecil setiap hari.";
  }

  return { strengths, weaknesses, nextActions, careerInterpretation };
}
