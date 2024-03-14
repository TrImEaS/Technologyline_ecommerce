import { NavLink, Outlet } from "react-router-dom"

export default function Others () {
  return (
    <section className="flex py-10 gap-10 min-h-screen w-4/5">
      <div className="flex justify-center items-center w-[30%] h-[600px]">
        <ul className="flex flex-col gap-2">
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/about_us'}>
            Sobre nosotros
            </NavLink>
          </li>
          <li className="text-center opacity-50 bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1">
            <span>
            Trabaja con nosotros
            </span>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/garantia'}>
              Garantia
            </NavLink>
          </li>
          <li className="text-center opacity-50 bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1">
            <span>
            Centro de ayuda
            </span>
          </li>
          <li className="hover:bg-black hover:text-white text-center bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1 duration-300">
            <NavLink 
              to={'/others/sucursales'}>
              Sucursales
            </NavLink>
          </li>
          <li className="text-center opacity-50 bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1">
            <span>
            Politicas de devolución
            </span>
          </li>
          <li className="text-center opacity-50 bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1">
            <span>
            Venta mayorista
            </span>
          </li>
          <li className="text-center opacity-50 bg-page-gray-light font-semibold rounded-full w-[250px] px-5 py-1">
            <span className={'w-full'}>
            Nuestro blog
            </span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col gap-y-10 w-full">
        <section className="flex flex-col pl-10 gap-3">
          <h1 className="w-[70%] text-center font-bold text-xl">
            ¿En qué podemos ayudarte? 
          </h1>
          <p className="w-[70%] text-pretty">
            Encontrá la información que estás necesitando, 
            sobre nosotros, sucursales, preguntas frecuentes y mucho más...
          </p>
        </section>
        <Outlet/>
      </div>    
    </section>
  )
}