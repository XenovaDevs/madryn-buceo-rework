"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ButtonRojoProps {
  texto: ReactNode;
  href?: string;
  fullWidth?: boolean;
  onAccent?: boolean;
  layoutId?: string;
  onClick?: () => void;
}

const baseClass =
  "group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap border border-rojo bg-rojo px-4 text-xs font-extrabold uppercase tracking-[.08em] text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#f02b2b] hover:bg-[#f02b2b] active:translate-y-0 sm:px-6 sm:text-sm";

const onAccentClass =
  "group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap border border-white bg-white px-4 text-xs font-extrabold uppercase tracking-[.08em] text-[#090b0c] shadow-[0_10px_30px_rgba(91,0,0,.22)] transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-[#090b0c] hover:text-white active:translate-y-0 sm:px-6 sm:text-sm";

export default function ButtonRojo({
  texto,
  href,
  fullWidth = false,
  onAccent = false,
  layoutId,
  onClick,
}: ButtonRojoProps) {
  const className = `${onAccent ? onAccentClass : baseClass} ${fullWidth ? "w-full" : ""}`;
  const content = (
    <>
      {texto}
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  const element = href ? (
    <Link
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {content}
    </Link>
  ) : (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );

  return layoutId ? (
    <motion.div layoutId={layoutId} className={fullWidth ? "w-full" : "w-fit"}>
      {element}
    </motion.div>
  ) : (
    element
  );
}
