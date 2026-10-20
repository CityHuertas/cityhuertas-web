/*
 * Banco de preguntas de la trivia agroecológica.
 * Cada partida toma 10 preguntas al azar de esta lista.
 *
 * Para agregar una pregunta, copia un bloque y cambia:
 *  - pregunta: el texto
 *  - opciones: exactamente 4 respuestas
 *  - correcta: la posición de la respuesta correcta (0, 1, 2 o 3)
 *  - explicacion: se muestra después de responder
 *
 * Todas salen del contenido del sitio (FAO y entrevista a Finca Micaela).
 * Antes de publicar preguntas nuevas, validen la información con la finca.
 */

const preguntasTrivia = [
  {
    pregunta: '¿Qué es la agroecología?',
    opciones: [
      'Una manera integral de producir, distribuir y consumir alimentos cuidando la naturaleza, las personas y el territorio',
      'Cultivar sin químicos, y nada más',
      'Una técnica para producir más rápido con fertilizantes sintéticos',
      'Un sistema de cultivo que solo funciona en laboratorios',
    ],
    correcta: 0,
    explicacion:
      'No es solamente cultivar sin químicos: también incluye conservar la biodiversidad, valorar los saberes de quienes cultivan y construir relaciones más justas.',
  },
  {
    pregunta: '¿Cuál de estas NO es una de las cuatro dimensiones de la agroecología?',
    opciones: ['Ambiental', 'Social', 'Industrial', 'Económica'],
    correcta: 2,
    explicacion:
      'Las cuatro dimensiones son ambiental, productiva, social y económica.',
  },
  {
    pregunta:
      '¿Qué dimensión reconoce los saberes de quienes cultivan y fortalece la relación con la comunidad?',
    opciones: ['Productiva', 'Social', 'Ambiental', 'Económica'],
    correcta: 1,
    explicacion:
      'La dimensión social pone en el centro a las personas: sus conocimientos y su comunidad.',
  },
  {
    pregunta: '¿Qué busca la dimensión económica de la agroecología?',
    opciones: [
      'Vender al precio más alto posible',
      'Depender de insumos importados',
      'Aprovechar recursos locales y relaciones más justas entre productores y consumidores',
      'Producir un solo cultivo en grandes extensiones',
    ],
    correcta: 2,
    explicacion:
      'Busca usar lo que hay en el territorio y que el trato entre quien cultiva y quien compra sea más justo.',
  },
  {
    pregunta: '¿Cuál de estas prácticas usa Finca Micaela?',
    opciones: [
      'Quemar los restos de cosecha',
      'Compost y abonos naturales',
      'Fumigar con pesticidas cada semana',
      'Sembrar siempre el mismo cultivo',
    ],
    correcta: 1,
    explicacion:
      'El compost devuelve nutrientes al suelo y reduce la dependencia de productos externos.',
  },
  {
    pregunta: '¿Para qué sirven los árboles nativos y las cercas vivas en una finca agroecológica?',
    opciones: [
      'Solo para decorar',
      'Para dar sombra a la maquinaria',
      'Para cuidar el territorio: protegen el suelo, el agua y la biodiversidad',
      'Para reemplazar los cultivos',
    ],
    correcta: 2,
    explicacion:
      'Son parte de cuidar el territorio: mantienen el suelo vivo y dan refugio a la biodiversidad, incluidos los polinizadores.',
  },
  {
    pregunta: '¿Qué organización internacional usamos como referencia para definir la agroecología?',
    opciones: ['La OMS', 'La FAO', 'La UNESCO', 'La OMC'],
    correcta: 1,
    explicacion:
      'La FAO es la Organización de las Naciones Unidas para la Alimentación y la Agricultura.',
  },
  {
    pregunta: '¿A qué se parece el sabor de la Mizuna morada?',
    opciones: ['A la lechuga', 'A la albahaca', 'A la rúgula', 'Al cilantro'],
    correcta: 2,
    explicacion:
      'Tiene un sabor ligeramente amargo y picante, parecido al de la rúgula.',
  },
  {
    pregunta: '¿Qué pasa con el sabor de la Mizuna morada a medida que madura?',
    opciones: [
      'Se vuelve más dulce',
      'Se vuelve más intenso, picante y astringente',
      'Pierde todo su sabor',
      'No cambia',
    ],
    correcta: 1,
    explicacion:
      'Con la madurez aumenta la intensidad del sabor: pasa de suave a picante y astringente.',
  },
  {
    pregunta: '¿En qué etapa la Mizuna morada tiene las hojas más tiernas y suaves?',
    opciones: [
      'Aparición espontánea',
      'Desarrollo',
      'Planta florida',
      'Todas son iguales',
    ],
    correcta: 0,
    explicacion:
      'Al inicio del ciclo las hojas son jóvenes, tiernas y de sabor suave.',
  },
  {
    pregunta: '¿De qué color son las flores de la Mizuna morada?',
    opciones: ['Rojas', 'Verde amarillo', 'Moradas', 'Blancas'],
    correcta: 1,
    explicacion:
      'Aunque sus hojas son moradas, sus flores son verdes con tonos amarillos.',
  },
  {
    pregunta: '¿Por qué algunos restaurantes prefieren las hojas jóvenes de la Mizuna?',
    opciones: [
      'Porque son más grandes',
      'Porque son más tiernas y suaves',
      'Porque tienen flores',
      'Porque duran más tiempo',
    ],
    correcta: 1,
    explicacion:
      'Las hojas jóvenes son tiernas y suaves; otros prefieren plantas más maduras por su sabor intenso y su textura crujiente.',
  },
]

export default preguntasTrivia
