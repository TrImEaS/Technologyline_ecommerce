import React from "react"
import { 
  FaFacebook,
  FaInstagram, 
  FaTiktok,
  FaAngleUp 
} from 'react-icons/fa'
import naranjaIcon from '../Assets/Some-icons/card-icon1.svg'
import visaIcon from '../Assets/Some-icons/card-icon2.svg'
import mastercardIcon from '../Assets/Some-icons/card-icon3.svg'
import cabalIcon from '../Assets/Some-icons/card-icon4.svg'
import americanexpressIcon from '../Assets/Some-icons/card-icon5.svg'
import { MdOutlineEmail } from "react-icons/md"

export default function Footer() {
  return(
    <div className="flex flex-col justify-center items-center w-full">
      
      {/*Top Footer*/}
      <section className="w-3/4 bg-page-gray-light h-28 mt-[100px] flex gap-x-5 justify-center items-center max-lg:flex-wrap max-lg:w-full">
        <h1 className="font-bold text-[20px] max-sm:text-[16px]">
          No pierdas la oportunidad de suscribirte
        </h1>
        <form 
          action="none"
          className="flex rounded-lg"
        >
          <div className="flex bg-page-white justify-center items-center rounded-md">
            <span className="text-3xl px-2 text-gray-400">
              <MdOutlineEmail/>
            </span>
            <input 
              type="email" 
              className="rounded-md outline-none px-2 w-[200px]"
              placeholder="Ingresa tu mail"
            />
          </div>
            <button type="button" className="bg-page-lightblue text-page-white py-2 px-3 rounded-lg hover:bg-page-blue-dark duration-300">
              Suscribir
            </button>
        </form>
      </section>
      
      {/* Mid Footer */}
      <section className="grid grid-cols-5 max-[1500px]:grid-cols-3 w-full box-border pt-10 pl-[100px] max-[1500px]:pr-[50px] max-md:pl-0 max-md:pr-0 bg-page-blue-normal text-white gap-5 py-3">
        <article className="
        flex flex-col px-1 gap-5
        max-[1500px]:col-span-5 max-[1500px]:flex-row max-[1500px]:items-center
        max-md:flex-wrap max-md:pl-10"
        >
          <img 
            src="/logo-tline.png"
            className="rounded-3xl p-4 bg-white h-[140px] w-[340px]"
          />
          <ul className="flex flex-col  text-page-gray-light max-[1500px]:justify-center">
            <li>
            </li>

            <li>
              <span>Informe: lorem isupasdasda</span>
            </li>

            <li>
              <span>Tel.: 1111111111</span>
            </li>

            <li>
              <span>E-mail: realcolor@real-color.com.ar</span>
            </li>
          </ul>
        </article>
        
        <article className="flex flex-col gap-y-2 px-1 max-md:col-span-2 max-md:pl-10 max-sm:col-span-4">
          <h1 className="font-bold">
            Categorías
          </h1>

          <ul className="text-page-gray-light flex flex-col gap-y-1">
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Electrodomésticos</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Informática</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Mas Categorías</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Tecnología</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Sección Outlet</a>
            </li>
          </ul>
        </article>

        <article className="flex flex-col gap-y-2 px-1 max-md:col-span-2 max-md:pl-10 max-sm:col-span-4">
          <h1 className="font-bold">
            Real Color
          </h1>

          <ul className="text-page-gray-light flex flex-col gap-y-1">
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Sobre nosotros</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Trabajá con nosotros</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Sucursales</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Venta a mayoristas</a>
            </li>
          </ul>
        </article>

        <article className="flex flex-col gap-y-2 px-1 max-md:col-span-2 max-md:pl-10 max-sm:col-span-4">
          <h1 className="font-bold">
            Ayuda y información
          </h1>
          
          <ul className="text-page-gray-light flex flex-col gap-y-1">
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Centro de ayuda</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Garantía</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Políticas de cambio y devolución</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Nuestro blog</a>
            </li>
          </ul>
        </article>


        <article className="flex flex-col gap-y-2 px-1 max-md:col-span-2 max-md:pl-10 max-sm:col-span-4">
        <h1 className="font-bold">
          Usuarios
        </h1>
          
          <ul className="text-page-gray-light flex flex-col gap-y-1">
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Login</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Registrarse</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Opciones</a>
            </li>
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">Mis pedidos</a>
            </li>
          </ul> 
        </article>
      </section>


      {/* Social icons/card icons/ button */}
      <article className="flex w-full justify-between px-[100px] max-md:px-5 max-[1250px]:flex-wrap pt-5 max-[1500px]:pt-8 pb-10 bg-page-blue-normal">
        <div className="flex w-full gap-x-24 items-center justify-start max-[1500px]:justify-between max-sm:flex-wrap max-sm:justify-center max-sm:gap-y-5 ">
          {/* Social icons */}
          <ul className="flex min-w-[180px] justify-between gap-x-2 items-center text-3xl text-white">
            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">
                <FaFacebook/>
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">
                <FaInstagram/>
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-page-lightblue duration-300">
                <FaTiktok/>
              </a>
            </li>
          </ul>


          {/* Card icons */}
          <ul className="flex text-3xl justify-between items-end min-w-[300px] w-[300px] ml-[110px] max-[1500px]:ml-0 gap-x-4">
            <li>
              <img 
                src={visaIcon} 
                width={70}                
              />
            </li>

            <li>
              <img 
                src={mastercardIcon}
                width={70}                
              />
            </li>

            <li>
              <img 
                src={americanexpressIcon}
                width={70}                
              />
            </li>

            <li>
              <img 
                src={cabalIcon}
                width={70}
              />
            </li>

            <li>
              <img 
                src={naranjaIcon}
                width={70}
              />
            </li>
          </ul>
        </div>
            
        <div className="flex w-full justify-evenly max-[1500px]:justify-end gap-x-20 max-[1250px]:pt-8 max-[1250px]:justify-between px-10">
          <button className="bg-white px-4 py-1 ml-28 max-[1500px]:ml-0 text-sm w-[300px] text-black rounded-full font-semibold hover:bg-page-lightblue duration-300">
            BOTÓN DE ARREPENTIMIENTO
          </button>

          <button className="group text-black flex justify-center items-center rounded-xl w-[70px] border-2 ">
            <FaAngleUp className="text-[50px] group-hover:animate-bounce text-white duration-300"/>
          </button>
        </div>
      </article>

      <section className="flex justify-center items-center w-full bg-page-gray-light">
        <h1 className="font-bold text-gray-800 text-sm py-2">
          ©️ 2024 Technology Line SRL
        </h1>
      </section>
    </div>
  )
}