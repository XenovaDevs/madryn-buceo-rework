"use client";

import { FormattedMessage, useIntl } from "react-intl";
import { ScrubText } from "@/components/detail/DetailMotion";

export default function DescriptionSection() {
  const intl = useIntl();
  const text = [
    "diveCertification.description2.text6.1",
    "diveCertification.description2.text6.2",
    "diveCertification.description2.text6.3",
  ].map((id) => intl.formatMessage({ id })).join(" ");

  return (
    <section className="py-28 md:py-36">
      <h2 className="max-w-4xl text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
        <FormattedMessage id="diveCertification.description2.title" />
      </h2>
      <ScrubText text={text} className="mt-10 max-w-6xl text-[clamp(1.4rem,2.55vw,2.65rem)] font-medium leading-[1.3] tracking-[-.025em] text-white" />
    </section>
  );
}
