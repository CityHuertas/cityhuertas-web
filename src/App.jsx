import { useState } from 'react'

import Header from './components/layout/Header'
import VistaGeneralMizuna from './sections/VistaGeneralMizuna/VistaGeneralMizuna'
import EtapasCrecimiento from './sections/EtapasCrecimientoMizuna/EtapasCrecimientoMizuna'
import DatoCuriosoMizuna from './sections/DatoCuriosoMizuna/DatoCuriosoMizuna'
import LlamadoRestaurantes from './sections/LlamadoRestaurantes/LlamadoRestaurantes'
import etapasMizuna from './data/etapasMizuna'

function App() {
  const [indiceEtapa, setIndiceEtapa] = useState(0)
  const etapaSeleccionada = etapasMizuna[indiceEtapa]

  return (
    <>
      <Header />

      <main>
        <VistaGeneralMizuna etapa={etapaSeleccionada} />

        <EtapasCrecimiento
          etapas={etapasMizuna}
          indiceEtapa={indiceEtapa}
          alCambiarEtapa={setIndiceEtapa}
        />

        <DatoCuriosoMizuna />
        <LlamadoRestaurantes />
      </main>
    </>
  )
}

export default App