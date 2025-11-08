export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8 text-slate-50">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome to MyFitness2</h1>
        <p className="mt-4 text-lg text-slate-300">
          Your personal fitness companion to record workouts, analyze progress, and stay motivated.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded bg-emerald-500 px-6 py-3 text-base font-semibold text-emerald-950 shadow-md transition hover:bg-emerald-400"
            href="#"
          >
            Get Started
          </a>
          <a
            className="rounded border border-emerald-400 px-6 py-3 text-base font-semibold text-emerald-200 transition hover:bg-emerald-900/40"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
