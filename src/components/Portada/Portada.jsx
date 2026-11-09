import './Portada.css'

/*
 * Encabezado de cada página: título grande, descripción y botones.
 * tamano: 'completa' (más alto, para el Inicio) o 'media'.
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
        {antetitulo && <p className="portada__antetitulo">{antetitulo}</p>}
        <h1 id={idTitulo}>{titulo}</h1>
        {descripcion && <p className="portada__descripcion">{descripcion}</p>}
        {children && <div className="portada__acciones">{children}</div>}
      </div>
    </section>
  )
}

export default Portada
