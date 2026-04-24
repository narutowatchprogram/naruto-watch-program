"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Part 1" },
  { href: "/shippuden", label: "Shippuden" },
  { href: "/movies", label: "Movies" },
  { href: "/boruto", label: "Boruto" },
  { href: "/guide", label: "Guide" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-lg font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(249,115,22,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:text-orange-300 active:translate-y-0"
        >
          Naruto Watch Program
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative rounded-full px-3 py-1.5 font-medium transition-all duration-200 active:scale-[0.97]",
                  active
                    ? [
                        "text-white",
                        "border border-orange-400/40",
                        "bg-orange-500/10",
                        "shadow-[0_0_12px_rgba(249,115,22,0.35)]",
                      ].join(" ")
                    : [
                        "text-gray-400",
                        "hover:-translate-y-0.5",
                        "hover:bg-white/5",
                        "hover:text-white",
                      ].join(" "),
                ].join(" ")}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 opacity-80 blur-[1px]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}