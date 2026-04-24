"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";
import { borutoSteps } from "@/data/borutoSteps";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const BORUTO_UNLOCK_KEY = "naruto-watch-program-boruto-unlocked";

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

function isMainPathCanon(slug: string) {
  return (
    !NON_CANON_STEP_SLUGS.has(slug) &&
    !OPTIONAL_CANON_NOVEL_SLUGS.has(slug) &&
    !OPTIONAL_ANIME_ORIGINAL_SLUGS.has(slug)
  );
}

const part1CanonSteps = steps
  .filter((step) => isMainPathCanon(step.slug))
  .map((step) => ({
    id: `naruto:${step.slug}`,
    series: "naruto" as const,
  }));

const shippudenCanonSteps = shippudenSteps
  .filter((step) => isMainPathCanon(step.slug))
  .map((step) => ({
    id: `shippuden:${step.slug}`,
    series: "shippuden" as const,
  }));

const borutoCanonSteps = borutoSteps
  .filter((step) => isMainPathCanon(step.slug))
  .map((step) => ({
    id: `boruto:${step.slug}`,
    series: "boruto" as const,
  }));

const mainCanonSteps = [...part1CanonSteps, ...shippudenCanonSteps];
const fullCanonTimelineSteps = [...mainCanonSteps, ...borutoCanonSteps];

