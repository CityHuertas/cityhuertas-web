import { enlaceA } from '../../hooks/useRuta'
import '../paginas.css'

function Inicio() {
  return (
    <section className="pagina-inicio">
      <div className="pagina-inicio__contenido">
        <p className="pagina-inicio__etiqueta">Agroecología urbana</p>

        <h1>Conoce el alimento desde su origen</h1>

        <p className="pagina-inicio__descripcion">
          Explora qué es la agroecología y descubre cómo cambian las plantas
          durante cada etapa de su crecimiento.
        </p>

        <div className="pagina-inicio__acciones">
          <a href={enlaceA('agroecologia')}>Conocer la agroecología</a>

          <a
            className="pagina-inicio__boton-secundario"
            href={enlaceA('plantas')}
          >
            Explorar las plantas
          </a>
        </div>
      </div>
    </section>
  )
}

export default Inicio
