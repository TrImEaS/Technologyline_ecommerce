import { MdOutlineEmail } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { FaInstagram, FaAngleUp } from 'react-icons/fa'
import { useState } from 'react'
import Swal from 'sweetalert2'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function Footer () {
  const [email, setEmail] = useState('')
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()

    const emailPattern = /\S+@\S+\.\S+/
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error al subscribirse',
        text: 'Se requiere que el valor sea tipo email: example@hotmail.com'
      })
      return
    }

    Swal.fire({
      title: 'Subscribiendo...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })

    fetch(`${API_URL}/api/clients/addSubscriptor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(response => {
        if (response.status === 409) {
          Swal.fire({
            icon: 'info',
            title: 'Ya se encuentra subscrito, muchas gracias!'
          })
        } else if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Subscrito correctamente, muchas gracias!'
          })
        } else {
          console.error('Error al subscribirse, intente nuevamente!')
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al subscribirse, ¡inténtelo nuevamente!'
          })
        }
      })
      .catch(error => {
        console.error('Error del servidor:', error)
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al subscribirse, ¡inténtelo nuevamente!'
        })
      })
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">

      {/* Top Footer */}
      <section className="bg-gradient-to-r from-page-gray-light to-gray-100 py-6 flex flex-col md:flex-row gap-4 justify-center items-center w-full px-4">
        <h1 className="font-bold text-xl max-xl:text-sm text-gray-800 text-center">
          No pierdas la oportunidad de suscribirte
        </h1>

        <form
          onSubmit={handleSubscribe}
          className="flex w-full max-w-[400px] rounded-lg outline-none shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-1 bg-page-white gap-3 justify-around items-center rounded-l-lg border-l border-t border-b border-gray-200">
            <span className="text-2xl pl-3 text-gray-400 hover:text-gray-600 transition-colors duration-300">
              <MdOutlineEmail/>
            </span>
            <input
              type="email"
              className="rounded-none outline-none py-2 w-full border-none transition-all duration-300"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Ingresa tu mail"
            />
          </div>
          <button
            type='submit'
            className="bg-page-lightblue text-page-white max-xl:text-[12px] py-2 md:py-3 px-4 md:px-6 rounded-r-lg hover:bg-page-blue-dark transition-all duration-300 font-medium whitespace-nowrap">
            Suscribir
          </button>
        </form>
      </section>

      {/* Mid Footer */}
      <section className="relative flex flex-col xl:flex-row items-center justify-center w-full box-border bg-color text-white gap-8 pb-8 px-4 md:px-6">
        <article className="flex w-full max-w-[500px] flex-col justify-center items-center">
          <img
            src="https://technologyline.com.ar/banners-images/Assets/logo-tlineNew.svg"
            className="h-[180px] object-contain max-w-[280px] md:max-w-[300px] hover:opacity-90 transition-opacity duration-300 pr-10"
          />
          <ul className="flex flex-col text-page-gray-light text-center lg:text-left space-y-1">
            <span className='flex justify-center lg:justify-start font-bold w-full text-white text-lg'>
              ¡CONTACTANOS!
            </span>
            <span className="hover:text-white transition-colors duration-300">
              Lunes a Viernes de 09:00hs a 18:00hs
            </span>
            <span className="hover:text-white transition-colors duration-300">
              Tel.: 11 3369-0584
            </span>
            <span className="hover:text-white transition-colors duration-300">
              E-mail: pcamio@real-color.com.ar
            </span>

            <span className='flex justify-center lg:justify-start font-bold w-full pt-3 text-white text-lg'>
              ¿QUERES SER REVENDEDOR?
            </span>
            <span className="hover:text-white transition-colors duration-300">
              Escribinos: revendedores@realcolor.com.ar
            </span>
          </ul>
        </article>

        <div className='flex flex-col md:flex-row xl:flex-row justify-center items-center lg:items-start gap-8 w-fit'>
          <article className="min-w-[200px] md:min-h-[170px] flex flex-col gap-y-2 text-page-gray-light text-center lg:text-left">
            <h1 className="font-bold text-white text-lg border-b border-page-lightblue pb-2">
              Categorías
            </h1>
            <NavLink to={'/search/?category=electro y aires'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Electrodomésticos
            </NavLink>
            <NavLink to={'/search/?category=informatica'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Informática
            </NavLink>
            <NavLink to={'/search/?category=tecnologia'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Tecnología
            </NavLink>
            <NavLink to={'/search/?category=mas categorias'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Mas Categorías
            </NavLink>
          </article>

          {/* Company description */}
          <article className="min-w-[200px] md:min-h-[170px] flex flex-col gap-y-2 text-page-gray-light text-center lg:text-left">
            <h1 className="font-bold text-white text-lg border-b border-page-lightblue pb-2">
              Technology Line
            </h1>
            <NavLink to={'/others/about_us'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Sobre nosotros
            </NavLink>
            <NavLink to={'/others/revendedores'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Venta a mayoristas
            </NavLink>
            {/* <span className="text-[#ebebe446] transition-colors duration-300 cursor-default">
              Trabaja con nosotros
            </span> */}
          </article>

          {/* Other information */}
          <article className="min-w-[200px] md:min-h-[170px] flex flex-col gap-y-2 text-page-gray-light text-center lg:text-left">
            <h1 className="font-bold text-white text-lg border-b border-page-lightblue pb-2">
              Ayuda y información
            </h1>
            <NavLink to={'/others/centro_de_ayuda'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Centro de ayuda
            </NavLink>
            <NavLink to={'/others/garantia'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Garantia
            </NavLink>
            <NavLink to={'/others/revendedores'} className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
              Revendedores
            </NavLink>
          </article>
        </div>
      </section>

      {/* Social icons/card icons/ button */}
      <article className="flex flex-col-reverse md:flex-row w-full justify-around items-center gap-4 px-4 md:px-8 py-6 bg-gradient-to-b from-[#1a4167] to-page-blue-normal border-t border-page-lightblue/20">
        <div className="flex items-center justify-center w-full md:w-auto">
          {/* Card icons */}
          <ul className="flex items-center flex-wrap justify-center gap-4">
            <img src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon2.svg'} className="w-10 md:w-12 h-8 hover:opacity-80 transition-opacity duration-300"/>
            <img src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon3.svg'} className="w-10 md:w-12 h-8 hover:opacity-80 transition-opacity duration-300"/>
            <img src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon4.svg'} className="w-10 md:w-12 h-8 hover:opacity-80 transition-opacity duration-300"/>
            <img src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon5.svg'} className="w-10 md:w-12 h-8 hover:opacity-80 transition-opacity duration-300"/>
            <img src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon1.svg'} className="w-10 md:w-12 h-8 hover:opacity-80 transition-opacity duration-300"/>
          </ul>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={scrollToTop}
            className="bg-page-lightblue hover:bg-page-blue-dark text-white rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-page-lightblue focus:ring-offset-2 focus:ring-offset-page-blue-normal">
            <FaAngleUp className="text-xl md:text-2xl"/>
          </button>

          <a href='https://www.instagram.com/realcoloroficial/' className="text-white hover:text-page-lightblue transition-colors duration-300 transform hover:scale-110">
            <FaInstagram className='text-2xl md:text-3xl'/>
          </a>

          <a href="http://qr.afip.gob.ar/?qr=ZvNKTXvJURZjjL1woDCRkg,," target="_F960AFIPInfo" className="hover:opacity-90 transition-opacity duration-300">
            <img className="rounded-lg w-[40px] md:w-[45px]" src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" />
          </a>
        </div>
      </article>

      <section className="flex flex-col justify-center items-center w-full bg-gradient-to-r from-page-gray-light to-gray-100 pt-4 px-4 text-center">
        <h1 className="font-bold text-gray-800 mb-2">
          ©️ 2024 Technology Line SRL
        </h1>
        <p className="text-gray-600 text-sm">
          Las imagenes son a modo ilustrativo. Los precios pueden cambiar sin previo aviso.
        </p>
      </section>
    </div>
  )
}
