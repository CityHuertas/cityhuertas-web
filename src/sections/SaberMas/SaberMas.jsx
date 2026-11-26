import { BookOpen } from 'lucide-react'

import './SaberMas.css'

/*
 * "Para saber más: la versión técnica": tabla de compuestos de una planta.
 * Las filas vienen de la pestaña Ciencia de la hoja de Google
 * (o, para la Mizuna, del respaldo en src/data/cienciaMizuna.js).
 * Si la planta no tiene filas, no se muestra nada.
 */
function SaberMas({ filas }) {
  if (!filas?.length) return null

  return (
    <section className="saber-mas-seccion" aria-label="Versión técnica">
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
                {filas.map(({ grupo, ejemplos, efecto }, indice) => (
                  <tr key={`${grupo}-${indice}`}>
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

export default SaberMas
