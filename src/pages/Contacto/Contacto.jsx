import { useState } from 'react'
import { CircleCheck, Mail, MessageCircle } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
import { useContenido } from '../../hooks/useContenido'
import { enlaceA } from '../../hooks/useRuta'
import { enviarContacto, modoPruebaContacto } from '../../servicios/contacto'

import './Contacto.css'

const TIPOS = ['Restaurante', 'Hotel', 'Tienda o mercado', 'Persona u hogar', 'Otro']

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CELULAR = /^\+?[\d\s-]{7,15}$/

// Desde una ficha se llega con #/contacto?producto=mizuna-morada&etapa=Plántula
function leerConsulta(productos) {
  const consulta = new URLSearchParams(window.location.hash.split('?')[1] ?? '')
  const producto = productos.find(({ id }) => id === consulta.get('producto'))
  const etapa = consulta.get('etapa')

  if (!producto) return { producto: '', mensaje: '', tipoCliente: '' }

  return {
    producto: producto.nombre,
    tipoCliente: 'Restaurante',
    mensaje: etapa
      ? `Me interesa la ${producto.nombre} en la etapa ${etapa}.`
      : `Me interesa la ${producto.nombre}.`,
  }
}

function validar(valores) {
  const errores = {}

  if (!valores.nombre.trim()) errores.nombre = 'Escribe tu nombre.'
  if (!valores.tipoCliente) errores.tipoCliente = 'Elige una opción.'

  const contacto = valores.contacto.trim()
  if (!contacto) errores.contacto = 'Escribe un correo o un número de celular.'
  else if (!CORREO.test(contacto) && !CELULAR.test(contacto)) {
    errores.contacto =
      'Revisa el dato: debe ser un correo (nombre@correo.com) o un celular (300 123 4567).'
  }

  if (!valores.autorizaDatos) {
    errores.autorizaDatos = 'Para responderte necesitamos tu autorización.'
  }

  return errores
}

