"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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

type ProgressToggleProps = {
  series: Series;
  slug: string;
  title: string;
  variant?: "default" | "side";
  isCompleted?: boolean;
  onToggle?: (nextCompleted: boolean) => void;
};

type CanonType =
  | "mangaCanon"
  | "animeCanon"
  | "mixedCanon"
  | "filler"
  | "movie";

type TimelineStep = {
  id: string;
  series: Series;
  slug: string;
};

type StepWithCanon = {
  slug: string;
  canonType?: CanonType;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const PROGRESS_EVENT = "naruto-progress-updated";

const REQUIRED_CANON_TYPES = new Set<CanonType>(["mangaCanon", "mixedCanon"]);
const REQUIRED_SHIPPUDEN_MOVIE_SLUGS = new Set(["movie-the-last"]);
const BORUTO_HOKAGE_UNLOCK_SLUG = "academy-opening-mixed";

function isRequiredMainTimelineStep(series: Series, step: StepWithCanon) {
  if (series === "boruto") {
    return step.slug === BORUTO_HOKAGE_UNLOCK_SLUG;
  }

  if (
    series === "shippuden" &&
    REQUIRED_SHIPPUDEN_MOVIE_SLUGS.has(step.slug)
  ) {
    return true;
  }

  return step.canonType ? REQUIRED_CANON_TYPES.has(step.canonType) : false;
}

const mainTimelineSteps: TimelineStep[] = [
  ...steps
    .filter((step) => isRequiredMainTimelineStep("naruto", step))
    .map((step) => ({
      id: `naruto:${step.slug}`,
      series: "naruto" as const,
      slug: step.slug,
    })),
  ...shippudenSteps
    .filter((step) => isRequiredMainTimelineStep("shippuden", step))
    .map((step) => ({
      id: `shippuden:${step.slug}`,
      series: "shippuden" as const,
      slug: step.slug,
    })),
];

const borutoHokageStep = borutoSteps.find(
  (step) => step.slug === BORUTO_HOKAGE_UNLOCK_SLUG
);

const rewardTimelineSteps: TimelineStep[] = borutoHokageStep
  ? [
      ...mainTimelineSteps,
      {
        id: `boruto:${borutoHokageStep.slug}`,
        series: "boruto" as const,
        slug: borutoHokageStep.slug,
      },
    ]
  : mainTimelineSteps;

function readProgress(): SavedProgressItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeProgress(items: SavedProgressItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

function getSequentialProgressIndex(completedIds: Set<string>) {
  let index = 0;

  for (const step of rewardTimelineSteps) {
    if (!completedIds.has(step.id)) break;
    index += 1;
  }

  return index;
}

function getStageReward(progressIndex: number) {
  if (progressIndex === 1) {
    return "Naruto started the journey on the homepage!";
  }

  if (progressIndex === 3) {
    return "Genin Naruto moved forward on the homepage!";
  }

  if (progressIndex === 4) {
    return "Naruto reached the Konoha Crush stage on the homepage!";
  }

  if (progressIndex === 5) {
    return "Naruto unlocked Rasengan on the homepage!";
  }

  if (progressIndex === 6) {
    return "Naruto reached the Sasuke Retrieval stage on the homepage!";
  }

  if (progressIndex === 7) {
    return "Shippuden Naruto is now on the homepage!";
  }

  if (progressIndex === 9) {
    return "Naruto powered up for the Akatsuki era on the homepage!";
  }

  if (progressIndex === 11) {
    return "Naruto unlocked Sage Mode on the homepage!";
  }

  if (progressIndex === 12) {
    return "Naruto reached the Five Kage Summit stage on the homepage!";
  }

  if (progressIndex === 15) {
    return "Naruto unlocked KCM on the homepage!";
  }

  if (progressIndex === 20) {
    return "War Arc Naruto is now on the homepage!";
  }

  if (progressIndex === mainTimelineSteps.length) {
    return "The main Naruto path is complete. A new path is ready on the homepage!";
  }

  if (progressIndex === rewardTimelineSteps.length && borutoHokageStep) {
    return "Hokage Naruto is now on the homepage!";
  }

  return "Naruto moved forward on the homepage!";
}

function isTimelineCompletion(id: string, progressBefore: SavedProgressItem[]) {
  const completedIds = new Set(progressBefore.map((item) => item.id));
  const nextExpectedStep =
    rewardTimelineSteps[getSequentialProgressIndex(completedIds)];

  return nextExpectedStep?.id === id;
}

function getProgressAfterCompletion(
  id: string,
  series: Series,
  slug: string,
  title: string,
  progressBefore: SavedProgressItem[]
) {
  const nextProgress = [
    ...progressBefore.filter((item) => item.id !== id),
    { id, series, slug, title },
  ];

  return getSequentialProgressIndex(
    new Set(nextProgress.map((item) => item.id))
  );
}

export default function ProgressToggle({
  series,
  slug,
  title,
  variant = "default",
  isCompleted: controlledCompleted,
  onToggle,
}: ProgressToggleProps) {
  const id = `${series}:${slug}`;
  const isControlled =
    typeof controlledCompleted === "boolean" && typeof onToggle === "function";

  const [internalCompleted, setInternalCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");

  const resetTimerRef = useRef<number | null>(null);
  const rippleTimerRef = useRef<number | null>(null);
  const burstTimerRef = useRef<number | null>(null);
  const rewardTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isControlled) return;

    function syncFromStorage() {
      const saved = readProgress();
      setInternalCompleted(saved.some((item) => item.id === id));
    }

    syncFromStorage();
    window.addEventListener(PROGRESS_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, syncFromStorage);
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
      if (rippleTimerRef.current) window.clearTimeout(rippleTimerRef.current);
      if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
      if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
    };
  }, [id, isControlled]);

  const isCompleted = isControlled ? controlledCompleted : internalCompleted;

  function triggerReward(message: string) {
    setRewardMessage(message);

    if (rewardTimerRef.current) {
      window.clearTimeout(rewardTimerRef.current);
    }

    rewardTimerRef.current = window.setTimeout(() => {
      setRewardMessage("");
    }, 5200);
  }

  function handleToggle() {
    const nextCompleted = !isCompleted;
    const savedBefore = readProgress();
    const advancesTimeline =
      nextCompleted && isTimelineCompletion(id, savedBefore);

    if (advancesTimeline) {
      const progressAfter = getProgressAfterCompletion(
        id,
        series,
        slug,
        title,
        savedBefore
      );

      triggerReward(getStageReward(progressAfter));
    }

    if (isControlled) {
      onToggle(nextCompleted);
    } else {
      const next = nextCompleted
        ? [
            ...savedBefore.filter((item) => item.id !== id),
            { id, series, slug, title },
          ]
        : savedBefore.filter((item) => item.id !== id);

      writeProgress(next);
      setInternalCompleted(nextCompleted);
    }

    setIsAnimating(true);
    setShowRipple(true);
    setShowBurst(nextCompleted);

    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    if (rippleTimerRef.current) window.clearTimeout(rippleTimerRef.current);
    if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);

    resetTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, 550);

    rippleTimerRef.current = window.setTimeout(() => {
      setShowRipple(false);
    }, 700);

    burstTimerRef.current = window.setTimeout(() => {
      setShowBurst(false);
    }, 650);
  }

  const buttonClasses = useMemo(() => {
    return isCompleted
      ? "border-green-500/35 bg-green-500/15 text-green-200 shadow-[0_0_0_1px_rgba(34,197,94,0.12),0_10px_30px_rgba(34,197,94,0.08),0_0_36px_rgba(34,197,94,0.08)]"
      : "border-green-500/25 bg-green-500/5 text-green-300 hover:border-green-400/50 hover:bg-green-500/10 hover:shadow-[0_0_28px_rgba(34,197,94,0.1)]";
  }, [isCompleted]);

  const iconClasses = useMemo(() => {
    return isCompleted
      ? "border-green-500/35 bg-green-500/20 text-green-200 shadow-[0_0_18px_rgba(34,197,94,0.18)]"
      : "border-green-500/25 bg-black/20 text-green-300 group-hover:border-green-400/50";
  }, [isCompleted]);

  const wrapperScaleClass = isAnimating ? "scale-[1.02]" : "scale-100";

  const sharedButtonClass = [
    "group relative isolate overflow-hidden transition duration-200",
    "focus:outline-none focus:ring-2 focus:ring-green-500/40",
    "before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-green-300/45 before:to-transparent before:opacity-0 before:transition before:duration-300",
    "hover:before:opacity-100",
    wrapperScaleClass,
    buttonClasses,
  ].join(" ");

  const burstNodes = showBurst ? (
    <>
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-12 -translate-x-1/2 -translate-y-1/2 rotate-0 rounded-full bg-green-300/35 animate-ping" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-12 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-green-300/30 animate-ping" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-12 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-green-300/25 animate-ping" />
    </>
  ) : null;

  const primaryText = isCompleted ? "Completed" : "Mark complete";
  const secondaryText = isCompleted
    ? "Progress saved"
    : "Move Naruto forward";

  const rewardToast = rewardMessage ? (
    <div className="fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4 sm:bottom-8">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-orange-400/40 bg-black/90 px-4 py-3 text-center text-sm font-semibold text-orange-100 shadow-[0_0_32px_rgba(249,115,22,0.32),0_18px_60px_rgba(0,0,0,0.6)] backdrop-blur-md animate-[checkpointCardIn_420ms_ease-out_both] sm:px-5 sm:py-4 sm:text-base">
        <span className="pointer-events-none absolute inset-0 bg-orange-500/15" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md animate-[chakraSweep_900ms_ease-out_forwards]" />

        <div className="relative z-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:text-left">
          <span>{rewardMessage}</span>

          <Link
            href="/"
            className="pointer-events-auto rounded-full border border-orange-300/35 bg-orange-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-100 transition hover:border-orange-200 hover:bg-orange-400/25 active:scale-[0.98]"
          >
            View homepage
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  if (variant === "side") {
    return (
      <>
        <div>
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isCompleted}
            className={[
              sharedButtonClass,
              "inline-flex items-center gap-3 rounded-full px-4 py-3 text-left",
            ].join(" ")}
          >
            {burstNodes}

            {showRipple && (
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_42%)]" />
            )}

            <span
              className={[
                "relative flex h-10 w-10 items-center justify-center rounded-full border text-lg transition duration-200",
                isAnimating ? "scale-110" : "scale-100",
                iconClasses,
              ].join(" ")}
            >
              <span>{isCompleted ? "✓" : "+"}</span>
            </span>

            <span className="relative z-10 flex flex-col">
              <span className="text-sm font-semibold">{primaryText}</span>
              <span className="text-xs text-white/75">{secondaryText}</span>
            </span>
          </button>
        </div>

        {rewardToast}
      </>
    );
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isCompleted}
          className={[
            sharedButtonClass,
            "flex w-full items-center justify-between rounded-2xl px-4 py-4 sm:px-5",
          ].join(" ")}
        >
          {burstNodes}

          {showRipple && (
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_42%)]" />
          )}

          <span className="relative z-10 flex items-center gap-3">
            <span
              className={[
                "relative flex h-11 w-11 items-center justify-center rounded-full border text-lg transition duration-200",
                isAnimating ? "scale-110" : "scale-100",
                iconClasses,
              ].join(" ")}
            >
              <span>{isCompleted ? "✓" : "+"}</span>
            </span>

            <span className="flex flex-col text-left">
              <span className="font-semibold">{primaryText}</span>
              <span className="text-sm text-white/75">{secondaryText}</span>
            </span>
          </span>

          <span className="relative z-10 text-sm text-white/70">
            {isCompleted ? "Undo" : "Save"}
          </span>
        </button>
      </div>

      {rewardToast}
    </>
  );
}