import { useSyncExternalStore } from 'react'

/*
 * Navegación basada en el hash de la URL (ej. .../cityhuertas-web/#/plantas).
 * Funciona en GitHub Pages sin configuración extra, permite usar el botón
 * "atrás" del navegador y compartir el enlace directo a cada sección.
 * Admite rutas con partes, como #/plantas/mizuna-morada: App toma la
 * primera parte como sección y pasa el resto a la página.
 */

function suscribir(alCambiar) {
  window.addEventListener('hashchange', alCambiar)
  return () => window.removeEventListener('hashchange', alCambiar)
}

function leerRuta() {
  const ruta = window.location.hash
    .replace(/^#\/?/, '')
    .split('?')[0]
    .replace(/\/$/, '')

  return ruta || 'inicio'
}

export function useRuta() {
  return useSyncExternalStore(suscribir, leerRuta)
}

export function enlaceA(id) {
  return id === 'inicio' ? '#/' : `#/${id}`
}
