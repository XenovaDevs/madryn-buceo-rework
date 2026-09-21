"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonNegroProps {
  texto: ReactNode;
  href: string;
  fullWidth?: boolean;
}

export default function ButtonNegro({ texto, href, fullWidth = false }: ButtonNegroProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 bg-transparent px-6 text-sm font-extrabold uppercase tracking-[.08em] text-white transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-rojo hover:bg-white/[.05] active:translate-y-0 ${fullWidth ? "w-full" : ""}`}
    >
      {texto}
      <ArrowUpRight className="size-4 text-rojo transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
