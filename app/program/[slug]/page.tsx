"use client";

import { useParams } from "next/navigation";
import { steps } from "@/data/steps";
import SeriesStepPage from "../../../components/SeriesStepPage";

export default function ProgramStepPage() {
  const params = useParams();
  const slug = params.slug as string;

  const step = steps.find((s) => s.slug === slug);

  return (
    <SeriesStepPage
      series="naruto"
      backHref="/program"
      backLabel="Back to Part 1"
      step={step}
      steps={steps}
      accentColor="orange"
    />
  );
}