function getSequentialProgressIndex(
  completedIds: Set<string>,
  timelineSteps: { id: string }[]
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

  if (mainProgressIndex < 6) {
    return {
      key: "sasuke-retrieval",
      label: "Sasuke Retrieval Naruto",
      src: "/naruto-timeline/sasuke-retrieval.png",
      alt: "Sasuke Retrieval Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 7) {
    return {
      key: "early-shippuden",
      label: "Early Shippuden Naruto",
      src: "/naruto-timeline/naruto-early-shippuden-v2.png",
      alt: "Early Shippuden Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 9) {
    return {
      key: "shippuden-rasengan",
      label: "Akatsuki / Itachi / Jiraiya Naruto",
      src: "/naruto-timeline/naruto-rasengan.png",
      alt: "Akatsuki / Itachi / Jiraiya Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 11) {
    return {
      key: "sage-mode",
      label: "Sage Mode Naruto",
      src: "/naruto-timeline/naruto-sage-mode.png",
      alt: "Sage Mode Naruto",
      boxSize: 64,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 12) {
    return {
      key: "five-kage",
      label: "Five Kage Summit Naruto",
      src: "/naruto-timeline/naruto-five-kage.png",
      alt: "Five Kage Summit Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 15) {
    return {
      key: "kcm1",
      label: "KCM1 Naruto",
      src: "/naruto-timeline/naruto-kcm1.png",
      alt: "KCM1 Naruto",
      boxSize: 52,
      imageScale: "",
    };
  }

  if (mainProgressIndex < 20) {
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
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function loadProgress() {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
      setCompletedIds(new Set(saved.map((item) => item.id)));

      const unlocked =
        window.localStorage.getItem(BORUTO_UNLOCK_KEY) === "true";
      setBorutoUnlocked(unlocked);
    }

    loadProgress();
    window.addEventListener("naruto-progress-updated", loadProgress);

    return () => {
      window.removeEventListener("naruto-progress-updated", loadProgress);
    };
  }, []);

  const activeTimelineSteps = borutoUnlocked
    ? fullCanonTimelineSteps
    : mainCanonSteps;

  const mainProgressIndex = useMemo(() => {
    return getSequentialProgressIndex(completedIds, mainCanonSteps);
  }, [completedIds]);

  const fullProgressIndex = useMemo(() => {
    return getSequentialProgressIndex(completedIds, fullCanonTimelineSteps);
  }, [completedIds]);

  const mainStoryComplete = mainProgressIndex === mainCanonSteps.length;

  const activeProgressIndex = borutoUnlocked
    ? fullProgressIndex
    : mainProgressIndex;

  const activePercent = useMemo(() => {
    if (activeTimelineSteps.length === 0) return 0;
    return (activeProgressIndex / activeTimelineSteps.length) * 100;
  }, [activeProgressIndex, activeTimelineSteps.length]);

  const controlledPercent = dragPercent ?? activePercent;

  const markerPercent = useMemo(() => {
    return Math.max(1.5, Math.min(98.5, controlledPercent));
  }, [controlledPercent]);

  const previewIndex = useMemo(() => {
    if (activeTimelineSteps.length === 0) return 0;

    const rawIndex = Math.round(
      (controlledPercent / 100) * activeTimelineSteps.length
    );

    if (!borutoUnlocked) {
      return Math.max(0, Math.min(mainCanonSteps.length, rawIndex));
    }

    return Math.max(0, Math.min(activeTimelineSteps.length, rawIndex));
  }, [controlledPercent, activeTimelineSteps.length, borutoUnlocked]);

  const previewMainIndex = useMemo(() => {
    return Math.min(previewIndex, mainCanonSteps.length);
  }, [previewIndex]);

  const isBorutoStageActive =
    borutoUnlocked && previewIndex > mainCanonSteps.length;

  const narutoStage = useMemo(() => {
    return getNarutoStage(previewMainIndex, isBorutoStageActive);
  }, [previewMainIndex, isBorutoStageActive]);

  const mainSegmentPercent = borutoUnlocked
    ? (mainCanonSteps.length / fullCanonTimelineSteps.length) * 100
    : 100;

  const displayedMainFillPercent = useMemo(() => {
    if (!borutoUnlocked) {
      return controlledPercent;
    }
    return Math.min(controlledPercent, mainSegmentPercent);
  }, [borutoUnlocked, controlledPercent, mainSegmentPercent]);

  const displayedBorutoFillPercent = useMemo(() => {
    if (!borutoUnlocked) return 0;
    if (controlledPercent <= mainSegmentPercent) return 0;
    return controlledPercent - mainSegmentPercent;
  }, [borutoUnlocked, controlledPercent, mainSegmentPercent]);

  const isBorutoZone =
    borutoUnlocked && controlledPercent > mainSegmentPercent;

  const isPreviewing = dragPercent !== null;

  function getPercentFromClientX(clientX: number) {
    const timeline = timelineRef.current;
    if (!timeline) return controlledPercent;

    const rect = timeline.getBoundingClientRect();
    const nextPercent = ((clientX - rect.left) / rect.width) * 100;

    return Math.max(0, Math.min(100, nextPercent));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const nextPercent = getPercentFromClientX(e.clientX);
    setIsDragging(true);
    setDragPercent(nextPercent);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragPercent(getPercentFromClientX(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setDragPercent(getPercentFromClientX(e.clientX));
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDragPercent(Number(e.target.value));
  }

  function resetPreview() {
    setDragPercent(null);
    setIsDragging(false);
  }

  function unlockBorutoPath() {
    window.localStorage.setItem(BORUTO_UNLOCK_KEY, "true");
    setBorutoUnlocked(true);
    setDragPercent(null);
  }

  return (
    <section className="mb-8 mt-2">
      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-10">
        <div
          ref={timelineRef}
          className="relative cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="h-5 w-full overflow-hidden rounded-full border border-white/10 bg-[#1f2d45]" />

          <div
            className="absolute left-0 top-0 h-5 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 shadow-[0_0_24px_rgba(249,115,22,0.55)] transition-all duration-200"
            style={{ width: `${displayedMainFillPercent}%` }}
          />

          {borutoUnlocked && displayedBorutoFillPercent > 0 && (
            <div
              className="absolute top-0 h-5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 shadow-[0_0_24px_rgba(59,130,246,0.4)] transition-all duration-200"
              style={{
                left: `${mainSegmentPercent}%`,
                width: `${displayedBorutoFillPercent}%`,
              }}
            />
          )}

          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-white/10" />
            ))}
          </div>

          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-[72%] transition-all duration-150"
            style={{ left: `${markerPercent}%` }}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute h-20 w-20 rounded-full blur-2xl ${
                  isBorutoZone ? "bg-blue-500/20" : "bg-orange-500/25"
                }`}
              />
              <div
                className={`absolute -left-8 top-8 h-3 w-12 rounded-full blur-md ${
                  isBorutoZone ? "bg-blue-400/25" : "bg-orange-400/30"
                }`}
              />

              <div className="relative animate-bounce">
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

        <div
          className={[
            "mt-8 rounded-2xl border p-5 transition duration-300",
            mainStoryComplete && !borutoUnlocked
              ? "border-orange-400/20 bg-orange-500/[0.08] shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_14px_40px_rgba(249,115,22,0.10)]"
              : "border-white/10 bg-white/[0.02]",
          ].join(" ")}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              {mainStoryComplete && !borutoUnlocked && (
                <>
                  <span className="pointer-events-none absolute -left-2 -top-2 h-16 w-16 rounded-full bg-orange-400/10 blur-2xl" />
                  <span className="pointer-events-none absolute left-6 top-1 h-10 w-10 rounded-full border border-orange-300/25 animate-ping" />
                </>
              )}

              <p className="relative text-base font-medium text-white">
                {isPreviewing
                  ? "Preview mode is active. Drag or use the slider to test the full Naruto timeline."
                  : !borutoUnlocked
                    ? "Mark each canon arc complete to move Naruto through Part 1 and Shippuden."
                    : "The main story is complete. Boruto is now unlocked as an extra path."}
              </p>

              <p className="relative mt-1 text-sm text-gray-500">
                {isPreviewing
                  ? `${narutoStage.label} • preview checkpoint ${previewIndex} of ${activeTimelineSteps.length}`
                  : !borutoUnlocked
                    ? "Boruto stays hidden until you finish the main Naruto watch program."
                    : "Keep going only if you want the continuation."}
              </p>
            </div>

            {isPreviewing && (
              <button
                type="button"
                onClick={resetPreview}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Reset preview
              </button>
            )}
          </div>

          <div className="mt-5">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={controlledPercent}
              onChange={handleSliderChange}
              className="w-full cursor-pointer accent-orange-400"
            />
          </div>
        </div>

        {mainStoryComplete && !borutoUnlocked && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={unlockBorutoPath}
              className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border border-orange-400/30 bg-orange-500/10 px-6 py-3 text-sm font-semibold text-orange-100 transition hover:border-orange-300/40 hover:bg-orange-500/15 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_14px_40px_rgba(249,115,22,0.18)]"
            >
              <span className="pointer-events-none absolute inset-0 opacity-100">
                <span className="absolute inset-0 rounded-full border border-orange-300/20 animate-pulse" />
                <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/10 blur-2xl" />
                <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
              </span>

              <span className="relative z-10 flex items-center gap-2">
                <span className="transition-transform duration-300 group-hover:scale-105">
                  Unlock Boruto path
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}