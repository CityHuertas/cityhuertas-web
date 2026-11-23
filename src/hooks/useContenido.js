import { useSyncExternalStore } from 'react'

import { leerContenido, suscribirContenido } from '../servicios/contenido'

/*
 * Productos, etapas y preguntas, desde Google Sheets o desde el respaldo.
 * Devuelve { listo, productos, preguntas, origen, avisos }.
 */
export function useContenido() {
  return useSyncExternalStore(suscribirContenido, leerContenido)
}
