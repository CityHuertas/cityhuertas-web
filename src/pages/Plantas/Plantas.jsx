import { useEffect, useState } from 'react'

import VistaGeneralMizuna from '../../sections/VistaGeneralMizuna/VistaGeneralMizuna'
import EtapasCrecimiento from '../../sections/EtapasCrecimientoMizuna/EtapasCrecimientoMizuna'
import DatoCuriosoMizuna from '../../sections/DatoCuriosoMizuna/DatoCuriosoMizuna'
import LlamadoRestaurantes from '../../sections/LlamadoRestaurantes/LlamadoRestaurantes'
import etapasMizuna from '../../data/etapasMizuna'

function Plantas() {
  const [indiceEtapa, setIndiceEtapa] = useState(0)

  // Descarga las imágenes de todas las etapas por adelantado para que
  // el cambio de etapa sea inmediato y la foto no parpadee.
  useEffect(() => {
    etapasMizuna.forEach(({ imagen }) => {
      const precarga = new Image()
      precarga.src = imagen
    })
  }, [])

  return (
    <>
      <VistaGeneralMizuna etapa={etapasMizuna[indiceEtapa]} />

      <EtapasCrecimiento
        etapas={etapasMizuna}
        indiceEtapa={indiceEtapa}
        alCambiarEtapa={setIndiceEtapa}
      />

      <DatoCuriosoMizuna />
      <LlamadoRestaurantes />
    </>
  )
}

export default Plantas
