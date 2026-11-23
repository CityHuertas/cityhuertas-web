import { CircleAlert, CircleCheck, Info, LoaderCircle } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
import { useContenido } from '../../hooks/useContenido'
import { enlaceA } from '../../hooks/useRuta'
import { hojaConfigurada } from '../../servicios/contenido'

import './RevisarContenido.css'

/*
 * Página oculta (no está en el menú): #/revisar-contenido
 * Sirve para que quien edita la hoja de Google compruebe que el sitio la
 * está leyendo bien y vea qué filas tienen problemas.
 */

const ORIGENES = {
  hoja: {
    Icono: CircleCheck,
    tono: 'bien',
    texto: 'Se está leyendo desde la hoja de Google.',
  },
  respaldo: {
    Icono: CircleAlert,
    tono: 'alerta',
    texto: 'La hoja tiene un problema: se muestra el contenido guardado en el código. Revisa los avisos.',
  },
  codigo: {
    Icono: Info,
    tono: 'neutro',
    texto: 'No hay hoja conectada: se usa el contenido guardado en el código.',
  },
  cargando: {
    Icono: LoaderCircle,
    tono: 'neutro',
    texto: 'Cargando…',
  },
}

function Estado({ titulo, origen, children }) {
  const { Icono, tono, texto } = ORIGENES[origen] ?? ORIGENES.cargando

  return (
    <article className={`revisar__tarjeta revisar__tarjeta--${tono}`}>
      <h2>
        <Icono size={22} aria-hidden="true" /> {titulo}
      </h2>
      <p>{texto}</p>
      {children}
    </article>
  )
}

function RevisarContenido() {
  const { listo, productos, preguntas, origen, avisos } = useContenido()

  return (
    <>
      <Portada
        idTitulo="titulo-revisar"
        titulo="Revisar contenido"
        descripcion="Comprueba lo que el sitio está leyendo de la hoja de Google. Los cambios en la hoja pueden tardar unos 5 minutos en verse; luego recarga esta página."
      />

      <div className="revisar">
        <div className="revisar__estados">
          <Estado titulo="Plantas y etapas" origen={origen.productos}>
            {listo && (
              <ul>
                {productos.map((producto) => (
                  <li key={producto.id}>
                    <a href={enlaceA(`plantas/${producto.id}`)}>{producto.nombre}</a>:{' '}
                    {producto.etapas.length}{' '}
                    {producto.etapas.length === 1 ? 'etapa' : 'etapas'}
                  </li>
                ))}
              </ul>
            )}
          </Estado>

          <Estado titulo="Preguntas de la trivia" origen={origen.preguntas}>
            {listo && (
              <p>
                <strong>{preguntas.length}</strong> preguntas disponibles.{' '}
                <a href={enlaceA('recursos')}>Probar la trivia</a>
              </p>
            )}
          </Estado>
        </div>

        {listo && (
          <section className="revisar__avisos" aria-labelledby="titulo-avisos">
            <h2 id="titulo-avisos">Avisos</h2>

            {avisos.length === 0 ? (
              <p>
                {hojaConfigurada.productos || hojaConfigurada.preguntas
                  ? 'Todo en orden: no hay filas con problemas.'
                  : 'Todavía no se han pegado las direcciones de la hoja en src/config/contenido.js.'}
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th scope="col">Pestaña</th>
                    <th scope="col">Fila</th>
                    <th scope="col">Qué pasa</th>
                  </tr>
                </thead>
                <tbody>
                  {avisos.map((aviso, indice) => (
                    <tr key={indice}>
                      <td>{aviso.hoja}</td>
                      <td>{aviso.fila ?? '—'}</td>
                      <td>{aviso.mensaje}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </div>
    </>
  )
}

export default RevisarContenido
