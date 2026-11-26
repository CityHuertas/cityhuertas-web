import logoBlanco from '../../assets/images/cityhuertas-isotipo-blanco.png'
import canales from '../../data/canales'
import navegacion from '../../data/navegacion'
import { enlaceA } from '../../hooks/useRuta'
import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-marca">
          <img src={logoBlanco} alt="CityHuertas" />

          <p>
            Agroecología urbana para conocer el alimento desde su origen.
            Proyecto del semillero de investigación CityHuertas.
          </p>

          <ul className="footer-canales" aria-label="Escríbenos">
            {canales.map(({ nombre, texto, url }) => (
              <li key={nombre}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {nombre}: {texto}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-navegacion" aria-label="Navegación del pie de página">
          {navegacion.map(({ nombre, id }) => (
            <a key={id} href={enlaceA(id)}>
              {nombre}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-creditos">
        <p>© {new Date().getFullYear()} CityHuertas</p>
      </div>
    </footer>
  )
}

export default Footer
