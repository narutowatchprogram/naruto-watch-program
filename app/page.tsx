import Link from "next/link";
import ResumeButtons from "@/components/ResumeButtons";
import StoryTimeline from "@/components/StoryTimeline";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* TIMELINE */}
        <div className="pt-8">
          <StoryTimeline />
        </div>

        {/* HERO */}
        <section className="mx-auto max-w-4xl pb-12 pt-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
            Naruto Watch Program
          </p>

          <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            Obi i made it
          </h1>

          <p className="mx-auto mb-5 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Follow the main story in order, without filler interruptions or
            broken pacing.
          </p>

          <p className="mx-auto mb-8 max-w-3xl text-base leading-7 text-gray-400">
            This program keeps everything where it belongs - canon first,
            everything else placed around it.
          </p>

          <ResumeButtons />
        </section>

        {/* RULE STRIP */}
        <section className="my-10 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            <span className="text-white">Canon first</span>
            <span className="opacity-40">•</span>
            <span>Track your progress</span>
            <span className="opacity-40">•</span>
            <span>Extras later</span>
          </div>
        </section>

        {/* NAV PATHS */}
        <section className="grid gap-6 md:grid-cols-3">
          <Link
            href="/program"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/15 to-transparent p-6 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_60%)]" />
            </div>

            <div className="relative z-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
                Start here
              </p>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Part 1
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                Begin from the start and follow the core canon path.
              </p>
            </div>
          </Link>

          <Link
            href="/shippuden"
            className="group relative overflow-hidden rounded-3xl bg-white/[0.03] p-6 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="relative z-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
                Continue
              </p>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Shippuden
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                Continue the main story through its full conclusion.
              </p>
            </div>
          </Link>

          <Link
            href="/boruto"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent p-6 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="relative z-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
                Extra path
              </p>

              <h2 className="text-2xl font-black tracking-tight text-white">
                Boruto
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                Continue into the next generation after finishing Naruto.
              </p>
            </div>
          </Link>
        </section>

        {/* ABOUT */}
        <section className="mx-auto mt-16 max-w-4xl pb-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
            About the program
          </p>

          <h2 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Built around the original story.
          </h2>

          <p className="leading-8 text-gray-300">
            Naruto is roughly 41% filler across the full anime. Watching it
            straight through breaks pacing and weakens the story. This program
            follows the manga-based canon path first, then layers in optional
            material where it actually fits, keeping the experience focused,
            consistent, and true to how the story was meant to be experienced.
          </p>
        </section>
      </div>
    </main>
  );
}