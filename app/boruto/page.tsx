"use client";

import { borutoSteps } from "@/data/borutoSteps";
import SeriesProgramPage from "../../components/SeriesProgramPage";

export default function BorutoPage() {
  return (
    <SeriesProgramPage
      series="boruto"
      steps={borutoSteps}
      title="Boruto"
      subtitle="Boruto continues after Naruto and Shippuden. Manga canon is the main path here, while anime canon and mixed canon are labeled separately so you can decide how deep you want to go."
      accentColor="blue"
      introBlock={
        <div className="space-y-3">
          <div className="rounded-2xl border border-gray-800 bg-white/5 p-5">
            <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
              Context
            </p>

            <p className="text-sm leading-7 text-gray-400">
              Boruto is canon to the Naruto universe, but it was not created in
              the same way as the original Naruto story. The Boruto anime is
              based on a newer Boruto manga series, which continues the story
              beyond Naruto’s original run through chapter 700, covering both
              Part 1 and Shippuden. That is why Boruto stays optional in this
              program. Masashi Kishimoto remains involved, with his role leaning
              more toward supervision and story direction than fully writing the
              entire continuation himself.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-300">
                Progress
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Only manga canon counts toward Boruto progress.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-300">
                Movie
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                <span className="font-medium text-white">
                  Boruto: Naruto the Movie
                </span>{" "}
                is canon, but optional here because the anime covers that
                material more fully.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}