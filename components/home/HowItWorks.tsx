const steps = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    title: "Masukkan Username",
    desc: "Ketik username GitHub kamu. Tidak perlu login atau izin apapun — hanya data publik.",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
    title: "Sistem Menganalisis",
    desc: "Kami mengambil data repo, commit, README, dan deployment kamu dari GitHub API secara otomatis.",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Terima Laporan Lengkap",
    desc: "Dapatkan skor 0–100, breakdown per kategori, daftar kekuatan, kelemahan, dan rekomendasi aksi.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-[oklch(0.65_0.22_290)] mb-3">
            Cara Kerja
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tiga Langkah, Hasil Nyata
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Proses analisis selesai dalam &lt;10 detik. Tidak ada formulir panjang,
            tidak ada akun yang dibutuhkan.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="glass-card relative rounded-2xl p-8 transition-all duration-300 group"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Connector line between cards (desktop) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-[oklch(0.65_0.22_290/40%)] to-transparent z-10"
                />
              )}

              {/* Step number */}
              <span className="text-6xl font-black text-[oklch(0.65_0.22_290/12%)] group-hover:text-[oklch(0.65_0.22_290/20%)] transition-colors leading-none select-none absolute top-5 right-7">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.65_0.22_290/15%)] border border-[oklch(0.65_0.22_290/25%)] flex items-center justify-center text-[oklch(0.75_0.18_285)] mb-5 group-hover:bg-[oklch(0.65_0.22_290/25%)] transition-colors">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
