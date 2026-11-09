import { ArrowDown, BookOpen, Flame, Minus, Plus, Scale } from 'lucide-react'

import Termino from '../../components/Termino/Termino'
import { compuestos, glosario } from '../../data/cienciaMizuna'
import './CienciaMizuna.css'

function CienciaMizuna() {
  return (
    <section className="ciencia" aria-labelledby="titulo-ciencia">
      <h2 id="titulo-ciencia">¿Por qué pica y por qué amarga?</h2>
      <p className="ciencia__intro">
        El picor y el amargor de la Mizuna parecen lo mismo, pero vienen de
        procesos distintos y cambian de forma diferente mientras la planta
        crece. Toca las palabras subrayadas para ver qué significan.
      </p>

      <div className="ciencia__tarjetas">
        {/* Picor */}
        <article className="ciencia__tarjeta">
          <Flame className="ciencia__icono" size={30} strokeWidth={1.6} aria-hidden="true" />
          <h3>El picor: una reacción al masticar</h3>

          <ol className="reaccion">
            <li>
              <span className="reaccion__paso">En la hoja</span>
              Los <Termino definicion={glosario.glucosinolatos}>glucosinolatos</Termino>{' '}
              y la <Termino definicion={glosario.mirosinasa}>mirosinasa</Termino>{' '}
              están guardados por separado.
            </li>
            <li aria-hidden="true" className="reaccion__flecha">
              <ArrowDown size={20} />
            </li>
            <li>
              <span className="reaccion__paso">Al masticar</span>
              Se rompen las células y los dos se mezclan.
            </li>
            <li aria-hidden="true" className="reaccion__flecha">
              <ArrowDown size={20} />
            </li>
            <li className="reaccion__resultado">
              <span className="reaccion__paso">Resultado</span>
              Se forman{' '}
              <Termino definicion={glosario.isotiocianatos}>isotiocianatos</Termino>:
              el mismo tipo de picor de la mostaza y el wasabi.
            </li>
          </ol>
        </article>

        {/* Amargor */}
        <article className="ciencia__tarjeta">
          <Scale className="ciencia__icono" size={30} strokeWidth={1.6} aria-hidden="true" />
          <h3>El amargor: un balance</h3>

          <div className="balance">
            <div className="balance__lado balance__lado--sube">
              <p className="balance__titulo">
                <Plus size={18} aria-hidden="true" /> Lo aumentan
              </p>
              <ul>
                <li>
                  Algunos <Termino definicion={glosario.glucosinolatos}>glucosinolatos</Termino>
                </li>
                <li>
                  El <Termino definicion={glosario.acidoMalico}>ácido málico</Termino>
                </li>
              </ul>
            </div>

            <div className="balance__lado balance__lado--baja">
              <p className="balance__titulo">
                <Minus size={18} aria-hidden="true" /> Lo suavizan
              </p>
              <ul>
                <li>
                  <Termino definicion={glosario.aminoacidos}>Aminoácidos</Termino> como la
                  glutamina y la asparagina
                </li>
                <li>Los azúcares</li>
              </ul>
            </div>
          </div>

          <p className="ciencia__conclusion">
            Por eso, una hoja con menos glucosinolatos{' '}
            <strong>no es necesariamente menos amarga</strong>: depende de todo
            el balance.
          </p>
        </article>
      </div>

      {/* Versión técnica, cerrada por defecto. */}
      <details className="saber-mas">
        <summary>
          <BookOpen size={20} aria-hidden="true" />
          Para saber más: la versión técnica
        </summary>

        <div className="saber-mas__contenido">
          <h3>Compuestos que dan el sabor</h3>
          <div className="saber-mas__tabla">
            <table>
              <thead>
                <tr>
                  <th scope="col">Grupo</th>
                  <th scope="col">Ejemplos</th>
                  <th scope="col">Efecto en el sabor</th>
                </tr>
              </thead>
              <tbody>
                {compuestos.map(({ grupo, ejemplos, efecto }) => (
                  <tr key={grupo}>
                    <th scope="row">{grupo}</th>
                    <td>{ejemplos}</td>
                    <td>{efecto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </section>
  )
}

export default CienciaMizuna
