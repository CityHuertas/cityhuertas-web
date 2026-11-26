# Editar las plantas y la trivia desde Google Sheets

Las fichas de **Plantas** (con su línea de tiempo por etapas) y las **preguntas de la trivia** se leen de una hoja de Google Sheets. Una vez conectada, la empresa cambia el contenido en la hoja y el sitio se actualiza solo, **sin tocar código ni volver a publicar**.

Mientras no se conecte la hoja, o si la hoja falla, el sitio muestra el contenido guardado en el código: la Mizuna morada (`src/data/productos.js`) y las 15 preguntas originales (`src/data/preguntasTrivia.js`).

> **Importante:** usa una hoja **distinta** de la del ranking de la trivia. Esta hoja se publica en internet (cualquiera con el enlace puede leerla), y la del ranking tiene nombres y contactos.

## 1. Crear la hoja (una sola vez)

1. Abre la plantilla `CityHuertas-contenido.xlsx` en Google Drive: **Nuevo → Subir archivo**, y luego **Abrir con → Hojas de cálculo de Google**. Después usa **Archivo → Guardar como hoja de cálculo de Google**.
2. Llámala, por ejemplo, **"CityHuertas · Contenido del sitio"**.
3. La pestaña **Instrucciones** explica cada columna. Ya trae la Mizuna morada y las 15 preguntas actuales como ejemplo.

Pestañas y columnas (no cambies los nombres ni los títulos de la fila 1):

| Pestaña | Columnas |
|---|---|
| Productos | Producto · Finca · Descripción · Cosecha · Dato curioso · Mostrar |
| Etapas | Producto · Orden · Etapa · Subtítulo · Descripción · Color · Forma · Sabor · Textura · Perfil · Por dentro · Intensidad · Foto |
| Preguntas | Pregunta · Opción A · Opción B · Opción C · Opción D · Correcta · Explicación · Mostrar |

## 2. Publicar las pestañas (una sola vez)

Se publica **cada pestaña por separado** (menos Instrucciones):

1. **Archivo → Compartir → Publicar en la web**.
2. En "Vínculo", elige la pestaña **Productos** y el formato **Valores separados por comas (.csv)**.
3. Pulsa **Publicar** y copia el enlace (termina en `output=csv`).
4. Repite con **Etapas** y con **Preguntas**. Quedan tres enlaces.
5. Deja marcada la opción **"Volver a publicar automáticamente cuando se realicen cambios"** (en "Contenido publicado y configuración").

## 3. Pegar los enlaces en el sitio (una sola vez, la hace el equipo de desarrollo)

En `src/config/contenido.js`:

```js
export const URL_PRODUCTOS = 'https://docs.google.com/spreadsheets/d/e/…/pub?gid=…&single=true&output=csv'
export const URL_ETAPAS = 'https://docs.google.com/spreadsheets/d/e/…/pub?gid=…&single=true&output=csv'
export const URL_PREGUNTAS = 'https://docs.google.com/spreadsheets/d/e/…/pub?gid=…&single=true&output=csv'
```

Sube el cambio con una rama y un Pull Request, como siempre. Desde ese momento, el contenido se edita solo en la hoja.

## 4. Agregar una planta nueva

1. En **Productos**, agrega una fila con el nombre (ej. `Albahaca`) y `sí` en Mostrar.
2. En **Etapas**, agrega una fila por etapa con el **mismo nombre** en la columna Producto y el número de orden (1, 2, 3…). Puede tener las etapas que se quiera.
3. Las columnas que se dejen vacías simplemente no se muestran (por ejemplo, si no hay dato de "Por dentro" o de "Intensidad").
4. En Plantas aparecerá un selector con todas las plantas. Cada una tiene su propia dirección, por ejemplo `#/plantas/albahaca`.

### Fotos

La columna **Foto** acepta tres cosas. La más fácil es Google Drive:

1. **Google Drive (recomendado).** Sube la foto a una carpeta de Drive, haz clic derecho en la foto → **Compartir** → en "Acceso general" elige **Cualquier persona con el enlace** → **Copiar enlace**, y pega ese enlace en la columna Foto. El sitio lo convierte solo en la imagen. Importante: debe ser el enlace de **la foto**, no de la carpeta.
2. **Un archivo del proyecto:** súbelo en GitHub a `public/imagenes/<planta>/` y escribe la ruta desde `imagenes`, por ejemplo `albahaca/plantula.webp`.
3. **Cualquier otro enlace directo** a una imagen que empiece por `https://`.

Recomendado: PNG o WebP con fondo transparente, de unos 1000 px de ancho (máximo 1200), horizontal o cuadrada y de menos de 300 KB. La ficha ajusta la foto a su espacio sin estirarla. Si una etapa aún no tiene foto se verá "Foto pendiente"; si el enlace no funciona (por ejemplo, la foto no está compartida) se verá "Foto no disponible" y la página `#/revisar-contenido` dirá en qué fila está.

### Mostrar solo los productos de temporada

Para que en Plantas aparezca solo lo que está en cosecha, cambia la columna **Mostrar** de la pestaña Productos: **sí** para los de temporada y **no** para los demás. No hace falta borrar nada; cuando vuelva la temporada, se cambia otra vez a **sí**. Si queda un solo producto visible, el selector de plantas desaparece y se muestra directamente su ficha.

## 5. Cambiar las preguntas de la trivia

- Mínimo 2 opciones por pregunta (las vacías no se muestran) y en **Correcta** la letra de la opción buena.
- Con `no` en **Mostrar** se guarda la pregunta sin usarla.
- Cada partida toma 10 preguntas al azar (o todas, si hay menos). Hacen falta al menos 3 válidas; si no, el sitio usa las preguntas guardadas en el código.

## 6. Revisar que todo esté bien

Abre la página oculta **`https://cityhuertas.github.io/cityhuertas-web/#/revisar-contenido`** (no aparece en el menú). Muestra:

- Si el sitio está leyendo la hoja o el contenido guardado.
- Cuántas plantas, etapas y preguntas encontró.
- Las filas con problemas, con pestaña y número de fila (por ejemplo, una intensidad de 9 o una respuesta correcta que apunta a una opción vacía). Esas filas se saltan; el resto sigue funcionando.

Google tarda **unos 5 minutos** en actualizar lo publicado. Si un cambio no aparece, espera y recarga la página.

## Preguntas frecuentes

**¿Se puede romper el sitio desde la hoja?** No. Una fila con errores se omite y se anota en `#/revisar-contenido`. Si la hoja entera falla (se borró, se despublicó o no responde en 8 segundos), se muestra el contenido guardado.

**¿La sección "¿Por qué pica y por qué amarga?" sale para todas las plantas?** No: esa sección está escrita a mano solo para la Mizuna. Para otras plantas, usa la columna "Por dentro" de cada etapa.

**¿Y si cambio el nombre de una planta?** Cámbialo igual en Productos y en todas sus filas de Etapas. Cambia también su dirección (`#/plantas/…`).
