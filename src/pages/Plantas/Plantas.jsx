import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
import FichaProducto from '../../sections/FichaProducto/FichaProducto'
import CienciaMizuna from '../../sections/CienciaMizuna/CienciaMizuna'
import DatoCurioso from '../../sections/DatoCurioso/DatoCurioso'
import LlamadoRestaurantes from '../../sections/LlamadoRestaurantes/LlamadoRestaurantes'
import { useContenido } from '../../hooks/useContenido'
import { enlaceA } from '../../hooks/useRuta'

import './Plantas.css'

// Permite abrir la ficha en una etapa concreta: #/plantas/mizuna-morada?etapa=3
function leerEtapaInicial(totalEtapas) {
  const consulta = window.location.hash.split('?')[1] ?? ''
  const etapa = Number(new URLSearchParams(consulta).get('etapa'))

  return etapa >= 1 && etapa <= totalEtapas ? etapa - 1 : 0
}

// La sección científica solo existe para la Mizuna (está escrita a mano).
const SECCIONES_EXTRA = {
  'mizuna-morada': CienciaMizuna,
}

function VistaProducto({ producto }) {
  const [indiceEtapa, setIndiceEtapa] = useState(() =>
    leerEtapaInicial(producto.etapas.length),
  )
  const Extra = SECCIONES_EXTRA[producto.id]

  return (
    <>
      <FichaProducto
        producto={producto}
        indiceEtapa={indiceEtapa}
        alCambiarEtapa={setIndiceEtapa}
      />

      {Extra && <Extra />}
      <DatoCurioso texto={producto.datoCurioso} />
      <LlamadoRestaurantes etapa={producto.etapas[indiceEtapa]} />
    </>
  )
}

function Plantas({ idProducto }) {
  const { listo, productos } = useContenido()

  const producto =
    productos.find((item) => item.id === idProducto) ?? productos[0]

  return (
    <>
      <Portada
        idTitulo="titulo-plantas"
        titulo="Plantas"
        descripcion="Fichas interactivas de lo que se cultiva en la finca: cómo cambian su color, su sabor y su textura mientras crecen."
      />

      {!listo && (
        <p className="plantas__cargando" role="status">
          <LoaderCircle size={20} aria-hidden="true" /> Cargando las fichas…
        </p>
      )}

      {listo && productos.length > 1 && (
        <nav className="plantas__selector" aria-label="Elige una planta">
          <ul>
            {productos.map((item) => (
              <li key={item.id}>
                <a
                  href={enlaceA(`plantas/${item.id}`)}
                  aria-current={item.id === producto.id ? 'page' : undefined}
                >
                  {item.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* La key reinicia la etapa al cambiar de planta. */}
      {listo && producto && <VistaProducto key={producto.id} producto={producto} />}
    </>
  )
}

export default Plantas
