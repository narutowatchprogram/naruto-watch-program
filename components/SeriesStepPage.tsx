"use client";

import Link from "next/link";
import ProgressToggle from "./ProgressToggle";
import StoryCheckpoint from "./StoryCheckpoints";

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
  overview: string;
  whyItMatters: string;
  prompt: string;
  watchNotes: string;
  canonType?: CanonType;
  episodeGuide?: EpisodeGuideItem[];
};

type SeriesStepPageProps = {
  series: "naruto" | "shippuden" | "boruto";
  backHref: string;
  backLabel: string;
  step: StepItem | undefined;
  steps?: StepItem[];
  accentColor: "orange" | "blue";
};

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
      step.slug === "academy-opening-mixed" ||
      getCanonType(series, step) === "mangaCanon"
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
          label: "Anime canon",
          className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
        };
      case "mixedCanon":
        return {
          label: "Mixed canon",
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

function getEpisodeGuideStyle(type: EpisodeGuideItem["type"]) {
  switch (type) {
    case "mangaCanon":
      return "border-green-500/20 bg-green-500/10 text-green-300";
    case "mixedCanon":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300";
    default:
      return "border-red-500/20 bg-red-500/10 text-red-300";
  }
}

function getEpisodeGuideLabel(type: EpisodeGuideItem["type"]) {
  switch (type) {
    case "mangaCanon":
      return "Manga canon";
    case "mixedCanon":
      return "Mixed Canon — Must Watch";
    default:
      return "Skip";
  }
}

function getStepHref(
  series: "naruto" | "shippuden" | "boruto",
  slug: string
) {
  return `/${series === "naruto" ? "program" : series}/${slug}`;
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasContent(value: string) {
  return normalizeText(value).length > 0 && normalizeText(value) !== "none";
}

function similarityScore(a: string, b: string) {
  const normalizedA = normalizeText(a);
  const normalizedB = normalizeText(b);

  if (!normalizedA || !normalizedB) return 0;
  if (normalizedA === normalizedB) return 1;

  if (normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA)) {
    return 0.92;
  }

  const wordsA = new Set(normalizedA.split(" "));
  const wordsB = new Set(normalizedB.split(" "));
  const intersection = [...wordsA].filter((word) => wordsB.has(word)).length;
  const union = new Set([...wordsA, ...wordsB]).size;

  if (union === 0) return 0;

  return intersection / union;
}

function isTooSimilar(a: string, b: string) {
  return similarityScore(a, b) >= 0.38;
}

function getAccent(accentColor: "orange" | "blue") {
  if (accentColor === "blue") {
    return {
      text: "text-blue-300",
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      glow: "shadow-[0_0_0_1px_rgba(59,130,246,0.14)]",
      link: "text-blue-400 hover:text-blue-300",
      gradient:
        "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%)]",
      dot: "bg-blue-300",
      timeline: "border-blue-500/25",
      cardGlow: "shadow-[0_12px_40px_rgba(59,130,246,0.08)]",
      swipeGlow:
        "group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_14px_40px_rgba(59,130,246,0.14)]",
    };
  }

  return {
    text: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    glow: "shadow-[0_0_0_1px_rgba(249,115,22,0.14)]",
    link: "text-orange-400 hover:text-orange-300",
    gradient:
      "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_35%)]",
    dot: "bg-orange-300",
    timeline: "border-orange-500/25",
    cardGlow: "shadow-[0_12px_40px_rgba(249,115,22,0.08)]",
    swipeGlow:
      "group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_14px_40px_rgba(249,115,22,0.14)]",
  };
}

function getSectionCardClass(accent: ReturnType<typeof getAccent>) {
  return `rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-zinc-950/90 p-4 sm:p-6 ${accent.cardGlow}`;
}

export default function SeriesStepPage({
  series,
  backHref,
  backLabel,
  step,
  steps = [],
  accentColor,
}: SeriesStepPageProps) {
  const accent = getAccent(accentColor);

  if (!step) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Arc not found</h1>
          <Link href={backHref} className={`underline ${accent.link}`}>
            {backLabel}
          </Link>
        </div>
      </main>
    );
  }

  const canonType = getCanonType(series, step);
  const progressCanon = isProgressCanon(series, step);
  const primaryBadge = getPrimaryBadge(series, canonType, progressCanon);
  const secondaryBadge = getSecondaryBadge(series, canonType, progressCanon);
  const showStoryCheckpoint =
    progressCanon || canonType === "animeCanon" || canonType === "movie";

  const currentIndex = steps.findIndex((item) => item.slug === step.slug);
  const nextMainPathCanon =
    currentIndex >= 0
      ? steps
          .slice(currentIndex + 1)
          .find((item) => isProgressCanon(series, item))
      : undefined;

  const note = hasContent(step.note) ? step.note : "";
  const overview = hasContent(step.overview) ? step.overview : "";
  const whyItMatters = hasContent(step.whyItMatters) ? step.whyItMatters : "";
  const watchNotes = hasContent(step.watchNotes) ? step.watchNotes : "";

  const explanatoryCandidates = [note, overview, whyItMatters].filter(Boolean);
  const heroText = explanatoryCandidates[0] ?? "";

  const bodySections = explanatoryCandidates
    .slice(1)
    .filter((value, index, arr) => {
      if (!value) return false;
      if (heroText && isTooSimilar(value, heroText)) return false;

      const earlier = arr.slice(0, index);
      return !earlier.some((item) => isTooSimilar(item, value));
    });

  const primaryBody = bodySections[0] ?? "";
  const secondaryBody = bodySections[1] ?? "";

  const distinctWatchNotes =
    watchNotes &&
    !isTooSimilar(watchNotes, heroText) &&
    !isTooSimilar(watchNotes, primaryBody) &&
    !isTooSimilar(watchNotes, secondaryBody)
      ? watchNotes
      : "";

  const showSkip = step.skip !== "None";
  const showOptionalLater = step.optionalLater !== "None";
  const hasWatchMeta = showSkip || showOptionalLater;
  const showWhileWatching = Boolean(distinctWatchNotes || hasWatchMeta);

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href={backHref}
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition duration-200 hover:text-white"
        >
          <span>←</span>
          <span>{backLabel}</span>
        </Link>

        <section
          className={`overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-white/10 bg-zinc-950 ${accent.gradient} ${accent.glow} ${accent.cardGlow}`}
        >
          <div className="grid gap-4 px-4 py-5 sm:gap-8 sm:px-8 sm:py-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${primaryBadge.className}`}
                  >
                    {primaryBadge.label}
                  </span>

                  {secondaryBadge && (
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${secondaryBadge.className}`}
                    >
                      {secondaryBadge.label}
                    </span>
                  )}

                  <span className="rounded-full border border-gray-700 bg-gray-800/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-300 sm:text-xs">
                    {step.episodes}
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-bold leading-[0.95] tracking-tight sm:text-5xl xl:text-6xl">
                  {step.title}
                </h1>

                {heroText && (
                  <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300 sm:text-xl sm:leading-8">
                    {heroText}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 xl:content-start">
              <div
                className={`rounded-[1.25rem] border px-4 py-4 sm:rounded-[1.75rem] sm:px-5 sm:py-5 ${accent.border} ${accent.bg}`}
              >
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${accent.text}`}
                >
                  What to do
                </p>
                <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  {step.instruction}
                </p>
              </div>

              {progressCanon && (
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-1 sm:rounded-[1.75rem]">
                  <ProgressToggle
                    series={series}
                    slug={step.slug}
                    title={step.title}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 sm:mt-8 sm:gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5 sm:space-y-6">
            {(primaryBody || secondaryBody || showWhileWatching) && (
              <div className={getSectionCardClass(accent)}>
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
                    Watch path
                  </p>
                </div>

                <div
                  className={`space-y-5 border-l pl-4 sm:space-y-6 sm:pl-5 ${accent.timeline}`}
                >
                  {primaryBody && (
                    <div className="relative">
                      <span
                        className={`absolute -left-[24px] top-2 h-3 w-3 rounded-full border border-black sm:-left-[29px] ${accent.dot}`}
                      />
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${accent.text}`}
                      >
                        Before you watch
                      </p>
                      <p className="mt-2 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                        {primaryBody}
                      </p>
                    </div>
                  )}

                  {secondaryBody && (
                    <div className="relative">
                      <span
                        className={`absolute -left-[24px] top-2 h-3 w-3 rounded-full border border-black sm:-left-[29px] ${accent.dot}`}
                      />
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${accent.text}`}
                      >
                        Why it matters
                      </p>
                      <p className="mt-2 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                        {secondaryBody}
                      </p>
                    </div>
                  )}

                  {showWhileWatching && (
                    <div className="relative">
                      <span
                        className={`absolute -left-[24px] top-2 h-3 w-3 rounded-full border border-black sm:-left-[29px] ${accent.dot}`}
                      />
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${accent.text}`}
                      >
                        While watching
                      </p>

                      {distinctWatchNotes && (
                        <p className="mt-2 text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                          {distinctWatchNotes}
                        </p>
                      )}

                      {hasWatchMeta && (
                        <div className="mt-4 grid gap-3">
                          {showSkip && (
                            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
                                Skip
                              </p>
                              <p className="mt-1 text-sm leading-6 text-gray-200">
                                {step.skip}
                              </p>
                            </div>
                          )}

                          {showOptionalLater && (
                            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.05] px-4 py-3">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                                Optional later
                              </p>
                              <p className="mt-1 text-sm leading-6 text-gray-200">
                                {step.optionalLater}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={getSectionCardClass(accent)}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
                  Arc energy
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div
                  className={`rounded-2xl border px-4 py-4 ${accent.border} ${accent.bg}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    Type
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                    {primaryBadge.label}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    Episodes
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                    {step.episodes}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    Route
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                    {progressCanon
                      ? "Counts toward progress"
                      : canonType === "animeCanon"
                        ? "Optional"
                        : canonType === "movie"
                          ? "Optional"
                          : "Skip on first run"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {step.episodeGuide && step.episodeGuide.length > 0 && (
              <div className={getSectionCardClass(accent)}>
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-sm">
                    Episode breakdown
                  </p>
                </div>

                <div className="grid gap-3">
                  {step.episodeGuide.map((item) => (
                    <div
                      key={`${item.label}-${item.episodes}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 transition duration-200 hover:border-white/15 hover:bg-white/[0.03] sm:p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide sm:text-[10px] ${getEpisodeGuideStyle(
                            item.type
                          )}`}
                        >
                          {getEpisodeGuideLabel(item.type)}
                        </span>

                        <span className="rounded-full border border-gray-700 bg-gray-800/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-gray-300 sm:text-[10px]">
                          {item.episodes}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {showStoryCheckpoint && (
          <section className="mt-5 sm:mt-6">
            <StoryCheckpoint arcId={step.slug} accentColor={accentColor} />
          </section>
        )}

        {nextMainPathCanon && (
          <section className="mt-5 sm:mt-6">
            <Link
              href={getStepHref(series, nextMainPathCanon.slug)}
              className={`group relative isolate flex items-center justify-between overflow-hidden rounded-[1.25rem] border px-4 py-4 transition duration-300 sm:rounded-[1.75rem] sm:px-5 sm:py-5 ${accent.border} ${accent.bg} ${accent.glow} ${accent.swipeGlow}`}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
              </span>

              <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="absolute inset-0 rounded-[inherit] border border-white/15" />
              </span>

              <div className="relative z-10 min-w-0">
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs ${accent.text}`}
                >
                  Next canon arc
                </p>
                <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  {nextMainPathCanon.title}
                </p>
              </div>

              <span className="relative z-10 ml-4 flex shrink-0 items-center gap-2 text-sm font-semibold text-white">
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Continue
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}