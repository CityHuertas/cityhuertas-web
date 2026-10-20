import { useEffect, useRef, useState } from 'react'
import { Check, Flame, RotateCcw, Timer, Trophy, X } from 'lucide-react'

import preguntasTrivia from '../../data/preguntasTrivia'
import {
  PREGUNTAS_POR_PARTIDA,
  PUNTOS_ACIERTO,
  PUNTOS_RAPIDEZ_MAX,
  SEGUNDOS_POR_PREGUNTA,
  multiplicadorRacha,
} from '../../config/trivia'
import { modoPrueba } from '../../servicios/ranking'
import FormularioPuntaje from './FormularioPuntaje'
import TablaPosiciones from './TablaPosiciones'
import './Trivia.css'

const LETRAS = ['A', 'B', 'C', 'D']

function mezclar(lista) {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

// Elige las preguntas de la partida y mezcla también el orden de las opciones.
function prepararPartida() {
  return mezclar(preguntasTrivia)
    .slice(0, PREGUNTAS_POR_PARTIDA)
    .map((item) => {
      const opciones = mezclar(item.opciones.map((texto, indice) => ({ texto, indice })))
      return {
        ...item,
        opciones: opciones.map(({ texto }) => texto),
        correcta: opciones.findIndex(({ indice }) => indice === item.correcta),
      }
    })
}

function Trivia() {
  const [fase, setFase] = useState('portada') // portada | jugando | final
  const [preguntas, setPreguntas] = useState([])
  const [indice, setIndice] = useState(0)
  const [respuesta, setRespuesta] = useState(null) // null | número de opción | 'tiempo'
  const [puntaje, setPuntaje] = useState(0)
  const [racha, setRacha] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [ganados, setGanados] = useState(0)
  const [restante, setRestante] = useState(SEGUNDOS_POR_PREGUNTA)
  const [finPregunta, setFinPregunta] = useState(0)
  const [guardado, setGuardado] = useState(null) // { apodo, puntaje } tras guardar
  const [versionRanking, setVersionRanking] = useState(0)

  const botonSiguiente = useRef(null)
  const tituloPregunta = useRef(null)
  const panelJuego = useRef(null)

  const pregunta = preguntas[indice]
  const ultima = indice === preguntas.length - 1

  const empezar = () => {
    setPreguntas(prepararPartida())
    setIndice(0)
    setRespuesta(null)
    setPuntaje(0)
    setRacha(0)
    setAciertos(0)
    setGanados(0)
    setGuardado(null)
    setRestante(SEGUNDOS_POR_PREGUNTA)
    setFinPregunta(Date.now() + SEGUNDOS_POR_PREGUNTA * 1000)
    setFase('jugando')
  }

  // Cuenta regresiva de la pregunta actual.
  useEffect(() => {
    if (fase !== 'jugando' || respuesta !== null) return

    const reloj = setInterval(() => {
      const segundos = Math.max(0, (finPregunta - Date.now()) / 1000)
      setRestante(segundos)

      if (segundos === 0) {
        setRespuesta('tiempo')
        setRacha(0)
        setGanados(0)
      }
    }, 100)

    return () => clearInterval(reloj)
  }, [fase, respuesta, finPregunta])

  const responder = (opcion) => {
    if (respuesta !== null) return

    setRespuesta(opcion)

    if (opcion === pregunta.correcta) {
      const nuevaRacha = racha + 1
      const puntos = Math.round(
        (PUNTOS_ACIERTO + PUNTOS_RAPIDEZ_MAX * (restante / SEGUNDOS_POR_PREGUNTA)) *
          multiplicadorRacha(nuevaRacha),
      )

      setRacha(nuevaRacha)
      setAciertos((valor) => valor + 1)
      setPuntaje((valor) => valor + puntos)
      setGanados(puntos)
    } else {
      setRacha(0)
      setGanados(0)
    }
  }

  const siguiente = () => {
    if (ultima) {
      setFase('final')
      return
    }

    setIndice((valor) => valor + 1)
    setRespuesta(null)
    setRestante(SEGUNDOS_POR_PREGUNTA)
    setFinPregunta(Date.now() + SEGUNDOS_POR_PREGUNTA * 1000)
  }

  // Después de responder, el foco pasa al botón "Siguiente".
  // Con una pregunta nueva (o al terminar), la página sube al inicio del
  // panel para que el marcador quede visible bajo el menú fijo.
  useEffect(() => {
    if (fase === 'portada') return

    if (fase === 'jugando' && respuesta !== null) {
      botonSiguiente.current?.focus()
      return
    }

    panelJuego.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (fase === 'jugando') tituloPregunta.current?.focus({ preventScroll: true })
  }, [fase, respuesta, indice])

  // Teclas 1-4 o A-D para responder.
  useEffect(() => {
    if (fase !== 'jugando' || respuesta !== null) return

    const alPresionar = (evento) => {
      if (evento.target.closest?.('input, textarea')) return
      const tecla = evento.key.toUpperCase()
      const opcion = ['1', '2', '3', '4'].includes(tecla)
        ? Number(tecla) - 1
        : LETRAS.indexOf(tecla)

      if (opcion >= 0) responder(opcion)
    }

    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  })

  const alGuardar = (registro) => {
    setGuardado(registro)
    setVersionRanking((valor) => valor + 1)
  }

  const progresoTiempo = restante / SEGUNDOS_POR_PREGUNTA
  const multiplicador = multiplicadorRacha(racha)

  return (
    <section className="trivia" aria-labelledby="titulo-trivia">
      <div className="trivia__juego" ref={panelJuego}>
        {fase === 'portada' && (
          <div className="trivia__portada">
            <Trophy size={40} strokeWidth={1.6} aria-hidden="true" />
            <h2 id="titulo-trivia">Trivia agroecológica</h2>
            <p>
              ¿Cuánto sabes de agroecología y de las plantas de la finca?
              Responde {PREGUNTAS_POR_PARTIDA} preguntas y entra a la tabla de
              posiciones.
            </p>

            <ul className="trivia__reglas">
              <li>
                <Timer size={20} aria-hidden="true" />
                {SEGUNDOS_POR_PREGUNTA} segundos por pregunta: entre más rápido, más puntos.
              </li>
              <li>
                <Flame size={20} aria-hidden="true" />
                Racha: ×1,5 con 3 aciertos seguidos y ×2 con 5.
              </li>
              <li>
                <Check size={20} aria-hidden="true" />
                Después de cada respuesta aprendes algo nuevo.
              </li>
            </ul>

            <button className="boton boton--lima" type="button" onClick={empezar}>
              Empezar a jugar
            </button>
          </div>
        )}

        {fase === 'jugando' && pregunta && (
          <div className="trivia__partida">
            <h2 id="titulo-trivia" className="visualmente-oculto">
              Trivia agroecológica
            </h2>

            <div className="trivia__marcador">
              <span>
                Pregunta {indice + 1} de {preguntas.length}
              </span>

              <span className="trivia__puntaje" aria-live="polite">
                {puntaje.toLocaleString('es-CO')} pts
              </span>

              {multiplicador > 1 && (
                <span className="trivia__racha">
                  <Flame size={16} aria-hidden="true" /> ×{String(multiplicador).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Barra de tiempo que se vacía. */}
            <div
              className={`trivia__tiempo ${restante <= 5 ? 'trivia__tiempo--urgente' : ''}`}
              role="timer"
              aria-label={`Quedan ${Math.ceil(restante)} segundos`}
            >
              <div style={{ transform: `scaleX(${progresoTiempo})` }} />
              <span aria-hidden="true">{Math.ceil(restante)} s</span>
            </div>

            <p className="trivia__pregunta" ref={tituloPregunta} tabIndex={-1}>
              {pregunta.pregunta}
            </p>

            <div className="trivia__opciones">
              {pregunta.opciones.map((texto, opcion) => {
                const respondida = respuesta !== null
                const esCorrecta = opcion === pregunta.correcta
                const elegida = opcion === respuesta

                let estado = ''
                if (respondida && esCorrecta) estado = 'correcta'
                else if (respondida && elegida) estado = 'incorrecta'
                else if (respondida) estado = 'apagada'

                return (
                  <button
                    key={texto}
                    type="button"
                    className={`trivia__opcion ${estado ? `trivia__opcion--${estado}` : ''}`}
                    onClick={() => responder(opcion)}
                    disabled={respondida}
                  >
                    <span className="trivia__letra" aria-hidden="true">
                      {estado === 'correcta' ? <Check size={18} /> : estado === 'incorrecta' ? <X size={18} /> : LETRAS[opcion]}
                    </span>
                    <span>{texto}</span>
                  </button>
                )
              })}
            </div>

            {respuesta !== null && (
              <div
                className={`trivia__retro ${respuesta === pregunta.correcta ? 'trivia__retro--bien' : 'trivia__retro--mal'}`}
                role="status"
              >
                <p className="trivia__veredicto">
                  {respuesta === pregunta.correcta
                    ? `¡Correcto! +${ganados} pts`
                    : respuesta === 'tiempo'
                      ? 'Se acabó el tiempo'
                      : 'No es esa'}
                </p>
                <p>{pregunta.explicacion}</p>

                <button
                  ref={botonSiguiente}
                  className="boton boton--lima"
                  type="button"
                  onClick={siguiente}
                >
                  {ultima ? 'Ver mi resultado' : 'Siguiente pregunta'}
                </button>
              </div>
            )}
          </div>
        )}

        {fase === 'final' && (
          <div className="trivia__final">
            <h2 id="titulo-trivia">¡Terminaste!</h2>

            <p className="trivia__total">
              {puntaje.toLocaleString('es-CO')} <span>puntos</span>
            </p>
            <p className="trivia__resumen">
              Acertaste {aciertos} de {preguntas.length} preguntas.
            </p>

            {guardado ? (
              <p className="trivia__guardado" role="status">
                <Check size={20} aria-hidden="true" /> Guardamos tu puntaje como{' '}
                <strong>{guardado.apodo}</strong>.
              </p>
            ) : (
              <FormularioPuntaje
                puntaje={puntaje}
                aciertos={aciertos}
                alGuardar={alGuardar}
              />
            )}

            <button className="boton boton--vidrio" type="button" onClick={empezar}>
              <RotateCcw size={18} aria-hidden="true" /> Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <TablaPosiciones version={versionRanking} resaltado={guardado} />

      {modoPrueba && (
        <p className="trivia__aviso-prueba">
          Modo de prueba: los puntajes se guardan solo en este navegador hasta
          que se conecte la hoja de Google Sheets.
        </p>
      )}
    </section>
  )
}

export default Trivia
