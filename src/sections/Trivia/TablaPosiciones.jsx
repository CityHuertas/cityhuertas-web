import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'

import { obtenerRanking } from '../../servicios/ranking'

// Top 10. `version` cambia cuando alguien guarda un puntaje, para recargar.
function TablaPosiciones({ version, resaltado }) {
  const [ranking, setRanking] = useState([])
  const [estado, setEstado] = useState('cargando') // cargando | listo | error

  useEffect(() => {
    let vigente = true

    obtenerRanking()
      .then((lista) => {
        if (!vigente) return
        setRanking(lista)
        setEstado('listo')
      })
      .catch(() => {
        if (vigente) setEstado('error')
      })

    return () => {
      vigente = false
    }
  }, [version])

  return (
    <aside className="posiciones" aria-labelledby="titulo-posiciones">
      <h2 id="titulo-posiciones">
        <Trophy size={22} aria-hidden="true" /> Tabla de posiciones
      </h2>

      {estado === 'cargando' && <p className="posiciones__vacio">Cargando…</p>}

      {estado === 'error' && (
        <p className="posiciones__vacio">
          No pudimos cargar la tabla en este momento.
        </p>
      )}

      {estado === 'listo' && ranking.length === 0 && (
        <p className="posiciones__vacio">
          Todavía no hay puntajes. ¡Juega y sé la primera persona en la tabla!
        </p>
      )}

      {estado === 'listo' && ranking.length > 0 && (
        <ol className="posiciones__lista">
          {ranking.map(({ apodo, puntaje }, indice) => {
            const esMio =
              resaltado && resaltado.apodo === apodo && resaltado.puntaje === puntaje

            return (
              <li
                key={`${apodo}-${puntaje}-${indice}`}
                className={esMio ? 'posiciones__mio' : undefined}
              >
                <span className={`posiciones__puesto posiciones__puesto--${indice + 1}`}>
                  {indice + 1}
                </span>
                <span className="posiciones__apodo">
                  {apodo}
                  {esMio && <span className="visualmente-oculto"> (tú)</span>}
                </span>
                <span className="posiciones__puntos">
                  {puntaje.toLocaleString('es-CO')}
                </span>
              </li>
            )
          })}
        </ol>
      )}
    </aside>
  )
}

export default TablaPosiciones
