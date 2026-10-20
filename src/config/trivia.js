/*
 * Configuración de la trivia.
 *
 * URL_RANKING: dirección de la aplicación web de Google Apps Script que guarda
 * los puntajes y contactos en una hoja de Google Sheets.
 * Mientras esté vacía, el juego funciona en MODO DE PRUEBA: los puntajes se
 * guardan solo en el navegador de quien juega y nadie más los ve.
 *
 * Guía paso a paso: docs/trivia-google-sheets.md
 */
export const URL_RANKING = ''

export const PREGUNTAS_POR_PARTIDA = 10
export const SEGUNDOS_POR_PREGUNTA = 20

// Puntos: 100 por acierto + hasta 100 por rapidez, multiplicados por la racha.
export const PUNTOS_ACIERTO = 100
export const PUNTOS_RAPIDEZ_MAX = 100

export function multiplicadorRacha(racha) {
  if (racha >= 5) return 2
  if (racha >= 3) return 1.5
  return 1
}
