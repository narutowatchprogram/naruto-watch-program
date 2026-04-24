"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StepCardLinkProps = {
  href: string;
  progressId: string;
  children: React.ReactNode;
  locked?: boolean;
};

const STORAGE_KEY = "naruto-watch-program-progress";

type SavedProgressItem = {
  id: string;
  series: "naruto" | "shippuden" | "boruto";
  slug: string;
  title: string;
};

export default function StepCardLink({
  href,
  progressId,
  children,
  locked = false,
}: StepCardLinkProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const saved: SavedProgressItem[] = raw ? JSON.parse(raw) : [];
    const exists = saved.some((item) => item.id === progressId);
    setIsComplete(exists);
  }, [progressId]);

  if (locked) {
    return (
      <div className="block rounded-2xl border border-gray-800 bg-white/[0.03] p-6">
        {children}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "group relative block overflow-hidden rounded-2xl border p-0 transition-all duration-200",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
        isComplete
          ? "border-green-500/20 opacity-85 hover:border-green-400/35 hover:opacity-100"
          : "border-white/10 hover:border-orange-400/35",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[300%]" />
      </span>

      <span className="relative z-10 block">{children}</span>
    </Link>
  );
}