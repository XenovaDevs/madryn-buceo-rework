"use client";

import HeroSection from "@/components/cursos/checkout/HeroSection";
import DetallesSection from "@/components/cursos/checkout/DetallesSection";
import RequirementosSection from "@/components/cursos/checkout/RequerimentosSection";
import TableSection from "@/components/cursos/checkout/TableSection";
import { FormattedMessage } from "react-intl";

export default function CheckoutPage() {
  return (
    <>
      <HeroSection
        title={"Checkout"}
        heroImage={"https://xurbyte.github.io/assets-mdybuceo/MADRYN%20BUCEO_2025-07-05_09_54/images/nosotros/terranova2_kwrcw2.webp"}
        miniDescription={<FormattedMessage id="checkout.subtitulo" />}
      />
      <section className="site-container flex flex-col items-center justify-center py-16 md:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="lg:col-span-7 space-y-6">
            <TableSection />
          </div>

          <DetallesSection />
          <RequirementosSection />
        </div>
      </section>
    </>
  );
}
