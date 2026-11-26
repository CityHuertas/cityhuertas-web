import { useEffect, useState } from 'react'
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

// Intenta cargar una foto probando sus direcciones en orden.
function cargaFoto(fuentes) {
  return fuentes.reduce(
    (anterior, fuente) =>
      anterior.then((ok) =>
        ok
          ? true
          : new Promise((resolver) => {
              const imagen = new Image()
              const reloj = setTimeout(() => resolver(false), 15000)
              imagen.onload = () => {
                clearTimeout(reloj)
                resolver(true)
              }
              imagen.onerror = () => {
                clearTimeout(reloj)
                resolver(false)
              }
              imagen.src = fuente
            }),
      ),
    Promise.resolve(false),
  )
}

// Prueba cada foto de las fichas y lista las que no cargan.
function RevisarFotos({ productos }) {
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    let vigente = true
    const etapas = productos.flatMap((producto) =>
      producto.etapas
        .filter((etapa) => etapa.imagenes?.length)
        .map((etapa) => ({ producto: producto.nombre, etapa })),
    )

    Promise.all(
      etapas.map(async (item) => ({ ...item, ok: await cargaFoto(item.etapa.imagenes) })),
    ).then((lista) => {
      if (vigente) setResultado(lista)
    })

    return () => {
      vigente = false
    }
  }, [productos])

  const fallidas = resultado?.filter(({ ok }) => !ok) ?? []

  return (
    <section className="revisar__avisos" aria-labelledby="titulo-fotos">
      <h2 id="titulo-fotos">Fotos</h2>

      {!resultado && <p role="status">Revisando las fotos…</p>}

      {resultado && fallidas.length === 0 && (
        <p>Todas las fotos cargan bien ({resultado.length}).</p>
      )}

      {fallidas.length > 0 && (
        <>
          <p>
            Estas fotos no cargan. Si son de Google Drive, revisa que estén
            compartidas como <strong>Cualquier persona con el enlace</strong>.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Pestaña</th>
                <th scope="col">Fila</th>
                <th scope="col">Qué pasa</th>
              </tr>
            </thead>
            <tbody>
              {fallidas.map(({ producto, etapa }) => (
                <tr key={`${producto}-${etapa.orden}-${etapa.nombre}`}>
                  <td>Etapas</td>
                  <td>{etapa.fila ?? '—'}</td>
                  <td>
                    La foto de {producto}, etapa {etapa.nombre}, no se pudo cargar.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
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

        {listo && <RevisarFotos productos={productos} />}
      </div>
    </>
  )
}

export default RevisarContenido
