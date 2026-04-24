"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
};

type ProgressToggleProps = {
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
  variant?: "default" | "side";
  isCompleted?: boolean;
  onToggle?: (nextCompleted: boolean) => void;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const PROGRESS_EVENT = "naruto-progress-updated";

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

  const resetTimerRef = useRef<number | null>(null);
  const rippleTimerRef = useRef<number | null>(null);
  const burstTimerRef = useRef<number | null>(null);

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
    };
  }, [id, isControlled]);

  const isCompleted = isControlled ? controlledCompleted : internalCompleted;

  function handleToggle() {
    const nextCompleted = !isCompleted;

    if (isControlled) {
      onToggle(nextCompleted);
    } else {
      const saved = readProgress();
      const next = nextCompleted
        ? [
            ...saved.filter((item) => item.id !== id),
            { id, series, slug, title },
          ]
        : saved.filter((item) => item.id !== id);

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

  if (variant === "side") {
    return (
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
    );
  }

  return (
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
  );
}