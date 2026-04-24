"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StepCardLink from "./StepCardLink";
import ProgressSummary from "./ProgressSummary";
import ProgressToggle from "./ProgressToggle";

type CanonType =
  | "mangaCanon"
  | "animeCanon"
  | "mixedCanon"
  | "filler"
  | "movie";

type EpisodeGuideItem = {
  label: string;
  episodes: string;
  type: "mangaCanon" | "mixedCanon" | "filler";
};

type StepItem = {
  slug: string;
  title: string;
  episodes: string;
  instruction: string;
  skip: string;
  optionalLater: string;
  note: string;
  canonType?: CanonType;
  episodeGuide?: EpisodeGuideItem[];
};

type SeriesProgramPageProps = {
  series: "naruto" | "shippuden" | "boruto";
  steps: StepItem[];
  title: string;
  subtitle: string;
  accentColor: "orange" | "blue";
  nextHref?: string;
  nextLabel?: string;
  nextDescription?: string;
  introBlock?: React.ReactNode;
};

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";
const PROGRESS_EVENT = "naruto-progress-updated";

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
  "kakashi-face-reveal",
  "movie-shippuden-1",
  "early-filler-block",
  "mid-filler-block",
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
  "kakashi-face-reveal-2",
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
  "late-filler-break",
]);

const BORUTO_REQUIRED_EXCEPTIONS = new Set(["academy-opening-mixed"]);

function getCanonType(
  series: "naruto" | "shippuden" | "boruto",
  step: StepItem
): CanonType {
  if (step.canonType) return step.canonType;

  const isMovie =
    step.slug.startsWith("movie-") || step.title.startsWith("Movie:");

  if (isMovie) return "movie";
  if (series === "boruto") return "animeCanon";
  if (NON_CANON_STEP_SLUGS.has(step.slug)) return "filler";
  if (OPTIONAL_CANON_NOVEL_SLUGS.has(step.slug)) return "mixedCanon";
  if (OPTIONAL_ANIME_ORIGINAL_SLUGS.has(step.slug)) return "animeCanon";

  return "mangaCanon";
}

function isProgressCanon(
  series: "naruto" | "shippuden" | "boruto",
  step: StepItem
) {
  if (series === "boruto") {
    return (
      getCanonType(series, step) === "mangaCanon" ||
      BORUTO_REQUIRED_EXCEPTIONS.has(step.slug)
    );
  }

  if (
    series === "shippuden" &&
    (step.slug === "konoha-hiden" || step.slug === "movie-the-last")
  ) {
    return true;
  }

  const canonType = getCanonType(series, step);
  return canonType === "mangaCanon" || canonType === "mixedCanon";
}

function isMiniInterrupt(step: StepItem) {
  const title = step.title.toLowerCase();

  return (
    title.includes("filler block") ||
    title.includes("interruption") ||
    step.episodes === "271"
  );
}

