import logoBlanco from '../../assets/images/cityhuertas-isotipo-blanco.png'
import navegacion from '../../data/navegacion'
import { autoresFotos } from '../../data/fotos'
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
        <p>
          Fotografías de{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
          : {autoresFotos.join(', ')}.
        </p>
      </div>
    </footer>
  )
}

export default Footer
