import { Award } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import Image from "next/image";

export default function CursosIntroSection() {
  const imagen =
    "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/buceo/GOPR1373_yz9rgw.jpg";
  const logo =
    "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/cursos/padi.webp";

  const intl = useIntl();
  return (
    <section className="section-space relative w-full pb-4">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-32 items-center justify-center bg-white p-2">
            <Image
              src={logo}
              alt="Certificación PADI"
              width={128}
              height={48}
              className="object-contain"
            />
          </div>

          <p className="eyebrow">Centro PADI oficial</p>
          <h2 className="section-title mt-5 mb-7 text-white">
            <FormattedMessage id="courses.padi.subTitle.1" />
          </h2>

          <p
            className="text-white/60 mb-4 leading-8 [&_span]:!text-rojo"
            dangerouslySetInnerHTML={{
              __html: String(intl.messages["courses.padi.description.1"] ?? ""),
            }}
          />

          <p
            className="text-white/60 mb-4 leading-8 [&_span]:!text-rojo"
            dangerouslySetInnerHTML={{
              __html: String(intl.messages["courses.padi.description.2"] ?? ""),
            }}
          />

          <p
            className="text-white/60 mb-4 leading-8 [&_span]:!text-rojo"
            dangerouslySetInnerHTML={{
              __html: String(intl.messages["courses.padi.description.3"] ?? ""),
            }}
          />

          <p
            className="text-white/60 mb-4 leading-8 [&_span]:!text-rojo"
            dangerouslySetInnerHTML={{
              __html: String(intl.messages["courses.padi.description.4"] ?? ""),
            }}
          />

          <p
            className="text-white/60 mb-4 leading-8 [&_span]:!text-rojo"
            dangerouslySetInnerHTML={{
              __html: String(intl.messages["courses.padi.description.5"] ?? ""),
            }}
          />
        </div>

        <div className="relative min-h-[32rem] overflow-hidden">
          <Image
            src={imagen}
            alt="Buceo en Puerto Madryn"
            className="absolute inset-0 w-full h-full object-cover"
            width={800}
            height={600}
            priority
          />

          <div className="absolute bottom-5 left-5 z-20 border border-white/20 bg-black/60 p-3 backdrop-blur-sm">
            <div className="inline-flex items-center text-white font-medium text-sm">
              <Award className="w-4 h-4 mr-2" />
              <FormattedMessage id="courses.padi.badge.1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
