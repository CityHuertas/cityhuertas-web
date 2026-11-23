import { useEffect, useRef } from 'react'

import elementosFAO from '../../data/elementosFAO'
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
        <h2 id="titulo-principios">Los 10 elementos de la agroecología</h2>
        <p>
          La FAO (Organización de las Naciones Unidas para la Alimentación y la
          Agricultura) resume la agroecología en 10 elementos que se conectan
          entre sí. Toca uno para leer qué significa y cómo lo aplicamos en
          CityHuertas.
        </p>
      </div>

      <div className="principios__lista">
        {elementosFAO.map(({ nombre, idea, explicacion, enCityHuertas }, indice) => (
          <details key={nombre} className="principio">
            <summary>
              <span className="principio__numero" aria-hidden="true">
                {String(indice + 1).padStart(2, '0')}
              </span>

              <span className="principio__textos">
                <span className="principio__fao">
                  Elemento {indice + 1} de 10
                </span>
                <span className="principio__titulo">{nombre}</span>
                <span className="principio__frase">{idea}</span>
              </span>

              <span className="principio__icono" aria-hidden="true" />
            </summary>

            <div className="principio__detalle">
              <p>{explicacion}</p>
              <p className="principio__ch">
                <strong>En CityHuertas:</strong> {enCityHuertas}
              </p>
            </div>
          </details>
        ))}
      </div>

      <p className="principios__fuente">
        Fuente:{' '}
        <a
          href="https://www.fao.org/agroecology/overview/the-10-elements-of-agroecology/es"
          target="_blank"
          rel="noreferrer"
        >
          FAO, Los 10 elementos de la agroecología
        </a>
      </p>
    </section>
  )
}

export default PrincipiosCH
