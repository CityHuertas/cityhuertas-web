import { ChefHat } from 'lucide-react'

import { enlaceA } from '../../hooks/useRuta'
import './LlamadoRestaurantes.css'

function LlamadoRestaurantes({ etapa }) {
  return (
    <section className="llamado-restaurantes" aria-labelledby="titulo-llamado">
      <div className="llamado-restaurantes__panel">
        <ChefHat
          className="llamado-restaurantes__icono"
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <div className="llamado-restaurantes__texto">
          <h2 id="titulo-llamado">
            ¿Tienes un restaurante o un hotel?
          </h2>

          <p>
            Estás viendo la etapa <strong>{etapa.nombre}</strong>. Cada
            etapa tiene su propio sabor, textura e intensidad: cuéntanos qué
            buscas para tu cocina y te ayudamos a elegir el momento de
            cosecha.
          </p>
        </div>

        <a
          className="llamado-restaurantes__boton"
          href={enlaceA('contacto')}
        >
          Solicitar información
        </a>
      </div>
    </section>
  )
}

export default LlamadoRestaurantes
