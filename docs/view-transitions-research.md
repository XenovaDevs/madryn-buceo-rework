# Transiciones compartidas entre excursiones y detalle

Investigación cerrada el **21 de septiembre de 2026** para este proyecto: **Next.js 16.3.5, App Router, React 19.3.0**.

## Conclusión

El nombre correcto del efecto es **shared element transition** (transición de elemento compartido), implementado en la plataforma web mediante la **View Transition API** y, en React, con el componente declarativo **`<ViewTransition>`**.

Para este proyecto la opción recomendada es la integración nativa de React y Next.js:

- envolver la imagen de la card y la imagen hero del detalle con dos `<ViewTransition>` que tengan el mismo `name`;
- repetir el patrón con el título;
- hacer lo mismo con la descripción solo si ambos lados muestran esencialmente el mismo contenido; si la descripción cambia mucho o pasa de texto recortado a texto extenso, conviene que entre con un crossfade suave en vez de tratarla como un único objeto que se deforma;
- usar nombres únicos derivados del `slug`, separados también por rol, por ejemplo `excursion-peninsula-valdes-image`, `excursion-peninsula-valdes-title` y `excursion-peninsula-valdes-description`;
- respetar `prefers-reduced-motion` desde CSS.

Esto es una mejora progresiva: cuando el navegador no soporta la API, la navegación continúa funcionando normalmente y simplemente no se anima.

## Estado de soporte en React y Next.js

### React 19.3

`<ViewTransition>` y `addTransitionType` fueron experimentales durante React 19.2/canary, pero quedaron **estables en React 19.3**, publicado el 9 de septiembre de 2026. El proyecto declara e instala React 19.3.0, por lo que se importa directamente:

```tsx
import { ViewTransition } from 'react'
```

