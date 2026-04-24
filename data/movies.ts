export type Movie = {
    id: string;
    title: string;
    placementAfter: string;
    series: "naruto" | "shippuden" | "boruto";
    watchType: "mandatory" | "optional" | "skip";
    note?: string;
  };
  
  export const movies: Movie[] = [
    // PART 1
    {
      id: "movie-land-of-snow",
      title: "Ninja Clash in the Land of Snow",
      placementAfter: "land-of-waves",
      series: "naruto",
      watchType: "skip",
      note: "Non-canon. Safe to skip on a first watch without missing anything from the main story.",
    },
    {
      id: "movie-stone-of-gelel",
      title: "Legend of the Stone of Gelel",
      placementAfter: "chunin-exams",
      series: "naruto",
      watchType: "skip",
      note: "Non-canon side story. Does not connect to the main narrative.",
    },
    {
      id: "movie-crescent-moon",
      title: "Guardians of the Crescent Moon Kingdom",
      placementAfter: "sasuke-recovery-mission",
      series: "naruto",
      watchType: "skip",
      note: "Non-canon. Best saved for later if you want extra content with the Part 1 cast.",
    },
  
    // SHIPPUDEN
    {
      id: "movie-shippuden-1",
      title: "Naruto Shippuden the Movie",
      placementAfter: "kazekage-rescue",
      series: "shippuden",
      watchType: "skip",
      note: "Standalone movie with no impact on the main story.",
    },
    {
      id: "movie-bonds",
      title: "Naruto Shippuden the Movie: Bonds",
      placementAfter: "tenchi-bridge",
      series: "shippuden",
      watchType: "skip",
      note: "Non-canon. Does not affect the main narrative.",
    },
    {
      id: "movie-will-of-fire",
      title: "Naruto Shippuden the Movie: The Will of Fire",
      placementAfter: "hidan-kakuzu",
      series: "shippuden",
      watchType: "skip",
      note: "Non-canon. Can be skipped without missing anything important.",
    },
    {
      id: "movie-lost-tower",
      title: "Naruto Shippuden the Movie: The Lost Tower",
      placementAfter: "pain",
      series: "shippuden",
      watchType: "skip",
      note: "Self-contained story. Does not tie into the main plot.",
    },
    {
      id: "movie-blood-prison",
      title: "Naruto Shippuden the Movie: Blood Prison",
      placementAfter: "five-kage-summit",
      series: "shippuden",
      watchType: "optional",
      note: "Still non-canon, but more grounded in tone than earlier movies. Optional if you want extra content later.",
    },
    {
      id: "movie-road-to-ninja",
      title: "Road to Ninja: Naruto the Movie",
      placementAfter: "war-arc",
      series: "shippuden",
      watchType: "optional",
      note: "Skip on first watch. Written by Masashi Kishimoto. Explores an alternate version of Naruto’s life and characters, making it one of the more meaningful optional movies.",
    },
    {
      id: "movie-the-last",
      title: "The Last: Naruto the Movie",
      placementAfter: "war-arc-end",
      series: "shippuden",
      watchType: "mandatory",
      note: "Canon continuation of the main story. Watch after episode 493 before finishing the final epilogue episodes.",
    },
  
    // BORUTO
    {
      id: "movie-boruto",
      title: "Boruto: Naruto the Movie",
      placementAfter: "byakuya-and-chunin-exams",
      series: "boruto",
      watchType: "optional",
      note: "Canon, but optional in this program because the Boruto anime covers this material more fully in episodes 51–66. Prioritize the anime version first.",
    },
  ];