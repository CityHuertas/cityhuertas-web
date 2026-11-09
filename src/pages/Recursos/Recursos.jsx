import Portada from '../../components/Portada/Portada'
import Trivia from '../../sections/Trivia/Trivia'

function Recursos() {
  return (
    <>
      <Portada
        idTitulo="titulo-recursos"
        titulo="Recursos"
        descripcion="Materiales para aprender sobre agroecología jugando. Empieza con la trivia: pon a prueba lo que sabes y entra a la tabla de posiciones."
      />

      <Trivia />
    </>
  )
}

export default Recursos
