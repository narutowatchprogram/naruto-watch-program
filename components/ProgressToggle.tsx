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
  if (typeof window === "undefined") {
    return [];
  }

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
    if (isControlled) {
      return;
    }

    function syncFromStorage() {
      const saved = readProgress();
      setInternalCompleted(saved.some((item) => item.id === id));
    }

    syncFromStorage();
    window.addEventListener(PROGRESS_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, syncFromStorage);

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      if (rippleTimerRef.current) {
        window.clearTimeout(rippleTimerRef.current);
      }

      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current);
      }
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
            {
              id,
              series,
              slug,
              title,
            },
          ]
        : saved.filter((item) => item.id !== id);

      writeProgress(next);
      setInternalCompleted(nextCompleted);
    }

    setIsAnimating(true);
    setShowRipple(true);
    setShowBurst(nextCompleted);

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    if (rippleTimerRef.current) {
      window.clearTimeout(rippleTimerRef.current);
    }

    if (burstTimerRef.current) {
      window.clearTimeout(burstTimerRef.current);
    }

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
      ? "border-green-500/35 bg-green-500/15 text-green-200 shadow-[0_0_0_1px_rgba(34,197,94,0.12),0_10px_30px_rgba(34,197,94,0.08)]"
      : "border-green-500/25 bg-green-500/5 text-green-300 hover:border-green-400/50 hover:bg-green-500/10";
  }, [isCompleted]);

  const iconClasses = useMemo(() => {
    return isCompleted
      ? "border-green-500/35 bg-green-500/20 text-green-200"
      : "border-green-500/25 bg-black/20 text-green-300 group-hover:border-green-400/50";
  }, [isCompleted]);

  const wrapperScaleClass = isAnimating ? "scale-[1.015]" : "scale-100";

  const sharedGlow = showRipple
    ? "before:opacity-100 after:opacity-100"
    : "before:opacity-0 after:opacity-0";

  const sharedButtonClass = [
    "group relative isolate overflow-hidden transition duration-200",
    "focus:outline-none focus:ring-2 focus:ring-green-500/40",
    "before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:h-16 before:w-16 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-green-400/20 before:blur-xl before:transition-opacity before:duration-300",
    "after:pointer-events-none after:absolute after:left-1/2 after:top-1/2 after:h-24 after:w-24 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-green-300/30 after:transition-all after:duration-500",
    showRipple ? "after:scale-100" : "after:scale-50",
    sharedGlow,
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

        <span
          className={[
            "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition duration-200",
            isAnimating ? "scale-110" : "scale-100",
            iconClasses,
          ].join(" ")}
        >
          <span className="relative z-10">{isCompleted ? "✓" : "+"}</span>
          {showRipple && (
            <span className="pointer-events-none absolute inset-0 rounded-full border border-green-300/35 animate-ping" />
          )}
        </span>

        <span className="relative z-10 flex flex-col">
          <span className="text-sm font-semibold">
            {isCompleted ? "Completed" : "Mark complete"}
          </span>
          <span className="text-xs text-white/75">
            {isCompleted ? "Canon progress saved" : "Advance your canon progress"}
          </span>
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

      <span className="relative z-10 flex min-w-0 items-center gap-3">
        <span
          className={[
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg transition duration-200",
            isAnimating ? "scale-110" : "scale-100",
            iconClasses,
          ].join(" ")}
        >
          <span className="relative z-10">{isCompleted ? "✓" : "+"}</span>
          {showRipple && (
            <span className="pointer-events-none absolute inset-0 rounded-full border border-green-300/35 animate-ping" />
          )}
        </span>

        <span className="flex min-w-0 flex-col text-left">
          <span className="font-semibold">
            {isCompleted ? "Completed" : "Mark complete"}
          </span>
          <span className="text-sm text-white/75">
            {isCompleted
              ? "Canon progress saved"
              : "This moves your homepage timeline forward"}
          </span>
        </span>
      </span>

      <span className="relative z-10 ml-3 shrink-0 text-sm text-white/70 transition group-hover:text-white/90">
        {isCompleted ? "Undo" : "Save"}
      </span>
    </button>
  );
}