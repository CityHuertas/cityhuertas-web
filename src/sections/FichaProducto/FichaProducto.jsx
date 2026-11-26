import { useRef, useState } from 'react'
import {
  CalendarDays,
  ChevronLeft,
  Microscope,
  ChevronRight,
  Hand,
  Palette,
  Sparkles,
  Sprout,
  Utensils,
} from 'lucide-react'

import './FichaProducto.css'

const caracteristicas = [
  { clave: 'color', titulo: 'Color', Icono: Palette },
  { clave: 'forma', titulo: 'Forma', Icono: Sprout },
  { clave: 'sabor', titulo: 'Sabor', Icono: Utensils },
  { clave: 'textura', titulo: 'Textura', Icono: Hand },
  { clave: 'perfil', titulo: 'Perfil', Icono: Sparkles },
]

/*
 * Ficha de un producto con su línea de tiempo de etapas.
 * Cada dato es opcional: lo que la hoja deja vacío simplemente no se muestra.
 */
function FichaProducto({ producto, indiceEtapa, alCambiarEtapa }) {
  const { nombre, descripcion, cosecha, finca, etapas } = producto
  const pestanas = useRef([])
  const inicioToque = useRef(null)
  const [huboCambio, setHuboCambio] = useState(false)
  // Por cada etapa, cuántas direcciones de su foto fallaron (Drive tiene dos).
  const [fallos, setFallos] = useState({})

  const etapa = etapas[indiceEtapa]
  const ultima = etapas.length - 1
  const progreso = ultima > 0 ? indiceEtapa / ultima : 1
  const visibles = caracteristicas.filter(({ clave }) => etapa[clave])

  const irA = (indice, enfocar = false) => {
    const destino = Math.min(Math.max(indice, 0), ultima)
    if (destino === indiceEtapa) return

    setHuboCambio(true)
    alCambiarEtapa(destino)
    if (enfocar) pestanas.current[destino]?.focus()
  }

  // Flechas del teclado dentro del selector de etapas.
  const alPresionarTecla = (evento) => {
    const acciones = {
      ArrowRight: indiceEtapa + 1,
      ArrowLeft: indiceEtapa - 1,
      Home: 0,
      End: ultima,
    }

    if (evento.key in acciones) {
      evento.preventDefault()
      irA(acciones[evento.key], true)
    }
  }

  // Deslizar el dedo sobre la foto cambia de etapa.
  const alEmpezarToque = (evento) => {
    inicioToque.current = evento.clientX
  }

  const alTerminarToque = (evento) => {
    if (inicioToque.current === null) return

    const distancia = evento.clientX - inicioToque.current
    inicioToque.current = null

    if (Math.abs(distancia) > 50) {
      irA(indiceEtapa + (distancia < 0 ? 1 : -1))
    }
  }

  return (
    <section className="ficha" aria-labelledby="titulo-ficha">
      <header className="ficha__encabezado">
        <h2 id="titulo-ficha">{nombre}</h2>
        <p>
          {descripcion}
          {etapas.length > 1 && ` Recorre sus ${etapas.length} etapas.`}
        </p>

        {cosecha && (
          <p className="ficha__cosecha">
            <CalendarDays size={18} aria-hidden="true" />
            {cosecha}
          </p>
        )}
      </header>

      {/* Selector de etapas: una línea de crecimiento que se llena. */}
      <div
        className="ficha__etapas"
        role="tablist"
        aria-label="Etapas de crecimiento"
        style={{ '--progreso': progreso, '--cantidad': etapas.length }}
        onKeyDown={alPresionarTecla}
      >
        {etapas.map((item, indice) => {
          const activa = indice === indiceEtapa

          return (
            <button
              key={`${indice}-${item.nombre}`}
              ref={(nodo) => {
                pestanas.current[indice] = nodo
              }}
              id={`etapa-${indice + 1}`}
              className={[
                'ficha__etapa',
                activa && 'ficha__etapa--activa',
                indice < indiceEtapa && 'ficha__etapa--pasada',
              ]
                .filter(Boolean)
                .join(' ')}
              type="button"
              role="tab"
              aria-selected={activa}
              aria-controls="panel-etapa"
              tabIndex={activa ? 0 : -1}
              onClick={() => irA(indice)}
            >
              <span className="ficha__etapa-numero" aria-hidden="true">
                {indice + 1}
              </span>
              <span className="ficha__etapa-nombre">{item.nombre}</span>
              <span className="ficha__etapa-subtitulo">{item.subtitulo}</span>
            </button>
          )
        })}
      </div>

      <div
        className="ficha__contenido"
        id="panel-etapa"
        role="tabpanel"
        aria-labelledby={`etapa-${indiceEtapa + 1}`}
      >
        <div
          className="ficha__foto"
          onPointerDown={alEmpezarToque}
          onPointerUp={alTerminarToque}
          onPointerCancel={() => {
            inicioToque.current = null
          }}
        >
          {/* Todas las fotos están cargadas; solo se ve la activa (fundido). */}
          {etapas.map((item, indice) => {
            const fuentes = item.imagenes ?? (item.imagen ? [item.imagen] : [])
            const fuente = fuentes.at(fallos[indice] ?? 0)

            return fuente ? (
              <img
                key={`${indice}-${fuente}`}
                src={fuente}
                alt={indice === indiceEtapa ? `${nombre} en etapa ${item.nombre}` : ''}
                aria-hidden={indice !== indiceEtapa}
                className={indice === indiceEtapa ? 'visible' : ''}
                draggable="false"
                onError={() =>
                  setFallos((actual) => ({ ...actual, [indice]: (actual[indice] ?? 0) + 1 }))
                }
              />
            ) : (
              indice === indiceEtapa && (
                <div key={`sin-foto-${indice}`} className="ficha__sin-foto">
                  <Sprout size={48} strokeWidth={1.4} aria-hidden="true" />
                  <span>{fuentes.length > 0 ? 'Foto no disponible' : 'Foto pendiente'}</span>
                </div>
              )
            )
          })}

          <button
            className="ficha__flecha ficha__flecha--anterior"
            type="button"
            onClick={() => irA(indiceEtapa - 1)}
            disabled={indiceEtapa === 0}
            aria-label="Etapa anterior"
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            className="ficha__flecha ficha__flecha--siguiente"
            type="button"
            onClick={() => irA(indiceEtapa + 1)}
            disabled={indiceEtapa === ultima}
            aria-label="Etapa siguiente"
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <p className="ficha__contador" aria-hidden="true">
            {indiceEtapa + 1} de {etapas.length}
          </p>
        </div>

        <div className="ficha__info" aria-live="polite">
          <h3>{etapa.nombre}</h3>
          {etapa.descripcion && <p className="ficha__descripcion">{etapa.descripcion}</p>}

          {visibles.length > 0 && (
            <dl className="ficha__caracteristicas">
              {visibles.map(({ clave, titulo, Icono }) => (
                <div key={clave} className="ficha__caracteristica">
                  <dt>
                    <Icono size={20} strokeWidth={1.8} aria-hidden="true" />
                    {titulo}
                  </dt>
                  {/* La clave cambia con la etapa para que el valor nuevo se resalte. */}
                  <dd
                    key={`${clave}-${indiceEtapa}`}
                    className={huboCambio ? 'ficha__valor--nuevo' : undefined}
                  >
                    {etapa[clave]}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Lo que explican los estudios científicos en esta etapa (opcional). */}
          {etapa.porDentro && (
            <div
              key={`por-dentro-${indiceEtapa}`}
              className={`ficha__por-dentro ${huboCambio ? 'ficha__por-dentro--nuevo' : ''}`}
            >
              <p className="ficha__por-dentro-titulo">
                <Microscope size={18} aria-hidden="true" /> Qué pasa por dentro
              </p>
              <p>{etapa.porDentro}</p>
            </div>
          )}

          {/* Intensidad de 1 a 4 (opcional). */}
          {etapa.intensidad && (
            <div className="intensidad">
              <p id="titulo-intensidad">
                Intensidad del sabor{finca && ` según ${finca}`}
              </p>

              <div
                className="intensidad__barra"
                role="meter"
                aria-labelledby="titulo-intensidad"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={etapa.intensidad}
                aria-valuetext={`${etapa.intensidad} de 4${etapa.sabor ? `: ${etapa.sabor}` : ''}`}
              >
                {[1, 2, 3, 4].map((nivel) => (
                  <span key={nivel} className={nivel <= etapa.intensidad ? 'llena' : ''} />
                ))}
              </div>

              <div className="intensidad__extremos" aria-hidden="true">
                <span>Suave</span>
                <span>Intenso</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {etapas.length > 1 && (
        <p className="ficha__ayuda">
          Cambia de etapa con las flechas o deslizando la foto
          <span className="ficha__ayuda-teclado">; también con las teclas ← →</span>
          .
        </p>
      )}
    </section>
  )
}

export default FichaProducto
