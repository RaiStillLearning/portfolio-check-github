const categories = [
  {
    id: "repository",
    emoji: "📁",
    title: "Repository Quality",
    weight: "30%",
    desc: "Jumlah repo, kelengkapan deskripsi, topik, dan konsistensi penamaan proyek.",
    points: ["Jumlah repo publik", "Kelengkapan deskripsi", "Topik & tags"],
  },
  {
    id: "activity",
    emoji: "⚡",
    title: "Activity",
    weight: "20%",
    desc: "Seberapa aktif kamu berkontribusi: commit recent, frekuensi push, dan konsistensi.",
    points: ["Commit 30 hari terakhir", "Frekuensi push", "Streak kontribusi"],
  },
  {
    id: "documentation",
    emoji: "📝",
    title: "Documentation",
    weight: "20%",
    desc: "Kualitas README di setiap repo: ada header, deskripsi, cara install, dan screenshot.",
    points: ["Keberadaan README", "Kualitas konten", "Instruksi setup"],
  },
  {
    id: "deployment",
    emoji: "🚀",
    title: "Deployment",
    weight: "15%",
    desc: "Apakah proyekmu sudah live? Link Vercel, Netlify, Railway, atau URL deploy lainnya.",
    points: ["Link live demo", "Platform deploy", "Jumlah project live"],
  },
  {
    id: "diversity",
    emoji: "🌐",
    title: "Project Diversity",
    weight: "15%",
    desc: "Variasi teknologi dan domain proyek: frontend, backend, mobile, open-source.",
    points: ["Variasi bahasa", "Domain berbeda", "Stack yang dipakai"],
  },
];

export default function ScoreCategories() {
  return (
    <section id="categories" className="px-6 py-24 relative">
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, oklch(0.65 0.22 290 / 6%), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-[oklch(0.65_0.22_290)] mb-3">
            Scoring System
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            5 Kategori yang Dinilai
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Setiap kategori memiliki bobot berbeda untuk menghasilkan skor
            yang merepresentasikan kesiapan portfolio secara menyeluruh.
          </p>
        </div>

        {/* 3 + 2 grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:px-[calc(16.667%+10px)]">
          {categories.slice(3).map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
}: {
  cat: (typeof categories)[0];
}) {
  return (
    <div className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1">
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{cat.emoji}</div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[oklch(0.65_0.22_290/12%)] text-[oklch(0.75_0.18_285)] border border-[oklch(0.65_0.22_290/25%)]">
          {cat.weight}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-2">{cat.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>

      {/* Point list */}
      <ul className="space-y-1.5">
        {cat.points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.22_290)] shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
