/*
 * Fases del ciclo productivo, versión pública.
 * Fuente: Anexo Técnico 1 (V03-011-2026), hoja "Matriz ciclo".
 *
 * Se dejaron por fuera, a propósito: comentarios internos, responsables,
 * costos y las actividades que el equipo aún no ha definido (por ejemplo,
 * los protocolos de desinfección y el pesaje oficial). Cuando estén
 * aprobados, se pueden agregar aquí.
 */

const procesosCH = [
  {
    fase: 'Alistamiento',
    resumen: 'Preparamos el espacio y despertamos la vida del suelo.',
    actividades: [
      'Delimitamos las zonas de siembra y preparamos camas, eras o contenedores con buen drenaje.',
      'Aplicamos caldos con microorganismos para activar las funciones biológicas del suelo.',
      'Incorporamos compost en cada ciclo para mejorar la estructura y la fertilidad.',
    ],
  },
  {
    fase: 'Siembra',
    resumen: 'Elegimos qué sembrar, cuándo y cómo.',
    actividades: [
      'Definimos especies, variedades y fechas según criterios técnicos, agroecológicos y comerciales.',
      'Entregamos las plántulas, incluidas plantas que ayudan a manejar las plagas, como las plantas trampa.',
      'Sembramos respetando las densidades y distancias de cada especie.',
    ],
  },
  {
    fase: 'Mantenimiento',
    resumen: 'Cuidamos el cultivo observándolo de cerca.',
    actividades: [
      'Regamos según lo que necesita el cultivo y según el clima.',
      'Manejamos a mano las arvenses (plantas espontáneas) hasta un punto de equilibrio, sin eliminarlas del todo.',
      'Prevenimos y controlamos plagas con biopreparados y extractos naturales.',
      'Aplicamos biofertilizantes líquidos según el estado del cultivo.',
      'Hacemos seguimiento técnico y reportes con fotos de cada huerta.',
    ],
  },
  {
    fase: 'Cosecha',
    resumen: 'Cosechamos lo que se pidió, en su punto.',
    actividades: [
      'Las hojas baby se cosechan alrededor de 4 semanas después de la siembra.',
      'Los lunes y jueves programamos qué se cosecha y para quién.',
      'Los martes y viernes se cosecha, respetando los criterios de madurez y calidad.',
    ],
  },
  {
    fase: 'Postcosecha y entrega',
    resumen: 'Del campo a la cocina, con cuidado en cada paso.',
    actividades: [
      'Seleccionamos el producto por calidad, tamaño y estado sanitario.',
      'Preparamos mezclas de hojas, empacamos y etiquetamos según cada cliente.',
      'Revisamos la calidad antes del despacho.',
      'Entregamos a restaurantes y hoteles y hacemos seguimiento a su satisfacción.',
    ],
  },
]

export default procesosCH
