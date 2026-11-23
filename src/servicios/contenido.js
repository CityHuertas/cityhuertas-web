import { ESPERA_MAXIMA_MS, URL_ETAPAS, URL_PREGUNTAS, URL_PRODUCTOS } from '../config/contenido'
import productosLocales from '../data/productos'
import preguntasLocales from '../data/preguntasTrivia'
import { csvAObjetos } from './csv'

/*
 * Carga los productos, las etapas y las preguntas desde Google Sheets.
 * Si la hoja no está configurada, no responde o no tiene filas válidas,
 * se usa el contenido guardado en el código. Las filas con problemas se
 * saltan y quedan anotadas en `avisos` (se ven en #/revisar-contenido).
 */

export const MINIMO_PREGUNTAS = 3
const LETRAS = ['a', 'b', 'c', 'd']

// "Mizuna morada" → "mizuna-morada" (se usa en la dirección: #/plantas/mizuna-morada).
export function crearId(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Una foto puede ser un enlace completo o un archivo dentro de public/imagenes/.
export function rutaFoto(valor) {
  const limpio = (valor ?? '').trim()
  if (!limpio) return null
  if (/^https?:\/\//i.test(limpio)) return limpio
  return `${import.meta.env.BASE_URL}imagenes/${limpio.replace(/^\/+/, '').replace(/^imagenes\//, '')}`
}

function esNo(valor) {
  return /^(no|n|false|falso|0)$/i.test((valor ?? '').trim())
}

function prepararProducto(producto) {
  return {
    ...producto,
    id: crearId(producto.nombre),
    etapas: producto.etapas.map((etapa) => ({ ...etapa, imagen: rutaFoto(etapa.foto) })),
  }
}

export const contenidoLocal = {
  productos: productosLocales.map(prepararProducto),
  preguntas: preguntasLocales,
}

/* ---------- Productos y etapas ---------- */

export function procesarProductos(filasProductos, filasEtapas) {
  const avisos = []
  const aviso = (hoja, fila, mensaje) => avisos.push({ hoja, fila, mensaje })
  const porId = new Map()

  filasProductos.forEach((fila) => {
    const nombre = fila.producto
    if (!nombre) return aviso('Productos', fila._fila, 'Falta el nombre del producto. Se omitió la fila.')
    if (esNo(fila.mostrar)) return

    const id = crearId(nombre)
    if (porId.has(id)) return aviso('Productos', fila._fila, `"${nombre}" está repetido. Se usó solo la primera fila.`)

    porId.set(id, {
      id,
      nombre,
      finca: fila.finca || '',
      descripcion: fila.descripcion || '',
      cosecha: fila.cosecha || '',
      datoCurioso: fila.dato_curioso || '',
      etapas: [],
    })
  })

  filasEtapas.forEach((fila) => {
    const nombreProducto = fila.producto
    if (!nombreProducto) return aviso('Etapas', fila._fila, 'Falta el producto al que pertenece la etapa. Se omitió la fila.')

    const producto = porId.get(crearId(nombreProducto))
    if (!producto) {
      return aviso(
        'Etapas',
        fila._fila,
        `El producto "${nombreProducto}" no está en la pestaña Productos (o está oculto). Revisa que el nombre sea igual.`,
      )
    }

    if (!fila.etapa) return aviso('Etapas', fila._fila, 'Falta el nombre de la etapa. Se omitió la fila.')

    let intensidad = null
    if (fila.intensidad) {
      const numero = Number(fila.intensidad.replace(',', '.'))
      if (Number.isInteger(numero) && numero >= 1 && numero <= 4) intensidad = numero
      else aviso('Etapas', fila._fila, `La intensidad "${fila.intensidad}" debe ser un número de 1 a 4. No se mostrará la barra.`)
    }

    const orden = Number(fila.orden)

    producto.etapas.push({
      orden: Number.isFinite(orden) && fila.orden !== '' ? orden : producto.etapas.length + 1,
      nombre: fila.etapa,
      subtitulo: fila.subtitulo || '',
      descripcion: fila.descripcion || '',
      color: fila.color || '',
      forma: fila.forma || '',
      sabor: fila.sabor || '',
      textura: fila.textura || '',
      perfil: fila.perfil || '',
      porDentro: fila.por_dentro || '',
      intensidad,
      imagen: rutaFoto(fila.foto),
    })

    if (!fila.foto) aviso('Etapas', fila._fila, `La etapa "${fila.etapa}" de ${producto.nombre} no tiene foto. Se mostrará el aviso “Foto pendiente”.`)
  })

  const productos = []
  porId.forEach((producto) => {
    if (producto.etapas.length === 0) {
      aviso('Productos', null, `"${producto.nombre}" no tiene etapas en la pestaña Etapas, así que no se muestra.`)
      return
    }
    producto.etapas.sort((a, b) => a.orden - b.orden)
    productos.push(producto)
  })

  return { productos, avisos }
}

/* ---------- Preguntas de la trivia ---------- */

export function procesarPreguntas(filas) {
  const avisos = []
  const preguntas = []

  filas.forEach((fila) => {
    if (esNo(fila.mostrar)) return

    const aviso = (mensaje) => avisos.push({ hoja: 'Preguntas', fila: fila._fila, mensaje })

    if (!fila.pregunta) return aviso('Falta el texto de la pregunta. Se omitió la fila.')

    const opciones = LETRAS.map((letra) => fila[`opcion_${letra}`] || '')
    const usadas = opciones.filter(Boolean)
    if (usadas.length < 2) return aviso('La pregunta necesita al menos 2 opciones. Se omitió.')

    // Las opciones vacías se quitan; la correcta se busca por su letra.
    const letraCorrecta = (fila.correcta || '').trim().toLowerCase()
    const indiceOriginal = LETRAS.indexOf(letraCorrecta)
    if (indiceOriginal === -1 || !opciones[indiceOriginal]) {
      return aviso(`La respuesta correcta debe ser la letra de una opción llena (A, B, C o D). Dice "${fila.correcta || ''}". Se omitió.`)
    }

    preguntas.push({
      pregunta: fila.pregunta,
      opciones: usadas,
      // Posición de la correcta contando solo las opciones llenas.
      correcta: opciones.slice(0, indiceOriginal).filter(Boolean).length,
      explicacion: fila.explicacion || '',
    })
  })

  return { preguntas, avisos }
}

/* ---------- Carga ---------- */

async function descargar(url) {
  const controlador = new AbortController()
  const reloj = setTimeout(() => controlador.abort(), ESPERA_MAXIMA_MS)

  let respuesta
  try {
    respuesta = await fetch(url, { signal: controlador.signal })
  } catch (error) {
    clearTimeout(reloj)
    throw new Error(
      error.name === 'AbortError'
        ? `la hoja tardó más de ${ESPERA_MAXIMA_MS / 1000} segundos en responder`
        : 'no hubo conexión con la hoja o el enlace está mal escrito',
      { cause: error },
    )
  }

  try {
    if (!respuesta.ok) throw new Error(`la hoja respondió con el código ${respuesta.status}`)
    const texto = await respuesta.text()
    if (/^\s*</.test(texto)) throw new Error('el enlace no es de una pestaña publicada como CSV')
    return csvAObjetos(texto)
  } finally {
    clearTimeout(reloj)
  }
}

async function cargarProductos() {
  if (!URL_PRODUCTOS || !URL_ETAPAS) {
    return { productos: contenidoLocal.productos, origen: 'codigo', avisos: [] }
  }

  try {
    const [filasProductos, filasEtapas] = await Promise.all([descargar(URL_PRODUCTOS), descargar(URL_ETAPAS)])
    const { productos, avisos } = procesarProductos(filasProductos, filasEtapas)

    if (productos.length === 0) {
      avisos.push({ hoja: 'Productos', fila: null, mensaje: 'No hay ningún producto válido en la hoja. Se muestra el contenido guardado en el código.' })
      return { productos: contenidoLocal.productos, origen: 'respaldo', avisos }
    }

    return { productos, origen: 'hoja', avisos }
  } catch (error) {
    return {
      productos: contenidoLocal.productos,
      origen: 'respaldo',
      avisos: [{ hoja: 'Productos y Etapas', fila: null, mensaje: `No se pudo leer la hoja (${error.message}). Se muestra el contenido guardado en el código.` }],
    }
  }
}

async function cargarPreguntas() {
  if (!URL_PREGUNTAS) {
    return { preguntas: contenidoLocal.preguntas, origen: 'codigo', avisos: [] }
  }

  try {
    const { preguntas, avisos } = procesarPreguntas(await descargar(URL_PREGUNTAS))

    if (preguntas.length < MINIMO_PREGUNTAS) {
      avisos.push({ hoja: 'Preguntas', fila: null, mensaje: `Hay solo ${preguntas.length} preguntas válidas (mínimo ${MINIMO_PREGUNTAS}). Se usan las preguntas guardadas en el código.` })
      return { preguntas: contenidoLocal.preguntas, origen: 'respaldo', avisos }
    }

    return { preguntas, origen: 'hoja', avisos }
  } catch (error) {
    return {
      preguntas: contenidoLocal.preguntas,
      origen: 'respaldo',
      avisos: [{ hoja: 'Preguntas', fila: null, mensaje: `No se pudo leer la hoja (${error.message}). Se usan las preguntas guardadas en el código.` }],
    }
  }
}

/* ---------- Estado compartido (se carga una sola vez por visita) ---------- */

const hayHoja = Boolean(URL_PRODUCTOS || URL_ETAPAS || URL_PREGUNTAS)

let estado = hayHoja
  ? {
      listo: false,
      productos: [],
      preguntas: [],
      origen: { productos: 'cargando', preguntas: 'cargando' },
      avisos: [],
    }
  : {
      listo: true,
      productos: contenidoLocal.productos,
      preguntas: contenidoLocal.preguntas,
      origen: { productos: 'codigo', preguntas: 'codigo' },
      avisos: [],
    }

const suscriptores = new Set()
let cargaIniciada = !hayHoja

function iniciarCarga() {
  if (cargaIniciada) return
  cargaIniciada = true

  Promise.all([cargarProductos(), cargarPreguntas()]).then(([p, q]) => {
    estado = {
      listo: true,
      productos: p.productos,
      preguntas: q.preguntas,
      origen: { productos: p.origen, preguntas: q.origen },
      avisos: [...p.avisos, ...q.avisos],
    }
    suscriptores.forEach((avisar) => avisar())
  })
}

export function suscribirContenido(avisar) {
  suscriptores.add(avisar)
  iniciarCarga()
  return () => suscriptores.delete(avisar)
}

export function leerContenido() {
  return estado
}

// Indica si hay alguna dirección de hoja configurada (lo usa #/revisar-contenido).
export const hojaConfigurada = {
  productos: Boolean(URL_PRODUCTOS && URL_ETAPAS),
  preguntas: Boolean(URL_PREGUNTAS),
}
