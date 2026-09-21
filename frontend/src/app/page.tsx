import ActivitySection from "@/components/home/ActivitySection";
import DiveSitesPreviewSection from "@/components/home/DiveSitesPreviewSection";
import HeroSection from "@/components/home/HeroSection";
import PadiSection from "@/components/home/PadiSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ReseñasSection from "@/components/home/ReseñasSection";

import React from "react";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ActivitySection />
      <DiveSitesPreviewSection />
      <WhyChooseSection />
      <PadiSection />
      <ReseñasSection />
    </main>
  );
}
