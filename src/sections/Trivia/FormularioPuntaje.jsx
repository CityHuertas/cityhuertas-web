import { useState } from 'react'

import { guardarPuntaje } from '../../servicios/ranking'

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CELULAR = /^\+?[\d\s-]{7,15}$/

function validar({ apodo, nombre, contacto, autorizaDatos }) {
  const errores = {}

  if (!apodo.trim()) errores.apodo = 'Escribe un apodo para la tabla de posiciones.'
  else if (apodo.trim().length > 20) errores.apodo = 'El apodo puede tener máximo 20 caracteres.'

  if (!nombre.trim()) errores.nombre = 'Escribe tu nombre.'

  const contactoLimpio = contacto.trim()
  if (!contactoLimpio) errores.contacto = 'Escribe un correo o un número de celular.'
  else if (!CORREO.test(contactoLimpio) && !CELULAR.test(contactoLimpio)) {
    errores.contacto = 'Revisa el dato: debe ser un correo (nombre@correo.com) o un celular (300 123 4567).'
  }

  if (!autorizaDatos) {
    errores.autorizaDatos = 'Para guardar tu puntaje necesitamos tu autorización.'
  }

  return errores
}

function FormularioPuntaje({ puntaje, aciertos, alGuardar }) {
  const [valores, setValores] = useState({
    apodo: '',
    nombre: '',
    contacto: '',
    autorizaDatos: false,
  })
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('editando') // editando | enviando | error

  const cambiar = (evento) => {
    const { name, value, type, checked } = evento.target
    setValores((actual) => ({ ...actual, [name]: type === 'checkbox' ? checked : value }))
  }

  const enviar = async (evento) => {
    evento.preventDefault()

    const encontrados = validar(valores)
    setErrores(encontrados)

    if (Object.keys(encontrados).length > 0) {
      evento.target.querySelector(`[name="${Object.keys(encontrados)[0]}"]`)?.focus()
      return
    }

    setEstado('enviando')

    const registro = {
      apodo: valores.apodo.trim(),
      nombre: valores.nombre.trim(),
      contacto: valores.contacto.trim(),
      puntaje,
      aciertos,
      autorizaDatos: true,
    }

    try {
      await guardarPuntaje(registro)
      alGuardar({ apodo: registro.apodo, puntaje })
    } catch {
      setEstado('error')
    }
  }

  const campo = (nombre, etiqueta, ayuda, props = {}) => (
    <div className="formulario__campo">
      <label htmlFor={`trivia-${nombre}`}>{etiqueta}</label>
      {ayuda && (
        <p className="formulario__ayuda" id={`ayuda-${nombre}`}>
          {ayuda}
        </p>
      )}
      <input
        id={`trivia-${nombre}`}
        name={nombre}
        value={valores[nombre]}
        onChange={cambiar}
        aria-invalid={Boolean(errores[nombre])}
        aria-describedby={[ayuda && `ayuda-${nombre}`, errores[nombre] && `error-${nombre}`]
          .filter(Boolean)
          .join(' ') || undefined}
        {...props}
      />
      {errores[nombre] && (
        <p className="formulario__error" id={`error-${nombre}`}>
          {errores[nombre]}
        </p>
      )}
    </div>
  )

  return (
    <form className="formulario" onSubmit={enviar} noValidate>
      <h3>Guarda tu puntaje</h3>
      <p className="formulario__intro">
        Entra a la tabla de posiciones y te contamos cuando haya cosecha fresca
        para comprar.
      </p>

      {campo('apodo', 'Apodo', 'Es lo único que se muestra en la tabla.', {
        maxLength: 20,
        autoComplete: 'nickname',
      })}
      {campo('nombre', 'Nombre', null, { autoComplete: 'name' })}
      {campo('contacto', 'Correo o celular', null, { autoComplete: 'email' })}

      <div className="formulario__autorizacion">
        <input
          id="trivia-autorizaDatos"
          name="autorizaDatos"
          type="checkbox"
          checked={valores.autorizaDatos}
          onChange={cambiar}
          aria-invalid={Boolean(errores.autorizaDatos)}
          aria-describedby={errores.autorizaDatos ? 'error-autorizaDatos' : undefined}
        />
        <label htmlFor="trivia-autorizaDatos">
          Autorizo a CityHuertas a guardar mi nombre y mi contacto para
          escribirme sobre sus productos y actividades.
        </label>
      </div>
      {errores.autorizaDatos && (
        <p className="formulario__error" id="error-autorizaDatos">
          {errores.autorizaDatos}
        </p>
      )}

      <details className="formulario__politica">
        <summary>¿Cómo usamos tus datos?</summary>
        <p>
          Usamos tu nombre y tu contacto solo para comunicarnos contigo sobre
          los productos y actividades de CityHuertas. No los mostramos en el
          sitio (en la tabla solo aparece tu apodo) ni los compartimos con
          terceros. Puedes pedir en cualquier momento que los actualicemos o
          los borremos escribiéndonos por nuestros canales de contacto.
        </p>
      </details>

      {estado === 'error' && (
        <p className="formulario__error" role="alert">
          No pudimos guardar tu puntaje. Revisa tu conexión e inténtalo otra vez.
        </p>
      )}

      <button className="boton boton--lima" type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Guardando…' : 'Guardar mi puntaje'}
      </button>
    </form>
  )
}

export default FormularioPuntaje
