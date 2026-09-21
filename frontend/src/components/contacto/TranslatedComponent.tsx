"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import PageHero from "@/components/ui/PageHero";
import ContactoForm from "@/components/contacto/ContactoForm";

const contactItems = [
  { icon: MapPin, label: "contact.info.address.label", content: <FormattedMessage id="contact.info.address" defaultMessage="B. Brown 1900 - Bajada 5 - Balneario Sara, Puerto Madryn - Patagonia Argentina" /> },
  { icon: Phone, label: "contact.info.phone.label", content: <a href="tel:+5492804564422">+54 9 280 456-4422</a> },
  { icon: Mail, label: "contact.info.email.label", content: <a href="mailto:madrynbuceo@hotmail.com">madrynbuceo@hotmail.com</a> },
];

const faq = [
  ["contact.faq.snorkeling.question", "contact.faq.snorkeling.answer"],
  ["contact.faq.season.question", "contact.faq.season.answer"],
  ["contact.faq.equipment.question", "contact.faq.equipment.answer"],
  ["contact.faq.discounts.question", "contact.faq.discounts.answer"],
] as const;

export default function TranslatedContactContent() {
  return (
    <>
      <PageHero
        title={<FormattedMessage id="contact.title" defaultMessage="Contacto" />}
        subtitle={<FormattedMessage id="contact.subtitle" defaultMessage="Estamos aquí para responder tus preguntas y ayudarte a planificar tu próxima aventura submarina." />}
        image="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/terranova2_kwrcw2.webp"
        alt="Embarcación de Madryn Buceo en Puerto Madryn"
        eyebrow="Planificá tu próxima inmersión"
      />

      <section className="section-space">
        <div className="site-container grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="surface-panel p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Escribinos</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              <FormattedMessage id="contact.form.title" defaultMessage="Envíanos un mensaje" />
            </h2>
            <div className="mt-8"><ContactoForm /></div>
          </div>

          <aside className="flex flex-col bg-[#111416] p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Datos directos</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-5xl">
              <FormattedMessage id="contact.info.title" defaultMessage="Información de contacto" />
            </h2>
            <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
              {contactItems.map(({ icon: Icon, label, content }) => (
                <div key={label} className="grid grid-cols-[2.75rem_1fr] gap-4 py-6">
                  <span className="grid size-11 place-items-center border border-white/15 text-rojo"><Icon className="size-5" /></span>
                  <div>
                    <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-white/35"><FormattedMessage id={label} /></p>
                    <div className="mt-2 text-sm leading-7 text-white/70">{content}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-white/35"><FormattedMessage id="contact.info.social" defaultMessage="Síguenos en redes sociales" /></p>
              <div className="mt-4 flex gap-2">
                {[
                  [FaInstagram, "Instagram", "https://www.instagram.com/madrynbuceo/?hl=es-la"],
                  [FaFacebookF, "Facebook", "https://www.facebook.com/madrynbuceo/?fref=ts"],
                  [FaTiktok, "TikTok", "https://www.tiktok.com/@madrynbuceo"],
                  [FaWhatsapp, "WhatsApp", "https://wa.me/5492804564422"],
                ].map(([Icon, label, href]) => {
                  const SocialIcon = Icon as typeof FaInstagram;
                  return <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" aria-label={label as string} className="grid size-11 place-items-center border border-white/15 text-white/65 transition-colors hover:border-rojo hover:bg-rojo hover:text-white"><SocialIcon className="size-4" /></a>;
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111416] py-5">
        <div className="site-container">
          <div className="overflow-hidden border border-white/10">
            <iframe
              title="Ubicación de Madryn Buceo"
              className="h-[60dvh] min-h-[26rem] w-full grayscale-[30%] contrast-[1.08]"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2928.441243190807!2d-65.017134!3d-42.779021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbe024aaf5130b587%3A0x67d8409a6b02a656!2sMadryn%20Buceo!5e0!3m2!1ses!2sar!4v1747014001371!5m2!1ses!2sar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="eyebrow">Antes de venir</p>
            <h2 className="section-title mt-5 text-white"><FormattedMessage id="contact.faq.title" defaultMessage="Preguntas frecuentes" /></h2>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faq.map(([question, answer], index) => (
              <article key={question} className="grid gap-3 py-7 sm:grid-cols-[2.5rem_1fr] sm:py-9">
                <span className="font-display text-xl font-bold text-rojo">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white"><FormattedMessage id={question} /></h3>
                  <p className="mt-3 text-sm leading-7 text-white/55"><FormattedMessage id={answer} /></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
