/*
 * Contenido editable desde Google Sheets.
 *
 * Pega aquí los enlaces CSV de cada pestaña de la hoja publicada
 * (Archivo → Compartir → Publicar en la web → elegir la pestaña → CSV).
 * Guía paso a paso: docs/contenido-google-sheets.md
 *
 * Mientras un enlace esté vacío, el sitio usa el contenido guardado en el
 * código (src/data/productos.js y src/data/preguntasTrivia.js).
 */
export const URL_PRODUCTOS = ''
export const URL_ETAPAS = ''
export const URL_PREGUNTAS = ''

// Si la hoja no responde en este tiempo, se usa el contenido guardado.
export const ESPERA_MAXIMA_MS = 8000
