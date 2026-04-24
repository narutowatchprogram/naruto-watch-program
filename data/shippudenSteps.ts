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

type ShippudenStep = {
  slug: string;
  title: string;
  episodes: string;
  canonType: CanonType;
  instruction: string;
  skip: string;
  priority: string;
  optionalLater: string;
  note: string;
  overview: string;
  whyItMatters: string;
  prompt: string;
  watchNotes: string;
  episodeGuide?: EpisodeGuideItem[];
};

export const shippudenSteps: ShippudenStep[] = [
  {
    slug: "kazekage-rescue-mission",
    title: "Kazekage / Tenchi Bridge",
    episodes: "1–56",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Canon arc with mixed material inside the run.",
    overview:
      "This reintroduces the world after the time skip. The tone is heavier, the stakes are clearer, and Naruto is not the same kid anymore.",
    whyItMatters:
      "This sets the tone for all of Shippuden and shows how much the characters and world have changed.",
    prompt:
      "What stood out more here: Gaara’s story or how different Naruto feels?",
    watchNotes:
      "This is still main-path material, but the episode mix is not uniform. Follow the breakdown below and treat every mixed-canon episode as required.",
    episodeGuide: [
      {
        label: "Mixed-canon setup at the start of Shippuden.",
        episodes: "1–19",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon rescue stretch.",
        episodes: "20–23",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition episodes.",
        episodes: "24–25",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon confrontation.",
        episodes: "26–27",
        type: "mangaCanon",
      },
      {
        label: "Anime-canon episode inside the run. Keep it in your watch path here.",
        episodes: "28",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "29–44",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon interruption that still belongs in the run.",
        episodes: "45",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "46–48",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes.",
        episodes: "49–50",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "51–53",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition.",
        episodes: "54",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "55",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon close to finish the arc.",
        episodes: "56",
        type: "mixedCanon",
      },
    ],
  },

  {
    slug: "movie-shippuden-1",
    title: "Movie: Naruto Shippuden the Movie",
    episodes: "Best watched after episode 32",
    canonType: "movie",
    instruction: "Skip on first watch",
    skip: "Full movie",
    priority: "None",
    optionalLater: "Yes",
    note: "Non-canon movie.",
    overview: "This does not connect to the main story.",
    whyItMatters: "Pure bonus content.",
    prompt:
      "Would you ever come back to non-canon movies after finishing everything?",
    watchNotes: "Skip on first watch.",
  },

  {
    slug: "early-filler-block",
    title: "Early Filler Block",
    episodes: "57–71",
    canonType: "filler",
    instruction: "Skip",
    skip: "57–71",
    priority: "None",
    optionalLater: "Optional later",
    note: "First real filler interruption.",
    overview: "The anime detours away from the main story early on.",
    whyItMatters: "Skipping keeps the momentum intact.",
    prompt: "Do you want to stay locked into the main path here?",
    watchNotes: "Skip all.",
    episodeGuide: [
      {
        label: "Full filler block.",
        episodes: "57–71",
        type: "filler",
      },
    ],
  },

  {
    slug: "akatsuki-suppression",
    title: "Akatsuki Suppression Mission",
    episodes: "72–90",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Canon arc with mixed material inside the run.",
    overview:
      "A focused arc that gives real weight to both the Akatsuki and the Leaf.",
    whyItMatters:
      "This is one of the first times Shippuden fully delivers on tone, stakes, and character impact.",
    prompt: "Who carried this more for you: Shikamaru or the villains?",
    watchNotes:
      "This stretch is mostly manga canon, with a mixed-canon finish that still needs to be watched.",
    episodeGuide: [
      {
        label: "Main manga-canon Akatsuki Suppression run.",
        episodes: "72–88",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon ending that still belongs in the main path.",
        episodes: "89–90",
        type: "mixedCanon",
      },
    ],
  },

  {
    slug: "mid-filler-block",
    title: "Mid Filler Block",
    episodes: "91–112",
    canonType: "filler",
    instruction: "Skip",
    skip: "91–112",
    priority: "None",
    optionalLater: "Optional later",
    note: "Another detour.",
    overview: "The story pauses again for anime-only content.",
    whyItMatters: "Skipping keeps the core narrative clean.",
    prompt: "Does filler like this break your immersion?",
    watchNotes: "Skip all.",
    episodeGuide: [
      {
        label: "Full filler block.",
        episodes: "91–112",
        type: "filler",
      },
    ],
  },

  {
    slug: "itachi-jiraiya-phase",
    title: "Itachi Pursuit / Jiraiya the Gallant",
    episodes: "113–143",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Core canon stretch.",
    overview:
      "Multiple major storylines move at once, with two of the most important characters at the center.",
    whyItMatters:
      "Some of the most defining moments in Naruto happen here.",
    prompt: "Which hit harder for you: Itachi or Jiraiya?",
    watchNotes:
      "Do not treat this whole run as one flat canon type. The mixed-canon episodes here are still must-watch.",
    episodeGuide: [
      {
        label: "Mixed-canon entry into the arc.",
        episodes: "113",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "114",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon transition episode.",
        episodes: "115",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon stretch.",
        episodes: "116–126",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes.",
        episodes: "127–128",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation through the end of the run.",
        episodes: "129–143",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "late-filler-block",
    title: "Late Filler Block",
    episodes: "144–151",
    canonType: "filler",
    instruction: "Skip",
    skip: "144–151",
    priority: "None",
    optionalLater: "Optional later",
    note: "Short filler pause.",
    overview: "A quick break before one of the biggest arcs.",
    whyItMatters: "Skipping keeps the next arc’s impact intact.",
    prompt: "Better to move straight into the next arc?",
    watchNotes: "Skip all.",
    episodeGuide: [
      {
        label: "Full filler block.",
        episodes: "144–151",
        type: "filler",
      },
    ],
  },

  {
    slug: "pain-arc",
    title: "Pain’s Assault",
    episodes: "152–169",
    canonType: "mangaCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "This is one of the peaks of Naruto.",
    overview:
      "Everything built so far comes together in one of the most intense arcs in the series.",
    whyItMatters:
      "This defines Naruto’s philosophy and what the series is trying to say.",
    prompt: "Was this the peak for you?",
    watchNotes: "Watch straight through. Stay locked in.",
    episodeGuide: [
      {
        label: "Main manga-canon Pain arc run.",
        episodes: "152–169",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "pain-interruption",
    title: "Pain Interruption",
    episodes: "170–171",
    canonType: "filler",
    instruction: "Skip",
    skip: "170–171",
    priority: "None",
    optionalLater: "Optional later",
    note: "Badly placed filler.",
    overview: "A short anime-only interruption inside a peak arc.",
    whyItMatters: "Skipping preserves the momentum.",
    prompt: "Would this have ruined the pacing for you?",
    watchNotes: "Skip both.",
    episodeGuide: [
      {
        label: "Skip this filler interruption.",
        episodes: "170–171",
        type: "filler",
      },
    ],
  },

  {
    slug: "pain-aftermath",
    title: "Pain Aftermath",
    episodes: "172–175",
    canonType: "mangaCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Close it out properly.",
    overview: "This resolves everything from the Pain arc.",
    whyItMatters: "Completes one of the most important storylines.",
    prompt: "Did the resolution work for you?",
    watchNotes: "Watch straight through.",
    episodeGuide: [
      {
        label: "Main manga-canon aftermath.",
        episodes: "172–175",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "five-kage-summit",
    title: "Five Kage Summit",
    episodes: "197–222",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "The world shifts again here.",
    overview:
      "The focus moves to global politics and Sasuke’s path deepens.",
    whyItMatters: "This sets up the entire endgame.",
    prompt: "How much did your view of Sasuke change here?",
    watchNotes:
      "This is mostly manga canon, with one mixed-canon episode inside the run that should still be watched.",
    episodeGuide: [
      {
        label: "Main manga-canon summit run.",
        episodes: "197–212",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "213",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "214–222",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "war-setup",
    title: "Fourth Great Ninja War — Countdown",
    episodes: "243–256",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Everything leads into this.",
    overview:
      "The scale expands fully as the war begins to take shape.",
    whyItMatters:
      "This prepares the entire final arc of Shippuden.",
    prompt: "Did this buildup feel earned to you?",
    watchNotes:
      "This run includes one mixed-canon episode inside otherwise manga-canon material. Keep it in the watch path.",
    episodeGuide: [
      {
        label: "Main manga-canon war setup.",
        episodes: "243–253",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "254",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "255–256",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "war-phase-1",
    title: "Fourth Great Ninja War — Opening Battles",
    episodes: "261–270",
    canonType: "mangaCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "The war officially starts here.",
    overview:
      "The war officially starts and the scale of the conflict becomes real.",
    whyItMatters: "This is the beginning of the final stretch.",
    prompt: "Did the war click for you immediately?",
    watchNotes: "This opening run is clean manga canon straight through.",
    episodeGuide: [
      {
        label: "Main manga-canon opening battles.",
        episodes: "261–270",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "war-phase-2",
    title: "Fourth Great Ninja War — Frontlines",
    episodes: "271–320",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "279–281, 284–295, 303–320",
    priority: "None",
    optionalLater: "None",
    note: "This is the first war stretch that needs strict episode guidance.",
    overview:
      "The battlefield expands, more squads come into focus, and the war starts to feel broader than a single front.",
    whyItMatters:
      "There is real main-path material here, but it is broken up by large filler interruptions.",
    prompt:
      "Did this early war stretch still hold momentum once the filler interruptions were separated out?",
    watchNotes:
      "Do not watch this whole range blindly. Follow the breakdown exactly. The mixed-canon episode here is still must-watch, and the filler chunks should be skipped.",
    episodeGuide: [
      {
        label: "Full filler episode. Skip it.",
        episodes: "271",
        type: "filler",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "272–278",
        type: "mangaCanon",
      },
      {
        label: "Full filler block. Skip it.",
        episodes: "279–281",
        type: "filler",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "282–283",
        type: "mangaCanon",
      },
      {
        label: "Full filler block. Skip it.",
        episodes: "284–295",
        type: "filler",
      },
      {
        label: "Mixed-canon episode. Must watch.",
        episodes: "296",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "297–302",
        type: "mangaCanon",
      },
      {
        label: "Full filler block. Skip it.",
        episodes: "303–320",
        type: "filler",
      },
    ],
  },

  {
    slug: "war-phase-5",
    title: "Fourth Great Ninja War — Main Battlefield",
    episodes: "321–346",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "This is the war stretch where episode-level labels matter.",
    overview:
      "After the interruptions, the war settles into a more focused run of major story movement.",
    whyItMatters:
      "This is where the war starts feeling locked in again, but there are still mixed-canon episodes inside the run.",
    prompt: "Did this feel like the war finally hitting its stride?",
    watchNotes:
      "This should stay on the main path, but not every episode inside the range is the same canon type.",
    episodeGuide: [
      {
        label: "Main manga-canon continuation.",
        episodes: "321–323",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon episode. Must watch.",
        episodes: "324",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "325–326",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "327–328",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "329",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "330–331",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "332–337",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon episode. Must watch.",
        episodes: "338",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "339–345",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon ending episode. Must watch.",
        episodes: "346",
        type: "mixedCanon",
      },
    ],
  },

  {
    slug: "kakashi-anbu-arc",
    title: "Kakashi Anbu Arc",
    episodes: "349–361",
    canonType: "animeCanon",
    instruction: "Optional — highly recommended",
    skip: "None",
    priority: "Highly recommended bonus arc",
    optionalLater: "Yes",
    note: "Best anime-original arc.",
    overview:
      "A deeper look at Kakashi and the darker side of the Leaf’s past.",
    whyItMatters:
      "Adds real value even though it is not required.",
    prompt: "Did this improve Kakashi for you?",
    watchNotes: "Optional but worth it.",
  },

  {
    slug: "war-phase-6",
    title: "Fourth Great Ninja War — Turning Point",
    episodes: "362–375",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Major late-war stretch.",
    overview:
      "The war escalates hard here and the endgame players fully take over the story.",
    whyItMatters: "This is core endgame material.",
    prompt: "Did this feel like the story closing in on its final shape?",
    watchNotes:
      "This range opens on a mixed-canon episode, then runs through a long manga-canon escalation.",
    episodeGuide: [
      {
        label: "Mixed-canon entry episode. Must watch.",
        episodes: "362",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "363–375",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "war-phase-9",
    title: "Fourth Great Ninja War — Endgame",
    episodes: "414–426",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "416–417, 422–423",
    priority: "None",
    optionalLater: "None",
    note: "Final war momentum.",
    overview:
      "The war story tightens again and points directly toward the conclusion.",
    whyItMatters:
      "This leads straight into the final phase of Naruto’s story.",
    prompt: "Did momentum fully come back here for you?",
    watchNotes:
      "This is another war stretch that should be followed by exact episode labels, not watched as one flat block.",
    episodeGuide: [
      {
        label: "Main manga-canon episode.",
        episodes: "414",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "415",
        type: "mixedCanon",
      },
      {
        label: "Full filler block. Skip it.",
        episodes: "416–417",
        type: "filler",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "418",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episode. Must watch.",
        episodes: "419",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "420–421",
        type: "mangaCanon",
      },
      {
        label: "Full filler block. Skip it.",
        episodes: "422–423",
        type: "filler",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "424–425",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon ending episode. Must watch.",
        episodes: "426",
        type: "mixedCanon",
      },
    ],
  },

  {
    slug: "itachi-shinden",
    title: "Itachi Shinden",
    episodes: "451–458",
    canonType: "animeCanon",
    instruction: "Optional — highly recommended",
    skip: "None",
    priority: "Canon novel adaptation",
    optionalLater: "None",
    note: "Canon novel adaptation.",
    overview:
      "Explores Itachi’s life before the main story.",
    whyItMatters:
      "Adds meaningful context, but not required.",
    prompt: "Did this change how you view Itachi?",
    watchNotes: "Optional but strong.",
  },

  {
    slug: "final-battles-resume",
    title: "Final Battles",
    episodes: "459–463",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Canon arc with mixed material inside the run.",
    overview: "The final stretch resumes.",
    whyItMatters: "Core ending material.",
    prompt: "Did this feel like true endgame Naruto?",
    watchNotes:
      "This run alternates between manga canon and mixed canon. Keep the whole stretch in the main path.",
    episodeGuide: [
      {
        label: "Main manga-canon episode.",
        episodes: "459",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "460–462",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon episode.",
        episodes: "463",
        type: "mangaCanon",
      },
    ],
  },

  {
    slug: "ending-run",
    title: "Ending Run",
    episodes: "470–479",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "None",
    optionalLater: "None",
    note: "Canon ending stretch with mixed material inside the run.",
    overview: "The story begins wrapping up.",
    whyItMatters: "This is the core conclusion.",
    prompt: "Did the ending direction work for you?",
    watchNotes:
      "This late run alternates between manga canon and mixed canon. Every mixed episode here is still must-watch.",
    episodeGuide: [
      {
        label: "Main manga-canon episode.",
        episodes: "470",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon bridge episodes. Must watch.",
        episodes: "471–472",
        type: "mixedCanon",
      },
      {
        label: "Main manga-canon continuation.",
        episodes: "473–477",
        type: "mangaCanon",
      },
      {
        label: "Mixed-canon ending episodes. Must watch.",
        episodes: "478–479",
        type: "mixedCanon",
      },
    ],
  },

  {
    slug: "movie-the-last",
    title: "Movie: The Last: Naruto the Movie",
    episodes: "Watch after episode 493",
    canonType: "movie",
    instruction: "Must watch",
    skip: "None",
    priority: "Mandatory movie",
    optionalLater: "None",
    note: "Canon continuation.",
    overview:
      "This is the only movie that belongs in the main story.",
    whyItMatters:
      "It bridges Naruto into the next era.",
    prompt: "Did this feel necessary to the ending?",
    watchNotes: "Watch after 493.",
  },

  {
    slug: "konoha-hiden",
    title: "Konoha Hiden",
    episodes: "494–500",
    canonType: "mixedCanon",
    instruction: "Watch all",
    skip: "None",
    priority: "Must watch (final canon conclusion)",
    optionalLater: "None",
    note: "This is the true ending.",
    overview:
      "This completes Naruto’s story with the wedding and final character closure.",
    whyItMatters:
      "This is the actual emotional and narrative ending of Naruto.",
    prompt: "Did this feel like the right ending to Naruto’s journey?",
    watchNotes: "Watch all. Do not skip this.",
    episodeGuide: [
      {
        label: "Main canon closeout.",
        episodes: "494–500",
        type: "mangaCanon",
      },
    ],
  },
];