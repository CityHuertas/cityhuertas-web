import { Lightbulb } from 'lucide-react'
import './DatoCurioso.css'

// Recuadro "¿Sabías que?" con el dato curioso del producto (viene de la hoja).
function DatoCurioso({ texto }) {
  if (!texto) return null

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
          <p>{texto}</p>
        </div>
      </div>
    </aside>
  )
}

export default DatoCurioso
