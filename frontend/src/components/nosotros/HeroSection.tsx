"use client";

import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";

export default function HeroSection({ title, heroImage, miniDescription }: { title: ReactNode; heroImage: string; miniDescription: ReactNode }) {
  return <PageHero title={title} subtitle={miniDescription} image={heroImage} alt="Equipo de Madryn Buceo" eyebrow="Nuestra historia · desde 1983" />;
}
