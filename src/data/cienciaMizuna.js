/*
 * Contenido técnico de la Mizuna morada, en lenguaje sencillo.
 * Fuente: documento "Mizuna v25-09-2026" del equipo de investigación.
 *
 * Regla: cada afirmación debe estar respaldada por una de las referencias
 * de abajo. Si agregan una afirmación nueva, agreguen también su fuente.
 */

// Definiciones cortas que aparecen al tocar un término subrayado.
export const glosario = {
  glucosinolatos:
    'Compuestos con azufre que la planta produce para defenderse. Son típicos de la familia de la mostaza, el repollo y la rúgula.',
  mirosinasa:
    'Enzima que la hoja guarda separada de los glucosinolatos. Al masticar se mezclan y empieza la reacción.',
  isotiocianatos:
    'Compuestos que se forman en esa reacción. Dan el picor de la mostaza y el wasabi.',
  aminoacidos:
    'Componentes de las proteínas. En la Mizuna, la glutamina y la asparagina se relacionan con un amargor más suave.',
  acidoMalico:
    'Ácido natural de muchas frutas y hojas. En la Mizuna, un nivel alto se relaciona con más amargor.',
}

// Tabla de "Para saber más".
export const compuestos = [
  {
    grupo: 'Glucosinolatos',
    ejemplos: 'Gluconapina (la más abundante en la Mizuna), glucoerucina, glucobrassicina',
    efecto: 'Amargor y punto de partida del picor',
    fuentes: 'Bell et al., 2018; Jeon et al., 2020',
  },
  {
    grupo: 'Isotiocianatos',
    ejemplos: 'Se forman al masticar, a partir de los glucosinolatos',
    efecto: 'Picor tipo mostaza o wasabi',
    fuentes: 'Bell et al., 2018',
  },
  {
    grupo: 'Aminoácidos libres',
    ejemplos: 'Glutamina, asparagina',
    efecto: 'Suavizan la percepción del amargor',
    fuentes: 'Bell et al., 2018; Fukuda et al., 2015',
  },
  {
    grupo: 'Ácidos orgánicos',
    ejemplos: 'Ácido málico',
    efecto: 'Acidez; se asocia con más amargor',
    fuentes: 'Bell et al., 2018; Fukuda et al., 2015',
  },
  {
    grupo: 'Compuestos aromáticos',
    ejemplos: 'Limoneno, nonanal, trans-2-hexenal',
    efecto: 'Aroma cítrico, floral y verde fresco',
    fuentes: 'Kyriacou et al., 2021',
  },
]

// Fuentes del contenido (no se muestran en el sitio; quedan como respaldo
// para el equipo de investigación).
export const referencias = [
  {
    cita: 'Bell, L., Oloyede, O. O., Lignou, S., Wagstaff, C., & Methven, L. (2018). Taste and flavor perceptions of glucosinolates, isothiocyanates, and related compounds. Molecular Nutrition & Food Research, 62(18), 1700990.',
    enlace: 'https://centaur.reading.ac.uk/76654/1/mnfr.201700990.pdf',
  },
  {
    cita: 'Fukuda, T., Ito, H., Mukai, M., & Mizukami, Y. (2015). GC–MS based metabolite profiling for flavor characterization of Brassica crops grown with different fertilizer application. Metabolomics.',
    enlace: 'https://cir.nii.ac.jp/crid/1873116917392709760',
  },
  {
    cita: 'Jeon, J., Kim, J. K., Kim, H., Kim, Y. J., Park, Y. J., Kim, S. J., Kim, C., Park, S. U., et al. (2020). Transcriptome analysis and metabolic profiling of green and red mizuna (Brassica rapa L. var. japonica). Foods, 9(8), 1079.',
    enlace: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7466343/',
  },
  {
    cita: 'Kim, Y. B., Li, X., Kim, S. J., Kim, H. H., Lee, J., Kim, H., & Park, S. U. (2013). MYB transcription factors regulate glucosinolate biosynthesis in different organs of Chinese cabbage (Brassica rapa ssp. pekinensis). Molecules, 18, 8682–8695.',
    enlace: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6269701/',
  },
  {
    cita: 'Kyriacou, M. C., El-Nakhel, C., Graziani, G., Pannico, A., Soteriou, G. A., Giordano, M., Ritieni, A., De Pascale, S., & Rouphael, Y. (2021). Ontogenetic variation in the mineral, phytochemical and yield attributes of brassicaceous microgreens. Foods, 10(5), 1032.',
    enlace: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8151805/',
  },
]
