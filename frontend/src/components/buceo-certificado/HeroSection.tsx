"use client";

import { FormattedMessage } from "react-intl";
import DetailHero from "@/components/detail/DetailHero";

export default function HeroSection({ heroImage }: { heroImage: string; title?: string; miniDescription?: string }) {
  return (
    <DetailHero
      title={<FormattedMessage id="diveCertification.title" />}
      subtitle={<FormattedMessage id="diveCertification.miniDescription" />}
      image={heroImage}
      alt="Buceo para personas certificadas en Puerto Madryn"
      parentHref="/buceo/puntos-de-buceo"
      parentLabel={<FormattedMessage id="diving.spots" defaultMessage="Puntos de buceo" />}
      actionHref="/contacto"
      actionLabel={<FormattedMessage id="diveCertification.button" />}
    />
  );
}
