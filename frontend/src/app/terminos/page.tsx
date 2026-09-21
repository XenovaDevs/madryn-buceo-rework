import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos y condiciones | Madryn Buceo" };

export default function TermsPage() {
  return (
    <main className="site-container py-20 md:py-28">
      <p className="eyebrow">Información legal</p>
      <h1 className="section-title mt-5 text-white">Términos y condiciones</h1>
      <div className="prose prose-invert mt-12 max-w-3xl prose-headings:font-display prose-headings:uppercase prose-a:text-rojo prose-p:text-white/60">
        <p>La participación en actividades de buceo, snorkeling y navegación está sujeta a disponibilidad, condiciones meteorológicas, evaluación del equipo profesional y cumplimiento de los requisitos informados para cada experiencia.</p>
        <h2>Reservas</h2>
        <p>Las condiciones comerciales, políticas de cambio y cancelación aplicables se muestran durante el proceso de reserva. Una actividad puede reprogramarse por seguridad cuando las condiciones del mar no sean adecuadas.</p>
        <h2>Salud y seguridad</h2>
        <p>Cada participante debe informar condiciones médicas relevantes y seguir las instrucciones de guías e instructores. Algunas actividades pueden requerir certificación, edad mínima o declaración médica.</p>
        <h2>Consultas</h2>
        <p>Antes de reservar, podés confirmar cualquier requisito llamando al <a href="tel:+5492804564422">+54 9 280 456-4422</a> o escribiendo a <a href="mailto:madrynbuceo@hotmail.com">madrynbuceo@hotmail.com</a>.</p>
      </div>
    </main>
  );
}
