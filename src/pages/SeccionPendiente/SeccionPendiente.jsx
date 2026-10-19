import { enlaceA } from '../../hooks/useRuta'
import '../paginas.css'

function SeccionPendiente({ titulo, descripcion, enlaceInicio = false }) {
  return (
    <section className="seccion-pendiente">
      <div className="seccion-pendiente__contenido">
        <span>CityHuertas</span>
        <h1>{titulo}</h1>
        <p>{descripcion}</p>

        {enlaceInicio && (
          <div className="pagina-inicio__acciones">
            <a href={enlaceA('inicio')}>Volver al inicio</a>
          </div>
        )}
      </div>
    </section>
  )
}

export default SeccionPendiente
