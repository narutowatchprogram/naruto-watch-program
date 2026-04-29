"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";
import { borutoSteps } from "@/data/borutoSteps";

type Series = "naruto" | "shippuden" | "boruto";

type SavedProgressItem = {
  id: string;
  series: Series;
  slug: string;
  title: string;
};

type TimelineStep = {
  id: string;
  series: Series;
  slug: string;
};

type CanonType =
  | "mangaCanon"
  | "animeCanon"
  | "mixedCanon"
  | "filler"
  | "movie";

type StepWithCanon = {
  slug: string;
  canonType?: CanonType;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const BORUTO_UNLOCK_KEY = "naruto-watch-program-boruto-unlocked";

const REQUIRED_MAIN_CANON_TYPES = new Set<CanonType>([
  "mangaCanon",
  "mixedCanon",
]);

const OPTIONAL_SHIPPUDEN_SLUGS = new Set([
  "itachi-shinden",
  "sasuke-shinden",
  "shikamaru-hiden",
  "kakashi-anbu-arc",
]);

const REQUIRED_SHIPPUDEN_SPECIAL_SLUGS = new Set([
  "movie-the-last",
  "konoha-hiden",
]);

const BORUTO_REQUIRED_SLUGS = new Set([
  "academy-opening-mixed",
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

function isMainTimelineStep(series: Series, step: StepWithCanon) {
  if (series === "boruto") {
    return BORUTO_REQUIRED_SLUGS.has(step.slug);
  }

  if (series === "shippuden" && REQUIRED_SHIPPUDEN_SPECIAL_SLUGS.has(step.slug)) {
    return true;
  }

  if (series === "shippuden" && OPTIONAL_SHIPPUDEN_SLUGS.has(step.slug)) {
    return false;
  }

  if (!step.canonType) {
    return false;
  }

  return REQUIRED_MAIN_CANON_TYPES.has(step.canonType);
}

const part1CanonSteps: TimelineStep[] = steps
  .filter((step) => isMainTimelineStep("naruto", step))
  .map((step) => ({
    id: `naruto:${step.slug}`,
    series: "naruto" as const,
    slug: step.slug,
  }));

const shippudenCanonSteps: TimelineStep[] = shippudenSteps
  .filter((step) => isMainTimelineStep("shippuden", step))
  .map((step) => ({
    id: `shippuden:${step.slug}`,
    series: "shippuden" as const,
    slug: step.slug,
  }));

const borutoCanonSteps: TimelineStep[] = borutoSteps
  .filter((step) => isMainTimelineStep("boruto", step))
  .map((step) => ({
    id: `boruto:${step.slug}`,
    series: "boruto" as const,
    slug: step.slug,
  }));

const mainCanonSteps = [...part1CanonSteps, ...shippudenCanonSteps];
const fullTimelineSteps = [...mainCanonSteps, ...borutoCanonSteps];

function getSequentialProgressIndex(
  completedIds: Set<string>,
  timelineSteps: TimelineStep[]
) {
  let index = 0;

  for (const step of timelineSteps) {
    if (!completedIds.has(step.id)) {
      break;
    }

    index += 1;
  }

  return index;
}

function getNarutoStage(
  mainProgressIndex: number,
  isBorutoStageActive: boolean
) {
  const part1Length = part1CanonSteps.length;
  const shippudenIndex = Math.max(0, mainProgressIndex - part1Length);

  if (mainProgressIndex === 0) {
    return {
      key: "academy",
      label: "Academy Naruto",
      src: "/naruto-timeline/academy.png",
      alt: "Academy Naruto",
      boxSize: 58,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 3) {
    return {
      key: "genin",
      label: "Genin Naruto",
      src: "/naruto-timeline/genin.png",
      alt: "Genin Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 4) {
    return {
      key: "konoha-crush",
      label: "Konoha Crush Naruto",
      src: "/naruto-timeline/konoha-crush-v3.png",
      alt: "Konoha Crush Naruto",
      boxSize: 66,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 5) {
    return {
      key: "part1-rasengan",
      label: "Part 1 Rasengan Naruto",
      src: "/naruto-timeline/rasengan-v2.png",
      alt: "Part 1 Rasengan Naruto",
      boxSize: 52,
      imageScale: "scale-75",
    };
  }

  if (mainProgressIndex < part1Length) {
    return {
      key: "sasuke-retrieval",
      label: "Sasuke Retrieval Naruto",
      src: "/naruto-timeline/sasuke-retrieval.png",
      alt: "Sasuke Retrieval Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (shippudenIndex < 2) {
    return {
      key: "early-shippuden",
      label: "Early Shippuden Naruto",
      src: "/naruto-timeline/naruto-early-shippuden-v2.png",
      alt: "Early Shippuden Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (shippudenIndex < 4) {
    return {
      key: "shippuden-rasengan",
      label: "Akatsuki / Itachi / Jiraiya Naruto",
      src: "/naruto-timeline/naruto-rasengan.png",
      alt: "Akatsuki / Itachi / Jiraiya Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (shippudenIndex < 6) {
    return {
      key: "sage-mode",
      label: "Sage Mode Naruto",
      src: "/naruto-timeline/naruto-sage-mode.png",
      alt: "Sage Mode Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (shippudenIndex < 7) {
    return {
      key: "five-kage",
      label: "Five Kage Summit Naruto",
      src: "/naruto-timeline/naruto-five-kage.png",
      alt: "Five Kage Summit Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  if (shippudenIndex < 10) {
    return {
      key: "kcm1",
      label: "KCM1 Naruto",
      src: "/naruto-timeline/naruto-kcm1.png",
      alt: "KCM1 Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  if (shippudenIndex < 15) {
    return {
      key: "mid-war-open-jacket",
      label: "Mid-War Naruto",
      src: "/naruto-timeline/naruto-mid-war-open-jacket.png",
      alt: "Mid-War Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  if (!isBorutoStageActive) {
    return {
      key: "the-last",
      label: "The Last Naruto",
      src: "/naruto-timeline/naruto-the-last.png",
      alt: "The Last Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  return {
    key: "hokage",
    label: "Hokage Naruto",
    src: "/naruto-timeline/naruto-hokage-chibi.png",
    alt: "Hokage Naruto",
    boxSize: 64,
    imageScale: "",
  };
}

export default function StoryTimeline() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [borutoUnlocked, setBorutoUnlocked] = useState(false);
  const [unlockPulse, setUnlockPulse] = useState(false);

  useEffect(() => {
    function loadProgress() {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
      setCompletedIds(new Set(saved.map((item) => item.id)));
      setBorutoUnlocked(
        window.localStorage.getItem(BORUTO_UNLOCK_KEY) === "true"
      );
    }

    loadProgress();
    window.addEventListener("naruto-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("naruto-progress-updated", loadProgress);
    };
  }, []);

  const mainProgressIndex = useMemo(() => {
    return getSequentialProgressIndex(completedIds, mainCanonSteps);
  }, [completedIds]);

  const mainStoryComplete = mainProgressIndex === mainCanonSteps.length;
  const activeTimelineSteps =
    mainStoryComplete && borutoUnlocked ? fullTimelineSteps : mainCanonSteps;

  const activeProgressIndex = useMemo(() => {
    if (!mainStoryComplete || !borutoUnlocked) {
      return mainProgressIndex;
    }

    return getSequentialProgressIndex(completedIds, fullTimelineSteps);
  }, [completedIds, mainProgressIndex, mainStoryComplete, borutoUnlocked]);

  const activePercent = useMemo(() => {
    if (activeTimelineSteps.length === 0) return 0;
    return (activeProgressIndex / activeTimelineSteps.length) * 100;
  }, [activeProgressIndex, activeTimelineSteps.length]);

  const markerPercent = useMemo(() => {
    return Math.max(1.5, Math.min(98.5, activePercent));
  }, [activePercent]);

  const mainSegmentPercent =
    mainStoryComplete && borutoUnlocked
      ? (mainCanonSteps.length / fullTimelineSteps.length) * 100
      : 100;

  const displayedMainFillPercent =
    mainStoryComplete && borutoUnlocked
      ? Math.min(activePercent, mainSegmentPercent)
      : activePercent;

  const displayedBorutoFillPercent =
    mainStoryComplete &&
    borutoUnlocked &&
    activePercent > mainSegmentPercent
      ? activePercent - mainSegmentPercent
      : 0;

  const isBorutoStageActive =
    mainStoryComplete &&
    borutoUnlocked &&
    activeProgressIndex > mainCanonSteps.length;

  const narutoStage = useMemo(() => {
    return getNarutoStage(mainProgressIndex, isBorutoStageActive);
  }, [mainProgressIndex, isBorutoStageActive]);

  function unlockBorutoPath() {
    window.localStorage.setItem(BORUTO_UNLOCK_KEY, "true");
    setBorutoUnlocked(true);
    setUnlockPulse(true);

    window.setTimeout(() => {
      setUnlockPulse(false);
    }, 1400);
  }

  function returnToMainTimeline() {
    window.localStorage.removeItem(BORUTO_UNLOCK_KEY);
    setBorutoUnlocked(false);
    setUnlockPulse(true);

    window.setTimeout(() => {
      setUnlockPulse(false);
    }, 1000);
  }

  return (
    <section id="story-timeline" className="mb-8 mt-2 scroll-mt-20">
      <div className="relative mx-auto max-w-6xl px-3 pb-8 pt-12 sm:px-4 sm:pt-10">
        <div className="pointer-events-none absolute left-0 top-2 h-28 w-36 rounded-full bg-orange-500/10 blur-3xl sm:left-8" />
        <div
          className={[
            "pointer-events-none absolute right-2 top-8 h-24 w-48 rounded-full blur-3xl transition duration-700",
            mainStoryComplete
              ? "bg-blue-500/10 opacity-100"
              : "bg-blue-500/5 opacity-40",
          ].join(" ")}
        />

        <div
          className={[
            "relative rounded-[1.75rem] border border-white/10 bg-white/[0.025] px-3 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition duration-700 sm:rounded-[2rem] sm:px-5 sm:py-8",
            unlockPulse
              ? "scale-[1.01] border-orange-300/35 shadow-[0_0_38px_rgba(249,115,22,0.18),0_18px_60px_rgba(0,0,0,0.35)]"
              : "scale-100",
          ].join(" ")}
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative">
            <div className="absolute -inset-x-2 top-1/2 h-12 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500/10 via-white/[0.03] to-blue-500/10 blur-2xl" />

            <div
              className={[
                "relative h-5 w-full overflow-hidden rounded-full border border-white/10 bg-[#1f2d45] shadow-[inset_0_1px_4px_rgba(255,255,255,0.08),0_10px_35px_rgba(0,0,0,0.35)] transition duration-700 sm:h-5",
                unlockPulse ? "scale-[1.015]" : "scale-100",
              ].join(" ")}
            />

            {mainStoryComplete && borutoUnlocked && (
              <div
                className="absolute top-0 h-5 rounded-r-full bg-blue-500/10 transition-all duration-700"
                style={{
                  left: `${mainSegmentPercent}%`,
                  width: `${100 - mainSegmentPercent}%`,
                }}
              />
            )}

            <div
              className="absolute left-0 top-0 h-5 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 shadow-[0_0_26px_rgba(249,115,22,0.62)] transition-all duration-700"
              style={{ width: `${displayedMainFillPercent}%` }}
            />

            {mainStoryComplete && borutoUnlocked && (
              <div
                className="absolute top-0 h-5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 shadow-[0_0_24px_rgba(59,130,246,0.42)] transition-all duration-700"
                style={{
                  left: `${mainSegmentPercent}%`,
                  width: `${Math.max(displayedBorutoFillPercent, 0.8)}%`,
                }}
              />
            )}

            {mainStoryComplete && !borutoUnlocked && (
              <div className="absolute right-0 top-0 h-5 w-14 rounded-full bg-gradient-to-r from-transparent via-blue-500/20 to-blue-400/40 shadow-[0_0_24px_rgba(59,130,246,0.28)]" />
            )}

            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    "rounded-full bg-white/10 shadow-[0_0_8px_rgba(255,255,255,0.08)]",
                    i % 3 === 0 ? "h-2.5 w-2.5" : "h-1.5 w-1.5",
                  ].join(" ")}
                />
              ))}
            </div>

            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-[76%] transition-all duration-700"
              style={{ left: `${markerPercent}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className={[
                    "absolute h-24 w-24 rounded-full blur-2xl transition duration-500",
                    isBorutoStageActive ? "bg-blue-500/20" : "bg-orange-500/30",
                    unlockPulse ? "scale-125 opacity-100" : "scale-100 opacity-80",
                  ].join(" ")}
                />
                <div
                  className={`absolute -left-8 top-8 h-3 w-14 rounded-full blur-md ${
                    isBorutoStageActive ? "bg-blue-400/25" : "bg-orange-400/35"
                  }`}
                />

                <div
                  className={[
                    "relative animate-bounce rounded-full transition duration-500 hover:scale-105 active:scale-95",
                    unlockPulse ? "scale-110" : "scale-100",
                  ].join(" ")}
                >
                  <div
                    style={{
                      width: `${narutoStage.boxSize}px`,
                      height: `${narutoStage.boxSize}px`,
                    }}
                    className="relative"
                  >
                    <Image
                      key={`${narutoStage.key}-${narutoStage.src}`}
                      src={narutoStage.src}
                      alt={narutoStage.alt}
                      fill
                      sizes={`${narutoStage.boxSize}px`}
                      priority
                      unoptimized
                      className={`-scale-x-100 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] ${narutoStage.imageScale}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mainStoryComplete && !borutoUnlocked && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium leading-6 text-white/60 sm:text-base">
              Main Naruto path complete. A new path is ready.
            </p>

            <button
              type="button"
              onClick={unlockBorutoPath}
              className="group relative overflow-hidden rounded-full border border-blue-400/40 bg-blue-500/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-blue-100 shadow-[0_0_28px_rgba(59,130,246,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-500/25 active:translate-y-0 active:scale-[0.98]"
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
              </span>
              <span className="relative z-10">Unlock Boruto Path</span>
            </button>
          </div>
        )}

        {mainStoryComplete && borutoUnlocked && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium leading-6 text-white/55 sm:text-base">
              Boruto is open as an optional path.
            </p>

            <button
              type="button"
              onClick={returnToMainTimeline}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white/60 transition duration-200 hover:-translate-y-0.5 hover:border-orange-400/35 hover:bg-orange-500/10 hover:text-orange-100 active:translate-y-0 active:scale-[0.98]"
            >
              Return to Main Timeline
            </button>
          </div>
        )}

        {!mainStoryComplete && (
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-medium leading-6 text-white/55 sm:text-base">
            Mark each canon arc complete in chronological order to move Naruto through the journey.
          </p>
        )}
      </div>
    </section>
  );
}
