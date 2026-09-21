"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

type Consent = "pending" | "accepted" | "declined";

const STORAGE_KEY = "madryn-buceo-cookie-consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>("pending");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setConsent(stored === "accepted" || stored === "declined" ? stored : "pending");
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const choose = (value: Exclude<Consent, "pending">) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-P62Y9L646D" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P62Y9L646D');`}
          </Script>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1048777207441355');fbq('track','PageView');`}
          </Script>
        </>
      ) : null}

      {hydrated && consent === "pending" ? (
        <div className="fixed inset-x-3 bottom-3 z-[90] border border-white/15 bg-[#111416]/95 p-5 shadow-2xl backdrop-blur-xl sm:left-5 sm:right-auto sm:max-w-md sm:p-6" role="dialog" aria-label="Preferencias de cookies">
          <p className="font-display text-2xl font-bold uppercase text-white">Tu privacidad importa</p>
          <p className="mt-2 text-xs leading-6 text-white/65">Usamos medición y publicidad solo si lo aceptás. Las funciones esenciales del sitio no dependen de estas cookies.</p>
          <Link href="/privacidad" className="mt-2 inline-block text-xs font-bold text-[#ff5252] underline underline-offset-4">Leer política de privacidad</Link>
          <div className="mt-5 flex gap-2">
            <button type="button" onClick={() => choose("accepted")} className="min-h-11 flex-1 bg-rojo px-4 text-xs font-extrabold uppercase tracking-[.08em] text-white">Aceptar</button>
            <button type="button" onClick={() => choose("declined")} className="min-h-11 flex-1 border border-white/20 px-4 text-xs font-extrabold uppercase tracking-[.08em] text-white">Rechazar</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
