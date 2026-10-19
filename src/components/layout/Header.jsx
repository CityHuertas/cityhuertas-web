import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

import logoCityHuertas from '../../assets/images/cityhuertas.png'
import navegacion from '../../data/navegacion'
import { enlaceA } from '../../hooks/useRuta'
import './Header.css'

function Header({ rutaActual }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const cerrarMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-container">
        <a
          className="brand"
          href={enlaceA('inicio')}
          aria-label="CityHuertas, ir al inicio"
          onClick={cerrarMenu}
        >
          <img
            className="brand-logo"
            src={logoCityHuertas}
            alt=""
          />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navegacion-principal"
          onClick={() => setMenuOpen((estado) => !estado)}
        >
          {menuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>

        <nav
          className={
            menuOpen
              ? 'navigation navigation-open'
              : 'navigation'
          }
          id="navegacion-principal"
          aria-label="Navegación principal"
        >
          {navegacion.map(({ nombre, id }) => (
            <a
              className={rutaActual === id ? 'active' : ''}
              href={enlaceA(id)}
              key={id}
              aria-current={rutaActual === id ? 'page' : undefined}
              onClick={cerrarMenu}
            >
              {nombre}
            </a>
          ))}
        </nav>

        <div className="sustainability-message">
          <Leaf size={24} aria-hidden="true" />

          <span>
            Cultivamos futuro
            <br />
            de forma sostenible
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header