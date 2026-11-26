/*
 * Canales de contacto directo de CityHuertas.
 * Para cambiar el número o la cuenta, edita solo este archivo.
 */
const NUMERO_WHATSAPP = '573222227211' // con indicativo 57, sin + ni espacios
const MENSAJE_WHATSAPP = 'Hola CityHuertas, quiero información sobre sus cosechas.'

export const whatsapp = {
  nombre: 'WhatsApp',
  texto: '+57 322 222 7211',
  url: `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`,
}

export const instagram = {
  nombre: 'Instagram',
  texto: '@cityhuertas_col',
  url: 'https://www.instagram.com/cityhuertas_col/',
}

const canales = [whatsapp, instagram]

export default canales
