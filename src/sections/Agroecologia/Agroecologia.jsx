import {
  ArrowRight,
  CircleDollarSign,
  Leaf,
  Recycle,
  Sprout,
  Users,
} from 'lucide-react'

import './Agroecologia.css'

const dimensiones = [
  {
    titulo: 'Ambiental',
    descripcion:
      'Protege el suelo, el agua, la biodiversidad, los árboles y los polinizadores.',
    Icono: Leaf,
  },
  {
    titulo: 'Productiva',
    descripcion:
      'Combina cultivos, observación, compostaje y prácticas adaptadas al territorio.',
    Icono: Sprout,
  },
  {
    titulo: 'Social',
    descripcion:
      'Reconoce los saberes de quienes cultivan y fortalece la relación con la comunidad.',
    Icono: Users,
  },
  {
    titulo: 'Económica',
    descripcion:
      'Aprovecha recursos locales y busca relaciones más justas entre productores y consumidores.',
    Icono: CircleDollarSign,
  },
]

const practicas = [
  'Compost y abonos naturales',
  'Cuidado del suelo y el agua',
  'Árboles nativos y cercas vivas',
  'Protección de polinizadores',
  'Reducción de insumos sintéticos',
]

function Agroecologia() {
  return (
    <section
      className="agroecologia"
      id="agroecologia"
      aria-labelledby="titulo-agroecologia"
    >
      <div className="agroecologia__contenedor">
        <header className="agroecologia__encabezado">
          <p className="agroecologia__etiqueta">
            <Leaf size={18} aria-hidden="true" />
            Una forma de cuidar la vida
          </p>

          <h2 id="titulo-agroecologia">
            ¿Qué es la agroecología?
          </h2>

          <p>
            Comprenderla comienza por mirar todo lo que existe alrededor de un
            alimento, desde el suelo donde crece hasta la persona que lo consume.
          </p>
        </header>

        <div className="agroecologia__introduccion">
          <article className="agroecologia__definicion">
            <span className="agroecologia__numero">01</span>

            <p className="agroecologia__frase">
              Es una manera integral de producir, distribuir y consumir
              alimentos cuidando las relaciones entre la naturaleza, las
              personas y el territorio.
            </p>

            <div className="agroecologia__aclaracion">
              <strong>No es solamente cultivar sin químicos.</strong>

              <p>
                También implica conservar la biodiversidad, aprovechar los
                recursos locales, valorar los conocimientos de los productores
                y construir relaciones más justas alrededor de los alimentos.
              </p>
            </div>
          </article>

          <div
            className="agroecologia__recorrido"
            aria-label="Relaciones que integra la agroecología"
          >
            <div className="agroecologia__recorrido-item">
              <span>Suelo y agua</span>
              <small>La base del cultivo</small>
            </div>

            <ArrowRight aria-hidden="true" />

            <div className="agroecologia__recorrido-item">
              <span>Alimentos</span>
              <small>Producidos con cuidado</small>
            </div>

            <ArrowRight aria-hidden="true" />

            <div className="agroecologia__recorrido-item">
              <span>Personas</span>
              <small>Productores y consumidores</small>
            </div>
          </div>
        </div>

        <div className="agroecologia__dimensiones">
          <div className="agroecologia__subtitulo">
            <span>02</span>

            <div>
              <p>Una mirada integral</p>
              <h3>Sus cuatro dimensiones</h3>
            </div>
          </div>

          <div className="agroecologia__tarjetas">
            {dimensiones.map(({ titulo, descripcion, Icono }) => (
              <article className="dimension" key={titulo}>
                <div className="dimension__icono">
                  <Icono size={27} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h4>{titulo}</h4>
                <p>{descripcion}</p>
              </article>
            ))}
          </div>
        </div>

        <article className="agroecologia__experiencia">
          <div className="agroecologia__experiencia-icono">
            <Recycle size={32} strokeWidth={1.7} aria-hidden="true" />
          </div>

          <div className="agroecologia__experiencia-contenido">
            <p className="agroecologia__experiencia-etiqueta">
              Agroecología en la práctica
            </p>

            <h3>La experiencia de Finca Micaela</h3>

            <p>
              En la finca, cultivar también significa cuidar el territorio.
              Cada práctica busca mantener el suelo vivo, proteger el agua,
              acompañar los ciclos naturales y reducir la dependencia de
              productos externos.
            </p>

            <div className="agroecologia__practicas">
              {practicas.map((practica) => (
                <span key={practica}>{practica}</span>
              ))}
            </div>
          </div>
        </article>

        <footer className="agroecologia__fuente">
          <p>
            Concepto basado en la FAO y en la entrevista realizada a Finca
            Micaela el 20 de agosto.
          </p>

          <a
            href="https://www.fao.org/agroecology/overview/es/"
            target="_blank"
            rel="noreferrer"
          >
            Consultar definición de la FAO
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  )
}

export default Agroecologia