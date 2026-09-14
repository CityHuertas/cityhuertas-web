import { Lightbulb, Salad } from 'lucide-react'
import './DatoCuriosoMizuna.css'

function DatoCuriosoMizuna() {
  return (
    <section className="dato-curioso" id="dato-curioso">
      <div className="dato-curioso__contenedor">
        <div className="dato-curioso__icono-principal">
          <Lightbulb size={32} strokeWidth={2} aria-hidden="true" />
        </div>

        <div className="dato-curioso__contenido">
          <h2>¿Sabías que?</h2>

          <p>
            El sabor, el color y la textura de la Mizuna morada cambian según
            su etapa de crecimiento. Algunos restaurantes prefieren sus hojas
            jóvenes por ser más tiernas y suaves, mientras que otros buscan
            plantas más desarrolladas por su sabor intenso, sus notas picantes
            y su textura crujiente.
          </p>
        </div>

        <div className="dato-curioso__imagen-pendiente">
          <Salad size={72} strokeWidth={1.2} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default DatoCuriosoMizuna