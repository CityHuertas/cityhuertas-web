import { URL_RANKING } from '../config/trivia'

/*
 * Guarda y lee los puntajes de la trivia.
 * - Con URL_RANKING: usa Google Sheets (ver docs/trivia-google-sheets.md).
 * - Sin URL_RANKING: modo de prueba en el navegador (localStorage).
 *
 * La tabla pública solo recibe apodo y puntaje; el nombre y el contacto
 * se guardan en la hoja y nunca se muestran en el sitio.
 */

const CLAVE_LOCAL = 'cityhuertas-trivia-ranking'

export const modoPrueba = !URL_RANKING

function leerLocal() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_LOCAL)) ?? []
  } catch {
    return []
  }
}

function escribirLocal(lista) {
  try {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(lista))
  } catch {
    // Navegador sin almacenamiento disponible: el juego sigue funcionando.
  }
}

function top10(lista) {
  return [...lista]
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 10)
    .map(({ apodo, puntaje }) => ({ apodo, puntaje }))
}

export async function obtenerRanking() {
  if (modoPrueba) return top10(leerLocal())

  const respuesta = await fetch(URL_RANKING)
  if (!respuesta.ok) throw new Error('No se pudo cargar la tabla de posiciones')

  const datos = await respuesta.json()
  return top10(datos.ranking ?? [])
}

/**
 * registro: { apodo, nombre, contacto, puntaje, aciertos, autorizaDatos }
 */
export async function guardarPuntaje(registro) {
  const datos = { ...registro, fecha: new Date().toISOString() }

  if (modoPrueba) {
    // En modo de prueba no se guardan nombre ni contacto.
    const { apodo, puntaje } = datos
    escribirLocal([...leerLocal(), { apodo, puntaje }])
    return
  }

  // text/plain evita la verificación previa (CORS) de Google Apps Script.
  const respuesta = await fetch(URL_RANKING, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) throw new Error('No se pudo guardar el puntaje')
}
