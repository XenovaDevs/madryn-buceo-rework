"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState("es")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("locale")
    if (stored && ["es", "en"].includes(stored) && stored !== locale) {
      const frame = requestAnimationFrame(() => setLocale(stored))
      return () => cancelAnimationFrame(frame)
    }
  }, [locale])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as "es" | "en"
    setLocale(selected)
    localStorage.setItem("locale", selected)
    window.location.reload()
  }

  const flags = {
    es: {
      src: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/flags/spain_x0dq7z.svg",
      alt: "Bandera de España"
    },
    en: {
      src: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/flags/uk_xdxy8p.svg",
      alt: "UK Flag"
    }
  }

  if (isMobile) {
    return (
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          onClick={() => handleChange({ target: { value: "es" } } as React.ChangeEvent<HTMLSelectElement>)}
          className={cn(
            "flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer",
            locale === "es" ? "bg-negro-secundario ring-2 ring-[#e12222]" : "bg-negro-secundario/50"
          )}
          aria-label="Cambiar a Español"
        >
          <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm mb-1">
            <Image
              src={flags.es.src}
              alt={flags.es.alt}
              className="absolute inset-0 w-full h-full object-cover"
              width={800}
              height={600}
            />

          </div>
          <span className="text-xs font-medium">ESP</span>
        </button>

        <button
          onClick={() => handleChange({ target: { value: "en" } } as React.ChangeEvent<HTMLSelectElement>)}
          className={cn(
            "flex flex-col items-center p-3 rounded-lg transition-all duration-200 cursor-pointer",
            locale === "en" ? "bg-negro-secundario ring-2 ring-[#e12222]" : "bg-negro-secundario/50"
          )}
          aria-label="Switch to English"
        >
          <div className="relative w-8 h-6 overflow-hidden rounded shadow-sm mb-1">
            <Image
              src={flags.en.src}
              alt={flags.en.alt}
              className="absolute inset-0 w-full h-full object-cover"
              width={800}
              height={600}
            />

          </div>
          <span className="text-xs font-medium">ENG</span>
        </button>
      </div>
    )
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-negro-secundario transition-colors duration-200"
        aria-label="Seleccionar idioma"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={handleMouseEnter}
      >
        <div className="relative w-6 h-4 overflow-hidden rounded shadow-sm">
          <Image
            src={locale === "es" ? flags.es.src : flags.en.src}
            alt={locale === "es" ? flags.es.alt : flags.en.alt}
            className="absolute inset-0 w-full h-full object-cover"
            width={800}
            height={600}
          />

        </div>
        <span className="text-sm font-medium">{locale === "es" ? "ESP" : "ENG"}</span>
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-1 w-32 bg-negro-secundario shadow-lg rounded-md overflow-hidden z-50"
          onMouseEnter={handleMouseEnter}
        >
          <button
            onClick={() => handleChange({ target: { value: "es" } } as React.ChangeEvent<HTMLSelectElement>)}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 text-left cursor-pointer hover:bg-negro-secundario/80 hover:text-[#e12222] transition-colors duration-200",
              locale === "es" && "bg-negro-secundario/80"
            )}
          >
            <div className="relative w-6 h-4 overflow-hidden rounded shadow-sm">
              <Image
                src={flags.es.src}
                alt={flags.es.alt}
                className="absolute inset-0 w-full h-full object-cover"
                width={800}
                height={600}
              />

            </div>
            <span className="text-sm">ESP</span>
          </button>

          <button
            onClick={() => handleChange({ target: { value: "en" } } as React.ChangeEvent<HTMLSelectElement>)}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 text-left cursor-pointer hover:bg-negro-secundario/80 hover:text-[#e12222] transition-colors duration-200",
              locale === "en" && "bg-negro-secundario/80"
            )}
          >
            <div className="relative w-6 h-4 overflow-hidden rounded shadow-sm">
              <Image
                src={flags.en.src}
                alt={flags.en.alt}
                className="absolute inset-0 w-full h-full object-cover"
                width={800}
                height={600}
              />

            </div>
            <span className="text-sm">ENG</span>
          </button>
        </div>
      )}
    </div>
  )
}
