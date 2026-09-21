import { Metadata } from "next";
import { notFound } from "next/navigation";
import { excursiones } from "@/lib/data/Excursiones";
import HeroSection from "@/components/excursiones/HeroSection";
import DescripcionSection from "@/components/excursiones/DescripcionSection";
import DetallesSection from "@/components/excursiones/DetallesSection";
import QueEsperarSection from "@/components/excursiones/QueEsperarSection";
import RequerimientosSection from "@/components/excursiones/RequerimientosSection";
import CallToActionSection from "@/components/excursiones/CallToActionSection";
import GaleriaSection from "@/components/excursiones/GaleriaSection";
import OtrasExcursioesSection from "@/components/excursiones/OtrasExcursionesSection";
import { DetailStack } from "@/components/detail/DetailMotion";

import esLocale from "@/app/locales/es.json";
import enLocale from "@/app/locales/en.json";

type LocaleMessages = Record<string, string>;
function getTranslation(id: string, locale: string = "es") {
  const messages = locale === "en" ? enLocale as LocaleMessages : esLocale as LocaleMessages;
  return messages[id] || id;
}

interface ExcursionPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ locale?: string }>;
}

export async function generateMetadata({ params, searchParams }: ExcursionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;
  const locale = awaitedSearchParams?.locale || "es";
  
  const excursion = excursiones.find((exc) => exc.slug === slug);
  
  if (!excursion) {
    return {
      title: locale === "en" ? "Excursion not found | Madryn Buceo" : "Excursión no encontrada | Madryn Buceo",
      icons: {
        icon: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
        apple: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
      },
    };
  }
  
  const translatedTitle = getTranslation(excursion.title, locale);
  const translatedDescription = getTranslation(excursion.miniDescription, locale);
  
  return {
    title: `${translatedTitle} | Madryn Buceo`,
    description: translatedDescription,
    icons: {
      icon: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
      apple: "https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/inicio/logo_keh8c8.png",
    },
    openGraph: {
      title: `${translatedTitle} | Madryn Buceo`,
      description: translatedDescription,
      url: `https://madrynbuceo.com/excursiones/${slug}`,
      siteName: "Madryn Buceo",
      locale: locale === "en" ? "en_US" : "es_AR",
      type: "website",
      images: [
        {
          url: excursion.heroImage,
          width: 1200,
          height: 630,
          alt: translatedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${translatedTitle} | Madryn Buceo`,
      description: translatedDescription,
      images: [excursion.heroImage],
    },
  };
}

export default async function ExcursionPage({ params }: ExcursionPageProps) {
  const { slug } = await params;
  const excursion = excursiones.find((exc) => exc.slug === slug);
  if (!excursion) notFound();

  return (
    <main className="detail-page">
      <HeroSection
        title={excursion.title}
        heroImage={excursion.heroImage}
        miniDescription={excursion.miniDescription}
        slug={excursion.slug}
        callToAction={excursion.callToAction[0]}
        altText={`${excursion.title}`}
      />
      <div className="site-container">
        <DescripcionSection slug={excursion.slug} description={excursion.description} />

        <section className="pb-28 md:pb-40">
          <DetailStack>
            <DetallesSection details={excursion.details} />
            <RequerimientosSection excursion={excursion} />
            <QueEsperarSection excursion={excursion} />
          </DetailStack>
        </section>

        <section className="pb-28 md:pb-40">
          <GaleriaSection galleryImages={excursion.galleryImages} galleryVideos={excursion.galleryVideos} title={excursion.title} />
        </section>

        <section className="pb-28 md:pb-40">
          <CallToActionSection callToAction={excursion.callToAction[0]} buttonText={excursion.buttonText} />
        </section>
      </div>

      <OtrasExcursioesSection excursion={excursion} />
    </main>
  );
}
