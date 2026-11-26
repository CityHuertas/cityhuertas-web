import './Portada.css'

/*
 * Encabezado de cada página: título grande, descripción y botones.
 * tamano: 'completa' (más alto, para páginas sueltas como el 404) o 'media'
 * (compacto: título y descripción lado a lado, para las páginas internas).
 */
function Portada({
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
      <div className="portada__contenido">
        <div className="portada__titulo">
          {antetitulo && <p className="portada__antetitulo">{antetitulo}</p>}
          <h1 id={idTitulo}>{titulo}</h1>
        </div>
        {descripcion && <p className="portada__descripcion">{descripcion}</p>}
        {children && <div className="portada__acciones">{children}</div>}
      </div>
    </section>
  )
}

export default Portada
