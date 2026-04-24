export default function GuidePage() {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <section className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
              Guide
            </p>
  
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Watching Naruto
            </h1>
  
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Stick close to manga canon and protect your first experience from
              spoilers.
            </p>
  
            <div className="mt-7 border-l-2 border-orange-400/50 pl-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
                Spoiler warning
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                Do not engage with Naruto content online. No memes, arcs,
                openings, clips, rankings, or theories. And do not trust people
                who already know the series. It's life and death tbh.
              </p>
            </div>
          </section>
  
          <section className="mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              Start here
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Pick your path
            </h2>
  
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <a href="#watch-flow" className="group block">
                <p className="text-sm font-bold text-white">New viewer</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Follow the main path, watch mixed canon, ignore the rest for
                  now.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-green-300 transition group-hover:text-green-200">
                  Jump to watch flow →
                </p>
              </a>
  
              <a href="#labels" className="group block">
                <p className="text-sm font-bold text-white">Returning viewer</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Use this guide to clean up your route and avoid random filler
                  detours.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300 transition group-hover:text-yellow-200">
                  Jump to labels →
                </p>
              </a>
  
              <a href="#optional-content" className="group block">
                <p className="text-sm font-bold text-white">Finishing the run</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  After the core story, go back for optional arcs, novels, and
                  recommended filler.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-300 transition group-hover:text-blue-200">
                  Jump to optional content →
                </p>
              </a>
            </div>
          </section>
  
          <section id="watch-flow" className="mb-14 scroll-mt-24">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              Watch flow
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              The simple path
            </h2>
  
            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <div className="sm:flex-1">
                <p className="font-bold text-green-300">Main Path</p>
                <p className="mt-1 leading-6 text-gray-300">Manga canon first</p>
              </div>
  
              <div className="hidden text-gray-500 sm:block">→</div>
  
              <div className="sm:flex-1">
                <p className="font-bold text-yellow-300">Mixed Canon</p>
                <p className="mt-1 leading-6 text-gray-300">
                  Watch it. Important material is here.
                </p>
              </div>
  
              <div className="hidden text-gray-500 sm:block">→</div>
  
              <div className="sm:flex-1">
                <p className="font-bold text-blue-300">Optional Later</p>
                <p className="mt-1 leading-6 text-gray-300">
                  Filler, novels, and extras after the core story
                </p>
              </div>
            </div>
          </section>
  
          <section className="mb-14 grid gap-7 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                1
              </p>
              <h2 className="mt-2 text-lg font-black">Follow the main path</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Manga canon drives the core experience and your progress.
              </p>
            </div>
  
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                2
              </p>
              <h2 className="mt-2 text-lg font-black">Watch mixed canon</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Do not skip these. They can contain important story material.
              </p>
            </div>
  
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                3
              </p>
              <h2 className="mt-2 text-lg font-black">Save extras for later</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Optional content is best after the main story, not during it.
              </p>
            </div>
          </section>
  
          <section className="mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              Your ninja way
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              How to protect your first watch
            </h2>
  
            <div className="mt-6 space-y-5 text-sm leading-6 text-gray-300">
              <p>
                <span className="font-bold text-white">Rule 1:</span> Avoid
                Naruto content online completely while watching. Social algorithms
                will catch up and quickly cook you.
              </p>
              <p>
                <span className="font-bold text-white">Rule 2:</span> Be weary of
                Naruto friends. Only discuss something after it is finished.
              </p>
              <p>
                <span className="font-bold text-white">Rule 3:</span> Try not to
                look at episode titles. Arc titles on the program are slightly
                tweaked to protect the first view.
              </p>
              <p>
                <span className="font-bold text-white">Rule 4:</span> If
                something feels off, you may be in filler. Filler usually breaks
                pacing or pulls away from the real story. Mixed canon is
                different. Still watch mixed canon.
              </p>
              <p>
                <span className="font-bold text-white">Rule 5:</span> You are not
                missing any real content by skipping filler so keep the FOMO in
                check.
              </p>
              <p className="border-l border-blue-400/40 pl-4">
                <span className="font-bold text-white">Rule 6:</span> Japanese
                voice acting (sub) is highly recommended. The sub usually hits
                harder, but dub (English) is still fine if you have a strong
                preference.
              </p>
            </div>
          </section>
  
          <section className="mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-300">
              Openings
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Watch them when they are safe
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Naruto openings (intro theme montages) are part of the experience.
              The issue is that a lot of them show fights, forms, or future
              matchups early. The safest rule is simple: if you are mid-arc, skip
              the opening and come back to it after you finish that arc.
            </p>
  
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-bold text-white">Good default rule</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  If you are in the middle of an arc, skip the opening. Once you
                  finish that arc, go back and watch it.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Why</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Community consensus is that Naruto and especially Shippuden
                  openings can get very spoiler-heavy once an arc is underway.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Usually safe</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Early Part 1 and the very start of a new major section are
                  usually safer. If an opening is brand new and you have not
                  really started that arc yet, you are normally fine.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Be more careful</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Mid-arc and late-arc openings are where Naruto tends to show
                  spoilers too early.
                </p>
              </div>
            </div>
  
            <div className="mt-8 border-l border-purple-400/30 pl-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-300">
                Conservative skip list
              </p>
  
              <div className="mt-5 space-y-5">
                <div>
                  <p className="font-bold text-white">Naruto Part 1</p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Openings are less dangerous early on, but once you are in the
                    back half of Chunin Exams, Konoha Crush, or Sasuke Retrieval,
                    skip the opening until you finish that arc. But honestly, you
                    can get away with watching all of part 1 openings.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Akatsuki Suppression through Pain
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Skip these at all costs. This is where fans most often start
                    calling out spoiler openings. Be strict here. Skip openings
                    during the Itachi / Jiraiya / Pain stretch and watch them
                    after each arc instead.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Five Kage Summit onward
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Once the story enters the late-game, openings become much
                    riskier. Assume they can show major future matchups and save
                    them until after the arc.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Fourth Great Ninja War
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    This is the highest-risk section by far. Treat war-era
                    openings as spoiler land. Skip them during the arc and come
                    back later.
                  </p>
                </div>
              </div>
            </div>
  
            <div className="mt-6 border-l border-blue-400/40 pl-5">
              <p className="font-bold text-white">
                Best way to still enjoy them
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Finish an arc, then go back and watch its opening right after.
                That way you still get the music and visuals without letting the
                opening leak future moments into your first run.
              </p>
            </div>
          </section>
  
          <section className="mb-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div id="labels" className="scroll-mt-24">
              <h2 className="text-2xl font-black tracking-tight">
                What the labels mean
              </h2>
  
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div>
                    <p className="font-bold text-white">Manga canon</p>
                    <p className="text-sm leading-6 text-gray-300">
                      The main story. This comes first.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <div>
                    <p className="font-bold text-white">Mixed canon</p>
                    <p className="text-sm leading-6 text-gray-300">
                      Watch it. These sections mix real story material with
                      anime-added material, so skipping them can be messy.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-blue-400" />
                  <div>
                    <p className="font-bold text-white">
                      Anime canon / novel adaptation
                    </p>
                    <p className="text-sm leading-6 text-gray-300">
                      Optional. Some are worth it, but they do not define
                      completion.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gray-500" />
                  <div>
                    <p className="font-bold text-white">Filler</p>
                    <p className="text-sm leading-6 text-gray-300">
                      Skip on your first clean run. This is anime-added material
                      outside the main story path.
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <div>
              <h2 className="text-2xl font-black tracking-tight">Progress</h2>
  
              <div className="mt-5 space-y-4 text-sm leading-6 text-gray-300">
                <p>
                  <span className="font-bold text-white">
                    Counts toward progress:
                  </span>{" "}
                  Main-path manga canon
                </p>
                <p>
                  <span className="font-bold text-white">Core completion:</span>{" "}
                  Naruto + Shippuden
                </p>
                <p>
                  <span className="font-bold text-white">Boruto:</span> Optional
                  follow-up
                </p>
              </div>
            </div>
          </section>
  
          <section className="mb-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Canon vs filler
              </h2>
  
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
                <p>
                  <span className="font-bold text-white">Canon</span> = story
                  from the manga or the author-backed main story.
                </p>
                <p>
                  <span className="font-bold text-white">Filler</span> =
                  anime-added material outside the main story path.
                </p>
                <p>
                  Filler existed because older weekly anime had to buy time while
                  the manga stayed ahead.
                </p>
                <p>
                  That is why skipping filler now does not mean missing the real
                  story. It means cutting out pacing problems.
                </p>
              </div>
            </div>
  
            <div id="optional-content" className="scroll-mt-24">
              <h2 className="text-2xl font-black tracking-tight">
                Optional content
              </h2>
  
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
                <p>Watch all mixed canon during your main run.</p>
                <p>
                  Save most optional material for later so it adds to the
                  experience instead of breaking momentum.
                </p>
                <p>
                  Some filler is genuinely fun and worth seeing later when placed
                  intentionally.
                </p>
                <p>
                  Come back for extras after the core story if you want the fuller
                  Naruto experience.
                </p>
              </div>
            </div>
          </section>
  
          <section className="pb-10">
            <h2 className="text-2xl font-black tracking-tight">FAQ</h2>
  
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-bold text-white">What counts toward progress?</p>
                <p className="mt-1 text-sm leading-6 text-gray-300">
                  Main-path manga canon.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">
                  Do I need to watch every episode?
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-300">
                  No. The goal is the best first experience.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Are optional arcs worth it?</p>
                <p className="mt-1 text-sm leading-6 text-gray-300">
                  Some are, especially later when they no longer break pacing.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">
                  Is Boruto part of completion?
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-300">
                  No. It is optional follow-up content.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }