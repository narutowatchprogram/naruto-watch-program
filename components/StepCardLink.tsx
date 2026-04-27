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
      aria-label="Open arc details"
      className={[
        "group relative block overflow-hidden rounded-2xl border p-0 transition-all duration-200",
        "active:translate-y-0 active:scale-[0.985]",
        "sm:hover:-translate-y-0.5",
        "before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-orange-300/35 before:to-transparent before:opacity-100 before:transition before:duration-300 sm:before:opacity-0 sm:hover:before:opacity-100",
        isComplete
          ? "border-green-500/20 opacity-90 shadow-[0_0_22px_rgba(34,197,94,0.08)] hover:border-green-400/35 hover:opacity-100"
          : "border-orange-400/20 shadow-[0_0_20px_rgba(249,115,22,0.055)] hover:border-orange-400/35 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]",
      ].join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
        <span className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(249,115,22,0.075),transparent_36%)]" />
      </span>

      <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center gap-1 rounded-full border border-orange-400/25 bg-orange-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-200/85 shadow-[0_0_16px_rgba(249,115,22,0.08)] sm:hidden">
        Open
        <span aria-hidden="true">→</span>
      </span>

      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 sm:group-hover:opacity-100">
        <span className="absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md transition-transform duration-700 sm:group-hover:translate-x-[300%]" />
      </span>

      <span className="relative z-10 block">{children}</span>
    </Link>
  );
}