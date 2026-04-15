"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";

export default function ResumeButtons() {
  const [narutoHref, setNarutoHref] = useState("/program");
  const [narutoLabel, setNarutoLabel] = useState("Start Naruto Part 1");
  const [narutoSub, setNarutoSub] = useState("");

  const [shippudenHref, setShippudenHref] = useState("/shippuden");
  const [shippudenLabel, setShippudenLabel] = useState("Go to Shippuden");
  const [shippudenSub, setShippudenSub] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

    const completedNaruto = new Set(
      saved.filter((item) => item.series === "naruto").map((item) => item.slug)
    );

    const completedShippuden = new Set(
      saved
        .filter((item) => item.series === "shippuden")
        .map((item) => item.slug)
    );

    const nextNarutoStep = steps.find((step) => !completedNaruto.has(step.slug));
    const nextShippudenStep = shippudenSteps.find(
      (step) => !completedShippuden.has(step.slug)
    );

    const completedNarutoCount = steps.filter((step) =>
      completedNaruto.has(step.slug)
    ).length;

    const completedShippudenCount = shippudenSteps.filter((step) =>
      completedShippuden.has(step.slug)
    ).length;

    if (completedNarutoCount > 0 && nextNarutoStep) {
      setNarutoHref(`/program/${nextNarutoStep.slug}`);
      setNarutoLabel("Continue Naruto Part 1");
      setNarutoSub(`Next: ${nextNarutoStep.title}`);
    }

    if (completedShippudenCount > 0 && nextShippudenStep) {
      setShippudenHref(`/shippuden/${nextShippudenStep.slug}`);
      setShippudenLabel("Continue Shippuden");
      setShippudenSub(`Next: ${nextShippudenStep.title}`);
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href={narutoHref}
        className="flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
      >
        <span>{narutoLabel}</span>
        {narutoSub && (
          <span className="text-xs text-white/80 mt-1">{narutoSub}</span>
        )}
      </Link>

      <Link
        href={shippudenHref}
        className="flex flex-col items-center justify-center border border-gray-700 hover:border-white text-white font-semibold px-6 py-3 rounded-full transition"
      >
        <span>{shippudenLabel}</span>
        {shippudenSub && (
          <span className="text-xs text-gray-400 mt-1">{shippudenSub}</span>
        )}
      </Link>
    </div>
  );
}