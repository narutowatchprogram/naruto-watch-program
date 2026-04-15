"use client";

import { useEffect, useState } from "react";

type ProgressToggleProps = {
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

const STORAGE_KEY = "naruto-watch-program-progress";

export default function ProgressToggle({
  series,
  slug,
  title,
}: ProgressToggleProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const id = `${series}:${slug}`;

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
    const exists = saved.some((item) => item.id === id);

    setIsComplete(exists);
    setIsLoaded(true);
  }, [id]);

  function toggleProgress() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];

    if (isComplete) {
      const updated = saved.filter((item) => item.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsComplete(false);
      return;
    }

    const updated: SavedProgressItem[] = [
      ...saved,
      {
        id,
        series,
        slug,
        title,
      },
    ];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsComplete(true);
  }

  if (!isLoaded) {
    return (
      <button
        type="button"
        className="rounded-full border border-gray-700 px-5 py-3 text-sm text-gray-400"
        disabled
      >
        Loading progress...
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleProgress}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
        isComplete
          ? "border border-green-500/30 bg-green-500/15 text-green-300 hover:bg-green-500/20"
          : "bg-orange-500 text-white hover:bg-orange-600"
      }`}
    >
      {isComplete ? "✓ Marked Complete" : "Mark Step Complete"}
    </button>
  );
}