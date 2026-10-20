import { Lightbulb } from 'lucide-react'
import './DatoCuriosoMizuna.css'

function DatoCuriosoMizuna() {
  return (
    <aside className="dato-curioso" aria-labelledby="titulo-dato">
      <div className="dato-curioso__contenedor">
        <Lightbulb
          className="dato-curioso__icono"
          size={28}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <div>
          <h2 id="titulo-dato">¿Sabías que?</h2>

          <p>
            El sabor, el color y la textura de la Mizuna morada cambian según
            su etapa de crecimiento. Algunos restaurantes prefieren sus hojas
            jóvenes por ser más tiernas y suaves, mientras que otros buscan
            plantas más desarrolladas por su sabor intenso, sus notas picantes
            y su textura crujiente.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default DatoCuriosoMizuna
