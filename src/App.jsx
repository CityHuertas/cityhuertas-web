import { useState } from 'react'

import Header from './components/layout/Header'
import Agroecologia from './sections/Agroecologia/Agroecologia'
import VistaGeneralMizuna from './sections/VistaGeneralMizuna/VistaGeneralMizuna'
import EtapasCrecimiento from './sections/EtapasCrecimientoMizuna/EtapasCrecimientoMizuna'
import DatoCuriosoMizuna from './sections/DatoCuriosoMizuna/DatoCuriosoMizuna'
import LlamadoRestaurantes from './sections/LlamadoRestaurantes/LlamadoRestaurantes'
import etapasMizuna from './data/etapasMizuna'

import './App.css'

const seccionesPendientes = {
  procesos: {
    titulo: 'Procesos',
    descripcion:
      'Aquí podrás conocer los procesos utilizados en la producción agroecológica.',
  },
  recursos: {
    titulo: 'Recursos',
    descripcion:
      'Próximamente encontrarás materiales para aprender más sobre agroecología.',
  },
  contacto: {
    titulo: 'Contacto',
    descripcion:
      'Esta sección permitirá comunicarse con CityHuertas y solicitar información.',
  },
}

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  const [indiceEtapa, setIndiceEtapa] = useState(0)

  const etapaSeleccionada = etapasMizuna[indiceEtapa]

  const cambiarSeccion = (seccion) => {
    setSeccionActiva(seccion)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const seccionPendiente = seccionesPendientes[seccionActiva]

  return (
    <>
      <Header
        seccionActiva={seccionActiva}
        alNavegar={cambiarSeccion}
      />

      <main>
        {seccionActiva === 'inicio' && (
          <section className="pagina-inicio">
            <div className="pagina-inicio__contenido">
              <p className="pagina-inicio__etiqueta">
                Agroecología urbana
              </p>

              <h1>
                Conoce el alimento desde su origen
              </h1>

              <p className="pagina-inicio__descripcion">
                Explora qué es la agroecología y descubre cómo cambian las
                plantas durante cada etapa de su crecimiento.
              </p>

              <div className="pagina-inicio__acciones">
                <button
                  type="button"
                  onClick={() => cambiarSeccion('agroecologia')}
                >
                  Conocer la agroecología
                </button>

                <button
                  className="pagina-inicio__boton-secundario"
                  type="button"
                  onClick={() => cambiarSeccion('plantas')}
                >
                  Explorar las plantas
                </button>
              </div>
            </div>
          </section>
        )}

        {seccionActiva === 'agroecologia' && (
          <Agroecologia />
        )}

        {seccionActiva === 'plantas' && (
          <>
            <VistaGeneralMizuna etapa={etapaSeleccionada} />

            <EtapasCrecimiento
              etapas={etapasMizuna}
              indiceEtapa={indiceEtapa}
              alCambiarEtapa={setIndiceEtapa}
            />

            <DatoCuriosoMizuna />
            <LlamadoRestaurantes />
          </>
        )}

        {seccionPendiente && (
          <section className="seccion-pendiente">
            <div className="seccion-pendiente__contenido">
              <span>CityHuertas</span>
              <h1>{seccionPendiente.titulo}</h1>
              <p>{seccionPendiente.descripcion}</p>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default App