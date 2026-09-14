import {
  Clock3,
  HeartPulse,
  Leaf,
  Salad,
  Smile,
  Sprout,
} from 'lucide-react'

import './VistaGeneralMizuna.css'

function Caracteristica({ titulo, descripcion, icono }) {
  return (
    <article className="caracteristica">
      {icono}

      <div>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
    </article>
  )
}

function VistaGeneralMizuna({ etapa }) {
  const propiedadesIcono = {
    className: 'caracteristica__icono',
    size: 30,
    strokeWidth: 1.8,
    'aria-hidden': true,
  }

  return (
    <section className="vista-mizuna" id="plantas">
      <div className="vista-mizuna__contenedor">
        <header className="vista-mizuna__encabezado">
          <p className="vista-mizuna__etiqueta">
            <Leaf size={18} aria-hidden="true" />
            Ciclo de crecimiento
          </p>

          <h1>Mizuna morada</h1>

          <p className="vista-mizuna__descripcion">
            Conoce cómo cambian sus características en cada etapa de crecimiento.
          </p>
        </header>

        <div className="vista-mizuna__contenido">
          <div className="vista-mizuna__caracteristicas">
            <Caracteristica
              titulo="Color"
              descripcion={etapa.color}
              icono={<Leaf {...propiedadesIcono} />}
            />

            <Caracteristica
              titulo="Forma"
              descripcion={etapa.forma}
              icono={<Sprout {...propiedadesIcono} />}
            />

            <Caracteristica
              titulo="Sabor"
              descripcion={etapa.sabor}
              icono={<Smile {...propiedadesIcono} />}
            />
          </div>

          <div className="vista-mizuna__centro">
            <div className="vista-mizuna__marco-imagen">
              {etapa.imagen ? (
                <img
                  className="vista-mizuna__imagen"
                  src={etapa.imagen}
                  alt={`Mizuna morada: ${etapa.nombre}`}
                />
              ) : (
                <span>Imagen pendiente de esta etapa</span>
              )}
            </div>

            <div className="vista-mizuna__etapa-seleccionada">
              <span>Etapa seleccionada</span>
              <strong>{etapa.nombre}</strong>
            </div>
          </div>

          <div className="vista-mizuna__caracteristicas">
            <Caracteristica
              titulo="Textura"
              descripcion={etapa.textura}
              icono={<Salad {...propiedadesIcono} />}
            />

            <Caracteristica
              titulo="Perfil"
              descripcion={etapa.perfil}
              icono={<HeartPulse {...propiedadesIcono} />}
            />

            <Caracteristica
              titulo="Estado"
              descripcion={etapa.estado}
              icono={<Clock3 {...propiedadesIcono} />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default VistaGeneralMizuna