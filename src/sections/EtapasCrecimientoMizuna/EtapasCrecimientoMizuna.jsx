import './EtapasCrecimientoMizuna.css'

function EtapasCrecimiento({
  etapas,
  indiceEtapa,
  alCambiarEtapa,
}) {
  const etapaSeleccionada = etapas[indiceEtapa]
  const porcentaje = (indiceEtapa / (etapas.length - 1)) * 100

  return (
    <section
      className="etapas"
      id="etapas-crecimiento"
      aria-labelledby="titulo-etapas"
    >
      <div className="etapas__contenedor">
        <div className="etapas__encabezado">
          <div>
            <p className="etapas__etiqueta">Explora la planta</p>
            <h2 className="etapas__titulo" id="titulo-etapas">
              Etapas de crecimiento
            </h2>
          </div>

          <p className="etapas__descripcion" aria-live="polite">
            {etapaSeleccionada.descripcion}
          </p>
        </div>

        <div className="etapas__desplazable">
          <div
            className="etapas__contenido"
            style={{ '--cantidad-etapas': etapas.length }}
          >
            <div className="etapas__barra">
              <input
                className="etapas__control"
                type="range"
                min={0}
                max={etapas.length - 1}
                step={1}
                value={indiceEtapa}
                onChange={(evento) =>
                  alCambiarEtapa(Number(evento.target.value))
                }
                style={{ '--progreso': `${porcentaje}%` }}
                aria-label="Seleccionar etapa de crecimiento"
                aria-valuetext={etapaSeleccionada.nombre}
              />
            </div>

            <div className="etapas__lista">
              {etapas.map((etapa, indice) => (
                <button
                  key={etapa.nombre}
                  type="button"
                  className={`etapa ${
                    indice === indiceEtapa ? 'etapa--activa' : ''
                  }`}
                  onClick={() => alCambiarEtapa(indice)}
                  aria-pressed={indice === indiceEtapa}
                >
                  <span className="etapa__numero" aria-hidden="true">
                    {indice + 1}
                  </span>

                  <span className="etapa__nombre">
                    {etapa.nombre}
                  </span>

                  <span className="etapa__subtitulo">
                    {etapa.subtitulo}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EtapasCrecimiento