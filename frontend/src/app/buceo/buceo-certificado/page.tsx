"use client";

import HeroSection from "@/components/buceo-certificado/HeroSection";
import IntroSection from "@/components/buceo-certificado/IntroSection";
import QueEsperarSection from "@/components/buceo-certificado/QueEsperarSection";
import RequerimientosSection from "@/components/buceo-certificado/RequerimientosSection";
import LobosSection from "@/components/buceo-certificado/LobosSection";
import PricingSection from "@/components/buceo-certificado/PricingSection";
import { DetailStack } from "@/components/detail/DetailMotion";

export default function BuceoCapitalPage() {
  return (
    <main className="detail-page">
      <HeroSection title={"BUCEA EN PUERTO MADRYN"} heroImage={"https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/buceo/G0123167_ui3btj.jpg"} miniDescription={"Capital nacional del buceo"} />
      <div className="site-container">
        <IntroSection />
        <section className="pb-24 md:pb-32">
          <DetailStack>
            <QueEsperarSection />
            <RequerimientosSection />
          </DetailStack>
        </section>
      </div>
      <LobosSection />
      <div className="site-container">
        <PricingSection />
      </div>
    </main>
  );
}
