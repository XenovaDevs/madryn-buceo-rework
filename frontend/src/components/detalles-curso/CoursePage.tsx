"use client";

import { FormattedMessage } from "react-intl";
import CourseDescription from "@/components/detalles-curso/CursoDescripcionSection";
import CourseDetails from "@/components/detalles-curso/CursoDetallesSection";
import CursoIntroSection from "@/components/detalles-curso/CursoIntroSection";
import CursoPorqueSection from "@/components/detalles-curso/CursoPorqueSection";
import { Curso } from "@/lib/data/Cursos";

interface DetalleCursoClientProps {
  curso: Curso;
}

export default function DetalleCursoClient({ curso }: DetalleCursoClientProps) {
  return (
    <main className="detail-page">
      <CursoIntroSection
        title={<FormattedMessage id={curso.title} />}
        shortDescription={<FormattedMessage id={curso.shortDescription} />}
        certification={curso.certification ? <FormattedMessage id={curso.certification} /> : undefined}
        duration={curso.duration ? <FormattedMessage id={curso.duration} /> : undefined}
        depth={curso.depth ? <FormattedMessage id={curso.depth} /> : undefined}
        cardImage={curso.cardImage}
        level={<FormattedMessage id={curso.level} />}
        slug={curso.slug}
      />
      <div className="site-container">
        <CourseDescription
          description={curso.description}
          learningOutcomes={curso.learningOutcomes}
          includes={curso.includes}
          qualifications={curso.qualifications}
        />
        <section className="pb-28 md:pb-40"><CursoPorqueSection /></section>
        <section className="pb-28 md:pb-40">
          <CourseDetails duration={curso.duration} depth={curso.depth} certification={curso.certification} requirements={curso.requirements} slug={curso.slug} />
        </section>
      </div>
    </main>
  );
}
