import Image from "next/image";
import { FormattedMessage } from "react-intl";
export default function CursoPorqueSection() {

  const logo = "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/cursos/padi.webp";

  return (
    <section className="grid overflow-hidden border border-white/10 bg-[#111416] lg:grid-cols-[1.2fr_.8fr]">
      <div className="p-7 md:p-12 lg:p-16">
        <h2 className="max-w-4xl text-4xl font-bold uppercase leading-[.94] tracking-[-.04em] text-white md:text-6xl">
          <FormattedMessage id="porque.title" defaultMessage="¿Por qué certificarte con Madryn Buceo?" />
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
          <FormattedMessage id="porque.texto" />
        </p>
      </div>

      <div className="flex flex-col justify-between border-t border-white/10 bg-[#0d1011] p-7 text-white md:p-12 lg:border-l lg:border-t-0">
        <span className="w-fit bg-white p-3"><Image src={logo} width={180} height={68} alt="PADI" className="h-auto w-40 object-contain" /></span>
        <div className="mt-16">
          <h3 className="text-2xl font-bold uppercase"><FormattedMessage id="certi.padi" defaultMessage="Certificación PADI" /></h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            <FormattedMessage id="porque.padi" />
          </p>
        </div>
      </div>
    </section>
  );
}
