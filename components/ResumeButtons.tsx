"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";

const OPTIONAL_CANON_NOVEL_SLUGS = new Set([
  "itachi-shinden",
  "sasuke-shinden",
  "shikamaru-hiden",
  "konoha-hiden",
]);

const OPTIONAL_ANIME_ORIGINAL_SLUGS = new Set(["kakashi-anbu-arc"]);

const NON_CANON_STEP_SLUGS = new Set([
  "movie-land-of-snow",
  "movie-stone-of-gelel",
  "movie-crescent-moon",
  "part-1-filler-block",
  "movie-shippuden-1",
  "early-filler-block",
  "movie-bonds",
  "movie-will-of-fire",
  "movie-lost-tower",
  "late-filler-block",
  "pain-interruption",
  "post-pain-filler-block",
  "movie-blood-prison",
  "war-setup-filler-block",
  "war-filler-break-1",
  "war-filler-break-2",
  "war-filler-break-3",
  "war-filler-break-4",
  "war-filler-break-5",
  "war-filler-break-6a",
  "war-filler-break-7",
  "war-filler-break-8",
  "war-filler-break-9",
  "war-filler-break-12",
  "late-ending-filler-break",
  "ending-filler-break",
  "movie-road-to-ninja",
  "kakashi-face-reveal",
  "kakashi-face-reveal-2",
]);

function isMainPathCanon(slug: string) {
  return (
    !NON_CANON_STEP_SLUGS.has(slug) &&
    !OPTIONAL_CANON_NOVEL_SLUGS.has(slug) &&
    !OPTIONAL_ANIME_ORIGINAL_SLUGS.has(slug)
  );
}

export default function ResumeButtons() {
  const [narutoHref, setNarutoHref] = useState("/program");
  const [narutoLabel, setNarutoLabel] = useState("Start Naruto");
  const [narutoSub, setNarutoSub] = useState("");

  const [shippudenHref, setShippudenHref] = useState("/shippuden");
  const [shippudenLabel, setShippudenLabel] = useState("Go to Shippuden");
  const [shippudenSub, setShippudenSub] = useState("");

  const [hasProgress, setHasProgress] = useState(false);

  useEffect(() => {
    function loadProgress() {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

      setHasProgress(saved.length > 0);

      const completedNaruto = new Set(
        saved
          .filter(
            (item) =>
              item.series === "naruto" && isMainPathCanon(item.slug)
          )
          .map((item) => item.slug)
      );

      const completedShippuden = new Set(
        saved
          .filter(
            (item) =>
              item.series === "shippuden" &&
              isMainPathCanon(item.slug)
          )
          .map((item) => item.slug)
      );

      const narutoMainPath = steps.filter((step) =>
        isMainPathCanon(step.slug)
      );
      const shippudenMainPath = shippudenSteps.filter((step) =>
        isMainPathCanon(step.slug)
      );

      const nextNarutoStep = narutoMainPath.find(
        (step) => !completedNaruto.has(step.slug)
      );
      const nextShippudenStep = shippudenMainPath.find(
        (step) => !completedShippuden.has(step.slug)
      );

      const completedNarutoCount = narutoMainPath.filter((step) =>
        completedNaruto.has(step.slug)
      ).length;

      const completedShippudenCount = shippudenMainPath.filter((step) =>
        completedShippuden.has(step.slug)
      ).length;

      if (completedNarutoCount > 0 && nextNarutoStep) {
        setNarutoHref(`/program/${nextNarutoStep.slug}`);
        setNarutoLabel("Continue Naruto");
        setNarutoSub(nextNarutoStep.title);
      } else if (
        completedNarutoCount === narutoMainPath.length &&
        narutoMainPath.length > 0
      ) {
        setNarutoLabel("Naruto finished");
      }

      if (completedShippudenCount > 0 && nextShippudenStep) {
        setShippudenHref(`/shippuden/${nextShippudenStep.slug}`);
        setShippudenLabel("Continue Shippuden");
        setShippudenSub(nextShippudenStep.title);
      } else if (
        completedShippudenCount === shippudenMainPath.length &&
        shippudenMainPath.length > 0
      ) {
        setShippudenLabel("Shippuden finished");
      }
    }

    loadProgress();
    window.addEventListener("naruto-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("naruto-progress-updated", loadProgress);
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
          <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
          </span>

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-300">
              Main path
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {narutoLabel}
            </h3>

            {narutoSub && (
              <p className="mt-2 text-sm text-orange-100/80">
                {narutoSub}
              </p>
            )}
          </div>
        </Link>

        <Link
          href={shippudenHref}
          className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-center shadow-[0_14px_45px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.06] active:translate-y-0 active:scale-[0.99]"
        >
          <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
          </span>

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-300">
              Continue
            </p>

            <h3 className="mt-2 text-xl font-black text-white">
              {shippudenLabel}
            </h3>

            {shippudenSub && (
              <p className="mt-2 text-sm text-gray-300">
                {shippudenSub}
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
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500/15 active:translate-y-0 active:scale-[0.98]"
        >
          Boruto
        </Link>
      </div>

      {hasProgress && (
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 underline transition-all duration-200 hover:text-red-400 active:scale-[0.98]"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}