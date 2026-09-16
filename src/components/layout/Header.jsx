import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

import logoCityHuertas from '../../assets/images/cityhuertas.png'
import './Header.css'

const navigation = [
  {
    nombre: 'Inicio',
    id: 'inicio',
  },
  {
    nombre: 'Sobre agroecología',
    id: 'agroecologia',
  },
  {
    nombre: 'Plantas',
    id: 'plantas',
  },
  {
    nombre: 'Procesos',
    id: 'procesos',
  },
  {
    nombre: 'Recursos',
    id: 'recursos',
  },
  {
    nombre: 'Contacto',
    id: 'contacto',
  },
]

function Header({ seccionActiva, alNavegar }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const seleccionarSeccion = (evento, id) => {
    evento.preventDefault()
    alNavegar(id)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <a
          className="brand"
          href="#inicio"
          onClick={(evento) =>
            seleccionarSeccion(evento, 'inicio')
          }
        >
          <img
            className="brand-logo"
            src={logoCityHuertas}
            alt="CityHuertas"
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
          {navigation.map(({ nombre, id }) => (
            <a
              className={seccionActiva === id ? 'active' : ''}
              href={`#${id}`}
              key={id}
              aria-current={
                seccionActiva === id ? 'page' : undefined
              }
              onClick={(evento) =>
                seleccionarSeccion(evento, id)
              }
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