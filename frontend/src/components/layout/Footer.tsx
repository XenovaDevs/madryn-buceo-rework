"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FormattedMessage } from "react-intl";

const LOGO =
  "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png";

const social = [
  { label: "Instagram", href: "https://www.instagram.com/madrynbuceo/?hl=es-la", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/madrynbuceo/?fref=ts", icon: FaFacebookF },
  { label: "TikTok", href: "https://www.tiktok.com/@madrynbuceo", icon: FaTiktok },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-white/10 bg-[#070809] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-rojo" />
      <div className="site-container py-10 md:py-12">
        <div className="grid items-end gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Puerto Madryn, Patagonia</p>
            <h2 className="mt-4 max-w-[15ch] font-display text-[clamp(2.65rem,4.4vw,4.5rem)] font-extrabold uppercase leading-[.9] tracking-[-.04em]">
              El mar te está esperando.
            </h2>
            <a
              href="https://madrynbuceo.outtrip.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-3 bg-rojo px-5 text-xs font-extrabold uppercase tracking-[.1em] text-white transition-[background,transform] hover:-translate-y-0.5 hover:bg-[#f02b2b]"
            >
              Reservar ahora <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="grid gap-9 sm:grid-cols-[1.3fr_.7fr]">
            <div className="space-y-4 text-sm leading-6 text-white/62">
              <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-white/48">Encontranos</p>
              <a href="https://maps.google.com/?q=Madryn+Buceo" target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-white">
                <MapPin className="mt-0.5 size-4 shrink-0 text-rojo" />
                <FormattedMessage id="footer.text.1" />
              </a>
              <a href="tel:+5492804564422" className="flex gap-3 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-rojo" /> +54 9 280 456-4422
              </a>
              <a href="mailto:madrynbuceo@hotmail.com" className="flex gap-3 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-rojo" /> madrynbuceo@hotmail.com
              </a>
            </div>

            <div className="sm:text-right">
              <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-white/48">Seguinos</p>
              <div className="mt-3 flex gap-2 sm:justify-end">
                {social.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-10 place-items-center border border-white/15 text-white/70 transition-colors hover:border-rojo hover:bg-rojo hover:text-white">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
              <p className="mt-5 font-display text-lg font-bold uppercase leading-tight text-white/88">
                <FormattedMessage id="footer.text.4" />
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-7 py-7 md:grid-cols-[auto_1fr_auto]">
          <Link href="/" className="flex items-center gap-3" aria-label="Madryn Buceo - inicio">
            <span className="relative h-10 w-20 overflow-hidden">
              <Image src={LOGO} alt="Madryn Buceo" fill sizes="80px" className="object-contain" />
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold uppercase tracking-[.08em] text-white/60 md:justify-center">
            <Link href="/nosotros" className="hover:text-white">Nosotros</Link>
            <Link href="/contacto" className="hover:text-white">Contacto</Link>
            <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link href="/terminos" className="hover:text-white">Términos</Link>
          </div>

          <div className="flex items-center gap-4 md:justify-end">
            <a href="https://www.tripadvisor.com.ar/Attraction_Review-g312832-d7353317-Reviews-Madryn_Buceo-Puerto_Madryn_Province_of_Chubut_Patagonia.html" target="_blank" rel="noopener noreferrer" className="relative h-7 w-24 opacity-65 transition-opacity hover:opacity-100">
              <Image src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/footer/logo-trip-footer_omt51e.png" alt="Tripadvisor" fill sizes="96px" className="object-contain" />
            </a>
            <a href="https://madryn.travel/" target="_blank" rel="noopener noreferrer" className="relative h-7 w-24 opacity-65 transition-opacity hover:opacity-100">
              <Image src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/footer/logo-madryn-footer_qsilvz.png" alt="Madryn Travel" fill sizes="96px" className="object-contain" />
            </a>
          </div>
        </div>

        <div className="grid items-center gap-5 border-t border-white/10 pt-6 text-[0.64rem] uppercase tracking-[.08em] text-white/52 md:grid-cols-3">
          <p>© {new Date().getFullYear()} Madryn Buceo. Todos los derechos reservados.</p>
          <a
            href="https://www.xenova.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-10 items-center gap-3 text-white/70 transition-colors hover:text-white md:justify-self-center"
            aria-label="Sitio desarrollado por Xenova"
          >
            <span>Desarrollado por</span>
            <Image
              src="https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/Imagotipo_Lima.avif"
              alt="Xenova"
              width={128}
              height={46}
              className="h-7 w-auto object-contain opacity-100 brightness-110 contrast-125"
            />
          </a>
          <p className="md:justify-self-end">Centro de buceo desde 1983</p>
        </div>
      </div>
    </footer>
  );
}
