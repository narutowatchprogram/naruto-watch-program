"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";

type CanonType =
  | "mangaCanon"
  | "animeCanon"
  | "mixedCanon"
  | "filler"
  | "movie";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

type MainPathStep = {
  slug: string;
  title: string;
  canonType?: CanonType;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const PROGRESS_EVENT = "naruto-progress-updated";

const REQUIRED_MOVIE_SLUGS = new Set(["movie-the-last"]);

function isRequiredResumeStep(step: MainPathStep) {
  if (REQUIRED_MOVIE_SLUGS.has(step.slug)) return true;

  return step.canonType === "mangaCanon" || step.canonType === "mixedCanon";
}

function getNextSequentialStep(
  mainPath: MainPathStep[],
  completedSlugs: Set<string>
) {
  return mainPath.find((step) => !completedSlugs.has(step.slug));
}

function isSequentiallyComplete(
  mainPath: MainPathStep[],
  completedSlugs: Set<string>
) {
  if (mainPath.length === 0) return false;
  return mainPath.every((step) => completedSlugs.has(step.slug));
}

export default function ResumeButtons() {
  const [narutoHref, setNarutoHref] = useState("/program");
  const [narutoLabel, setNarutoLabel] = useState("Start Naruto");
  const [narutoSub, setNarutoSub] = useState("");

  const [shippudenHref, setShippudenHref] = useState("/shippuden");
  const [shippudenLabel, setShippudenLabel] = useState("Go to Shippuden");
  const [shippudenSub, setShippudenSub] = useState("");

  const [mainComplete, setMainComplete] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    function loadProgress() {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

      setHasProgress(saved.length > 0);

      const completedNaruto = new Set(
        saved
          .filter((item) => item.series === "naruto")
          .map((item) => item.slug)
      );

      const completedShippuden = new Set(
        saved
          .filter((item) => item.series === "shippuden")
          .map((item) => item.slug)
      );

      const narutoMainPath = steps.filter((step) =>
        isRequiredResumeStep(step)
      );

      const shippudenMainPath = shippudenSteps.filter((step) =>
        isRequiredResumeStep(step)
      );

      const nextNarutoStep = getNextSequentialStep(
        narutoMainPath,
        completedNaruto
      );

      const nextShippudenStep = getNextSequentialStep(
        shippudenMainPath,
        completedShippuden
      );

      const narutoComplete = isSequentiallyComplete(
        narutoMainPath,
        completedNaruto
      );

      const shippudenComplete = isSequentiallyComplete(
        shippudenMainPath,
        completedShippuden
      );

      setMainComplete(narutoComplete && shippudenComplete);

      if (completedNaruto.size === 0) {
        setNarutoHref("/program");
        setNarutoLabel("Start Naruto");
        setNarutoSub("Land of Waves");
      } else if (nextNarutoStep) {
        setNarutoHref(`/program/${nextNarutoStep.slug}`);
        setNarutoLabel("Continue Naruto");
        setNarutoSub(nextNarutoStep.title);
      } else {
        setNarutoHref("/program");
        setNarutoLabel("Naruto complete");
        setNarutoSub("");
      }

      if (completedShippuden.size === 0) {
        setShippudenHref("/shippuden");
        setShippudenLabel("Go to Shippuden");
        setShippudenSub("Kazekage / Tenchi Bridge");
      } else if (nextShippudenStep) {
        setShippudenHref(`/shippuden/${nextShippudenStep.slug}`);
        setShippudenLabel("Continue Shippuden");
        setShippudenSub(nextShippudenStep.title);
      } else {
        setShippudenHref("/shippuden");
        setShippudenLabel("Shippuden complete");
        setShippudenSub("");
      }
    }

    loadProgress();
    window.addEventListener(PROGRESS_EVENT, loadProgress);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, loadProgress);
    };
  }, []);

  const handleReset = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <Link
          href={narutoHref}
          className="group relative overflow-hidden rounded-[1.75rem] border border-orange-500/30 bg-orange-500/10 p-5 text-center shadow-[0_14px_45px_rgba(249,115,22,0.10)] transition-all duration-200 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-orange-500/[0.14] active:translate-y-0 active:scale-[0.99]"
        >
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-300">
              Main path
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {narutoLabel}
            </h3>

            {narutoSub && (
              <p className="mt-2 text-sm text-orange-100/80">
                Next: {narutoSub}
              </p>
            )}
          </div>
        </Link>

        <Link
          href={shippudenHref}
          className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-center shadow-[0_14px_45px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.06] active:translate-y-0 active:scale-[0.99]"
        >
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-300">
              Next phase
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {shippudenLabel}
            </h3>

            {shippudenSub && (
              <p className="mt-2 text-sm text-gray-300">
                Next: {shippudenSub}
              </p>
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/movies"
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500/15 active:translate-y-0 active:scale-[0.98]"
        >
          Movies
        </Link>

        <Link
          href="/boruto"
          className={`rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
            mainComplete
              ? "border-blue-400 bg-blue-500/15 text-blue-200"
              : "border-blue-500/30 bg-blue-500/10 text-blue-200"
          }`}
        >
          Boruto
        </Link>
      </div>

      {hasProgress && (
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 underline transition-all duration-200 hover:text-red-400"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}