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

type BorutoStep = {
  slug: string;
  title: string;
  episodes: string;
  instruction: string;
  skip: string;
  priority: string;
  optionalLater: string;
  note: string;
  overview: string;
  whyItMatters: string;
  prompt: string;
  watchNotes: string;
  canonType: CanonType;
  episodeGuide?: EpisodeGuideItem[];
};

export const borutoSteps: BorutoStep[] = [
  {
    slug: "academy-opening-mixed",
    title: "Academy Opening",
    episodes: "1",
    instruction: "Must watch",
    skip: "None",
    priority: "Must watch setup",
    optionalLater: "None",
    note: "Start here.",
    overview:
      "You should start here. This sets the tone for Boruto, but it does not count toward manga-canon progress.",
    whyItMatters:
      "It is the right opening to the series and gives the start of Boruto proper context, even though progress stays tied to manga canon.",
    prompt: "Did Boruto’s opening tone grab you right away?",
    watchNotes:
      "Watch this first. Required for a proper start, even though it does not count toward progress.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Opening episode",
        episodes: "1",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "academy-ghost-incident",
    title: "Academy / Ghost Incident",
    episodes: "2–15",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon opening stretch.",
    overview:
      "This is the real anime start for Boruto and introduces the academy cast, the world, and the Ghost Incident material.",
    whyItMatters:
      "Important to the anime version of Boruto, but not part of manga-canon progress in this program.",
    prompt:
      "How does Boruto’s early tone compare to Naruto’s opening for you?",
    watchNotes: "Optional. Watch if you want the fuller anime setup.",
    canonType: "animeCanon",
  },
  {
    slug: "early-filler-break",
    title: "Early Filler Break",
    episodes: "16–17",
    instruction: "Skip",
    skip: "16–17",
    priority: "None",
    optionalLater: "Optional later",
    note: "First filler stop.",
    overview: "A short anime-only detour after the opening run.",
    whyItMatters: "Easy skip.",
    prompt:
      "Do you want Boruto kept tight too, or are you open to detours here?",
    watchNotes: "Skip both episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler break",
        episodes: "16–17",
        type: "filler",
      },
    ],
  },
  {
    slug: "uchiha-family-mixed",
    title: "The Day Naruto Became Hokage",
    episodes: "18",
    instruction: "Highly recommended",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Naruto officially becomes Hokage.",
    overview:
      "This episode adapts the Hokage inauguration special and bridges Naruto’s ending into the Boruto era.",
    whyItMatters:
      "It is one of the most important character moments after Shippuden, even though it does not count toward manga-canon progress.",
    prompt:
      "Did this feel like the right transition from Naruto’s journey into the next generation?",
    watchNotes:
      "Highly recommended. Watch before continuing the Boruto storyline.",
    canonType: "animeCanon",
  },
  {
    slug: "uchiha-family-manga",
    title: "Uchiha Family",
    episodes: "19–23",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "First Boruto manga-canon run.",
    overview:
      "This is the first stretch that counts toward Boruto manga-canon progress.",
    whyItMatters:
      "It brings Sarada, Sasuke, and the family side of Boruto’s world into focus.",
    prompt:
      "Did this stretch hit more because of Sarada, Sasuke, or the family dynamic?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main Uchiha Family run",
        episodes: "19–23",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "field-trip-mixed",
    title: "Field Trip Transition",
    episodes: "24",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Mixed-canon setup episode.",
    overview: "A transition into the Hidden Mist field trip material.",
    whyItMatters:
      "Optional here because it does not count toward manga-canon progress.",
    prompt: "Do these bridge episodes help the flow for you?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Transition episode",
        episodes: "24",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "field-trip-anime",
    title: "Field Trip / Academy Follow-up",
    episodes: "25–38",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon worldbuilding run.",
    overview:
      "This expands the new generation and the Hidden Mist material.",
    whyItMatters:
      "Useful for the fuller anime experience, but optional in this manga-canon-first program.",
    prompt: "Did this help the new cast feel more real to you?",
    watchNotes: "Optional. Watch if you want more worldbuilding.",
    canonType: "animeCanon",
  },
  {
    slug: "mitsuki-one-shot",
    title: "Mitsuki One-Shot",
    episodes: "39",
    instruction: "Watch",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Single manga-canon episode.",
    overview: "A short manga-canon stop centered on Mitsuki.",
    whyItMatters: "Counts toward Boruto manga-canon progress.",
    prompt: "Did this make Mitsuki more interesting to you early on?",
    watchNotes: "Watch it.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Mitsuki one-shot",
        episodes: "39",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "team-7-filler-break",
    title: "Team 7 Filler Break",
    episodes: "40–41",
    instruction: "Skip",
    skip: "40–41",
    priority: "None",
    optionalLater: "Optional later",
    note: "Short filler break.",
    overview: "A brief anime-only pause after the early setup.",
    whyItMatters: "Easy skip.",
    prompt: "Would you ever come back to tiny filler blocks later?",
    watchNotes: "Skip both episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler break",
        episodes: "40–41",
        type: "filler",
      },
    ],
  },
  {
    slug: "byakuya-gang-anime",
    title: "Byakuya Gang",
    episodes: "42–47",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon pre-exam run.",
    overview:
      "This is anime-canon material before the core exam stretch.",
    whyItMatters:
      "Optional in this program, but useful if you want more Boruto anime context.",
    prompt: "Did this feel like solid setup or just side material to you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "pre-exam-filler",
    title: "Pre-Exam Filler",
    episodes: "48–50",
    instruction: "Skip",
    skip: "48–50",
    priority: "None",
    optionalLater: "Optional later",
    note: "Filler before the core exam material.",
    overview: "A short anime-only block before the canon-heavy run.",
    whyItMatters: "Skip it to stay on track.",
    prompt:
      "Does filler right before a big arc bother you more than filler elsewhere?",
    watchNotes: "Skip all three episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler block",
        episodes: "48–50",
        type: "filler",
      },
    ],
  },
  {
    slug: "chunin-exams-setup-anime",
    title: "Chunin Exams Setup",
    episodes: "51–52",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon setup for the exam run.",
    overview:
      "These episodes lead into the heavier canon material that follows.",
    whyItMatters:
      "Optional in this program because progress only tracks manga canon.",
    prompt: "Did this setup help the exam stretch land better for you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "chunin-exams-manga-1",
    title: "Chunin Exams / Momoshiki (Manga Canon I)",
    episodes: "53–58",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Core Boruto manga-canon material begins here.",
    overview: "This is the first major Boruto manga-canon payoff.",
    whyItMatters:
      "These episodes count toward manga-canon progress and drive the most important early Boruto material.",
    prompt:
      "How did this first big Boruto payoff compare to Naruto’s Part 1 peaks for you?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main Chunin Exams / Momoshiki run",
        episodes: "53–58",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "chunin-exams-mixed",
    title: "Chunin Exams Transition",
    episodes: "59",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Mixed-canon transition episode.",
    overview: "A bridge inside the exam run.",
    whyItMatters:
      "Optional here because it does not count toward manga-canon progress.",
    prompt: "Do mixed transition episodes add enough for you to keep them in?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Transition episode",
        episodes: "59",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "chunin-exams-anime-bridge",
    title: "Chunin Exams Anime Bridge",
    episodes: "60",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon bridge episode.",
    overview: "A single anime-canon stop inside the larger exam run.",
    whyItMatters: "Optional in this program.",
    prompt:
      "Does a one-episode anime-canon bridge feel worth including to you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "chunin-exams-manga-2",
    title: "Chunin Exams / Momoshiki (Manga Canon II)",
    episodes: "61–66",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "This completes the first major Boruto manga-canon run.",
    overview: "The biggest early Boruto payoff finishes here.",
    whyItMatters:
      "Counts toward manga-canon progress and closes out the first major canon arc.",
    prompt:
      "Did this stretch make Boruto feel fully worth continuing to you?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Finish the Chunin Exams / Momoshiki run",
        episodes: "61–66",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "movie-boruto",
    title: "Movie: Boruto: Naruto the Movie",
    episodes: "Optional after episode 66",
    instruction: "Optional",
    skip: "None",
    priority: "Canon movie",
    optionalLater: "Yes",
    note: "Canon movie, but optional here.",
    overview:
      "The movie is official, but the anime covers this material more fully in episodes 42–66.",
    whyItMatters:
      "Treat it as bonus comparison viewing, not a replacement for the anime version.",
    prompt:
      "Do you still want the original movie version after the anime already covered this stretch?",
    watchNotes: "Optional. Watch only after episodes 42–66.",
    canonType: "movie",
  },
  {
    slug: "cho-cho-filler-break",
    title: "Cho-Cho Filler Break",
    episodes: "67–69",
    instruction: "Skip",
    skip: "67–69",
    priority: "None",
    optionalLater: "Optional later",
    note: "Side-story filler.",
    overview: "A short filler block after the Momoshiki stretch.",
    whyItMatters: "Skipping it keeps Boruto moving.",
    prompt: "Do side-character filler runs interest you at all?",
    watchNotes: "Skip all three episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler block",
        episodes: "67–69",
        type: "filler",
      },
    ],
  },
  {
    slug: "mitsuki-disappearance-anime",
    title: "Mitsuki Disappearance",
    episodes: "70–92",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Major anime-canon Boruto arc.",
    overview: "This is one of the biggest anime-canon arcs in Boruto.",
    whyItMatters:
      "Optional in this program, but important if you want the fuller anime version of Boruto.",
    prompt: "Did this make Mitsuki more compelling to you?",
    watchNotes:
      "Optional. Watch straight through if you keep anime canon in.",
    canonType: "animeCanon",
  },
  {
    slug: "mitsuki-disappearance-mixed",
    title: "Mitsuki Disappearance Ending",
    episodes: "93–95",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Mixed-canon ending to the arc.",
    overview: "These episodes close out the larger Mitsuki stretch.",
    whyItMatters:
      "Optional here because they do not count toward manga-canon progress.",
    prompt: "Did this ending land for you?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Arc ending episodes",
        episodes: "93–95",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "small-filler-break-1",
    title: "Small Filler Break",
    episodes: "96–97",
    instruction: "Skip",
    skip: "96–97",
    priority: "None",
    optionalLater: "Optional later",
    note: "Short filler pause.",
    overview: "A quick break before the next canon material.",
    whyItMatters: "Easy skip.",
    prompt: "Do short filler breaks bother you less than long ones?",
    watchNotes: "Skip both episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler break",
        episodes: "96–97",
        type: "filler",
      },
    ],
  },
  {
    slug: "juugo-anime",
    title: "Jugo / Follow-up (Anime Canon)",
    episodes: "98–105",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon lead-in to the next manga-canon stretch.",
    overview: "This run bridges into the next canon-heavy portion.",
    whyItMatters:
      "Optional in this program, but useful if you want the fuller anime path.",
    prompt: "Did this feel more like setup or payoff to you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "juugo-manga",
    title: "Jugo / Follow-up (Manga Canon)",
    episodes: "106–111",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Short Boruto manga-canon stretch.",
    overview:
      "This is the next block that counts toward manga-canon progress.",
    whyItMatters: "Keeps the manga-canon Boruto path moving.",
    prompt:
      "Did this feel like solid forward movement after the earlier anime-only material?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main canon run",
        episodes: "106–111",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "filler-break-2",
    title: "Filler Break",
    episodes: "112–119",
    instruction: "Skip",
    skip: "112–119",
    priority: "None",
    optionalLater: "Optional later",
    note: "Bigger filler block.",
    overview: "A more noticeable anime-only detour.",
    whyItMatters: "Skipping it protects the pacing.",
    prompt: "Would you ever want a separate Boruto filler path later?",
    watchNotes: "Skip all of it.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler block",
        episodes: "112–119",
        type: "filler",
      },
    ],
  },
  {
    slug: "one-tail-escort-anime",
    title: "One-Tail Escort",
    episodes: "120–126",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon run before a mixed transition.",
    overview:
      "A longer anime-canon stretch with more room to breathe than the core manga path.",
    whyItMatters: "Optional in this program.",
    prompt: "Did this add enough to justify the length for you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "time-slip-mixed",
    title: "Time Slip Transition",
    episodes: "127",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Single mixed-canon episode.",
    overview: "A bridge inside the One-Tail / Time Slip run.",
    whyItMatters: "Optional.",
    prompt: "Do one-episode mixed transitions work for you?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Transition episode",
        episodes: "127",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "time-slip-anime",
    title: "Time Slip",
    episodes: "128–137",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon continuation.",
    overview:
      "This completes the larger anime-canon Time Slip stretch.",
    whyItMatters: "Optional in this manga-canon-first program.",
    prompt: "Did this stretch feel worth the time to you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "filler-break-3",
    title: "Filler Break",
    episodes: "138–140",
    instruction: "Skip",
    skip: "138–140",
    priority: "None",
    optionalLater: "Optional later",
    note: "Short filler interruption.",
    overview: "A brief anime-only stop.",
    whyItMatters: "Easy skip.",
    prompt: "Do you want Boruto filler broken out even more clearly later?",
    watchNotes: "Skip all three episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler break",
        episodes: "138–140",
        type: "filler",
      },
    ],
  },
  {
    slug: "kara-setup-anime",
    title: "Kara Setup",
    episodes: "141–147",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Anime-canon setup before the next manga-canon block.",
    overview:
      "Boruto starts leaning harder into bigger story material here.",
    whyItMatters:
      "Optional in this program, but useful for the fuller anime route.",
    prompt: "Did Boruto start feeling more serious to you here?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "mujina-manga",
    title: "Mujina Bandits",
    episodes: "148–151",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Manga-canon transition into later Boruto.",
    overview:
      "This is an important bridge into the heavier late-series material.",
    whyItMatters: "Counts toward manga-canon progress.",
    prompt: "Did Boruto start to feel more locked in here?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main canon run",
        episodes: "148–151",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "filler-break-4",
    title: "Filler Break",
    episodes: "152–154",
    instruction: "Skip",
    skip: "152–154",
    priority: "None",
    optionalLater: "Optional later",
    note: "Another short filler block.",
    overview: "A small interruption before the next long run.",
    whyItMatters: "Easy skip.",
    prompt: "Do these short filler walls ever feel worth returning to?",
    watchNotes: "Skip all three episodes.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler break",
        episodes: "152–154",
        type: "filler",
      },
    ],
  },
  {
    slug: "deepa-anime",
    title: "Deepa Setup",
    episodes: "155",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Single anime-canon entry point.",
    overview:
      "A one-episode anime-canon start to the longer later run.",
    whyItMatters: "Optional in this program.",
    prompt:
      "Does a one-episode setup change whether you stay with the fuller anime path?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "filler-break-5",
    title: "Deepa Filler Interruption",
    episodes: "156",
    instruction: "Skip",
    skip: "156",
    priority: "None",
    optionalLater: "Optional later",
    note: "Single filler episode.",
    overview: "A one-episode filler interruption.",
    whyItMatters: "Easy skip.",
    prompt: "Would you ever go back for a single filler episode later?",
    watchNotes: "Skip episode 156.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler interruption",
        episodes: "156",
        type: "filler",
      },
    ],
  },
  {
    slug: "deepa-mixed",
    title: "Deepa Transition",
    episodes: "157",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Mixed-canon bridge episode.",
    overview: "A transition inside the larger Deepa / Kawaki run.",
    whyItMatters: "Optional here.",
    prompt: "Do mixed transition episodes help enough to keep them in?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Transition episode",
        episodes: "157",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "deepa-anime-run",
    title: "Deepa / Kawaki Setup",
    episodes: "158–180",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Long anime-canon run before the next manga-canon block.",
    overview:
      "This is where the anime really stretches out Boruto’s late buildup.",
    whyItMatters:
      "Optional in this program, but it is a major part of the fuller anime experience.",
    prompt: "Did this run justify its length for you?",
    watchNotes:
      "Optional. Watch straight through if you keep anime canon in.",
    canonType: "animeCanon",
  },
  {
    slug: "kawaki-manga-1",
    title: "Kawaki / Kara (Manga Canon I)",
    episodes: "181–189",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Late Boruto manga-canon begins in earnest here.",
    overview:
      "This is where Boruto’s late manga-canon material starts hitting much harder.",
    whyItMatters:
      "Counts toward manga-canon progress and is one of the most important Boruto runs.",
    prompt: "Did Boruto feel fully serious by this point for you?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main canon run",
        episodes: "181–189",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "kawaki-anime-bridge",
    title: "Kawaki Anime Bridge",
    episodes: "190–191",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Short anime-canon bridge.",
    overview:
      "A brief anime-canon continuation before the next mixed and manga-canon episodes.",
    whyItMatters: "Optional in this program.",
    prompt: "Do these short anime-canon bridges work for you?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "kawaki-mixed",
    title: "Kawaki Mixed Transition",
    episodes: "192",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Single mixed-canon transition episode.",
    overview: "A bridge episode inside the Kawaki material.",
    whyItMatters: "Optional here.",
    prompt: "Do these mixed bridges feel necessary to you?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Transition episode",
        episodes: "192",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "kawaki-manga-2",
    title: "Kawaki / Kara (Manga Canon II)",
    episodes: "193–208",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "Major Boruto manga-canon run.",
    overview:
      "This continues the heaviest late Boruto manga-canon material.",
    whyItMatters:
      "A core Boruto stretch that counts toward manga-canon progress.",
    prompt:
      "How did this compare to the strongest Naruto and Shippuden runs for you?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Main canon run",
        episodes: "193–208",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "kawaki-anime-single",
    title: "Kawaki Anime Canon",
    episodes: "209",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Single anime-canon entry.",
    overview:
      "A one-episode anime-canon stop before the next mixed and manga-canon block.",
    whyItMatters: "Optional here.",
    prompt: "Do one-episode anime-canon entries feel worth keeping?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "kawaki-mixed-2",
    title: "Kawaki Mixed Follow-up",
    episodes: "210–211",
    instruction: "Optional",
    skip: "None",
    priority: "Mixed canon",
    optionalLater: "None",
    note: "Mixed-canon follow-up block.",
    overview: "A short mixed run between manga-canon phases.",
    whyItMatters:
      "Optional here because it does not count toward manga-canon progress.",
    prompt:
      "Would you keep short mixed blocks like this in your version of the Boruto path?",
    watchNotes: "Optional.",
    canonType: "mixedCanon",
    episodeGuide: [
      {
        label: "Follow-up block",
        episodes: "210–211",
        type: "mixedCanon",
      },
    ],
  },
  {
    slug: "kawaki-manga-3",
    title: "Kawaki / Kara (Manga Canon III)",
    episodes: "212–220",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "This completes the main late Boruto manga-canon run before the long anime stretch.",
    overview:
      "The core manga-canon path continues here before the anime goes into a long optional block.",
    whyItMatters: "Counts toward manga-canon progress.",
    prompt: "Did this feel like the strongest stretch in Boruto so far?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Finish the Kawaki / Kara run",
        episodes: "212–220",
        type: "mangaCanon",
      },
    ],
  },
  {
    slug: "late-anime-canon-run",
    title: "Late Anime-Canon Run",
    episodes: "221–255",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "Long anime-canon continuation.",
    overview:
      "A major optional anime-canon stretch after the main manga-canon run pauses.",
    whyItMatters:
      "Useful if you want the fuller anime version, but it does not count toward manga-canon progress.",
    prompt:
      "Would you keep a long optional anime-canon run like this in your personal watch path?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "late-filler-break",
    title: "Late Filler Break",
    episodes: "256",
    instruction: "Skip",
    skip: "256",
    priority: "None",
    optionalLater: "Optional later",
    note: "Single filler interruption.",
    overview: "A one-episode filler stop.",
    whyItMatters: "Easy skip.",
    prompt:
      "Would you ever go back for this after finishing everything else?",
    watchNotes: "Skip episode 256.",
    canonType: "filler",
    episodeGuide: [
      {
        label: "Skip this filler episode",
        episodes: "256",
        type: "filler",
      },
    ],
  },
  {
    slug: "final-anime-canon-run",
    title: "Final Anime-Canon Run",
    episodes: "257–281",
    instruction: "Optional",
    skip: "None",
    priority: "Anime canon",
    optionalLater: "None",
    note: "The final anime-canon stretch before the last manga-canon block.",
    overview:
      "This carries Boruto through the end of its current anime-canon material.",
    whyItMatters: "Optional in this program.",
    prompt:
      "Did this material make you want more from the anime side of Boruto?",
    watchNotes: "Optional.",
    canonType: "animeCanon",
  },
  {
    slug: "final-manga-canon-run",
    title: "Final Manga-Canon Run",
    episodes: "282–293",
    instruction: "Watch all",
    skip: "None",
    priority: "Manga canon",
    optionalLater: "None",
    note: "The latest Boruto manga-canon block currently covered by this guide.",
    overview:
      "This closes the current manga-canon path at the anime stopping point.",
    whyItMatters:
      "Counts toward manga-canon progress and is the current end of the Boruto main path in this program.",
    prompt: "Did Boruto stop in a place that felt strong enough to you?",
    watchNotes: "Watch straight through.",
    canonType: "mangaCanon",
    episodeGuide: [
      {
        label: "Current final canon block",
        episodes: "282–293",
        type: "mangaCanon",
      },
    ],
  },
];