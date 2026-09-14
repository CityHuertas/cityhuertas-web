const rutaImagenes = `${import.meta.env.BASE_URL}imagenes/mizuna`
const etapasMizuna = [
  {
    nombre: 'Aparición espontánea',
    imagen: `${rutaImagenes}/inicio-ciclo.png`,
    subtitulo: 'Inicio del ciclo',
    descripcion:
      'Las primeras hojas aparecen de forma espontánea y presentan una textura más tierna.',
    color: 'Morado suave y verde',
    forma: 'Hojas jóvenes y dentadas',
    sabor: 'Suave, con amargor ligero',
    textura: 'Tierna y delicada',
    perfil: 'Fresco, similar a la rúgula',
    estado: 'Inicio del ciclo',
  },
  {
    nombre: 'Cultivo inicial',
    imagen: `${rutaImagenes}/cultivo-inicial.png`,
    subtitulo: 'Crecimiento',
    descripcion:
      'La planta gana tamaño y el color morado se hace más evidente mientras conserva hojas tiernas.',
    color: 'Morado más visible',
    forma: 'Hojas alargadas y serradas',
    sabor: 'Amargo y picante moderado',
    textura: 'Tierna, con más cuerpo',
    perfil: 'Aromático y vegetal',
    estado: 'Crecimiento',
  },
  {
    nombre: 'Desarrollo',
    imagen: `${rutaImagenes}/desarrollo.png`,
    subtitulo: 'Primeras flores',
    descripcion:
      'Con la madurez aumenta la intensidad del sabor y comienzan a aparecer las primeras flores.',
    color: 'Morado intenso con verde',
    forma: 'Follaje abierto y abundante',
    sabor: 'Más ácido y picante',
    textura: 'Firme y crujiente',
    perfil: 'Intenso y persistente',
    estado: 'Primeras flores',
  },
  {
    nombre: 'Planta florida',
    imagen: `${rutaImagenes}/planta-florida.png`,
    subtitulo: 'Floración',
    descripcion:
      'La planta florida expresa su perfil más intenso, con notas picantes y mayor astringencia.',
    color: 'Hojas moradas, flor verde-amarilla',
    forma: 'Planta abierta y florida',
    sabor: 'Picante y astringente',
    textura: 'Más firme',
    perfil: 'Marcado y complejo',
    estado: 'Floración',
  },
]
export default etapasMizuna