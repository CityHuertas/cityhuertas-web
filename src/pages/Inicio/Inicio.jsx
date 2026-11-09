import { ArrowUpRight, ChefHat, Leaf, ShoppingBasket, Sprout, Trophy } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
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
    texto: '10 preguntas contra el reloj, puntos por racha y una tabla con los mejores puntajes.',
    Icono: Trophy,
    color: 'hoja',
  },
]

function Inicio() {
  return (
    <>
      <Portada
        tamano="completa"
        idTitulo="titulo-inicio"
        titulo="Conoce el alimento desde su origen"
        descripcion="Descubre cómo se cultiva lo que comes, quién lo cultiva y por qué la agroecología cuida la tierra, el agua y a las personas."
      >
        <a className="boton" href={enlaceA('agroecologia')}>
          Conocer la agroecología
        </a>
        <a className="boton boton--borde" href={enlaceA('plantas')}>
          Ver las plantas
        </a>
      </Portada>

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
