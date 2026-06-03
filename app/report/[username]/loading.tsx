export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[oklch(1_0_0/8%)] bg-[oklch(0.1_0_0/80%)] backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5 font-bold text-lg select-none">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.72_0.18_315)] flex items-center justify-center text-white text-xs font-black">
              P
            </span>
            <span>
              Portfolio<span className="gradient-text">Check</span>
            </span>
          </div>
        </div>
      </header>

      {/* Loading body */}
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 flex flex-col gap-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            {/* Avatar skeleton */}
            <div className="w-20 h-20 rounded-full bg-[oklch(1_0_0/10%)]" />
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="h-6 w-32 bg-[oklch(1_0_0/10%)] rounded" />
              <div className="h-4 w-48 bg-[oklch(1_0_0/10%)] rounded" />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="h-4 w-24 bg-[oklch(1_0_0/10%)] rounded" />
            <div className="h-6 w-36 bg-[oklch(1_0_0/10%)] rounded" />
          </div>
        </div>

        {/* Scoring & Categories Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Circular Score ring skeleton */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="relative w-40 h-40 rounded-full border-8 border-[oklch(1_0_0/8%)] flex items-center justify-center">
              <div className="h-10 w-20 bg-[oklch(1_0_0/10%)] rounded" />
            </div>
            <div className="h-6 w-32 bg-[oklch(1_0_0/10%)] rounded mt-6" />
          </div>

          {/* Breakdown bars skeleton */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-8 flex flex-col gap-6 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-[oklch(1_0_0/10%)] rounded" />
                  <div className="h-4 w-12 bg-[oklch(1_0_0/10%)] rounded" />
                </div>
                <div className="h-3 w-full bg-[oklch(1_0_0/8%)] rounded-full overflow-hidden">
                  <div className="h-full bg-[oklch(1_0_0/12%)] rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Interpretation Box Skeleton */}
        <div className="p-6 rounded-2xl bg-[oklch(0.65_0.22_290/5%)] border border-[oklch(0.65_0.22_290/20%)] flex flex-col gap-3">
          <div className="h-5 w-40 bg-[oklch(0.65_0.22_290/20%)] rounded" />
          <div className="h-4 w-full bg-[oklch(1_0_0/10%)] rounded" />
          <div className="h-4 w-[85%] bg-[oklch(1_0_0/10%)] rounded" />
        </div>

        {/* Strengths and Weaknesses Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="h-6 w-36 bg-[oklch(1_0_0/10%)] rounded" />
            <div className="h-16 w-full bg-[oklch(1_0_0/5%)] rounded" />
            <div className="h-16 w-full bg-[oklch(1_0_0/5%)] rounded" />
          </div>
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="h-6 w-36 bg-[oklch(1_0_0/10%)] rounded" />
            <div className="h-16 w-full bg-[oklch(1_0_0/5%)] rounded" />
            <div className="h-16 w-full bg-[oklch(1_0_0/5%)] rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
