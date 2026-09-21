// app/layout.tsx
import type { Metadata } from "next"
import { Barlow_Condensed, Manrope, Outfit } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "../components/layout/Footer"
import "leaflet/dist/leaflet.css"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import ClientIntlProvider from "./ClientIntlProvider"
import CookieConsent from "@/components/ui/CookieConsent"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-detail",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Madryn Buceo | Aventuras Submarinas en Puerto Madryn",
  description: "Descubre el fascinante mundo submarino con Madryn Buceo. Ofrecemos excursiones de buceo, cursos y certificaciones para todos los niveles en las cristalinas aguas de Puerto Madryn, Patagonia Argentina.",
  keywords: ["buceo", "Puerto Madryn", "Patagonia", "excursiones submarinas", "cursos de buceo", "vida marina", "turismo aventura"],
  authors: [{ name: "Madryn Buceo" }],
  creator: "Madryn Buceo",
  publisher: "Madryn Buceo",
  metadataBase: new URL("https://madrynbuceo.com"),
  formatDetection: { telephone: false },
  icons: {
    icon: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
    apple: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
  },
  openGraph: {
    title: "Madryn Buceo | Aventuras Submarinas en Puerto Madryn",
    description: "Descubre el fascinante mundo submarino con Madryn Buceo. Excursiones, cursos y certificaciones en Puerto Madryn.",
    url: "https://madrynbuceo.com",
    siteName: "Madryn Buceo",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
        width: 800,
        height: 600,
        alt: "Madryn Buceo Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madryn Buceo | Aventuras Submarinas en Puerto Madryn",
    description: "Excursiones, cursos y certificaciones de buceo en Puerto Madryn, Patagonia Argentina.",
    images: ["https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${barlowCondensed.variable} ${outfit.variable}`}>
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido
        </a>
        <ClientIntlProvider locale="es">
          <Header />
          <div id="contenido-principal">{children}</div>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
        </ClientIntlProvider>
      </body>
    </html>
  )
}
