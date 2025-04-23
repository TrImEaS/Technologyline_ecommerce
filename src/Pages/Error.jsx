import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useDocumentTitle from '../Utils/useDocumentTitle'

export default function Error() {
  const navigate = useNavigate()

  useDocumentTitle('Error 404 - No se ha encontrado la ruta ')

  useEffect(() => {    
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
  }, [location.search, navigate])

  const handleBackToHome = () => {
    // Restaurar el overflow antes de navegar a la página principal
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
  }
  return (
    <header id='error' className="flex flex-col absolute items-center h-screen w-screen justify-center p-4 bg-[#fafafa]">
      <section className="flex flex-col items-center gap-5 w-3/4 space-y-4 md:space-y-0 md:space-x-8">
        <article className="text-center md:text-left">
          <h1 className="text-4xl font-bold">Real Color</h1>
          <p className="mt-2 text-xl font-semibold">Opps, Error 404</p>
          <p className="mt-2 text-muted-foreground">
            La URL consultada no es valida. Si era URL a un producto puede que no tenga mas stock o simplemente fue eliminado.
          </p>
        </article>
        <aside>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/error-img.avif'}
            alt="Robot Illustration"
            className="w-[280px] h-[280px] rounded-lg mb-5"
          />
        </aside>
      </section>

      <NavLink
        to="/"
        id="btn"
        onClick={handleBackToHome}
        className="z-50 border-2 border-black h-fit hover:scale-105 px-4 py-2 rounded-lg shadow-md duration-300"
      >
        Back to Home
      </NavLink>
    </header>
  )
}