function getInstructionStyle(instruction: string) {
  const value = instruction.toLowerCase();

  if (value.includes("skip")) {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  if (value.includes("must watch")) {
    return "border-green-500/40 bg-green-500/15 text-green-200";
  }

  if (value.includes("highly recommended")) {
    return "border-yellow-500/35 bg-yellow-500/15 text-yellow-200";
  }

  if (value.includes("optional")) {
    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  return "border-green-500/30 bg-green-500/10 text-green-300";
}

function getDisplayInstruction(
  series: "naruto" | "shippuden" | "boruto",
  step: StepItem
) {
  if (series === "boruto" && BORUTO_REQUIRED_EXCEPTIONS.has(step.slug)) {
    return "Must watch";
  }

  return step.instruction;
}

function getAccent(accentColor: "orange" | "blue") {
  if (accentColor === "blue") {
    return {
      text: "text-blue-300",
      softText: "text-blue-200",
      nextBg: "bg-blue-500/10",
      nextBorder: "border-blue-500/30",
      nextHover: "hover:border-blue-400/60",
      eyebrow: "Continuation",
      line: "bg-blue-400/40",
      glow: "shadow-[0_16px_60px_rgba(59,130,246,0.10)]",
      gradient:
        "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_38%)]",
    };
  }

  return {
    text: "text-orange-300",
    softText: "text-orange-100",
    nextBg: "bg-orange-500/10",
    nextBorder: "border-orange-500/30",
    nextHover: "hover:border-orange-400/60",
    eyebrow: "Naruto",
    line: "bg-orange-400/40",
    glow: "shadow-[0_16px_60px_rgba(249,115,22,0.10)]",
    gradient:
      "bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_38%)]",
  };
}

function getStepHref(
  series: "naruto" | "shippuden" | "boruto",
  slug: string
) {
  return `/${series === "naruto" ? "program" : series}/${slug}`;
}

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

function getPrimaryBadge(
  series: "naruto" | "shippuden" | "boruto",
  canonType: CanonType,
  progressCanon: boolean
) {
  if (series === "boruto") {
    switch (canonType) {
      case "mangaCanon":
        return {
          label: "Manga canon",
          className: "border-green-500/20 bg-green-500/10 text-green-300",
        };
      case "animeCanon":
        return {
          label: progressCanon ? "Required anime canon" : "Anime canon",
          className: progressCanon
            ? "border-green-500/25 bg-green-500/10 text-green-300"
            : "border-blue-500/30 bg-blue-500/10 text-blue-300",
        };
      case "mixedCanon":
        return {
          label: progressCanon ? "Required mixed canon" : "Mixed canon",
          className: progressCanon
            ? "border-green-500/25 bg-green-500/10 text-green-300"
            : "border-purple-500/30 bg-purple-500/10 text-purple-300",
        };
      case "movie":
        return {
          label: "Movie",
          className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
        };
      default:
        return {
          label: "Filler",
          className: "border-gray-700 bg-gray-800/70 text-gray-300",
        };
    }
  }

  if (progressCanon) {
    return {
      label: "Canon",
      className: "border-green-500/20 bg-green-500/10 text-green-300",
    };
  }

  switch (canonType) {
    case "animeCanon":
      return {
        label: "Anime-original",
        className: "border-purple-500/30 bg-purple-500/10 text-purple-300",
      };
    case "movie":
      return {
        label: "Movie",
        className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
      };
    default:
      return {
        label: "Filler",
        className: "border-gray-700 bg-gray-800/70 text-gray-300",
      };
  }
}

function getSecondaryBadge(
  series: "naruto" | "shippuden" | "boruto",
  canonType: CanonType,
  progressCanon: boolean
) {
  if (series === "boruto" || !progressCanon) return null;

  if (canonType === "mangaCanon") {
    return {
      label: "Manga canon",
      className: "border-gray-700 bg-gray-800/70 text-gray-300",
    };
  }

  if (canonType === "mixedCanon") {
    return {
      label: "Manga / mixed",
      className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
    };
  }

  return null;
}

function getOptionalCardClasses(
  series: "naruto" | "shippuden" | "boruto",
  canonType: CanonType
) {
  if (series === "boruto") {
    switch (canonType) {
      case "animeCanon":
        return "hover:bg-blue-500/[0.045]";
      case "mixedCanon":
        return "hover:bg-purple-500/[0.045]";
      case "movie":
        return "hover:bg-blue-500/[0.045]";
      default:
        return "hover:bg-white/[0.035]";
    }
  }

  switch (canonType) {
    case "animeCanon":
      return "hover:bg-purple-500/[0.045]";
    case "movie":
      return "hover:bg-blue-500/[0.045]";
    default:
      return "hover:bg-white/[0.035]";
  }
}

function Badge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}

function renderStandardRow({
  href,
  primaryBadge,
  secondaryBadge,
  step,
  displayInstruction,
  instructionClassName,
  extraBadges,
  rowClassName,
}: {
  href: string;
  primaryBadge: { label: string; className: string };
  secondaryBadge: { label: string; className: string } | null;
  step: StepItem;
  displayInstruction: string;
  instructionClassName: string;
  extraBadges?: React.ReactNode;
  rowClassName: string;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl px-3 py-4 transition-all duration-200 active:scale-[0.99] sm:px-4 ${rowClassName}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge label={primaryBadge.label} className={primaryBadge.className} />

            {secondaryBadge && (
              <Badge
                label={secondaryBadge.label}
                className={secondaryBadge.className}
              />
            )}

            <Badge
              label={step.episodes}
              className="border-gray-700 bg-gray-800/70 text-gray-300"
            />

            {extraBadges}
          </div>

          <h2 className="text-lg font-black leading-tight tracking-tight text-white">
            {step.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">{step.note}</p>
        </div>

        <span
          className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${instructionClassName}`}
        >
          {displayInstruction}
        </span>
      </div>
    </Link>
  );
}

export default function SeriesProgramPage({
  series,
  steps,
  title,
  subtitle,
  accentColor,
  nextHref,
  nextLabel,
  nextDescription,
  introBlock,
}: SeriesProgramPageProps) {
  const accent = getAccent(accentColor);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    function loadProgress() {
      const saved = readProgress();
      setCompletedIds(new Set(saved.map((item) => item.id)));
    }

    loadProgress();
    window.addEventListener(PROGRESS_EVENT, loadProgress);

    return () => {
      window.removeEventListener(PROGRESS_EVENT, loadProgress);
    };
  }, []);

  function handleCanonToggle(step: StepItem, nextCompleted: boolean) {
    const id = `${series}:${step.slug}`;
    const saved = readProgress();

    const next = nextCompleted
      ? [
          ...saved.filter((item) => item.id !== id),
          {
            id,
            series,
            slug: step.slug,
            title: step.title,
          },
        ]
      : saved.filter((item) => item.id !== id);

    setCompletedIds(new Set(next.map((item) => item.id)));
    writeProgress(next);
  }

  const progressSteps = useMemo(
    () => steps.filter((step) => isProgressCanon(series, step)),
    [series, steps]
  );

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 text-center">
          <p
            className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${accent.text}`}
          >
            {accent.eyebrow}
          </p>

          <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            {subtitle}
          </p>
        </section>

        {introBlock && <div className="mx-auto mb-8 max-w-3xl">{introBlock}</div>}

        <ProgressSummary series={series} totalSteps={progressSteps.length} />

        <section className="mx-auto mt-10 max-w-4xl">
          <div className="relative">
            <div
              className={`pointer-events-none absolute left-3 top-0 hidden h-full w-px ${accent.line} sm:block`}
            />

            <div className="space-y-4 sm:space-y-5">
              {steps.map((step) => {
                const href = getStepHref(series, step.slug);
                const progressId = `${series}:${step.slug}`;
                const canonType = getCanonType(series, step);
                const progressCanon = isProgressCanon(series, step);
                const primaryBadge = getPrimaryBadge(
                  series,
                  canonType,
                  progressCanon
                );
                const secondaryBadge = getSecondaryBadge(
                  series,
                  canonType,
                  progressCanon
                );
                const isCompleted = completedIds.has(progressId);
                const miniInterrupt = isMiniInterrupt(step);
                const displayInstruction = getDisplayInstruction(series, step);

                if (progressCanon) {
                  return (
                    <div key={step.slug} className="relative space-y-3 sm:pl-10">
                      <span
                        className={[
                          "absolute left-[7px] top-8 hidden h-3 w-3 rounded-full ring-4 ring-black sm:block",
                          isCompleted ? "bg-green-400" : accent.line,
                        ].join(" ")}
                      />

                      <StepCardLink
                        href={href}
                        progressId={progressId}
                        locked={false}
                      >
                        <div
                          className={[
                            "relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6",
                            isCompleted
                              ? "bg-green-500/[0.06]"
                              : "bg-white/[0.035]",
                          ].join(" ")}
                        >
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <Badge
                              label={primaryBadge.label}
                              className={primaryBadge.className}
                            />

                            {secondaryBadge && (
                              <Badge
                                label={secondaryBadge.label}
                                className={secondaryBadge.className}
                              />
                            )}

                            <Badge
                              label={step.episodes}
                              className="border-gray-700 bg-gray-800/70 text-gray-300"
                            />

                            {isCompleted && (
                              <Badge
                                label="Complete"
                                className="border-green-500/25 bg-green-500/10 text-green-300"
                              />
                            )}
                          </div>

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                                {step.title}
                              </h2>

                              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
                                {step.note}
                              </p>
                            </div>

                            <span
                              className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getInstructionStyle(
                                displayInstruction
                              )}`}
                            >
                              {displayInstruction}
                            </span>
                          </div>
                        </div>
                      </StepCardLink>

                      <div className="flex justify-end">
                        <ProgressToggle
                          series={series}
                          slug={step.slug}
                          title={step.title}
                          variant="side"
                          isCompleted={isCompleted}
                          onToggle={(nextCompleted) =>
                            handleCanonToggle(step, nextCompleted)
                          }
                        />
                      </div>
                    </div>
                  );
                }

                if (miniInterrupt) {
                  return (
                    <Link
                      key={step.slug}
                      href={href}
                      className="group block rounded-xl px-3 py-3 transition-all duration-200 hover:bg-red-500/[0.035] active:scale-[0.99] sm:ml-10 sm:px-4"
                    >
                      <div className="flex items-center justify-between gap-4 border-l border-red-500/25 pl-4">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-300">
                            {step.title}
                          </p>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {step.episodes}
                          </p>
                        </div>

                        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                          Skip
                        </span>
                      </div>
                    </Link>
                  );
                }

                if (canonType === "animeCanon") {
                  return (
                    <div key={step.slug} className="sm:ml-10">
                      {renderStandardRow({
                        href,
                        primaryBadge,
                        secondaryBadge,
                        step,
                        displayInstruction,
                        instructionClassName:
                          getInstructionStyle(displayInstruction),
                        extraBadges: (
                          <Badge
                            label="Optional"
                            className="border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                          />
                        ),
                        rowClassName: getOptionalCardClasses(series, canonType),
                      })}
                    </div>
                  );
                }

                if (series === "boruto" && canonType === "mixedCanon") {
                  return (
                    <div key={step.slug} className="sm:ml-10">
                      {renderStandardRow({
                        href,
                        primaryBadge,
                        secondaryBadge,
                        step,
                        displayInstruction,
                        instructionClassName:
                          getInstructionStyle(displayInstruction),
                        extraBadges: (
                          <Badge
                            label="Optional"
                            className="border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                          />
                        ),
                        rowClassName: getOptionalCardClasses(series, canonType),
                      })}
                    </div>
                  );
                }

                if (canonType === "movie") {
                  return (
                    <div key={step.slug} className="sm:ml-10">
                      {renderStandardRow({
                        href,
                        primaryBadge,
                        secondaryBadge,
                        step,
                        displayInstruction,
                        instructionClassName:
                          getInstructionStyle(displayInstruction),
                        rowClassName: getOptionalCardClasses(series, canonType),
                      })}
                    </div>
                  );
                }

                return (
                  <div key={step.slug} className="sm:ml-10">
                    {renderStandardRow({
                      href,
                      primaryBadge,
                      secondaryBadge,
                      step,
                      displayInstruction,
                      instructionClassName:
                        getInstructionStyle(displayInstruction),
                      rowClassName: "hover:bg-white/[0.035]",
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {nextHref && nextLabel && nextDescription && (
            <Link
              href={nextHref}
              className={`mt-12 block rounded-3xl px-6 py-6 transition-all duration-200 hover:-translate-y-0.5 ${accent.nextBg} ${accent.nextHover} ${accent.glow}`}
            >
              <p className={`mb-2 text-xs font-bold uppercase tracking-[0.22em] ${accent.text}`}>
                Next
              </p>

              <h2 className="mb-3 text-2xl font-black tracking-tight">
                {nextLabel}
              </h2>

              <p className="leading-7 text-gray-300">{nextDescription}</p>
            </Link>
          )}
        </section>
      </div>
    </main>
  );
}