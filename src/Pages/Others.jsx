import { NavLink, Outlet } from "react-router-dom"

export default function Others () {
  return (
    <section className="flex max-md:flex-col py-10 max-md:gap-0 gap-10 min-h-screen w-4/5">
      <div className="flex justify-center items-center w-[30%] h-[600px] max-md:h-full">
       
       {/*Menu full screen*/}
        <ul className="flex max-md:hidden flex-col gap-2">
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/about_us'}>
            Sobre nosotros
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/trabaja_con_nosotros'}>
              Trabaja con nosotros
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/garantia'}>
              Garantia
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/centro_de_ayuda'}>
              Centro de ayuda
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/sucursales'}>
              Sucursales
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/politicas_de_devolucion'}>
              Politicas de devolucion
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/mayoristas'}>
              Venta a mayoristas
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col gap-y-10 w-full">
        <section className="flex flex-col pl-10 max-md:pl-0 gap-3">
          <h1 className="w-[70%] max-md:w-full text-center font-bold text-xl">
            ¿En qué podemos ayudarte? 
          </h1>
          <p className="w-[70%] max-md:w-full text-pretty">
            Encontrá la información que estás necesitando, 
            sobre nosotros, preguntas frecuentes y mucho más...
          </p>
        </section>
        <Outlet/>
          
        {/*Menu for mobile*/}
        <ul className="max-md:flex hidden flex-wrap gap-2 w-full justify-center items-center">
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/about_us'}>
              Sobre nosotros
            </NavLink>
          </li>
          {/* <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/trabaja_con_nosotros'}>
              Trabaja con nosotros
            </NavLink>
          </li> */}
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/garantia'}>
              Garantia
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/centro_de_ayuda'}>
              Centro de ayuda
            </NavLink>
          </li>
          {/* <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/politicas_de_devolucion'}>
              Politicas de devolucion
            </NavLink>
          </li> */}
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[220px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/mayoristas'}>
              Venta a mayoristas
            </NavLink>
          </li>
        </ul>
      </div>    
    </section>
  )
}