import { useEffect, useId, useRef, useState } from 'react'

import './Termino.css'

/*
 * Palabra técnica subrayada. Al tocarla (o con Enter) muestra su definición.
 * Se cierra con Escape, tocando fuera o tocándola de nuevo.
 */
function Termino({ children, definicion }) {
  const [abierto, setAbierto] = useState(false)
  const contenedor = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!abierto) return

    const alPresionar = (evento) => {
      if (evento.key === 'Escape') setAbierto(false)
    }
    const alTocarFuera = (evento) => {
      if (!contenedor.current?.contains(evento.target)) setAbierto(false)
    }

    document.addEventListener('keydown', alPresionar)
    document.addEventListener('pointerdown', alTocarFuera)
    return () => {
      document.removeEventListener('keydown', alPresionar)
      document.removeEventListener('pointerdown', alTocarFuera)
    }
  }, [abierto])

  return (
    <span className="termino" ref={contenedor}>
      <button
        type="button"
        className="termino__palabra"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((valor) => !valor)}
      >
        {children}
      </button>

      <span
        id={id}
        role="note"
        className="termino__definicion"
        hidden={!abierto}
      >
        <strong>{children}:</strong> {definicion}
      </span>
    </span>
  )
}

export default Termino
