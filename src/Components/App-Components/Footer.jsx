import naranjaIcon from '../../Assets/Some-icons/card-icon1.svg'
import visaIcon from '../../Assets/Some-icons/card-icon2.svg'
import mastercardIcon from '../../Assets/Some-icons/card-icon3.svg'
import cabalIcon from '../../Assets/Some-icons/card-icon4.svg'
import americanexpressIcon from '../../Assets/Some-icons/card-icon5.svg'
import Swal from 'sweetalert2'
import { MdOutlineEmail } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTiktok, FaAngleUp } from 'react-icons/fa'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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

    fetch('https://technologyline.com.ar/api/clients/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    })
    .then(response => {
      if (response.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Ya se encuentra subscrito, muchas gracias!'
        })
      }
      else if (response.ok) {
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
  
  return(
    <div className="flex flex-col justify-center items-center w-full">
      
      {/*Top Footer*/}
      <section className="bg-page-gray-light h-28 flex gap-x-5 justify-center items-center max-lg:flex-wrap w-full">
        <h1 className="font-bold text-[20px] max-sm:text-[16px]">
          No pierdas la oportunidad de suscribirte
        </h1>
        <form 
          onSubmit={handleSubscribe}
          className="flex rounded-lg"
        >
          <div className="flex bg-page-white justify-center items-center rounded-md">
            <span className="text-3xl px-2 text-gray-400">
              <MdOutlineEmail/>
            </span>
            <input 
              type="email" 
              className="rounded-md outline-none px-2 w-[200px]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Ingresa tu mail"
            />
          </div>
          <button 
            type='submit'
            className="bg-page-lightblue text-page-white py-2 px-3 rounded-lg hover:bg-page-blue-dark duration-300">
            Suscribir
          </button>
        </form>
      </section>
      
      {/* Mid Footer */}
      <section className="relative flex items-center justify-center max-lg:flex-col w-full box-border bg-page-blue-normal text-white gap-5 pt-5">
        <article className="flex w-full flex-col justify-center px-1 gap-x-5 items-center max-[900px]:flex-col max-[900px]:pb-10 max-sm:pl-[10px]">
          <img 
            src="/logo-tline.svg"
            className="rounded-3xl h-[140px] object-cover min-w-[300px] max-w-[300px] max-[900px]:object-cover max-[900px]:w-[350px]"
          />
          <ul className="flex flex-col text-page-gray-light min-w-[300px] max-[1500px]:justify-center pt-8">
            <span className='flex font-bold w-full pb-2 text-white'>
              ¡CONTACTANOS!
            </span>
            <span>
              Lunes a Viernes de 09:00hs a 18:30hs
            </span>
            <span>
              Tel.: 11 3369-0584
            </span>
            <span>
              E-mail: pcamio@real-color.com.ar
            </span>

            <span className='flex font-bold w-full pb-2 pt-3 text-white'>
              ¿QUERES SER REVENDEDOR? 
            </span>
            <span>
              Escribinos: administracion14@real-color.com.ar
            </span>
          </ul>
        </article>

        <div className='flex w-full max-sm:w-4/5 max-md:flex-col items-center justify-center max-md:gap-0 pb-5 pr-24 max-lg:pr-0 max-sm:gap-y-5 max-sm:pr-24'>
          <article className="min-w-[200px] min-h-[140px] max-lg:min-h-[170px] max-sm:min-h-[0] flex flex-col gap-y-1 text-page-gray-light">
            <h1 className="font-bold text-white">
              Categorías
            </h1>
            <NavLink to={`/search/?category=electro y aires`} className="hover:text-white duration-300">
              Electrodomésticos
            </NavLink>
            <NavLink to={`/search/?category=informatica`} className="hover:text-white duration-300">
              Informática
            </NavLink>
            <NavLink to={`/search/?category=tecnologia`} className="hover:text-white duration-300">
              Tecnología
            </NavLink>
            <NavLink to={`/search/?category=mas categorias`} className="hover:text-white duration-300">
              Mas Categorías
            </NavLink>
          </article>

          {/*Company description*/}
          <article className="min-w-[200px] min-h-[140px] max-lg:min-h-[170px] max-sm:min-h-[0] flex flex-col text-page-gray-light gap-y-1">
            <h1 className="font-bold text-white">
              Technology Line
            </h1>
            <NavLink to={`/others/about_us`} className="hover:text-white duration-300">
              Sobre nosotros
            </NavLink>
            <NavLink to={`/others/mayoristas`} className="hover:text-white duration-300">
              Venta a mayoristas
            </NavLink>
            <span to={`/others/trabaja_con_nosotros`} className="text-[#ebebe446] duration-300 cursor-default">
              Trabaja con nosotros
            </span>
          </article>

          {/*Other information*/}
          <article className="min-w-[200px] min-h-[140px] max-lg:min-h-[170px] max-sm:min-h-[0] flex flex-col gap-y-1 text-page-gray-light">
            <h1 className="font-bold text-white">
              Ayuda y información
            </h1>
            <NavLink to={`/others/centro_de_ayuda`} className="hover:text-white duration-300">
              Centro de ayuda
            </NavLink>
            <NavLink to={`/others/garantia`} className="hover:text-white duration-300">
              Garantia
            </NavLink>
            <NavLink to={`/others/about_us`} className="hover:text-white duration-300">
              Sobre nosotros
            </NavLink>
            <NavLink to={`/others/mayoristas`} className="hover:text-white duration-300">
              Venta a mayoristas
            </NavLink>
          </article>
        </div>
      </section>


      {/* Social icons/card icons/ button */}
      <article className="flex w-full justify-center items-center px-[100px] max-md:px-5 max-[1250px]:flex-wrap pt-5 max-[1500px]:pt-8 bg-page-blue-normal">
        <div className="flex w-[400px] gap-x-24 items-center justify-start max-[1500px]:justify-between max-sm:flex-wrap max-sm:justify-start max-sm:gap-y-5">
          {/* Card icons */}
          <ul className="flex text-3xl justify-between items-end min-w-[200px] w-[300px] ml-[110px] max-[1500px]:ml-0 gap-x-4">
            <img src={visaIcon} width={50}/>
            <img src={mastercardIcon} width={50}/>
            <img src={americanexpressIcon} width={50}/>
            <img src={cabalIcon} width={50}/>
            <img src={naranjaIcon} width={50}/>
          </ul>
        </div>
            
        <div className="flex justify-evenly items-center max-[1500px]:justify-end gap-x-5 max-sm:px-0 max-[1250px]:pt-8 max-[1250px]:justify-between px-10 pb-5">
          <div className='flex gap-x-5'>
            {/* <button className="bg-white px-4 h-14 py-1 max-[1500px]:ml-0 text-sm w-[300px] max-sm:w-[150px] max-sm:h-18 text-black rounded-full font-semibold hover:bg-black hover:text-white duration-300">
              BOTÓN DE ARREPENTIMIENTO
            </button> */}

            <button className="px-4 h-14 cursor-default py-1 max-[1500px]:ml-0 text-sm w-[300px] max-sm:w-[150px] max-sm:h-18 text-black rounded-full font-semibold duration-300">
            </button>

            <button
              onClick={scrollToTop} 
              className="group text-black flex justify-center items-center rounded-xl w-16 h-16 border-2 ">
              <FaAngleUp className="text-[50px] group-hover:animate-bounce text-white duration-300"/>
            </button>
          </div>
          <a href='https://www.instagram.com/realcoloroficial/' className="rounded-full">
            <FaInstagram className='text-5xl text-white duration-300 hover:text-black hover:scale-110'/>
          </a>
                    
          <div>
            <a href="http://qr.afip.gob.ar/?qr=ZvNKTXvJURZjjL1woDCRkg,," target="_F960AFIPInfo">
              <img className="rounded-lg min-w-[30px] max-w-[60px]" src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" border="0"></img>
            </a>
          </div>
        </div>
      </article>

      <section className="flex flex-col justify-center items-center w-full bg-page-gray-light">
        <h1 className="font-bold text-gray-800 py-2">
          ©️ 2024 Technology Line SRL
        </h1>
        <p className="font-bold text-gray-800 text-center p-2 pb-4">
          Las imagenes son a modo ilustrativo. Los precios pueden cambiar sin previo aviso.
        </p>
      </section>
    </div>
  )
}

{/*Userconfig 
        <article className="min-h-[140px] max-lg:min-h-[170px] max-sm:min-h-[0] max-sm:pb-6 flex flex-col gap-y-2 max-md:col-span-2 max-sm:col-span-4 w-full">
        <h1 className="font-bold opacity-50">
          Usuarios
        </h1>
          
          <ul className="text-page-gray-light flex flex-col gap-y-1">
            <li>
              <a 
                className="opacity-50 duration-300">
                Login
              </a>
            </li>
            <li>
              <a 
                className="opacity-50 duration-300">
                Registrarse
              </a>
            </li>
            <li>
              <a 
                className="opacity-50 duration-300">
                Opciones
              </a>
            </li>
            <li>
              <a 
                className="opacity-50 duration-300">
                Mis pedidos
              </a>
            </li>
          </ul> 
        </article> */}