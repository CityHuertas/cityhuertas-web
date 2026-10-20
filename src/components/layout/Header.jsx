import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import logoCityHuertas from '../../assets/images/cityhuertas.png'
import navegacion from '../../data/navegacion'
import { enlaceA } from '../../hooks/useRuta'
import './Header.css'

// Contacto va aparte, como botón destacado.
const enlaces = navegacion.filter(({ id }) => id !== 'contacto')

function Header({ rutaActual }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [conScroll, setConScroll] = useState(false)

  // Transparente sobre la foto de portada; sólido al bajar.
  useEffect(() => {
    const revisar = () => setConScroll(window.scrollY > 24)

    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [])

  // El menú del celular se cierra con Escape.
  useEffect(() => {
    if (!menuAbierto) return

    const alPresionar = (evento) => {
      if (evento.key === 'Escape') setMenuAbierto(false)
    }

    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [menuAbierto])

  const cerrarMenu = () => setMenuAbierto(false)

  const clases = [
    'site-header',
    (conScroll || menuAbierto) && 'site-header--solido',
    menuAbierto && 'site-header--abierto',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={clases}>
      <div className="header-container">
        <a
          className="brand"
          href={enlaceA('inicio')}
          aria-label="CityHuertas, ir al inicio"
          onClick={cerrarMenu}
        >
          <img className="brand-logo" src={logoCityHuertas} alt="" />
        </a>

        <nav
          className="navigation"
          id="navegacion-principal"
          aria-label="Navegación principal"
        >
          {enlaces.map(({ nombre, id }) => (
            <a
              className={rutaActual === id ? 'active' : undefined}
              href={enlaceA(id)}
              key={id}
              aria-current={rutaActual === id ? 'page' : undefined}
              onClick={cerrarMenu}
            >
              {nombre}
            </a>
          ))}

          <a
            className={`navigation__contacto ${rutaActual === 'contacto' ? 'active' : ''}`}
            href={enlaceA('contacto')}
            aria-current={rutaActual === 'contacto' ? 'page' : undefined}
            onClick={cerrarMenu}
          >
            Contacto
          </a>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="navegacion-principal"
          onClick={() => setMenuAbierto((estado) => !estado)}
        >
          {menuAbierto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

export default Header
