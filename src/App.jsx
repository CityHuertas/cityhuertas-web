import { useEffect, useRef } from 'react'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Inicio from './pages/Inicio/Inicio'
import Plantas from './pages/Plantas/Plantas'
import Procesos from './pages/Procesos/Procesos'
import Recursos from './pages/Recursos/Recursos'
import SeccionPendiente from './pages/SeccionPendiente/SeccionPendiente'
import Agroecologia from './sections/Agroecologia/Agroecologia'
import navegacion from './data/navegacion'
import { useRuta } from './hooks/useRuta'

const seccionesPendientes = {
  contacto: {
    titulo: 'Contacto',
    descripcion:
      'Esta sección permitirá comunicarse con CityHuertas y solicitar información.',
  },
}

const paginaNoEncontrada = {
  titulo: 'Página no encontrada',
  descripcion: 'La dirección que buscas no existe o cambió de lugar.',
  noEncontrada: true,
}

function App() {
  const ruta = useRuta()
  const contenidoRef = useRef(null)
  const primeraCarga = useRef(true)

  const seccion = navegacion.find(({ id }) => id === ruta)

  useEffect(() => {
    document.title = seccion
      ? `${seccion.titulo} | CityHuertas`
      : 'CityHuertas'

    if (primeraCarga.current) {
      primeraCarga.current = false
      return
    }

    // Al cambiar de sección: volver arriba y llevar el foco al contenido
    // para que los lectores de pantalla anuncien la nueva página.
    window.scrollTo({ top: 0 })
    contenidoRef.current?.focus({ preventScroll: true })
  }, [ruta, seccion])

  let pagina

  if (ruta === 'inicio') {
    pagina = <Inicio />
  } else if (ruta === 'agroecologia') {
    pagina = <Agroecologia />
  } else if (ruta === 'plantas') {
    pagina = <Plantas />
  } else if (ruta === 'procesos') {
    pagina = <Procesos />
  } else if (ruta === 'recursos') {
    pagina = <Recursos />
  } else {
    pagina = (
      <SeccionPendiente
        {...(seccionesPendientes[ruta] ?? paginaNoEncontrada)}
      />
    )
  }

  return (
    <>
      <Header rutaActual={ruta} />

      <main id="contenido" ref={contenidoRef} tabIndex={-1}>
        {/* La clave cambia con la ruta: cada sección entra con un fundido suave. */}
        <div className="pagina" key={ruta}>
          {pagina}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
