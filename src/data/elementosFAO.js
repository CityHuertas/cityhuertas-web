/*
 * Los 10 elementos de la agroecología de la FAO, en el orden oficial.
 * Fuente: FAO, Centro de conocimientos sobre agroecología
 * https://www.fao.org/agroecology/overview/the-10-elements-of-agroecology/es
 *
 * - nombre: nombre oficial del elemento.
 * - idea: la idea central, en una frase sencilla.
 * - explicacion: resumen en lenguaje sencillo de lo que explica la FAO.
 * - enCityHuertas: cómo se aplica en las huertas (Anexo Técnico 1,
 *   hoja "Ppios agroecología CH").
 */

const elementosFAO = [
  {
    nombre: 'Diversidad',
    idea: 'Variar cultivos, especies y fuentes de ingreso hace al sistema más productivo y resistente.',
    explicacion:
      'La diversificación es la base de la agroecología. Combinar especies y variedades en el espacio (cultivos intercalados) y en el tiempo (rotaciones) mejora la nutrición, cuida los recursos naturales y ayuda a enfrentar riesgos como el cambio climático.',
    enCityHuertas:
      'Nuestras huertas combinan tres tipos de cultivos: para el autoconsumo de quienes las cuidan, para la venta y para el ambiente.',
  },
  {
    nombre: 'Creación conjunta e intercambio de conocimientos',
    idea: 'Las soluciones funcionan mejor cuando se construyen con quienes las van a usar.',
    explicacion:
      'La agroecología no tiene recetas universales. Une los saberes tradicionales, la experiencia de quienes cultivan y el conocimiento científico, y crece con redes de intercambio y confianza.',
    enCityHuertas:
      'El conocimiento se construye entre huerteros, equipo técnico y restaurantes: experimentamos, adaptamos cada práctica a su huerta y revisamos lo que hacemos a partir de la experiencia.',
  },
  {
    nombre: 'Sinergias',
    idea: 'Cuando las partes del sistema se ayudan entre sí, el conjunto rinde más.',
    explicacion:
      'Cultivos, árboles, animales, suelo y agua se combinan para complementarse. Lograrlo exige planear qué va dónde y cuándo, y crear alianzas entre quienes participan.',
    enCityHuertas:
      'En la ciudad el espacio es limitado, así que sembramos más denso y planeamos bien las camas y las rotaciones, respetando los ritmos naturales de las plantas.',
  },
  {
    nombre: 'Eficiencia',
    idea: 'Producir más usando menos recursos de afuera.',
    explicacion:
      'Se aprovecha lo que es abundante y gratuito, como la luz del sol, y se gestiona bien la diversidad. Depender menos de insumos externos baja los costos y el impacto ambiental, y da más autonomía a quienes producen.',
    enCityHuertas:
      'Preferimos los procesos naturales a los insumos tecnológicos y buscamos depender cada vez menos de energía, abonos y materiales externos.',
  },
  {
    nombre: 'Reciclaje',
    idea: 'En la naturaleza no hay desechos: lo que sobra vuelve a usarse.',
    explicacion:
      'Nutrientes, restos vegetales y agua se reutilizan dentro de la finca. Así se contamina menos, se gasta menos y se depende menos de los cambios del mercado y del clima.',
    enCityHuertas:
      'Junto con restaurantes y hoteles recuperamos residuos orgánicos que irían al relleno sanitario, los convertimos en compost y abonos, y los devolvemos a la huerta.',
  },
  {
    nombre: 'Resiliencia',
    idea: 'Sistemas que se recuperan de los golpes del clima, las plagas o la economía.',
    explicacion:
      'Las fincas diversificadas se recuperan mejor de eventos extremos y resisten mejor plagas y enfermedades. Depender menos de insumos externos también protege a las familias productoras de las crisis económicas.',
    enCityHuertas:
      'Diseñamos huertas que siguen funcionando cuando cambian el clima, la producción o las personas. No buscamos eliminar la variación, sino aprender a convivir con ella.',
  },
  {
    nombre: 'Valores humanos y sociales',
    idea: 'Las personas, su bienestar y la equidad están en el centro.',
    explicacion:
      'La dignidad, la justicia y la inclusión mejoran las condiciones de vida de quienes producen y respaldan derechos como el acceso a la alimentación. Se fortalece especialmente la autonomía de mujeres, jóvenes y comunidades rurales.',
    enCityHuertas:
      'Huertas, equipo técnico y restaurantes participamos como pares: cada uno con su rol, pero con voz, responsabilidad y acuerdos claros.',
  },
  {
    nombre: 'Cultura y tradiciones alimentarias',
    idea: 'Comer bien también es respetar la identidad y las costumbres de cada territorio.',
    explicacion:
      'La comida está ligada a la identidad de cada comunidad. La agroecología recupera saberes tradicionales y variedades locales, y los une con los hábitos actuales para promover dietas sanas, diversas y culturalmente apropiadas.',
    enCityHuertas:
      'Trabajamos con cocinas que valoran el origen de los cultivos, respetan las temporadas y convierten los alimentos en experiencias, no solo en productos.',
  },
  {
    nombre: 'Gobernanza responsable',
    idea: 'Reglas y decisiones claras, transparentes e incluyentes.',
    explicacion:
      'Para que el cambio sea posible se necesitan mecanismos de decisión transparentes e incluyentes, desde lo local hasta lo global: por ejemplo, compras públicas, alimentación escolar, sellos para productos agroecológicos y acceso justo a la tierra y al agua.',
    enCityHuertas:
      'Funcionamos con un Sistema Participativo de Garantías (SPG): criterios claros y públicos, y compromisos entre huertas, equipo técnico y restaurantes.',
  },
  {
    nombre: 'Economía circular y solidaria',
    idea: 'Reconectar a quien produce con quien consume.',
    explicacion:
      'Se priorizan los mercados locales y el desarrollo del territorio, con iniciativas como los sistemas participativos de garantía o la agricultura apoyada por la comunidad. También se busca reducir el desperdicio de alimentos, que hoy es cerca de un tercio de lo que se produce en el mundo.',
    enCityHuertas:
      'Alimentos producidos, transformados y consumidos dentro de la ciudad (km 0), con acuerdos de producción entre pares en lugar de compras ocasionales.',
  },
]

export default elementosFAO
