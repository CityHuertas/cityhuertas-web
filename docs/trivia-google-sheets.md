# Conectar la trivia y Contáctanos con Google Sheets

Una sola hoja de Google Sheets guarda dos cosas, cada una en su pestaña (el programa las crea solo):

- **Puntajes:** cada puntaje de la trivia (apodo, nombre, contacto, puntaje y autorización). El sitio solo **lee** el top 10 de apodos y puntajes; el nombre y el contacto nunca se muestran.
- **Contactos:** cada mensaje del formulario **Contáctanos** (nombre, tipo de cliente, empresa, contacto, qué le interesa, mensaje y autorización). La columna **Estado** empieza en "Nuevo"; CityHuertas puede cambiarla a "Respondido" para llevar el control.

Mientras `URL_RANKING` esté vacío en `src/config/trivia.js`, el juego funciona en **modo de prueba** (todo queda solo en el navegador de quien juega).

## 1. Crear la hoja

1. Crea una hoja nueva en Google Sheets con la cuenta de CityHuertas, por ejemplo **"CityHuertas · Trivia"**.
2. Compártela **solo** con el equipo. Contiene datos personales.

## 2. Pegar el código

1. En la hoja: **Extensiones → Apps Script**.
2. Borra lo que aparece y pega este código:

```js
const HOJA_PUNTAJES = 'Puntajes'
const HOJA_CONTACTOS = 'Contactos'
const PUNTAJE_MAXIMO = 4000 // 10 preguntas × 200 puntos × racha ×2

// Devuelve la pestaña pedida y la crea con sus títulos si no existe.
function hoja_(nombre, titulos) {
  const libro = SpreadsheetApp.getActiveSpreadsheet()
  let hoja = libro.getSheetByName(nombre)
  if (!hoja) {
    hoja = libro.insertSheet(nombre)
    hoja.appendRow(titulos)
  }
  return hoja
}

function hojaPuntajes_() {
  return hoja_(HOJA_PUNTAJES, ['Fecha', 'Apodo', 'Nombre', 'Contacto', 'Puntaje', 'Aciertos', 'Autoriza datos'])
}

function hojaContactos_() {
  return hoja_(HOJA_CONTACTOS, ['Fecha', 'Nombre', 'Tipo de cliente', 'Empresa', 'Contacto', 'Le interesa', 'Mensaje', 'Autoriza datos', 'Estado'])
}

// Evita que un texto que empiece con = + - @ se ejecute como fórmula.
function limpiar_(valor, maximo) {
  const texto = String(valor || '').trim().slice(0, maximo)
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto
}

function respuesta_(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function agregarFila_(hoja, fila) {
  const candado = LockService.getScriptLock()
  candado.waitLock(10000)
  try {
    hoja.appendRow(fila)
  } finally {
    candado.releaseLock()
  }
}

// El sitio pide el top 10 de la trivia: solo apodo y puntaje.
function doGet() {
  const filas = hojaPuntajes_().getDataRange().getValues().slice(1)
  const ranking = filas
    .map((fila) => ({ apodo: String(fila[1]).replace(/^'/, ''), puntaje: Number(fila[4]) }))
    .filter((fila) => fila.apodo && fila.puntaje >= 0)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 10)

  return respuesta_({ ranking })
}

// El sitio envía un puntaje de la trivia o un mensaje de "Contáctanos".
function doPost(evento) {
  const datos = JSON.parse(evento.postData.contents)
  if (datos.autorizaDatos !== true) return respuesta_({ ok: false })

  if (datos.tipo === 'contacto') {
    const nombre = limpiar_(datos.nombre, 80)
    const contacto = limpiar_(datos.contacto, 80)
    if (!nombre || !contacto) return respuesta_({ ok: false })

    agregarFila_(hojaContactos_(), [
      new Date(),
      nombre,
      limpiar_(datos.tipoCliente, 40),
      limpiar_(datos.empresa, 80),
      contacto,
      limpiar_(datos.producto, 80),
      limpiar_(datos.mensaje, 1000),
      'Sí',
      'Nuevo',
    ])
    return respuesta_({ ok: true })
  }

  const apodo = limpiar_(datos.apodo, 20)
  const nombre = limpiar_(datos.nombre, 80)
  const contacto = limpiar_(datos.contacto, 80)
  const puntaje = Math.max(0, Math.min(Number(datos.puntaje) || 0, PUNTAJE_MAXIMO))
  const aciertos = Math.max(0, Math.min(Number(datos.aciertos) || 0, 10))
  if (!apodo || !nombre || !contacto) return respuesta_({ ok: false })

  agregarFila_(hojaPuntajes_(), [new Date(), apodo, nombre, contacto, puntaje, aciertos, 'Sí'])
  return respuesta_({ ok: true })
}
```

3. Guarda (ícono de disco).

## 3. Publicarlo

1. **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. **Ejecutar como:** Yo (la cuenta de CityHuertas).
4. **Quién tiene acceso:** Cualquier usuario.
5. **Implementar** y acepta los permisos que pide Google.
6. Copia la **URL de la aplicación web** (termina en `/exec`).

## 4. Conectar el sitio

Pega la URL en `src/config/trivia.js`:

```js
export const URL_RANKING = 'https://script.google.com/macros/s/XXXXXXXX/exec'
```

Prueba con `npm run dev`: juega, guarda un puntaje y revisa que aparezca una fila nueva en la hoja. El aviso de "Modo de prueba" desaparece cuando la URL está configurada.

> Si cambias el código de Apps Script, publica de nuevo con **Implementar → Administrar implementaciones → Editar → Versión nueva**; la URL no cambia.

## Datos personales (Ley 1581 de 2012)

Nombre y contacto son datos personales. Para usarlos con fines comerciales hace falta autorización expresa, por eso el formulario tiene una casilla obligatoria que explica el uso. Además:

- Mantengan la hoja privada y compartida solo con quienes la necesitan.
- Usen los datos solo para lo que dice la autorización: escribir sobre productos y actividades.
- Atiendan las solicitudes para actualizar o borrar datos. Definan el canal (correo o WhatsApp) y agréguenlo al texto "¿Cómo usamos tus datos?" en `src/sections/Trivia/FormularioPuntaje.jsx`.
- Validen el texto de la autorización con el docente o con asesoría jurídica antes de publicar.

## Limitación conocida

El juego corre en el navegador, así que una persona con conocimientos técnicos podría enviar un puntaje falso (el script limita el máximo a 4000). Para un prototipo es suficiente; si la tabla llega a tener premios, habría que validar los puntajes en un servidor.
