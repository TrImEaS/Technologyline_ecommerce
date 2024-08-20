import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `No se ha encontrado la ruta | Technology Line`
    
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
    <header
      id='error'
      class="flex flex-col absolute items-center h-screen w-screen px-10 justify-center p-4 bg-[#fafafa]"
    >
      <section
        class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8"
      >
        <article class="text-center md:text-left">
          <h1 class="text-4xl font-bold">Real Color</h1>
          <p class="mt-2 text-xl font-semibold">404. That's an error.</p>
          <p class="mt-2 text-muted-foreground">
            The requested URL was not found on this server. That's all we know.
          </p>
        </article>
        <aside>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/error-img.avif'}
            alt="Robot Illustration"
            class="w-[280px] h-[280px] rounded-lg"
          />
        </aside>
      </section>

      <NavLink
        to="/"
        id="btn"
        onClick={handleBackToHome}
        class="z-50 border-2 h-fit hover:scale-105 px-4 py-2 rounded-lg shadow-md duration-300"
      >
        Back to Home
      </NavLink>
    </header>
  )
}