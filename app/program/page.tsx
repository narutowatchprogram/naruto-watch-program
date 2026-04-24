"use client";

import { steps } from "@/data/steps";
import SeriesProgramPage from "../../components/SeriesProgramPage";

export default function ProgramPage() {
  return (
    <SeriesProgramPage
      series="naruto"
      steps={steps}
      title="Part 1"
      subtitle="Follow the core story straight through. All required arcs are canon, with some mixed episodes handled inside each arc. Filler and movies are optional and clearly separated."
      accentColor="orange"
      nextHref="/shippuden"
      nextLabel="Shippuden"
      nextDescription="When Part 1 ends, continue directly into Shippuden to stay on the main story path."
    />
  );
}