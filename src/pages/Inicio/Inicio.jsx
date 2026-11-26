import { ArrowRight, ArrowUpRight, ChefHat, Leaf, ShoppingBasket, Sprout, Trophy } from 'lucide-react'

import { enlaceA } from '../../hooks/useRuta'
import './Inicio.css'

const secciones = [
  {
    id: 'agroecologia',
    titulo: 'Agroecología',
    texto: 'Qué es, sus cuatro dimensiones y cómo se vive en una finca.',
    Icono: Leaf,
    color: 'verde',
  },
  {
    id: 'plantas',
    titulo: 'Plantas',
    texto: 'Fichas interactivas: mira cómo cambian el color, el sabor y la textura de cada planta mientras crece.',
    Icono: Sprout,
    color: 'morado',
  },
  {
    id: 'recursos',
    titulo: 'Trivia',
    texto: 'Preguntas contra el reloj, puntos por racha y una tabla con los mejores puntajes.',
    Icono: Trophy,
    color: 'hoja',
  },
]

const FOTO_PORTADA = `${import.meta.env.BASE_URL}imagenes/mizuna/planta-florida.webp`

// Encabezado del Inicio: fondo verde que continúa el menú, con la Mizuna en floración.
function PortadaInicio() {
  return (
    <section className="portada-inicio" aria-labelledby="titulo-inicio">
      <div className="portada-inicio__contenido">
        <div className="portada-inicio__texto">
          <p className="portada-inicio__antetitulo">Agroecología urbana</p>
          <h1 id="titulo-inicio">
            Conoce el alimento <span>desde su origen</span>
          </h1>
          <p className="portada-inicio__descripcion">
            Descubre cómo se cultiva lo que comes, quién lo cultiva y por qué la
            agroecología cuida la tierra, el agua y a las personas.
          </p>
          <div className="portada-inicio__acciones">
            <a className="boton boton--lima" href={enlaceA('plantas')}>
              Ver las plantas <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="boton boton--vidrio" href={enlaceA('agroecologia')}>
              Conocer la agroecología
            </a>
          </div>
        </div>

        <div className="portada-inicio__visual">
          <span className="portada-inicio__halo" aria-hidden="true" />
          <img
            className="portada-inicio__planta"
            src={FOTO_PORTADA}
            alt="Mizuna morada en floración, vista desde arriba"
            width="920"
            height="690"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}

function Inicio() {
  return (
    <>
      <PortadaInicio />

      {/* Qué es CityHuertas, en una frase. */}
      <section className="inicio-intro" aria-label="Sobre CityHuertas">
        <p className="inicio-intro__frase">
          La agroecología es una manera de producir, distribuir y consumir
          alimentos cuidando la naturaleza, las personas y el territorio.
        </p>

        <p className="inicio-intro__detalle">
          En CityHuertas lo contamos con ejemplos reales de fincas como Finca
          Micaela: sus prácticas, sus cultivos y lo que pasa con cada planta
          desde que brota hasta que llega a la mesa.
        </p>
      </section>

      {/* Las secciones del sitio como tarjetas de color. */}
      <section className="explora" aria-labelledby="titulo-explora">
        <h2 id="titulo-explora">Explora CityHuertas</h2>

        <div className="explora__tarjetas">
          {secciones.map(({ id, titulo, texto, Icono, color }) => (
            <a key={id} className={`tarjeta tarjeta--${color}`} href={enlaceA(id)}>
              <Icono className="tarjeta__icono" size={34} strokeWidth={1.6} aria-hidden="true" />

              <span className="tarjeta__titulo">{titulo}</span>
              <span className="tarjeta__descripcion">{texto}</span>

              <span className="tarjeta__flecha" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Dos públicos. */}
      <section className="publicos" aria-labelledby="titulo-publicos">
        <h2 id="titulo-publicos">Para quien cocina y para quien come</h2>

        <div className="publicos__paneles">
          <article className="panel">
            <ChefHat size={30} strokeWidth={1.6} aria-hidden="true" />
            <h3>Restaurantes y hoteles</h3>
            <p>
              Conoce el sabor, la textura y el mejor momento de cosecha de cada
              planta, y pide información para tu cocina.
            </p>
            <div className="panel__acciones">
              <a className="boton" href={enlaceA('contacto')}>
                Solicitar información
              </a>
              <a className="boton boton--borde" href={enlaceA('plantas')}>
                Ver las fichas
              </a>
            </div>
          </article>

          <article className="panel">
            <ShoppingBasket size={30} strokeWidth={1.6} aria-hidden="true" />
            <h3>Quienes consumen</h3>
            <p>
              Entiende qué hay detrás de un alimento agroecológico y por qué vale
              la pena elegirlo.
            </p>
            <div className="panel__acciones">
              <a className="boton boton--borde" href={enlaceA('agroecologia')}>
                Conocer la agroecología
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default Inicio
