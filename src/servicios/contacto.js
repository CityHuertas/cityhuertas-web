import { URL_RANKING } from '../config/trivia'

/*
 * Envía los datos del formulario "Contáctanos".
 * Usa la misma aplicación de Google Apps Script de la trivia: los mensajes
 * quedan en la pestaña "Contactos" de la hoja "CityHuertas · Trivia"
 * (ver docs/trivia-google-sheets.md).
 *
 * Sin URL configurada (modo de prueba) no se guarda nada: solo se simula.
 */

export const modoPruebaContacto = !URL_RANKING

/**
 * datos: { nombre, tipoCliente, empresa, contacto, producto, mensaje, autorizaDatos }
 */
export async function enviarContacto(datos) {
  if (modoPruebaContacto) {
    await new Promise((resolver) => setTimeout(resolver, 600))
    return
  }

  // text/plain evita la verificación previa (CORS) de Google Apps Script.
  const respuesta = await fetch(URL_RANKING, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...datos, tipo: 'contacto' }),
  })

  if (!respuesta.ok) throw new Error('No se pudo enviar el mensaje')

  const resultado = await respuesta.json().catch(() => ({}))
  if (resultado.ok === false) throw new Error('La hoja rechazó el mensaje')
}
