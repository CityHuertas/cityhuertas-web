import { Droplets, Scissors, Shovel, Sprout, Truck } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
import procesosCH from '../../data/procesosCH'
import { enlaceA } from '../../hooks/useRuta'
import './Procesos.css'

// Un ícono por fase, en el mismo orden que src/data/procesosCH.js.
const iconos = [Shovel, Sprout, Droplets, Scissors, Truck]

function Procesos() {
  return (
    <>
      <Portada
        idTitulo="titulo-procesos"
        antetitulo="Del suelo a la cocina"
        titulo="Procesos"
        descripcion="Así trabajamos con los huerteros y huerteras en cada ciclo: desde preparar el suelo hasta entregar las hojas frescas en la cocina."
      />

      <section className="procesos" aria-label="Fases del ciclo productivo">
        <ol className="linea-tiempo">
          {procesosCH.map(({ fase, resumen, actividades }, indice) => {
            const Icono = iconos[indice] ?? Sprout

            return (
              <li key={fase} className="fase">
                <div className="fase__marcador" aria-hidden="true">
                  <span className="fase__numero">{indice + 1}</span>
                </div>

                <div className="fase__tarjeta">
                  <div className="fase__encabezado">
                    <Icono className="fase__icono" size={28} strokeWidth={1.7} aria-hidden="true" />
                    <div>
                      <h2>
                        <span className="visualmente-oculto">Fase {indice + 1}: </span>
                        {fase}
                      </h2>
                      <p className="fase__resumen">{resumen}</p>
                    </div>
                  </div>

                  <ul className="fase__actividades">
                    {actividades.map((actividad) => (
                      <li key={actividad}>{actividad}</li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="procesos__cierre">
          <p>
            Todo este ciclo se guía por nuestros principios agroecológicos.
          </p>
          <a
            className="boton boton--borde"
            href={`${enlaceA('agroecologia')}?seccion=principios`}
          >
            Ver los 10 principios
          </a>
        </div>
      </section>
    </>
  )
}

export default Procesos
