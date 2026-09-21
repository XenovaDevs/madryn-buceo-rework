"use client";

import CursosIntroSection from "@/components/cursos/CursosIntroSection";
import CursoFiltro from "@/components/cursos/CursosFiltro";
import CursoHeroSection from "@/components/cursos/CursoHeroSection";

export default function CursosPage() {

  return (
    <>
      <CursoHeroSection />
      <div className="site-container flex flex-col items-center justify-center">
        <CursosIntroSection />
        <CursoFiltro />
      </div>
    </>
  );
}
