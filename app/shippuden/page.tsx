import { shippudenSteps } from "@/data/shippudenSteps";
import StepCardLink from "../../components/StepCardLink";
import ProgressSummary from "../../components/ProgressSummary";

function getInstructionStyle(instruction: string) {
  const value = instruction.toLowerCase();

  if (value.includes("skip for the main watch program")) {
    return "bg-red-500/15 text-red-300 border-red-500/30";
  }

  if (value.includes("skip episode") || value.includes("skip episodes")) {
    return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
  }

  return "bg-green-500/15 text-green-300 border-green-500/30";
}

export default function ShippudenPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-wide text-orange-300 mb-2">
          Naruto Watch Program
        </p>
        <h1 className="text-4xl font-bold mb-2">Naruto Shippuden</h1>
        <p className="text-gray-400">
          Continue the program here. Keep the momentum.
        </p>
      </div>

      <ProgressSummary series="shippuden" totalSteps={shippudenSteps.length} />

      <div className="max-w-3xl mx-auto space-y-6">
        {shippudenSteps.map((step, index) => (
          <StepCardLink
            key={step.slug}
            href={`/shippuden/${step.slug}`}
            progressId={`shippuden:${step.slug}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-2xl font-semibold leading-tight">
                Step {index + 1} — {step.title}
              </h2>

              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getInstructionStyle(
                  step.instruction
                )}`}
              >
                {step.instruction}
              </span>
            </div>

            <p className="text-gray-400 mb-3">Episodes: {step.episodes}</p>
            <p className="text-gray-300 mb-3">{step.note}</p>

            {(step.skip !== "None" || step.optionalLater !== "None") && (
              <div className="space-y-2 text-sm">
                {step.skip !== "None" && (
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Skip:</span> {step.skip}
                  </p>
                )}

                {step.optionalLater !== "None" && (
                  <p className="text-gray-400">
                    <span className="text-white font-medium">Optional Later:</span>{" "}
                    {step.optionalLater}
                  </p>
                )}
              </div>
            )}
          </StepCardLink>
        ))}
      </div>
    </main>
  );
}