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

type NarutoStep = {
  slug: string;
  title: string;
  episodes: string;
  canonType: CanonType;
  instruction: string;
  skip: string;
  optionalLater: string;
  note: string;
  overview: string;
  whyItMatters: string;
  prompt: string;
  watchNotes: string;
  episodeGuide?: EpisodeGuideItem[];
};

export const steps: NarutoStep[] = [
  {
    slug: "land-of-waves",
    title: "Land of Waves",
    episodes: "1–19",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    optionalLater: "None",
    note: "Mixed canon — anime adds small moments throughout.",
    overview:
      "This arc introduces the real tone of the series. It is not just about ninja missions. It is about what strength means, what people protect, and what kind of world these characters live in.",
    whyItMatters:
      "Naruto, Sasuke, and Kakashi are all defined here. The emotional weight, the danger, and the core values of the series show up immediately.",
    prompt: "Who impacted you more here: Zabuza or Haku, and why?",
    watchNotes:
      "Watch straight through. This is mixed canon, but nothing here should be skipped.",
    episodeGuide: [
      {
        label: "Main manga-canon introduction to Team 7.",
        episodes: "1–6",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "7",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "8",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "9",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "10–13",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon stretch. Must watch.",
        episodes: "14–16",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "17",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon ending stretch. Must watch.",
        episodes: "18–19",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "chunin-exams",
    title: "Chunin Exams",
    episodes: "20–67",
    canonType: "mixedCanon",
    instruction: "Watch all (skip 26)",
    skip: "26",
    optionalLater: "None",
    note: "Mixed canon — contains anime-added stretches.",
    overview:
      "The story expands far beyond Team 7 here. You meet rival ninja, other villages, and a much bigger competitive world.",
    whyItMatters:
      "A huge part of Naruto’s cast, worldbuilding, and future dynamics starts here.",
    prompt: "Which character, team, or matchup stood out the most to you here?",
    watchNotes:
      "Skip episode 26 only. Everything else stays — mixed canon is still important.",
    episodeGuide: [
      {
        label: "Mixed-canon entry into the Chunin Exams. Must watch.",
        episodes: "20–21",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "22",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "23–24",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "25",
        type: "mangaCanon",
      },
      {
        label: "Full filler episode. Skip it.",
        episodes: "26",
        type: "filler",
      },
      {
        label: "Mixed-canon Forest of Death entry. Must watch.",
        episodes: "27–30",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "31–36",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon preliminaries setup. Must watch.",
        episodes: "37–41",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "42",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon preliminaries continuation. Must watch.",
        episodes: "43–47",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "48",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "49",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "50–51",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition stretch. Must watch.",
        episodes: "52–60",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "61–62",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "63",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "64–65",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition episode. Must watch.",
        episodes: "66",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon ending to this run.",
        episodes: "67",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "konoha-crush",
    title: "Konoha Crush",
    episodes: "68–80",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    optionalLater: "None",
    note: "Mixed canon — blends anime additions into core events.",
    overview:
      "The tone shifts here. Competition gives way to real danger and consequences.",
    whyItMatters:
      "This arc pushes the world into a more serious phase.",
    prompt: "Did this arc change how you saw the Leaf and the world around it?",
    watchNotes: "Watch straight through.",
    episodeGuide: [
      {
        label: "Main manga-canon opening to the invasion.",
        episodes: "68",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "69–72",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon escalation.",
        episodes: "73",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition episodes. Must watch.",
        episodes: "74",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation through the end of the arc.",
        episodes: "75–80",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "search-for-tsunade",
    title: "Search for Tsunade",
    episodes: "81–100",
    canonType: "mixedCanon",
    instruction: "Watch 81–96, skip 97, then watch 98–100",
    skip: "97",
    optionalLater: "97",
    note: "Mixed canon — slower but important transition arc.",
    overview:
      "The story deals with leadership, recovery, and what comes next.",
    whyItMatters:
      "Tsunade becomes central, and Naruto’s growth here matters long-term.",
    prompt: "What mattered more to you here: Tsunade’s story or Naruto’s growth?",
    watchNotes: "Skip episode 97 only.",
    episodeGuide: [
      {
        label: "Main manga-canon opening to the arc.",
        episodes: "81–82",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "83",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "84–96",
        type: "mangaCanon",
      },
      {
        label: "Full filler episode. Skip it.",
        episodes: "97",
        type: "filler",
      },
      {
        label: "Mixed-canon close to the arc. Must watch.",
        episodes: "98–100",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "kakashi-face-reveal",
    title: "Kakashi Face Reveal",
    episodes: "101",
    canonType: "filler",
    instruction: "Optional — highly recommended",
    skip: "None",
    optionalLater: "None",
    note: "Filler, but worth it.",
    overview: "A pure comedy detour around Kakashi’s face.",
    whyItMatters: "Does not impact story, but a great bonus episode.",
    prompt: "Was this worth keeping as a bonus stop?",
    watchNotes: "Optional.",
  },
  {
    slug: "movie-land-of-snow",
    title: "Movie: Ninja Clash in the Land of Snow",
    episodes: "Watch after episode 101",
    canonType: "movie",
    instruction: "Skip on first watch",
    skip: "Full movie",
    optionalLater: "Yes",
    note: "Non-canon movie.",
    overview: "Side-story movie that does not affect the main story.",
    whyItMatters: "Pure bonus content.",
    prompt: "Would you come back to the movies later?",
    watchNotes: "Skip.",
  },
  {
    slug: "sasuke-recovery-mission",
    title: "Sasuke Recovery Mission",
    episodes: "107–135",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "102–106",
    optionalLater: "102–106",
    note: "Mixed canon — peak arc with anime additions.",
    overview: "Everything Part 1 builds comes together here.",
    whyItMatters: "The Naruto–Sasuke conflict fully takes shape.",
    prompt: "Do you understand Sasuke’s decision?",
    watchNotes:
      "Skip 102–106. Everything from 107 onward is main-path material, with mixed-canon bridges you should still watch.",
    episodeGuide: [
      {
        label: "Full filler block before the mission. Skip it.",
        episodes: "102–106",
        type: "filler",
      },
      {
        label: "Main manga-canon mission start.",
        episodes: "107–111",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "112–114",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "115–125",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition episodes. Must watch.",
        episodes: "126–127",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "128–129",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "130–131",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon finale to the arc.",
        episodes: "132–135",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "movie-stone-of-gelel",
    title: "Movie: Legend of the Stone of Gelel",
    episodes: "Optional (after 160)",
    canonType: "movie",
    instruction: "Skip on first watch",
    skip: "Full movie",
    optionalLater: "Yes",
    note: "Non-canon movie.",
    overview: "Side-story content.",
    whyItMatters: "Bonus only.",
    prompt: "Would you revisit this later?",
    watchNotes: "Optional.",
  },
  {
    slug: "movie-crescent-moon",
    title: "Movie: Guardians of the Crescent Moon Kingdom",
    episodes: "Optional (after 196)",
    canonType: "movie",
    instruction: "Skip on first watch",
    skip: "Full movie",
    optionalLater: "Yes",
    note: "Non-canon movie.",
    overview: "Late Part 1 movie.",
    whyItMatters: "Extra content only.",
    prompt: "Would you save this for later?",
    watchNotes: "Optional.",
  },
  {
    slug: "part-1-filler-block",
    title: "Part 1 Filler Block",
    episodes: "136–219",
    canonType: "filler",
    instruction: "Skip",
    skip: "136–219",
    optionalLater: "Optional later",
    note: "Full filler stretch.",
    overview: "The anime stalls the story completely.",
    whyItMatters: "Skipping preserves pacing.",
    prompt: "Would you ever come back to this?",
    watchNotes: "Skip all.",
    episodeGuide: [
      {
        label: "Full filler block. Skip all of it.",
        episodes: "136–140",
        type: "filler",
      },
      {
        label: "Mixed-canon episodes exist here in the source, but they are intentionally left out of your program flow.",
        episodes: "141–142",
        type: "filler",
      },
      {
        label: "Full filler block. Skip all of it.",
        episodes: "143–219",
        type: "filler",
      },
    ],
  },
  {
    slug: "part-1-finale",
    title: "Part 1 Finale",
    episodes: "220",
    canonType: "mixedCanon",
    instruction: "Watch",
    skip: "None",
    optionalLater: "None",
    note: "Mixed canon but essential.",
    overview: "Proper close to Part 1.",
    whyItMatters: "Bridges into Shippuden.",
    prompt: "Did this feel like a clean transition?",
    watchNotes: "Do not skip.",
    episodeGuide: [
      {
        label: "Mixed-canon transition episode. Must watch.",
        episodes: "220",
        type: "mixedCanon",
      },
    ],
  },
];