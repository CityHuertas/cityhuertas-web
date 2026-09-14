import { Store } from 'lucide-react'
import './LlamadoRestaurantes.css'

function LlamadoRestaurantes() {
  return (
    <section className="llamado-restaurantes">
      <div className="llamado-restaurantes__contenedor">
        <div className="llamado-restaurantes__icono">
          <Store size={28} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="llamado-restaurantes__contenido">
          <h2>¿Eres restaurante?</h2>

          <p>
            Elige la etapa ideal de la Mizuna morada según tus necesidades.
            Cada etapa tiene un perfil de sabor, textura e intensidad único.
          </p>
        </div>

        <a
          className="llamado-restaurantes__boton"
          href="#contacto"
        >
          Solicitar información
        </a>
      </div>
    </section>
  )
}

export default LlamadoRestaurantes