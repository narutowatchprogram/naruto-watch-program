"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { storyCheckpoints } from "@/data/storyCheckpoints";

type Props = {
  arcId: string;
  accentColor: "orange" | "blue";
};

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const PROGRESS_EVENT = "naruto-progress-updated";

function getAccent(accentColor: "orange" | "blue") {
  if (accentColor === "blue") {
    return {
      text: "text-blue-300",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      dot: "bg-blue-300",
      glow: "shadow-[0_0_28px_rgba(59,130,246,0.16)]",
      ring: "ring-blue-400/20",
      wash: "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_34%)]",
    };
  }

  return {
    text: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    dot: "bg-orange-300",
    glow: "shadow-[0_0_28px_rgba(249,115,22,0.16)]",
    ring: "ring-orange-400/20",
    wash: "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_34%)]",
  };
}

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

export default function StoryCheckpoint({ arcId, accentColor }: Props) {
  const checkpoint = storyCheckpoints.find((item) => item.arcId === arcId);
  const accent = getAccent(accentColor);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [seed, setSeed] = useState(() => Math.random());
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const wasUnlockedRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function syncUnlockedState() {
      const savedProgress = readProgress();
      const nextUnlocked = savedProgress.some((item) => item.slug === arcId);

      setIsUnlocked(nextUnlocked);

      if (nextUnlocked && !wasUnlockedRef.current) {
        setJustUnlocked(true);

        if (unlockTimerRef.current) {
          window.clearTimeout(unlockTimerRef.current);
        }

        unlockTimerRef.current = window.setTimeout(() => {
          setJustUnlocked(false);
        }, 1200);
      }

      wasUnlockedRef.current = nextUnlocked;
    }

    syncUnlockedState();
    window.addEventListener(PROGRESS_EVENT, syncUnlockedState);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, syncUnlockedState);

      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, [arcId]);

  const prompts = useMemo(() => {
    if (!checkpoint) return [];

    return [...checkpoint.prompts].sort(() => 0.5 - seed).slice(0, 3);
  }, [checkpoint, seed]);

  if (!checkpoint) return null;

  function handlePromptClick(prompt: string) {
    setActivePrompt((currentPrompt) =>
      currentPrompt === prompt ? null : prompt
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/90 p-4 transition duration-300 sm:rounded-[2rem] sm:p-6",
        "shadow-[0_16px_60px_rgba(0,0,0,0.28)]",
        accent.wash,
        justUnlocked ? `${accent.glow} ring-1 ${accent.ring}` : "",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {justUnlocked && (
        <span className="pointer-events-none absolute inset-0 opacity-100">
          <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md animate-[checkpointSweep_900ms_ease-out_forwards]" />
        </span>
      )}

      <div className="relative z-10 mb-5 flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${accent.dot} shadow-[0_0_16px_currentColor]`}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
          Story checkpoint
        </p>
      </div>

      {!isUnlocked ? (
        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Finish the arc to open this checkpoint
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
            Mark complete to save your progress, move Naruto forward, and open
            the arc discussion prompts.
          </p>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Questions worth thinking about
              </h2>

              {justUnlocked && (
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${accent.border} ${accent.bg} ${accent.text}`}
                >
                  Unlocked
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Matched to your current point in the story.
            </p>
          </div>

          <div className="grid gap-3">
            {prompts.map((item, index) => {
              const isActive = activePrompt === item.prompt;

              return (
                <div
                  key={item.prompt}
                  className={
                    justUnlocked
                      ? "animate-[checkpointCardIn_420ms_ease-out_both]"
                      : ""
                  }
                  style={{
                    animationDelay: justUnlocked
                      ? `${index * 90}ms`
                      : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handlePromptClick(item.prompt)}
                    className={[
                      `relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left text-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.03] sm:text-base ${accent.border} ${accent.bg}`,
                      "before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
                      isActive
                        ? "border-white/25 bg-white/[0.04] shadow-[0_0_24px_rgba(255,255,255,0.05)]"
                        : "",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{item.prompt}</span>
                  </button>

                  {isActive && (
                    <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm leading-7 text-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:text-base sm:leading-8">
                      {item.response}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setSeed(Math.random());
              setActivePrompt(null);
            }}
            className="mt-5 text-sm text-gray-400 transition hover:text-white active:scale-[0.98]"
          >
            ↻ New prompts
          </button>
        </div>
      )}
    </div>
  );
}