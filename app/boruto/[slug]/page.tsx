"use client";

import { useParams } from "next/navigation";
import { borutoSteps } from "@/data/borutoSteps";
import SeriesStepPage from "../../../components/SeriesStepPage";

export default function BorutoStepPage() {
  const params = useParams();
  const slug = params.slug as string;

  const step = borutoSteps.find((s) => s.slug === slug);

  return (
    <SeriesStepPage
      series="boruto"
      backHref="/boruto"
      backLabel="Back to Boruto"
      step={step}
      steps={borutoSteps}
      accentColor="blue"
    />
  );
}