import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidad | Madryn Buceo" };

export default function PrivacyPage() {
  return (
    <main className="site-container py-20 md:py-28">
      <p className="eyebrow">Información legal</p>
      <h1 className="section-title mt-5 text-white">Política de privacidad</h1>
      <div className="prose prose-invert mt-12 max-w-3xl prose-headings:font-display prose-headings:uppercase prose-a:text-rojo prose-p:text-white/60">
        <p>Madryn Buceo utiliza los datos que enviás mediante el formulario de contacto únicamente para responder tu consulta, coordinar servicios o brindar información sobre nuestras actividades.</p>
        <h2>Datos que recopilamos</h2>
        <p>Podemos recibir tu nombre, correo electrónico, teléfono, asunto y mensaje. También usamos herramientas de medición para comprender el uso general del sitio y mejorar su funcionamiento.</p>
        <h2>Uso y conservación</h2>
        <p>No vendemos tus datos personales. Los conservamos solo durante el tiempo necesario para atender la consulta y cumplir obligaciones administrativas o legales.</p>
        <h2>Contacto</h2>
        <p>Para solicitar acceso, corrección o eliminación de tus datos, escribinos a <a href="mailto:madrynbuceo@hotmail.com">madrynbuceo@hotmail.com</a>.</p>
      </div>
    </main>
  );
}
