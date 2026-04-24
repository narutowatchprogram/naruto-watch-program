import { movies } from "@/data/movies";

function getWatchTypeLabel(watchType: "mandatory" | "optional" | "skip") {
  if (watchType === "mandatory") return "Must Watch";
  if (watchType === "optional") return "Optional";
  return "Skip";
}

function getWatchTypeStyle(watchType: "mandatory" | "optional" | "skip") {
  if (watchType === "mandatory") return "text-green-300";
  if (watchType === "optional") return "text-yellow-300";
  return "text-gray-500";
}

/* ✅ Updated with exact episode placements (Part 1 + Shippuden + Boruto) */
function getPlacementLabel(placementAfter: string) {
  switch (placementAfter) {
    /* Part 1 */
    case "land-of-waves":
      return "after episode 19";
    case "chunin-exams":
      return "after episode 101";
    case "sasuke-recovery-mission":
      return "after episode 135";

    /* Shippuden */
    case "kazekage-rescue":
      return "after episode 32";
    case "tenchi-bridge":
      return "after episode 71";
    case "hidan-kakuzu":
      return "after episode 121";
    case "pain":
      return "after episode 143";
    case "five-kage-summit":
      return "after episode 196";
    case "war-arc":
      return "after episode 251 (optional tie-in: 311)";
    case "war-arc-end":
      return "after episode 493";

    /* Boruto */
    case "byakuya-and-chunin-exams":
      return "after Boruto Chunin Exams (anime preferred)";

    default:
      return `after ${placementAfter}`;
  }
}

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <section className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
            Story Order
          </p>

          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            Naruto Movies
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Movies placed exactly where they fit in the timeline. Most are non-canon.
            <span className="text-white"> The Last</span> is part of the main story.
          </p>
        </section>

        {/* LEGEND */}
        <section className="mb-10 flex flex-wrap justify-center gap-4 text-sm">
          <span className="text-green-300">Must Watch</span>
          <span className="opacity-40">•</span>
          <span className="text-yellow-300">Optional</span>
          <span className="opacity-40">•</span>
          <span className="text-gray-500">Skip</span>
        </section>

        {/* MOVIES */}
        <div className="space-y-6">
          {movies.map((movie) => {
            const isTheLast = movie.id === "movie-the-last";
            const isRoadToNinja = movie.id === "movie-road-to-ninja";
            const isBorutoMovie = movie.id === "movie-boruto";
            const isBloodPrison = movie.id === "movie-blood-prison";

            return (
              <div key={movie.id} className="border-b border-white/5 pb-6">

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black">{movie.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {getPlacementLabel(movie.placementAfter)}
                    </p>
                  </div>

                  <span className={`text-xs font-bold ${getWatchTypeStyle(
                    isBloodPrison ? "skip" : movie.watchType
                  )}`}>
                    {getWatchTypeLabel(
                      isBloodPrison ? "skip" : movie.watchType
                    )}
                  </span>
                </div>

                {/* DEFAULT NOTE */}
                {movie.note && !isRoadToNinja && !isTheLast && !isBorutoMovie && !isBloodPrison && (
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    {movie.note}
                  </p>
                )}

                {/* BLOOD PRISON (FIXED) */}
                {isBloodPrison && (
                  <p className="mt-3 text-sm leading-7 text-gray-300">
                    Non-canon with no Kishimoto involvement. Skip on first watch.
                  </p>
                )}

                {/* ROAD TO NINJA (UPGRADED) */}
                {isRoadToNinja && (
                  <>
                    <p className="mt-3 text-sm leading-7 text-gray-300">
                      Skip on first watch. Story by Masashi Kishimoto. Explores an alternate version of Naruto’s life and characters.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-purple-300">
                      Kishimoto story
                    </div>

                    <div className="mt-4 rounded-xl bg-yellow-500/10 px-4 py-3 text-sm text-gray-300">
                      More meaningful than other non-canon movies.
                    </div>
                  </>
                )}

                {/* THE LAST */}
                {isTheLast && (
                  <div className="mt-4 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-gray-300">
                    <span className="text-green-300 font-semibold">Important:</span> part of the main story. Watch after episode 493.
                  </div>
                )}

                {/* BORUTO MOVIE */}
                {isBorutoMovie && (
                  <div className="mt-4 rounded-xl bg-blue-500/10 px-4 py-3 text-sm text-gray-300">
                    <span className="text-blue-300 font-semibold">Canon:</span> anime version covers this better. Watch anime instead.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}