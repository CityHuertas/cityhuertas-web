import { useState } from 'react'

import Portada from '../../components/Portada/Portada'
import fotos from '../../data/fotos'
import FichaMizuna from '../../sections/FichaMizuna/FichaMizuna'
import DatoCuriosoMizuna from '../../sections/DatoCuriosoMizuna/DatoCuriosoMizuna'
import LlamadoRestaurantes from '../../sections/LlamadoRestaurantes/LlamadoRestaurantes'
import etapasMizuna from '../../data/etapasMizuna'

// Permite abrir la ficha en una etapa concreta: #/plantas?etapa=3
function leerEtapaInicial() {
  const consulta = window.location.hash.split('?')[1] ?? ''
  const etapa = Number(new URLSearchParams(consulta).get('etapa'))

  return etapa >= 1 && etapa <= etapasMizuna.length ? etapa - 1 : 0
}

function Plantas() {
  const [indiceEtapa, setIndiceEtapa] = useState(leerEtapaInicial)

  return (
    <>
      <Portada
        foto={fotos.acelga}
        idTitulo="titulo-plantas"
        titulo="Plantas"
        descripcion="Fichas interactivas de lo que se cultiva en la finca: cómo cambian su color, su sabor y su textura mientras crecen. Empezamos con la Mizuna morada."
      />

      <FichaMizuna
        etapas={etapasMizuna}
        indiceEtapa={indiceEtapa}
        alCambiarEtapa={setIndiceEtapa}
      />

      <DatoCuriosoMizuna />
      <LlamadoRestaurantes etapa={etapasMizuna[indiceEtapa]} />
    </>
  )
}

export default Plantas
