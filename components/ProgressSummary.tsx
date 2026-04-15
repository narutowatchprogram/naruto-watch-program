"use client";

import { useEffect, useState } from "react";

type ProgressSummaryProps = {
  series: "naruto" | "shippuden";
  totalSteps: number;
};

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";

export default function ProgressSummary({
  series,
  totalSteps,
}: ProgressSummaryProps) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
    const count = saved.filter((item) => item.series === series).length;
    setCompletedCount(count);
  }, [series]);

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="border border-gray-800 rounded-2xl p-4 bg-white/5">
        <p className="text-sm text-gray-400 mb-1">Your Progress</p>
        <p className="text-lg font-semibold text-white">
          {completedCount} of {totalSteps} steps completed
        </p>
      </div>
    </div>
  );
}