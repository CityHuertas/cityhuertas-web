import { Leaf, Menu, X } from 'lucide-react'
import logoCityHuertas from '../../assets/images/cityhuertas.png'
import { useState } from 'react'
import './Header.css'

const navigation = [
    'Inicio',
    'Sobre agroecología',
    'Plantas',
    'Procesos',
    'Recursos',
    'Contacto',
]

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
    <header className="site-header">
        <div className="header-container">
        <a className="brand" href="#inicio">
            <img
            className="brand-logo"
            src={logoCityHuertas}
            alt="CityHuertas"
            />
        </a>

        <button
            className="menu-button"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
        >
            {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'}>
            {navigation.map((item) => (
            <a
                className={item === 'Plantas' ? 'active' : ''}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                key={item}
                onClick={() => setMenuOpen(false)}
            >
                {item}
            </a>
            ))}
        </nav>

        <div className="sustainability-message">
            <Leaf size={24} />
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