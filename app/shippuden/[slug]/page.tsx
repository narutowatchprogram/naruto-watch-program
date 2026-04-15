import Link from "next/link";
import { shippudenSteps } from "@/data/shippudenSteps";
import ProgressToggle from "@/components/ProgressToggle";

function getInstructionStyle(instruction: string) {
  const value = instruction.toLowerCase();

  if (value.includes("skip for the main watch program")) {
    return "bg-red-500/15 text-red-300 border-red-500/30";
  }

  if (value.includes("watch core episodes") || value.includes("watch episodes")) {
    return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
  }

  return "bg-green-500/15 text-green-300 border-green-500/30";
}

export default async function ShippudenStepDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stepIndex = shippudenSteps.findIndex((item) => item.slug === slug);
  const step = shippudenSteps[stepIndex];
  const nextStep = stepIndex >= 0 ? shippudenSteps[stepIndex + 1] : null;
  const prevStep = stepIndex > 0 ? shippudenSteps[stepIndex - 1] : null;

  if (!step) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <p className="text-lg">Step not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/shippuden"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Shippuden
          </Link>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-gray-400 mb-3">Episodes: {step.episodes}</p>
            <h1 className="text-4xl font-bold">{step.title}</h1>
          </div>

          <ProgressToggle
            series="shippuden"
            slug={step.slug}
            title={step.title}
          />
        </div>

        <section className="border border-gray-700 rounded-2xl p-6 mb-8">
          <p className="text-sm text-gray-400 mb-2">Main Instruction</p>
          <div
            className={`inline-block rounded-full border px-4 py-2 text-sm font-semibold mb-4 ${getInstructionStyle(
              step.instruction
            )}`}
          >
            {step.instruction}
          </div>

          <p className="text-gray-300 leading-7">{step.watchNotes}</p>
        </section>

        <div className="grid gap-4 mb-10 md:grid-cols-2">
          <div className="border border-gray-700 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">Skip</p>
            <p className="text-white leading-7">{step.skip}</p>
          </div>

          <div className="border border-gray-700 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-2">Optional Later</p>
            <p className="text-white leading-7">{step.optionalLater}</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 leading-7">{step.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Why It Matters</h2>
            <p className="text-gray-300 leading-7">{step.whyItMatters}</p>
          </section>

          <section className="border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">After You Watch</h2>
            <p className="text-gray-300 leading-7">{step.prompt}</p>
          </section>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <div>
            {prevStep ? (
              <Link
                href={`/shippuden/${prevStep.slug}`}
                className="inline-block border border-gray-700 rounded-full px-5 py-3 text-sm hover:border-white transition"
              >
                ← {prevStep.title}
              </Link>
            ) : (
              <span className="text-sm text-gray-600">Start of Shippuden</span>
            )}
          </div>

          <div>
            {nextStep ? (
              <Link
                href={`/shippuden/${nextStep.slug}`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                Next Step: {nextStep.title} →
              </Link>
            ) : (
              <span className="text-sm text-gray-600">End of Shippuden</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}