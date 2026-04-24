"use client";

import { useEffect, useMemo, useState } from "react";

type ProgressSummaryProps = {
  series: "naruto" | "shippuden" | "boruto";
  totalSteps: number;
};

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
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
  "early-filler-break",
  "team-7-filler-break",
  "cho-cho-filler-break",
  "small-filler-break-1",
  "filler-break-2",
  "filler-break-3",
  "filler-break-4",
  "filler-break-5",
  "kakashi-face-reveal",
  "kakashi-face-reveal-2",
]);

const BORUTO_REQUIRED_EXCEPTIONS = new Set(["academy-opening-mixed"]);

const BORUTO_MANGA_CANON_SLUGS = new Set([
  "uchiha-family-manga",
  "mitsuki-one-shot",
  "chunin-exams-manga-1",
  "chunin-exams-manga-2",
  "juugo-manga",
  "mujina-manga",
  "kawaki-manga-1",
  "kawaki-manga-2",
  "kawaki-manga-3",
  "final-manga-canon-run",
]);

function isProgressCanon(
  series: "naruto" | "shippuden" | "boruto",
  slug: string
) {
  if (series === "boruto") {
    return (
      BORUTO_REQUIRED_EXCEPTIONS.has(slug) ||
      BORUTO_MANGA_CANON_SLUGS.has(slug)
    );
  }

  if (
    series === "shippuden" &&
    (slug === "movie-the-last" || slug === "konoha-hiden")
  ) {
    return true;
  }

  return (
    !NON_CANON_STEP_SLUGS.has(slug) &&
    !OPTIONAL_CANON_NOVEL_SLUGS.has(slug) &&
    !OPTIONAL_ANIME_ORIGINAL_SLUGS.has(slug)
  );
}

function getProgressMessage(ratio: number) {
  if (ratio <= 0) {
    return {
      title: "You’re at the start",
      body: "Mark canon arcs complete as you go to move the story forward.",
    };
  }

  if (ratio < 0.25) {
    return {
      title: "You’re moving",
      body: "Early progress is in. Keep the momentum going.",
    };
  }

  if (ratio < 0.5) {
    return {
      title: "You’re deep in it",
      body: "The main story is opening up now.",
    };
  }

  if (ratio < 0.75) {
    return {
      title: "You’re in the heart of the story",
      body: "This is where a lot of the payoff starts stacking up.",
    };
  }

  if (ratio < 1) {
    return {
      title: "You’re closing in",
      body: "The finish line is starting to show.",
    };
  }

  return {
    title: "Main path complete",
    body: "You finished the canon story path for this section.",
  };
}

function getSeriesAccent(series: "naruto" | "shippuden" | "boruto") {
  if (series === "boruto") {
    return {
      eyebrow: "text-blue-300",
      badgeBorder: "border-blue-400/30",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-200",
      fill: "from-blue-500 via-cyan-400 to-sky-300",
      glow: "shadow-[0_0_24px_rgba(59,130,246,0.25)]",
    };
  }

  return {
    eyebrow: "text-orange-300",
    badgeBorder: "border-orange-400/30",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-100",
    fill: "from-orange-500 via-orange-400 to-yellow-300",
    glow: "shadow-[0_0_24px_rgba(249,115,22,0.35)]",
  };
}

export default function ProgressSummary({
  series,
  totalSteps,
}: ProgressSummaryProps) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    function loadProgress() {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

      const count = saved.filter(
        (item) => item.series === series && isProgressCanon(series, item.slug)
      ).length;

      setCompletedCount(count);
    }

    loadProgress();
    window.addEventListener("naruto-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("naruto-progress-updated", loadProgress);
    };
  }, [series]);

  const ratio = useMemo(() => {
    if (totalSteps <= 0) return 0;
    return Math.max(0, Math.min(1, completedCount / totalSteps));
  }, [completedCount, totalSteps]);

  const progress = getProgressMessage(ratio);
  const percentage = Math.round(ratio * 100);
  const accent = getSeriesAccent(series);

  return (
    <div className="mx-auto mb-8 max-w-4xl">
      <div className="rounded-[1.75rem] bg-zinc-950/80 p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-[0.22em] ${accent.eyebrow}`}
            >
              Canon progress
            </p>

            <p className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {progress.title}
            </p>
          </div>

          <div
            className={[
              "w-fit rounded-full border px-4 py-2 text-sm font-bold",
              accent.badgeBorder,
              accent.badgeBg,
              accent.badgeText,
            ].join(" ")}
          >
            {percentage}%
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
          <span>
            {completedCount} of {totalSteps} complete
          </span>
          <span>{ratio === 1 ? "Finished" : "In progress"}</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#1f2d45]">
          <div
            className={[
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              accent.fill,
              accent.glow,
            ].join(" ")}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-4 text-sm leading-7 text-gray-400">{progress.body}</p>
      </div>
    </div>
  );
}