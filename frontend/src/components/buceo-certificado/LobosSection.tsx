"use client";

import Image from "next/image";
import { FormattedMessage } from "react-intl";
import ButtonRojo from "../ui/button-rojo";

export default function LobosSection() {
  return (
    <section className="relative isolate min-h-[42rem] overflow-hidden border-y border-white/10">
      <Image
        src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/buceo/IMG_2260_su53bd.jpg"
        alt="Buceo con lobos marinos en Puerto Madryn"
        fill
        sizes="100vw"
        className="-z-20 object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,11,12,.92)_0%,rgba(9,11,12,.72)_45%,rgba(9,11,12,.18)_100%),linear-gradient(0deg,rgba(9,11,12,.8),transparent_70%)]" />

      <div className="site-container flex min-h-[42rem] items-end py-14 md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
            <FormattedMessage id="diveCertification.seaLobos.title" />
          </h2>
          <p className="mt-7 text-lg leading-8 text-white/78">
            <FormattedMessage id="diveCertification.seaLobos.text" />
          </p>
          <p className="mt-3 text-base leading-8 text-white/66">
            <FormattedMessage id="diveCertification.seaLobos.text2" />
          </p>
          <div className="mt-8">
            <ButtonRojo texto={<FormattedMessage id="diveCertification.seaLobos.buttonSnorkeling" />} href="/excursiones/snorkeling-con-lobos" />
          </div>
        </div>
      </div>
    </section>
  );
}
