# CityHuertas — sitio web

Prototipo web informativo de CityHuertas: explica qué es la agroecología y presenta las fichas interactivas de las plantas de la finca (empezando por la **Mizuna morada** de Finca Micaela) y una trivia; plantas y preguntas se editan desde Google Sheets.

Sitio publicado: https://cityhuertas.github.io/cityhuertas-web/

## Cómo ejecutarlo

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev      # servidor local en http://localhost:5173/cityhuertas-web/
npm run lint     # revisar el código
npm run build    # compilar la versión de producción en dist/
```

Cada cambio que llega a `main` se publica automáticamente en GitHub Pages (`.github/workflows/deploy.yml`).

## Estructura

```
src/
  components/layout/   Header y Footer
  pages/               Páginas completas (Inicio, Plantas, Revisar contenido…)
  sections/            Bloques de contenido (Agroecología, ficha de producto, trivia…)
  data/                Contenido de respaldo: navegación, productos y preguntas
  config/contenido.js  Enlaces a la hoja de Google con plantas y preguntas
  servicios/           Lectura de la hoja (CSV) y ranking de la trivia
  hooks/useRuta.js     Navegación por URL (#/plantas/mizuna-morada, #/contacto…)
  index.css            Estilos globales y colores de marca (variables CSS)
public/imagenes/       Fotografías (en formato WebP)
```

### Agregar una sección al menú

1. Añádela en `src/data/navegacion.js`.
2. Muéstrala en `src/App.jsx` (o déjala en `seccionesPendientes` mientras se construye).

### Colores

Usa las variables definidas en `src/index.css` en lugar de códigos hexadecimales:
`var(--verde-oscuro)`, `var(--verde)`, `var(--morado)`, `var(--fondo)`, etc.

### Imágenes

Sube las fotos en **WebP**, de unos 900–1000 px de ancho (pesan ~10 veces menos que un PNG).

## Contenido editable (plantas y trivia)

Las plantas, sus etapas y las preguntas de la trivia se editan en Google Sheets, sin tocar código. Guía completa: [`docs/contenido-google-sheets.md`](docs/contenido-google-sheets.md).

- Página oculta para revisar errores de la hoja: `#/revisar-contenido`.
- Si la hoja no está conectada o falla, se usa el respaldo de `src/data/`.

## Forma de trabajo

- No trabajar directamente sobre `main`.
- Una rama por tarea (`feature/…`, `fix/…`) y Pull Request revisado por otro integrante.
