"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StepCardLinkProps = {
  href: string;
  progressId: string;
  children: React.ReactNode;
};

const STORAGE_KEY = "naruto-watch-program-progress";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden";
  slug: string;
  title: string;
};

export default function StepCardLink({
  href,
  progressId,
  children,
}: StepCardLinkProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
    const exists = saved.some((item) => item.id === progressId);
    setIsComplete(exists);
  }, [progressId]);

  return (
    <Link
      href={href}
      className={`block border rounded-2xl p-6 transition ${
        isComplete
          ? "border-gray-800 opacity-75 hover:opacity-100 hover:border-orange-500"
          : "border-gray-700 hover:border-orange-500"
      }`}
    >
      {isComplete && (
        <p className="text-sm text-green-300 mb-3 font-medium">✓ Complete</p>
      )}

      {children}
    </Link>
  );
}