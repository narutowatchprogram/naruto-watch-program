"use client";

import { useParams } from "next/navigation";
import { shippudenSteps } from "@/data/shippudenSteps";
import SeriesStepPage from "../../../components/SeriesStepPage";

export default function ShippudenStepPage() {
  const params = useParams();
  const slug = params.slug as string;

  const step = shippudenSteps.find((s) => s.slug === slug);

  return (
    <SeriesStepPage
      series="shippuden"
      backHref="/shippuden"
      backLabel="Back to Shippuden"
      step={step}
      steps={shippudenSteps}
      accentColor="orange"
    />
  );
}