No corresponde usar `unstable_ViewTransition` ni instalar `react@canary`. Fuente: [anuncio oficial de React 19.3](https://react.dev/blog/2026/09/09/react-19-3) y [referencia oficial de `<ViewTransition>`](https://react.dev/reference/react/ViewTransition).

React activa la animación únicamente cuando el cambio ocurre dentro de una Transition, al revelarse un `Suspense` o mediante `useDeferredValue`; un `setState` urgente normal no la activa. React también llama internamente a `document.startViewTransition()`, por lo que no hay que llamarlo manualmente ni intentar coordinar una segunda transición en paralelo. [Referencia de React](https://react.dev/reference/react/ViewTransition).

### Next.js 16.3.5 App Router

En **Next.js 16.3.5**, las View Transitions funcionan en App Router **sin configuración**. Las navegaciones del App Router ya son React Transitions, así que un `<Link>` o una navegación compatible activa automáticamente los `<ViewTransition>` afectados. La guía oficial para esa versión muestra exactamente el caso thumbnail → hero entre dos rutas. [Guía oficial de Next.js 16.3.5](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx).

La integración aplica tanto a Server Components como a Client Components; la propia guía de Next muestra `<ViewTransition>` dentro de un componente `async`. No hay que convertir una sección en Client Component solo por esta API.

### ¿Existe `viewTransition` en `next.config`?

Para **Next.js 16.3.5**, no:

- no existe una opción estable de nivel superior `viewTransition`;
- tampoco existe ya `experimental.viewTransition` en el esquema de configuración de esta versión;
- la configuración `experimental: { viewTransition: true }` pertenece a la etapa experimental anterior de Next.js y es obsoleta para este proyecto.

La evidencia principal es que la guía oficial versionada dice expresamente que funciona “with no configuration”; además, el esquema y los tipos instalados de `next@16.3.5` no contienen ninguna de esas claves. El antiguo URL de referencia de `next.config.js/viewTransition` ya no existe en la documentación actual. [Guía versionada de Next.js](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx), [esquema fuente de configuración de 16.3.5](https://github.com/vercel/next.js/blob/v16.3.5/packages/next/src/server/config-schema.ts).

## Cómo forma React un elemento compartido

React asigna internamente `view-transition-name` al nodo DOM más próximo dentro del `<ViewTransition>`. Si durante la misma Transition se elimina un árbol y se inserta otro árbol con el mismo `name`, React los empareja y dispara una animación de tipo `share`. El navegador trabaja con capturas visuales del estado anterior y nuevo, moviéndolas, escalándolas y haciendo crossfade. [Funcionamiento interno y triggers en React](https://react.dev/reference/react/ViewTransition).

Patrón conceptual mínimo:

```tsx
// En la card
<ViewTransition
  name={`excursion-${slug}-image`}
  share="excursion-morph"
  default="none"
>
  <div>{/* Image */}</div>
</ViewTransition>

// En el detalle
<ViewTransition
  name={`excursion-${slug}-image`}
  share="excursion-morph"
  default="none"
>
  <div>{/* Image hero */}</div>
</ViewTransition>
```

`default="none"` evita que esos elementos se animen en navegaciones no relacionadas; cuando se usa, hay que conservar explícitamente `share="excursion-morph"`, porque de lo contrario también se desactiva el morph compartido. [Explicación y ejemplo oficial de Next.js](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx#step-1-morph-a-thumbnail-into-a-hero-image).

## Diseño recomendado para las excursiones

### Imagen

Usar una frontera compartida propia para la imagen o, preferentemente, para un contenedor estable que controle `aspect-ratio`, `overflow` y el radio de borde. Así el navegador puede interpolar posición y tamaño sin arrastrar junto con ella todo el texto de la card.

### Título

Usar una segunda frontera con un nombre `...-title`. De ese modo el título viaja y cambia de escala de manera independiente de la imagen. Conviene mantener la misma familia y peso tipográfico en ambos extremos; cambios fuertes de corte de línea pueden producir un crossfade visible, que es normal porque la API anima snapshots.

### Descripción

Hay dos opciones seguras:

1. Si card y detalle comparten el mismo texto, darle su propio nombre `...-description` y animarlo como elemento compartido.
2. Si la card usa una versión abreviada o `line-clamp` y el detalle muestra varios párrafos, usar una transición de entrada/crossfade para la descripción del detalle, sin compartir el `name`. Sigue siendo una transición prolija, pero evita que un bloque corto parezca estirarse hasta convertirse en otro contenido.

No conviene envolver imagen, título y descripción en un único `<ViewTransition>`: React aclara que cada frontera se convierte en una sola captura; sus hijos no se mueven individualmente. Para conservar continuidad independiente hay que crear fronteras separadas. [Caveats de React](https://react.dev/reference/react/ViewTransition#caveats).

## Duplicación, identidad y accesibilidad semántica

No hace falta clonar ni dejar una segunda card oculta. La transición usa pseudo-elementos visuales (`::view-transition-old()` y `::view-transition-new()`), no una segunda copia semántica permanente en el DOM. La card sigue siendo la UI vieja y el detalle la UI nueva.

La regla estricta es que solo puede haber **un `<ViewTransition>` montado con un `name` determinado en toda la aplicación**. Por eso:

- cada excursión debe incorporar el `slug` o ID en el nombre;
- cada rol debe tener sufijo diferente (`image`, `title`, `description`);
- una sección de “otras excursiones” dentro del detalle no debe renderizar otra card de la excursión actual con los mismos nombres;
- si un modal, Parallel Route o layout mantiene simultáneamente la grilla y el detalle montados, no se puede reutilizar el mismo nombre en ambos sin controlar cuál participa.

React detecta nombres duplicados en desarrollo y documenta que esa situación hace fallar la transición. [Troubleshooting oficial de React](https://react.dev/reference/react/ViewTransition#im-getting-an-error-there-are-two-viewtransition-names-components-with-the-same-name-mounted-at-the-same-time).

## Navegación, prefetch y Suspense

El emparejamiento compartido se forma cuando el contenido de destino aparece en el mismo commit que la navegación. Next.js indica que este es el caso habitual de una página prefetched/cached. Si el detalle suspende primero y muestra un fallback, el par no se forma; al llegar los datos, el contenido puede ejecutar una animación `enter`, pero ya no el morph desde la card. [Guía oficial de Next.js](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx#step-1-morph-a-thumbnail-into-a-hero-image).

Implicaciones prácticas:

- conservar `<Link>` y su prefetch normal;
- procurar que imagen, título y texto necesarios para el hero provengan de datos ya disponibles o prefetched;
- si existe `loading.tsx`/`Suspense`, diseñar un `enter` suave como fallback visual para cuando no pueda formarse el par;
- no colocar un wrapper de entrada/salida en un layout persistente esperando que se desmonte: los layouts persisten; las fronteras de contenido deben vivir en los elementos o páginas que realmente cambian.

El botón Back del navegador no recibe un `transitionType` direccional, pero la transición compartida básica todavía puede funcionar si ambos extremos presentan nombres coincidentes. [Guía oficial de Next.js](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx#step-3-add-directional-motion-for-navigation).

## Navegadores y mejora progresiva

Para el App Router interesa el soporte de **same-document View Transitions**:

- Chromium soporta la base desde Chrome/Edge 111; `view-transition-class`, usado para clases reutilizables de animación, llegó en 125. [Chrome 111](https://developer.chrome.com/blog/new-in-chrome-111), [actualización oficial de View Transitions](https://developer.chrome.com/blog/view-transitions-update-io24).
- Safari soporta same-document View Transitions desde 18.0 y View Transition Classes/Types desde 18.2. [WebKit Safari 18.0](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/), [WebKit Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/).
- Firefox soporta View Transitions Level 1, incluido `view-transition-class`, desde Firefox 144. [Notas oficiales de Firefox 144](https://www.firefox.com/en-US/firefox/144.0/releasenotes/), [notas para desarrolladores](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/144).

MDN considera `Document.startViewTransition()` “Baseline 2025 / newly available” desde octubre de 2025, lo que significa que versiones antiguas todavía pueden no soportarlo. [Referencia de MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition).

La guía de Next.js 16.3.5 confirma el fallback: sin soporte del navegador, la aplicación funciona normalmente y las transiciones simplemente no se animan. También advierte que algunos efectos pueden comportarse de manera algo distinta en Safari. Por eso el efecto central debería depender de `name`/`share`, no de una coreografía compleja indispensable para entender la página.

## `prefers-reduced-motion`

React **no desactiva automáticamente** las View Transitions cuando el usuario solicita menos movimiento. React pide comprobar siempre `prefers-reduced-motion`. [Nota oficial de React](https://react.dev/reference/react/ViewTransition#always-check-prefers-reduced-motion).

La receta oficial de Next.js es reducir a cero duración y delay para todos los snapshots:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

También es válido eliminar solo desplazamiento y escalado, conservando un crossfade muy breve; para esta interfaz, desactivar el morph por completo es la opción inicial más predecible. [Sección oficial de Next.js sobre reduced motion](https://github.com/vercel/next.js/blob/v16.3.5/docs/01-app/02-guides/view-transitions.mdx#respecting-reduced-motion).

## Alternativas evaluadas

1. **React `<ViewTransition>` + App Router — recomendada.** Ya está disponible y estable en las versiones instaladas, coordina la navegación y degrada sin romper funcionalidad.
2. **API web manual (`document.startViewTransition`) — no recomendada aquí.** React documenta que él mismo inicia y coordina la transición y recomienda no hacerlo manualmente porque una transición externa puede ser interrumpida o competir con la suya.
3. **`@view-transition { navigation: auto }` cross-document — no es la herramienta principal.** Está pensado para navegaciones MPA entre documentos; las navegaciones del App Router son same-document y ya están coordinadas por React.
4. **Biblioteca de animación con medición de layout — reserva.** Solo tendría sentido si fuera obligatorio reproducir el morph en navegadores antiguos o si se necesitara una coreografía que la API nativa no puede expresar. Añade JavaScript, manejo manual de montaje/desmontaje y una segunda fuente de coordinación, sin beneficio claro para este caso.

## Recomendación de implementación posterior

Hacer una primera iteración pequeña y reversible:

1. incorporar tres nombres determinísticos por excursión;
2. aplicar morph compartido a imagen y título;
3. aplicar a la descripción un shared morph solo si el contenido coincide; si no, usar enter/crossfade;
4. limitar la duración aproximada a 300–400 ms y mantener easing suave;
5. agregar el bloque global de reduced motion;
6. probar navegación forward, Back, refresh directo, detalle no prefetched, grilla responsive y Safari;
7. verificar en desarrollo que no aparezcan warnings por nombres duplicados.

No se modificó código de la aplicación durante esta investigación.
