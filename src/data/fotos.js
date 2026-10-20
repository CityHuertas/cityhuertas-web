/*
 * Fotografías del sitio (Unsplash, licencia libre).
 * Para usar una foto propia (por ejemplo, de Finca Micaela), guárdala en
 * public/imagenes/ y cambia `src` por su ruta: `${import.meta.env.BASE_URL}imagenes/mi-foto.webp`.
 */

const unsplash = (id) => (ancho) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${ancho}`

const fotos = {
  huerta: {
    src: unsplash('photo-1775568109786-18598bf7b294'),
    alt: 'Huerta con hileras de hortalizas y hojas verdes',
    autor: 'Ries Bosch',
  },
  manosTierra: {
    src: unsplash('photo-1492496913980-501348b61469'),
    alt: 'Manos sosteniendo tierra fértil',
    autor: 'Gabriel Jimenez',
  },
  sembrando: {
    src: unsplash('photo-1611843467160-25afb8df1074'),
    alt: 'Manos con tierra sembrando plántulas',
    autor: 'Sandie Clarke',
  },
  acelga: {
    src: unsplash('photo-1507484467459-0c01be16726e'),
    alt: 'Hojas de acelga con tallos rojos creciendo en una cama elevada',
    autor: 'Markus Spiske',
  },
  riego: {
    src: unsplash('photo-1515150144380-bca9f1650ed9'),
    alt: 'Regadera mojando plántulas en la huerta',
    autor: 'Markus Spiske',
  },
  plantulas: {
    src: unsplash('photo-1651827684507-12e7c6675ea3'),
    alt: 'Plántulas recién trasplantadas en una huerta soleada',
    autor: 'Markus Spiske',
  },
}

// Tamaños para que cada pantalla descargue solo lo que necesita.
export function srcSet(foto) {
  return [640, 1080, 1600, 2200].map((ancho) => `${foto.src(ancho)} ${ancho}w`).join(', ')
}

export const autoresFotos = [...new Set(Object.values(fotos).map((foto) => foto.autor))]

export default fotos
