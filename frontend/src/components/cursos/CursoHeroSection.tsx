"use client";

import { FormattedMessage } from "react-intl";
import PageHero from "@/components/ui/PageHero";

export default function CursoHeroSection() {
  return (
    <PageHero
      title={<FormattedMessage id="courses.padi.title" />}
      subtitle={<FormattedMessage id="courses.padi.description" />}
      image="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/cursos/G0135558_yojydu.jpg"
      alt="Curso PADI en Puerto Madryn"
      eyebrow="Formación internacional"
    />
  );
}
