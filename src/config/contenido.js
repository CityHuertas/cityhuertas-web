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
export const URL_PRODUCTOS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3Tg9GurZJPTCfBKDDB4SunT2wEN9YeZqTyuP_pQO2azijC1SjiCEpSVJsCYIRLR3AT9bwC9YdA-wv/pub?gid=1260838808&single=true&output=csv'
export const URL_ETAPAS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3Tg9GurZJPTCfBKDDB4SunT2wEN9YeZqTyuP_pQO2azijC1SjiCEpSVJsCYIRLR3AT9bwC9YdA-wv/pub?gid=1152693043&single=true&output=csv'
export const URL_PREGUNTAS =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3Tg9GurZJPTCfBKDDB4SunT2wEN9YeZqTyuP_pQO2azijC1SjiCEpSVJsCYIRLR3AT9bwC9YdA-wv/pub?gid=618338171&single=true&output=csv'

// Si la hoja no responde en este tiempo, se usa el contenido guardado.
export const ESPERA_MAXIMA_MS = 8000
