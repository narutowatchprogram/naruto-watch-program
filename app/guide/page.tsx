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
                Avoid Naruto content online while watching. Memes, clips,
                rankings, openings, theories, and even friends can spoil major
                moments fast. It&apos;s life and death tbh.
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
                  Follow the main path and save extras for later.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-green-300 transition group-hover:text-green-200">
                  Jump to watch flow →
                </p>
              </a>
  
              <a href="#labels" className="group block">
                <p className="text-sm font-bold text-white">Returning viewer</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Clean up your route and avoid filler detours.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300 transition group-hover:text-yellow-200">
                  Jump to labels →
                </p>
              </a>
  
              <a href="#optional-content" className="group block">
                <p className="text-sm font-bold text-white">Finishing the run</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Come back for optional arcs, novels, and recommended filler.
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
  
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-green-400/15 bg-green-400/[0.04] p-4">
                <p className="font-bold text-green-300">Main Path</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Core story. Your progress follows this.
                </p>
              </div>
  
              <div className="rounded-2xl border border-yellow-300/15 bg-yellow-300/[0.04] p-4">
                <p className="font-bold text-yellow-300">Mixed Canon</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Canon with anime additions. Still watch it.
                </p>
              </div>
  
              <div className="rounded-2xl border border-blue-300/15 bg-blue-300/[0.04] p-4">
                <p className="font-bold text-blue-300">Optional Later</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Filler, novels, and extras after the story.
                </p>
              </div>
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
                Naruto content online. Social algorithms will catch up and cook
                you fast.
              </p>
              <p>
                <span className="font-bold text-white">Rule 2:</span> Be wary of
                Naruto friends. Only discuss something after you finish it.
              </p>
              <p>
                <span className="font-bold text-white">Rule 3:</span> Try not to
                look at episode titles. Arc titles here are slightly tweaked for
                first-time viewers.
              </p>
              <p>
                <span className="font-bold text-white">Rule 4:</span> If
                something feels off, you may be in filler. Mixed canon is
                different and should still be watched.
              </p>
              <p>
                <span className="font-bold text-white">Rule 5:</span> Skipping
                filler does not mean missing the real story. It protects the
                pacing.
              </p>
              <p className="border-l border-blue-400/40 pl-4">
                <span className="font-bold text-white">Rule 6:</span> Sub (Japanese) is highly
                recommended, but dub (English) is fine if that is
                your preference.
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
              Naruto openings are part of the experience, but many show future
              fights, forms, or matchups early. If you are mid-arc, skip the
              opening and come back after finishing that arc.
            </p>
  
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-bold text-white">Good default rule</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Skip openings during an arc. Watch them after the arc ends.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Why</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Naruto and especially Shippuden openings can get spoiler-heavy
                  once an arc is underway.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Usually safe</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Early Part 1 and the start of a major section are usually safer.
                </p>
              </div>
  
              <div>
                <p className="font-bold text-white">Be more careful</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Mid-arc and late-arc openings are where spoilers show up most.
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
                    Openings are less dangerous early on. Be more careful during
                    Chunin Exams, Konoha Crush, and Sasuke Retrieval, but Part 1 is
                    generally manageable.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Akatsuki Suppression through Pain
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Be strict here. Skip openings during the Itachi / Jiraiya /
                    Pain stretch and watch them after each arc instead.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Five Kage Summit onward
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Late-game openings can show major future matchups. Save them
                    until after the arc.
                  </p>
                </div>
  
                <div>
                  <p className="font-bold text-white">
                    Shippuden: Fourth Great Ninja War
                  </p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Highest-risk section. Treat war-era openings as spoiler land.
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
                      Real story material with anime additions. Watch these.
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
                      Optional. Worth checking out later, but not required for
                      completion.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-gray-500" />
                  <div>
                    <p className="font-bold text-white">Filler</p>
                    <p className="text-sm leading-6 text-gray-300">
                      Skip on your first clean run.
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
                  <span className="font-bold text-white">Canon</span> = the main
                  story from the manga or author-backed material.
                </p>
                <p>
                  <span className="font-bold text-white">Filler</span> =
                  anime-added material outside the main story path.
                </p>
                <p>
                  Skipping filler protects pacing. It does not cut out the real
                  story.
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
                  Save optional material for later so it adds to the experience
                  instead of breaking momentum.
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
                <p className="font-bold text-white">
                  What counts toward progress?
                </p>
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