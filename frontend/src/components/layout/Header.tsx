"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { NavLinks } from "@/lib/data/NavLinks";
import LanguageSwitcher from "../ui/languageSwitcher";

const LOGO =
  "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<number | null>(null);
  const [desktopSubmenu, setDesktopSubmenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopSubmenu(null);
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href !== "#" && pathname.startsWith(href);

  return (
    <header
      className={`site-header-transition sticky top-0 z-50 border-b border-white/10 bg-[#090b0c] transition-shadow duration-300 ${
        isScrolled || isOpen ? "shadow-[0_12px_40px_rgba(0,0,0,.42)]" : ""
      }`}
    >
      <div className="site-container flex h-[5.25rem] items-center justify-between gap-5">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group relative block h-14 w-24 shrink-0 overflow-hidden"
          aria-label="Madryn Buceo - inicio"
        >
          <Image
            src={LOGO}
            alt="Madryn Buceo"
            fill
            sizes="96px"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegación principal">
          {NavLinks.map((link, index) => {
            const active =
              isActive(link.href) ||
              link.submenu?.some((sublink) => isActive(sublink.href));

            return (
              <div
                key={link.title}
                className="relative"
                onMouseEnter={() => link.submenu && setDesktopSubmenu(index)}
                onMouseLeave={() => link.submenu && setDesktopSubmenu(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setDesktopSubmenu(null);
                  }
                }}
              >
                {link.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setDesktopSubmenu((open) => open === index ? null : index)}
                      className={`flex min-h-11 items-center gap-1 px-3 text-[0.76rem] font-bold uppercase tracking-[.08em] transition-colors ${
                        active ? "text-rojo" : "text-white/78 hover:text-white"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={desktopSubmenu === index}
                    >
                      <FormattedMessage id={link.title} defaultMessage={link.title} />
                      <ChevronDown className={`size-3.5 transition-transform duration-200 ${desktopSubmenu === index ? "rotate-180" : ""}`} />
                    </button>
                    {desktopSubmenu === index ? (
                      <div className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3">
                        <div className="rounded-lg border border-white/15 bg-[#111416] p-2.5 shadow-[0_24px_70px_rgba(0,0,0,.6)]">
                          <p className="px-3 pb-2 pt-1 text-[0.62rem] font-bold uppercase tracking-[.2em] text-white/38">
                            0{index + 1} / Explorar
                          </p>
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              onClick={() => setDesktopSubmenu(null)}
                              className="group/item block rounded-lg px-3 py-3 transition-colors hover:bg-white/[.06]"
                            >
                              <span className="block font-display text-lg font-bold uppercase leading-none text-white group-hover/item:text-rojo">
                                <FormattedMessage id={sublink.title} defaultMessage={sublink.title} />
                              </span>
                              <span className="mt-1.5 block text-xs leading-relaxed text-white/50">
                                <FormattedMessage id={sublink.description} defaultMessage={sublink.description} />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex min-h-11 items-center px-3 text-[0.76rem] font-bold uppercase tracking-[.08em] transition-colors ${
                      active ? "text-rojo" : "text-white/78 hover:text-white"
                    }`}
                  >
                    <FormattedMessage id={link.title} defaultMessage={link.title} />
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <a
            href="https://madrynbuceo.outtrip.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center bg-rojo px-5 text-xs font-extrabold uppercase tracking-[.11em] text-white transition-[background,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f02b2b] active:translate-y-0"
          >
            Reservar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="grid size-12 place-items-center rounded-md border border-white/15 bg-white/[.04] text-white xl:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-x-0 top-[5.25rem] h-[calc(100dvh-5.25rem)] overflow-y-auto border-t border-white/10 bg-[#090b0c] xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="site-container py-6" aria-label="Navegación móvil">
              {NavLinks.map((link, index) => (
                <div key={link.title} className="border-b border-white/10">
                  {link.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSubmenu(expandedSubmenu === index ? null : index)
                        }
                        className="flex min-h-16 w-full items-center justify-between text-left font-display text-2xl font-bold uppercase text-white"
                        aria-expanded={expandedSubmenu === index}
                      >
                        <FormattedMessage id={link.title} defaultMessage={link.title} />
                        <ChevronDown
                          className={`size-5 text-rojo transition-transform ${
                            expandedSubmenu === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedSubmenu === index ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 pb-4">
                              {link.submenu.map((sublink) => (
                                <Link
                                  key={sublink.href}
                                  href={sublink.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block min-h-11 border-l border-rojo py-2 pl-4 text-sm font-semibold text-white/70"
                                >
                                  <FormattedMessage id={sublink.title} defaultMessage={sublink.title} />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex min-h-16 items-center font-display text-2xl font-bold uppercase text-white"
                    >
                      <FormattedMessage id={link.title} defaultMessage={link.title} />
                    </Link>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-5 py-7">
                <a
                  href="https://madrynbuceo.outtrip.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center bg-rojo px-5 text-sm font-extrabold uppercase tracking-[.12em] text-white"
                >
                  Reservar una experiencia
                </a>
                <LanguageSwitcher isMobile />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
