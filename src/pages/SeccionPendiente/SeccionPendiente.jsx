import Portada from '../../components/Portada/Portada'
import { enlaceA } from '../../hooks/useRuta'

// Secciones en construcción y página no encontrada.
function SeccionPendiente({ titulo, descripcion, noEncontrada = false }) {
  return (
    <Portada
      tamano="completa"
      idTitulo="titulo-seccion"
      antetitulo={noEncontrada ? 'Error 404' : 'Próximamente'}
      titulo={titulo}
      descripcion={descripcion}
    >
      <a className="boton" href={enlaceA('inicio')}>
        Volver al inicio
      </a>
    </Portada>
  )
}

export default SeccionPendiente
