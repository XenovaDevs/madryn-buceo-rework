import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="site-container grid min-h-[70dvh] place-items-center py-20 text-center">
      <div>
        <Compass className="mx-auto size-12 text-rojo" strokeWidth={1.5} />
        <p className="eyebrow mt-7">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(4rem,11vw,9rem)] font-extrabold uppercase leading-[.82] tracking-[-.055em] text-white">Fuera de rumbo</h1>
        <p className="mx-auto mt-7 max-w-lg text-base leading-8 text-white/58">Esta página no existe o cambió de ubicación. Volvamos a la costa y sigamos explorando desde allí.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-3 bg-rojo px-6 text-sm font-extrabold uppercase tracking-[.1em] text-white">
          <ArrowLeft className="size-4" /> Volver al inicio
        </Link>
      </div>
    </main>
  );
}
