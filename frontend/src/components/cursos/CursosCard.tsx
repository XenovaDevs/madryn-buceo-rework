import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Curso } from "@/lib/data/Cursos";
import ButtonRojo from "../ui/button-rojo";
import { FormattedMessage } from "react-intl";
import { ReactNode } from "react";
import Image from "next/image";
import { SharedDetailTransition } from "@/components/detail/SharedDetailTransition";

interface CursoCardProps {
  course: Curso;
}

export default function CursoCard({ course }: CursoCardProps) {
  const getBadgeVariant = (level: ReactNode) => {
    switch (level) {
      case "programa":
        return "default";
      case "cursos.filters.iniciacion":
        return "default";
      case "cursos.filters.avanzados":
        return "secondary";
      case "cursos.filters.profesional":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div>
      <Card className="overflow-hidden h-full flex flex-col pt-0 border-none shadow-lg bg-negro-secundario hover:shadow-xl transition-shadow">
        <div className="relative h-64">
          <SharedDetailTransition id={`course-${course.slug}`} role="image">
            <Image
              src={course.cardImage}
              alt=""
              width={500}
              height={500}
              className="object-cover transition-transform duration-300"
            />
          </SharedDetailTransition>
        </div>

        <CardContent className="text-white flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <SharedDetailTransition id={`course-${course.slug}`} role="title">
              <h3 className="text-sm uppercase font-extrabold text-white font-oceanica tracking-tight line-clamp-1">
                <FormattedMessage id={course.title} />
              </h3>
            </SharedDetailTransition>
            <Badge
              variant={getBadgeVariant(<FormattedMessage id={course.level} />)}
              className="uppercase text-xs font-semibold rounded-md"
            >
              <FormattedMessage id={course.level} />
            </Badge>
          </div>
          <SharedDetailTransition id={`course-${course.slug}`} role="description">
            <p className="text-white/80 mb-4 text-sm flex-grow">
              <FormattedMessage id={course.shortDescription} />
            </p>
          </SharedDetailTransition>
          <div className="mt-auto">
            <ButtonRojo
              texto="Mas información"
              fullWidth={true}
              href={course.href}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
