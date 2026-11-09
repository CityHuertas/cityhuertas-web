import { useEffect, useRef } from 'react'

import principiosCH from '../../data/principiosCH'
import './PrincipiosCH.css'

function PrincipiosCH() {
  const seccion = useRef(null)

  // Con #/agroecologia?seccion=principios la página baja hasta aquí.
  useEffect(() => {
    const consulta = window.location.hash.split('?')[1] ?? ''
    if (new URLSearchParams(consulta).get('seccion') !== 'principios') return

    // Se espera un cuadro para que el desplazamiento al inicio de la página
    // (al cambiar de sección) no lo anule.
    const cuadro = requestAnimationFrame(() => {
      seccion.current?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(cuadro)
  }, [])

  return (
    <section
      ref={seccion}
      className="principios"
      id="principios"
      aria-labelledby="titulo-principios"
    >
      <div className="principios__encabezado">
        <h2 id="titulo-principios">Nuestros 10 principios</h2>
        <p>
          La FAO describe la agroecología en 10 elementos. Así los vivimos en
          CityHuertas, en las huertas de la ciudad. Toca un principio para
          leer más.
        </p>
      </div>

      <div className="principios__lista">
        {principiosCH.map(({ elementoFAO, titulo, frase, detalle }, indice) => (
          <details key={titulo} className="principio">
            <summary>
              <span className="principio__numero" aria-hidden="true">
                {String(indice + 1).padStart(2, '0')}
              </span>

              <span className="principio__textos">
                <span className="principio__fao">
                  <span className="visualmente-oculto">Principio {indice + 1}. </span>
                  Elemento FAO: {elementoFAO}
                </span>
                <span className="principio__titulo">{titulo}</span>
                <span className="principio__frase">“{frase}”</span>
              </span>

              <span className="principio__icono" aria-hidden="true" />
            </summary>

            <p className="principio__detalle">{detalle}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default PrincipiosCH
