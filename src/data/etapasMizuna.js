/*
 * Etapas de la Mizuna morada.
 * - color, forma, sabor, textura y perfil: observaciones de Finca Micaela.
 * - porDentro: lo que explican los estudios científicos (ver
 *   src/data/cienciaMizuna.js para las referencias).
 */
const rutaImagenes = `${import.meta.env.BASE_URL}imagenes/mizuna`
const etapasMizuna = [
  {
    nombre: 'Aparición espontánea',
    imagen: `${rutaImagenes}/inicio-ciclo.webp`,
    subtitulo: 'Inicio del ciclo',
    descripcion:
      'Las primeras hojas aparecen de forma espontánea y presentan una textura más tierna.',
    color: 'Morado suave y verde',
    forma: 'Hojas jóvenes y dentadas',
    sabor: 'Suave, con amargor ligero',
    textura: 'Tierna y delicada',
    perfil: 'Fresco, similar a la rúgula',
    estado: 'Inicio del ciclo',
    porDentro:
      'Las hojas jóvenes guardan más defensas naturales (glucosinolatos) que las hojas viejas y, con ellas, más potencial picante.',
  },
  {
    nombre: 'Cultivo inicial',
    imagen: `${rutaImagenes}/cultivo-inicial.webp`,
    subtitulo: 'Crecimiento',
    descripcion:
      'La planta gana tamaño y el color morado se hace más evidente mientras conserva hojas tiernas.',
    color: 'Morado más visible',
    forma: 'Hojas alargadas y serradas',
    sabor: 'Amargo y picante moderado',
    textura: 'Tierna, con más cuerpo',
    perfil: 'Aromático y vegetal',
    estado: 'Crecimiento',
    porDentro:
      'Con cada hoja nueva el aroma se vuelve más complejo: aumentan compuestos de olor verde, fresco y cítrico.',
  },
  {
    nombre: 'Desarrollo',
    imagen: `${rutaImagenes}/desarrollo.webp`,
    subtitulo: 'Primeras flores',
    descripcion:
      'Con la madurez aumenta la intensidad del sabor y comienzan a aparecer las primeras flores.',
    color: 'Morado intenso con verde',
    forma: 'Follaje abierto y abundante',
    sabor: 'Más ácido y picante',
    textura: 'Firme y crujiente',
    perfil: 'Intenso y persistente',
    estado: 'Primeras flores',
    porDentro:
      'Las hojas más viejas tienen menos glucosinolatos, pero eso no las hace menos amargas: el amargor también depende de aminoácidos, azúcares y ácidos.',
  },
  {
    nombre: 'Planta florida',
    imagen: `${rutaImagenes}/planta-florida.webp`,
    subtitulo: 'Floración',
    descripcion:
      'La planta florida expresa su perfil más intenso, con notas picantes y mayor astringencia.',
    color: 'Hojas moradas, flor verde-amarilla',
    forma: 'Planta abierta y florida',
    sabor: 'Picante y astringente',
    textura: 'Más firme',
    perfil: 'Marcado y complejo',
    estado: 'Floración',
    porDentro:
      'La planta concentra sus defensas en flores y semillas, que tienen más glucosinolatos que las hojas.',
  },
]
export default etapasMizuna