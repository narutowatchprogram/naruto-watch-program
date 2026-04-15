import ResumeButtons from "@/components/ResumeButtons";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <section className="text-center py-16">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300 mb-4">
            Naruto Watch Program
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            The Best Way to Experience Naruto
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-8 mb-8">
            A guided watch program for Naruto and Shippuden that tells you what to
            watch, what to skip, and how to keep the momentum without getting lost
            in filler.
          </p>

          <ResumeButtons />
        </section>

        <section className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <p className="text-sm uppercase tracking-wide text-orange-300 mb-2">
              Naruto Part 1
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              {steps.length} guided steps
            </h2>
            <p className="text-gray-300 leading-7">
              A cleaner first watch through the original series with filler
              guidance, watch notes, and clear stopping points.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <p className="text-sm uppercase tracking-wide text-orange-300 mb-2">
              Naruto Shippuden
            </p>
            <h2 className="text-2xl font-semibold mb-3">
              {shippudenSteps.length} guided steps
            </h2>
            <p className="text-gray-300 leading-7">
              A momentum-first path through Shippuden with cleaner war arc
              guidance and fewer pacing traps.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mt-12">
          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">Clean Watch Order</h2>
            <p className="text-gray-300 leading-7">
              Follow a clear step-by-step path instead of digging through random
              filler guides and episode lists.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">Filler Guidance</h2>
            <p className="text-gray-300 leading-7">
              Know what to skip, what to keep, and what can wait until later
              without ruining the experience.
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-xl font-semibold mb-3">Watch Notes That Matter</h2>
            <p className="text-gray-300 leading-7">
              Get the context behind each stretch so the series lands the way it
              should the first time through.
            </p>
          </div>
        </section>

        <section className="mt-16 border border-orange-500/30 bg-orange-500/10 rounded-2xl p-8">
          <p className="text-sm uppercase tracking-wide text-orange-300 mb-2">
            Built for first-time viewers
          </p>

          <h2 className="text-3xl font-semibold mb-4">
            Naruto should not feel confusing on your first watch
          </h2>

          <p className="text-gray-300 leading-8 max-w-3xl">
            The point of this program is simple: preserve the momentum, protect the
            emotional payoff, and help people experience Naruto the right way
            without getting buried in filler, mixed episodes, or bad watch advice.
          </p>
        </section>
      </div>
    </main>
  );
}