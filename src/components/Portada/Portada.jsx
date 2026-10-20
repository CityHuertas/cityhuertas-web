import { srcSet } from '../../data/fotos'
import './Portada.css'

/*
 * Banner fotográfico con el título encima. Lo usan todas las páginas.
 * tamano: 'completa' (alto de pantalla, para el Inicio) o 'media'.
 */
function Portada({
  foto,
  titulo,
  descripcion,
  antetitulo,
  tamano = 'media',
  children,
  idTitulo,
}) {
  return (
    <section
      className={`portada portada--${tamano}`}
      aria-labelledby={idTitulo}
    >
      <img
        className="portada__foto"
        src={foto.src(1600)}
        srcSet={srcSet(foto)}
        sizes="100vw"
        alt={foto.alt}
        fetchPriority="high"
      />

      <div className="portada__contenido">
        {antetitulo && <p className="portada__antetitulo">{antetitulo}</p>}
        <h1 id={idTitulo}>{titulo}</h1>
        {descripcion && <p className="portada__descripcion">{descripcion}</p>}
        {children && <div className="portada__acciones">{children}</div>}
      </div>
    </section>
  )
}

export default Portada
