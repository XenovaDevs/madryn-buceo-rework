"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import { SharedDetailTransition } from "@/components/detail/SharedDetailTransition";

export default function ExcursionCard({
  title,
  description,
  image,
  link,
  slug,
  index,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
  slug: string;
  bg?: boolean;
  index?: number;
}) {
  const intl = useIntl();
  const translatedTitle = intl.formatMessage({ id: title });

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#14181a] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/25">
      <Link href={link} className="relative block aspect-[4/3] overflow-hidden">
        <SharedDetailTransition id={`excursion-${slug}`} role="image">
          <Image
            src={image}
            alt={translatedTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        </SharedDetailTransition>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0e]/75 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 border border-white/25 bg-black/35 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[.18em] text-white backdrop-blur-md">
          {typeof index === "number" ? `0${index + 1}` : "Patagonia"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <SharedDetailTransition id={`excursion-${slug}`} role="title">
          <h3 className="min-h-[3.6rem] font-display text-3xl font-bold uppercase leading-[.95] text-white transition-colors group-hover:text-rojo">
            <FormattedMessage id={title} />
          </h3>
        </SharedDetailTransition>
        <SharedDetailTransition id={`excursion-${slug}`} role="description">
          <p className="mt-4 flex-1 text-sm leading-7 text-white/58">
            <FormattedMessage id={description} />
          </p>
        </SharedDetailTransition>
        <Link
          href={link}
          className="mt-6 flex min-h-11 items-center justify-between border-t border-white/10 pt-5 text-xs font-extrabold uppercase tracking-[.12em] text-white"
          aria-label={`${intl.formatMessage({ id: "excursionCard.button.moreInfo" })}: ${translatedTitle}`}
        >
          <span>
            <FormattedMessage id="excursionCard.button.moreInfo" />
            <span className="sr-only">: {translatedTitle}</span>
          </span>
          <span className="grid size-9 place-items-center bg-rojo text-white transition-transform group-hover:rotate-6">
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}
