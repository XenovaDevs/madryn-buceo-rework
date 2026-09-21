"use client";

import { Children, type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useGSAP(
    () => {
      if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = root.current.querySelectorAll("span");
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            end: "bottom 46%",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block">
          {word}{index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </p>
  );
}

export function DetailStack({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-detail-stack-card]", root.current);
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              y: 36,
              scale: 0.985,
              opacity: 0.4,
              filter: "brightness(0.72)",
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: "brightness(1)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 62%",
                scrub: 0.55,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative ${className}`}>
      {Children.map(children, (child) => (
        <div data-detail-stack-card className="relative mb-8 origin-top bg-[#090b0c]">
          {child}
        </div>
      ))}
    </div>
  );
}
