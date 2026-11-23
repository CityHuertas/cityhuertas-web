/*
 * Productos y etapas guardados en el código.
 *
 * Es el RESPALDO del sitio: se usa mientras no esté conectada la hoja de
 * Google Sheets (src/config/contenido.js) o si la hoja no carga.
 * Tiene el mismo formato que las pestañas "Productos" y "Etapas" de la hoja.
 *
 * - foto: nombre del archivo dentro de public/imagenes/ (o un enlace https).
 * - intensidad: de 1 (suave) a 4 (intenso). Vacío = no se muestra la barra.
 * - porDentro: lo que explican los estudios científicos (opcional).
 */

const productos = [
  {
    nombre: 'Mizuna morada',
    finca: 'Finca Micaela',
    descripcion:
      'Una hoja con un sabor parecido al de la rúgula, que cambia mucho mientras crece.',
    cosecha:
      'CityHuertas la cosecha entre la semana 4 y 5 desde que se siembra la plántula (unas 7 a 9 semanas desde la semilla).',
    datoCurioso:
      'El sabor, el color y la textura de la Mizuna morada cambian según su etapa de crecimiento. Algunos restaurantes prefieren sus hojas jóvenes por ser más tiernas y suaves, mientras que otros buscan plantas más desarrolladas por su sabor intenso, sus notas picantes y su textura crujiente.',
    etapas: [
      {
        nombre: 'Aparición espontánea',
        foto: 'mizuna/inicio-ciclo.webp',
        subtitulo: 'Inicio del ciclo',
        descripcion:
          'Las primeras hojas aparecen de forma espontánea y presentan una textura más tierna.',
        color: 'Morado suave y verde',
        forma: 'Hojas jóvenes y dentadas',
        sabor: 'Suave, con amargor ligero',
        textura: 'Tierna y delicada',
        perfil: 'Fresco, similar a la rúgula',
        intensidad: 1,
        porDentro:
          'Las hojas jóvenes guardan más defensas naturales (glucosinolatos) que las hojas viejas y, con ellas, más potencial picante.',
      },
      {
        nombre: 'Cultivo inicial',
        foto: 'mizuna/cultivo-inicial.webp',
        subtitulo: 'Crecimiento',
        descripcion:
          'La planta gana tamaño y el color morado se hace más evidente mientras conserva hojas tiernas.',
        color: 'Morado más visible',
        forma: 'Hojas alargadas y serradas',
        sabor: 'Amargo y picante moderado',
        textura: 'Tierna, con más cuerpo',
        perfil: 'Aromático y vegetal',
        intensidad: 2,
        porDentro:
          'Con cada hoja nueva el aroma se vuelve más complejo: aumentan compuestos de olor verde, fresco y cítrico.',
      },
      {
        nombre: 'Desarrollo',
        foto: 'mizuna/desarrollo.webp',
        subtitulo: 'Primeras flores',
        descripcion:
          'Con la madurez aumenta la intensidad del sabor y comienzan a aparecer las primeras flores.',
        color: 'Morado intenso con verde',
        forma: 'Follaje abierto y abundante',
        sabor: 'Más ácido y picante',
        textura: 'Firme y crujiente',
        perfil: 'Intenso y persistente',
        intensidad: 3,
        porDentro:
          'Las hojas más viejas tienen menos glucosinolatos, pero eso no las hace menos amargas: el amargor también depende de aminoácidos, azúcares y ácidos.',
      },
      {
        nombre: 'Planta florida',
        foto: 'mizuna/planta-florida.webp',
        subtitulo: 'Floración',
        descripcion:
          'La planta florida expresa su perfil más intenso, con notas picantes y mayor astringencia.',
        color: 'Hojas moradas, flor verde-amarilla',
        forma: 'Planta abierta y florida',
        sabor: 'Picante y astringente',
        textura: 'Más firme',
        perfil: 'Marcado y complejo',
        intensidad: 4,
        porDentro:
          'La planta concentra sus defensas en flores y semillas, que tienen más glucosinolatos que las hojas.',
      },
    ],
  },
]

export default productos
