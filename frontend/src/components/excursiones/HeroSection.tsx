"use client";

import { FormattedMessage, useIntl } from "react-intl";
import DetailHero from "@/components/detail/DetailHero";

interface HeroSectionProps {
  title: string;
  heroImage: string;
  miniDescription: string;
  slug: string;
  callToAction: { href: string };
  altText: string;
}

export default function HeroSection({ title, heroImage, miniDescription, slug, callToAction }: HeroSectionProps) {
  const intl = useIntl();
  return (
    <DetailHero
      title={<FormattedMessage id={title} />}
      subtitle={<FormattedMessage id={miniDescription} />}
      image={heroImage}
      alt={intl.formatMessage({ id: title })}
      parentHref="/#actividades"
      parentLabel="Excursiones"
      actionHref={callToAction.href}
      actionLabel={<FormattedMessage id="hero.button.bookNow" />}
      transitionId={`excursion-${slug}`}
    />
  );
}