function Formulario({ productos }) {
  const [valores, setValores] = useState(() => ({
    nombre: '',
    empresa: '',
    contacto: '',
    autorizaDatos: false,
    sitioWeb: '', // campo trampa para robots: las personas no lo ven
    ...leerConsulta(productos),
  }))
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('editando') // editando | enviando | enviado | error

  const cambiar = (evento) => {
    const { name, value, type, checked } = evento.target
    setValores((actual) => ({ ...actual, [name]: type === 'checkbox' ? checked : value }))
    // Al corregir un campo, su mensaje de error desaparece.
    setErrores((actual) => ({ ...actual, [name]: undefined }))
  }

  const enviar = async (evento) => {
    evento.preventDefault()

    const encontrados = validar(valores)
    setErrores(encontrados)

    if (Object.keys(encontrados).length > 0) {
      evento.target.querySelector(`[name="${Object.keys(encontrados)[0]}"]`)?.focus()
      return
    }

    // Un robot llenó el campo oculto: se finge el envío sin guardar nada.
    if (valores.sitioWeb) {
      setEstado('enviado')
      return
    }

    setEstado('enviando')

    try {
      await enviarContacto({
        nombre: valores.nombre.trim(),
        tipoCliente: valores.tipoCliente,
        empresa: valores.empresa.trim(),
        contacto: valores.contacto.trim(),
        producto: valores.producto,
        mensaje: valores.mensaje.trim(),
        autorizaDatos: true,
      })
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="contacto__gracias" role="status">
        <CircleCheck size={44} strokeWidth={1.6} aria-hidden="true" />
        <h2>¡Gracias, {valores.nombre.trim().split(' ')[0]}!</h2>
        <p>
          Recibimos tus datos. Te escribiremos pronto a{' '}
          <strong>{valores.contacto.trim()}</strong>.
        </p>
        <a className="boton boton--borde" href={enlaceA('plantas')}>
          Seguir viendo las plantas
        </a>
      </div>
    )
  }

  const ayudaYError = (nombre, ayuda) =>
    [ayuda && `ayuda-${nombre}`, errores[nombre] && `error-${nombre}`].filter(Boolean).join(' ') ||
    undefined

  const error = (nombre) =>
    errores[nombre] && (
      <p className="contacto__error" id={`error-${nombre}`}>
        {errores[nombre]}
      </p>
    )

  return (
    <form className="contacto__formulario" onSubmit={enviar} noValidate>
      <div className="contacto__fila">
        <div className="contacto__campo">
          <label htmlFor="contacto-nombre">Nombre *</label>
          <input
            id="contacto-nombre"
            name="nombre"
            value={valores.nombre}
            onChange={cambiar}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={ayudaYError('nombre')}
          />
          {error('nombre')}
        </div>

        <div className="contacto__campo">
          <label htmlFor="contacto-tipoCliente">Eres… *</label>
          <select
            id="contacto-tipoCliente"
            name="tipoCliente"
            value={valores.tipoCliente}
            onChange={cambiar}
            aria-invalid={Boolean(errores.tipoCliente)}
            aria-describedby={ayudaYError('tipoCliente')}
          >
            <option value="">Elige una opción</option>
            {TIPOS.map((tipo) => (
              <option key={tipo}>{tipo}</option>
            ))}
          </select>
          {error('tipoCliente')}
        </div>
      </div>

      <div className="contacto__fila">
        <div className="contacto__campo">
          <label htmlFor="contacto-empresa">Restaurante o empresa</label>
          <p className="contacto__ayuda" id="ayuda-empresa">
            Opcional.
          </p>
          <input
            id="contacto-empresa"
            name="empresa"
            value={valores.empresa}
            onChange={cambiar}
            autoComplete="organization"
            maxLength={80}
            aria-describedby={ayudaYError('empresa', true)}
          />
        </div>

        <div className="contacto__campo">
          <label htmlFor="contacto-contacto">Correo o celular *</label>
          <p className="contacto__ayuda" id="ayuda-contacto">
            Por aquí te respondemos.
          </p>
          <input
            id="contacto-contacto"
            name="contacto"
            value={valores.contacto}
            onChange={cambiar}
            autoComplete="email"
            maxLength={80}
            aria-invalid={Boolean(errores.contacto)}
            aria-describedby={ayudaYError('contacto', true)}
          />
          {error('contacto')}
        </div>
      </div>

      <div className="contacto__campo">
        <label htmlFor="contacto-producto">¿Qué te interesa?</label>
        <select id="contacto-producto" name="producto" value={valores.producto} onChange={cambiar}>
          <option value="">Todavía no sé / información general</option>
          {productos.map(({ id, nombre }) => (
            <option key={id}>{nombre}</option>
          ))}
          <option>Varios productos</option>
          <option>Compost y abonos</option>
          <option>Visitas o talleres</option>
        </select>
      </div>

      <div className="contacto__campo">
        <label htmlFor="contacto-mensaje">Mensaje</label>
        <p className="contacto__ayuda" id="ayuda-mensaje">
          Opcional. Por ejemplo: cantidades, frecuencia o la etapa de cosecha que buscas.
        </p>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows={5}
          maxLength={1000}
          value={valores.mensaje}
          onChange={cambiar}
          aria-describedby="ayuda-mensaje"
        />
      </div>

      {/* Campo trampa: oculto para las personas, los robots lo llenan. */}
      <div className="contacto__trampa" aria-hidden="true">
        <label htmlFor="contacto-sitioWeb">Sitio web</label>
        <input
          id="contacto-sitioWeb"
          name="sitioWeb"
          tabIndex={-1}
          autoComplete="off"
          value={valores.sitioWeb}
          onChange={cambiar}
        />
      </div>

      <div className="contacto__autorizacion">
        <input
          id="contacto-autorizaDatos"
          name="autorizaDatos"
          type="checkbox"
          checked={valores.autorizaDatos}
          onChange={cambiar}
          aria-invalid={Boolean(errores.autorizaDatos)}
          aria-describedby={errores.autorizaDatos ? 'error-autorizaDatos' : undefined}
        />
        <label htmlFor="contacto-autorizaDatos">
          Autorizo a CityHuertas a guardar mis datos para responder mi
          solicitud y escribirme sobre sus productos y actividades. *
        </label>
      </div>
      {error('autorizaDatos')}

      <details className="contacto__politica">
        <summary>¿Cómo usamos tus datos?</summary>
        <p>
          Usamos tu nombre y tu contacto solo para responder tu solicitud y
          comunicarnos contigo sobre los productos y actividades de
          CityHuertas. No los publicamos ni los compartimos con terceros.
          Puedes pedir en cualquier momento que los actualicemos o los
          borremos escribiéndonos por nuestros canales de contacto.
        </p>
      </details>

      {estado === 'error' && (
        <p className="contacto__error" role="alert">
          No pudimos enviar tus datos. Revisa tu conexión e inténtalo otra vez.
        </p>
      )}

      <button className="boton" type="submit" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar'}
      </button>

      {modoPruebaContacto && (
        <p className="contacto__ayuda">
          Modo de prueba: los datos no se guardan hasta que se conecte la hoja de Google Sheets.
        </p>
      )}
    </form>
  )
}

function Contacto() {
  const { listo, productos } = useContenido()

  return (
    <>
      <Portada
        idTitulo="titulo-contacto"
        titulo="Contáctanos"
        descripcion="¿Tienes un restaurante, un hotel o quieres comprar nuestras cosechas? Déjanos tus datos y te escribimos."
      />

      <section className="contacto" aria-label="Formulario de contacto">
        <aside className="contacto__lado">
          <h2>¿Qué pasa después?</h2>
          <ol>
            <li>
              <Mail size={20} aria-hidden="true" />
              <span>Recibimos tus datos y revisamos qué buscas.</span>
            </li>
            <li>
              <MessageCircle size={20} aria-hidden="true" />
              <span>
                Te escribimos al correo o celular que nos dejes para contarte
                qué hay en cosecha y cómo comprar.
              </span>
            </li>
          </ol>
        </aside>

        {/* La key espera a que carguen las plantas para preseleccionar el producto. */}
        <Formulario key={listo ? 'listo' : 'cargando'} productos={productos} />
      </section>
    </>
  )
}

export default Contacto
