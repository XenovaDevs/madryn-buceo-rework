"use client";

import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import PageHero from "@/components/ui/PageHero";
import ButtonRojo from "@/components/ui/button-rojo";

export default function HeroSection({ title, heroImage, miniDescription }: { title: string; heroImage: string; miniDescription: ReactNode }) {
  return <PageHero title={title} subtitle={miniDescription} image={heroImage} alt={title} eyebrow="Escuelas y grupos" action={<ButtonRojo texto={<FormattedMessage id="contact.us" />} href="/contacto" />} />;
}
