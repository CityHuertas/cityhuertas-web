import { ArrowUpRight, ChefHat, ShoppingBasket, Trophy } from 'lucide-react'

import Portada from '../../components/Portada/Portada'
import fotos, { srcSet } from '../../data/fotos'
import { enlaceA } from '../../hooks/useRuta'
import './Inicio.css'

const secciones = [
  {
    id: 'agroecologia',
    titulo: 'Agroecología',
    texto: 'Qué es, sus cuatro dimensiones y cómo se vive en una finca.',
    foto: fotos.manosTierra,
  },
  {
    id: 'plantas',
    titulo: 'Plantas',
    texto: 'Fichas interactivas: mira cómo cambian el color, el sabor y la textura de cada planta mientras crece.',
    foto: fotos.acelga,
  },
  {
    id: 'procesos',
    titulo: 'Procesos',
    texto: 'Compostaje, riego y cuidado del suelo en la producción agroecológica.',
    foto: fotos.riego,
    proximamente: true,
  },
]

function Inicio() {
  return (
    <>
      <Portada
        foto={fotos.huerta}
        tamano="completa"
        idTitulo="titulo-inicio"
        titulo="Conoce el alimento desde su origen"
        descripcion="Descubre cómo se cultiva lo que comes, quién lo cultiva y por qué la agroecología cuida la tierra, el agua y a las personas."
      >
        <a className="boton boton--lima" href={enlaceA('agroecologia')}>
          Conocer la agroecología
        </a>
        <a className="boton boton--vidrio" href={enlaceA('plantas')}>
          Ver las plantas
        </a>
      </Portada>

      {/* Qué es CityHuertas, en una frase. */}
      <section className="inicio-intro" aria-label="Sobre CityHuertas">
        <p className="inicio-intro__frase">
          La agroecología es una manera de producir, distribuir y consumir
          alimentos cuidando la naturaleza, las personas y el territorio.
        </p>

        <div className="inicio-intro__detalle">
          <p>
            En CityHuertas lo contamos con ejemplos reales de fincas como Finca
            Micaela: sus prácticas, sus cultivos y lo que pasa con cada planta
            desde que brota hasta que llega a la mesa.
          </p>
          <a className="boton boton--borde" href={enlaceA('agroecologia')}>
            Leer más
          </a>
        </div>
      </section>

      {/* Las secciones del sitio como tarjetas fotográficas. */}
      <section className="explora" aria-labelledby="titulo-explora">
        <h2 id="titulo-explora">Explora CityHuertas</h2>

        <div className="explora__tarjetas">
          {secciones.map(({ id, titulo, texto, foto, proximamente }) => (
            <a key={id} className="tarjeta-foto" href={enlaceA(id)}>
              <img
                src={foto.src(900)}
                srcSet={srcSet(foto)}
                sizes="(max-width: 900px) 100vw, 33vw"
                alt=""
                loading="lazy"
              />

              {proximamente && (
                <span className="tarjeta-foto__aviso">Próximamente</span>
              )}

              <span className="tarjeta-foto__texto">
                <span className="tarjeta-foto__titulo">{titulo}</span>
                <span className="tarjeta-foto__descripcion">{texto}</span>
              </span>

              <span className="tarjeta-foto__flecha" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Invitación a la trivia. */}
      <section className="invitacion-trivia" aria-labelledby="titulo-invitacion">
        <Trophy className="invitacion-trivia__icono" size={44} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <h2 id="titulo-invitacion">¿Cuánto sabes de agroecología?</h2>
          <p>
            Juega la trivia de CityHuertas: 10 preguntas contra el reloj,
            puntos por racha y una tabla con los mejores puntajes.
          </p>
        </div>
        <a className="boton boton--lima" href={enlaceA('recursos')}>
          Jugar la trivia
        </a>
      </section>

      {/* Dos públicos sobre una misma foto. */}
      <section className="publicos" aria-labelledby="titulo-publicos">
        <img
          className="publicos__foto"
          src={fotos.plantulas.src(1600)}
          srcSet={srcSet(fotos.plantulas)}
          sizes="100vw"
          alt=""
          loading="lazy"
        />

        <div className="publicos__contenido">
          <h2 id="titulo-publicos">Para quien cocina y para quien come</h2>

          <div className="publicos__paneles">
            <article className="panel-vidrio">
              <ChefHat size={30} strokeWidth={1.6} aria-hidden="true" />
              <h3>Restaurantes y hoteles</h3>
              <p>
                Conoce el sabor, la textura y el mejor momento de cosecha de
                cada planta, y pide información para tu cocina.
              </p>
              <div className="panel-vidrio__acciones">
                <a className="boton boton--lima" href={enlaceA('contacto')}>
                  Solicitar información
                </a>
                <a className="boton boton--vidrio" href={enlaceA('plantas')}>
                  Ver las fichas
                </a>
              </div>
            </article>

            <article className="panel-vidrio">
              <ShoppingBasket size={30} strokeWidth={1.6} aria-hidden="true" />
              <h3>Quienes consumen</h3>
              <p>
                Entiende qué hay detrás de un alimento agroecológico y por qué
                vale la pena elegirlo.
              </p>
              <div className="panel-vidrio__acciones">
                <a className="boton boton--vidrio" href={enlaceA('agroecologia')}>
                  Conocer la agroecología
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default Inicio
