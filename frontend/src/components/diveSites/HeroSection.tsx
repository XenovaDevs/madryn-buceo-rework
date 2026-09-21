"use client";

import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import DetailHero from "@/components/detail/DetailHero";

export default function HeroSection({ title, heroImage, miniDescription }: { title: ReactNode; heroImage: string; miniDescription: ReactNode }) {
  return (
    <DetailHero
      title={title}
      subtitle={miniDescription}
      image={heroImage}
      alt="Puntos de buceo en Puerto Madryn"
      parentHref="/buceo/buceo-certificado"
      parentLabel={<FormattedMessage id="diveSites.certifiedDiving" defaultMessage="Buceo certificado" />}
      actionHref="/contacto"
      actionLabel={<FormattedMessage id="requestInfo" defaultMessage="Consultar salida" />}
    />
  );
}
