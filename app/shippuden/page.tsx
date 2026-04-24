"use client";

import { shippudenSteps } from "@/data/shippudenSteps";
import SeriesProgramPage from "../../components/SeriesProgramPage";

export default function ShippudenPage() {
  return (
    <SeriesProgramPage
      series="shippuden"
      steps={shippudenSteps}
      title="Shippuden"
      subtitle="Continue the core story from Part 1. All required arcs are canon, with some mixed episodes handled inside each arc. Filler and optional anime material are separated so the main path stays clean."
      accentColor="orange"
      nextHref="/boruto"
      nextLabel="Boruto"
      nextDescription="Boruto continues the world after Naruto if you want to go beyond the main story ending."
    />
  );
}