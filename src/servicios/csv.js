/*
 * Lector de CSV (el formato que entrega Google Sheets al publicar una hoja).
 * Respeta comillas, comas y saltos de línea dentro de una celda.
 */

export function leerCsv(texto) {
  const filas = []
  let fila = []
  let celda = ''
  let entreComillas = false

  const limpio = texto.replace(/^\uFEFF/, '')

  for (let i = 0; i < limpio.length; i += 1) {
    const caracter = limpio[i]

    if (entreComillas) {
      if (caracter === '"' && limpio[i + 1] === '"') {
        celda += '"'
        i += 1
      } else if (caracter === '"') {
        entreComillas = false
      } else {
        celda += caracter
      }
    } else if (caracter === '"') {
      entreComillas = true
    } else if (caracter === ',') {
      fila.push(celda)
      celda = ''
    } else if (caracter === '\n' || caracter === '\r') {
      if (caracter === '\r' && limpio[i + 1] === '\n') i += 1
      fila.push(celda)
      filas.push(fila)
      fila = []
      celda = ''
    } else {
      celda += caracter
    }
  }

  if (celda !== '' || fila.length > 0) {
    fila.push(celda)
    filas.push(fila)
  }

  return filas
}

// "Opción A" → "opcion_a"; "Por dentro" → "por_dentro".
export function normalizarEncabezado(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
}

/**
 * Convierte el CSV en objetos con las columnas como claves.
 * Cada objeto lleva `_fila`: el número de la fila en la hoja (la 1 son los
 * encabezados), para poder decirle a la empresa dónde está un error.
 */
export function csvAObjetos(texto) {
  const [encabezados = [], ...filas] = leerCsv(texto)
  const claves = encabezados.map(normalizarEncabezado)

  return filas
    .map((celdas, indice) => {
      const objeto = { _fila: indice + 2 }
      claves.forEach((clave, columna) => {
        if (clave) objeto[clave] = (celdas[columna] ?? '').trim()
      })
      return objeto
    })
    .filter((objeto) => Object.entries(objeto).some(([clave, valor]) => clave !== '_fila' && valor))
}
