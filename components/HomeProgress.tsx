"use client";

import { useEffect, useMemo, useState } from "react";
import { steps } from "@/data/steps";
import { shippudenSteps } from "@/data/shippudenSteps";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";

export default function HomeProgress() {
  const [narutoDone, setNarutoDone] = useState(0);
  const [shippudenDone, setShippudenDone] = useState(0);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

    setNarutoDone(saved.filter((item) => item.series === "naruto").length);
    setShippudenDone(saved.filter((item) => item.series === "shippuden").length);
  }, []);

  const narutoPercent = useMemo(() => {
    if (!steps.length) return 0;
    return Math.round((narutoDone / steps.length) * 100);
  }, [narutoDone]);

  const shippudenPercent = useMemo(() => {
    if (!shippudenSteps.length) return 0;
    return Math.round((shippudenDone / shippudenSteps.length) * 100);
  }, [shippudenDone]);

  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-gray-800 bg-white/5 p-6">
        <p className="mb-2 text-sm uppercase tracking-wide text-orange-300">
          Naruto
        </p>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Part 1</h2>
          <p className="text-sm text-gray-300">
            {narutoDone} / {steps.length}
          </p>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-300"
            style={{ width: `${narutoPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-gray-400">{narutoPercent}% through</p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-white/5 p-6">
        <p className="mb-2 text-sm uppercase tracking-wide text-orange-300">
          Naruto
        </p>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Shippuden</h2>
          <p className="text-sm text-gray-300">
            {shippudenDone} / {shippudenSteps.length}
          </p>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-300"
            style={{ width: `${shippudenPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-gray-400">{shippudenPercent}% through</p>
      </div>
    </section>
  );
}