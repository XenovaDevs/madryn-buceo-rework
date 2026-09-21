import type { MetadataRoute } from "next";
import { allCursos } from "@/lib/data/Cursos";
import { excursiones } from "@/lib/data/Excursiones";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://madrynbuceo.com";
  const staticRoutes = ["", "/nosotros", "/contacto", "/cursos/padi", "/cursos/checkout", "/buceo/buceo-certificado", "/buceo/puntos-de-buceo"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...excursiones.map((item) => ({ url: `${base}/excursiones/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...allCursos.map((item) => ({ url: `${base}/cursos/padi/${item.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
