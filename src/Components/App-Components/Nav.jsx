import { NavLink } from 'react-router-dom'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import SearchInput from './Nav-Components/SearchInput.jsx'
import { FaShoppingCart } from "react-icons/fa";
import { PiUserCircleFill } from "react-icons/pi";
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;


export default function Nav() {
  return (
    <nav 
      className='z-50 flex flex-col w-full relative items-center bg-blue-400'>
    {/*---Nav top---*/}
      <section className='flex gap-x-5 max-sm:gap-x-2 justify-between max-sm:justify-center items-center h-28 w-3/4 max-lg:w-full px-2'>
        {/*Logo*/}
        <NavLink to='/' className='h-[100px] flex items-center max-xl:justify-center'>
          <img src={`https://technologyline.com.ar/banners-images/Assets/logo-tline.svg`} alt="company-logo" className='w-[200px] max-w-[200px] pb-3'/>
        </NavLink>

        {/*Search input*/}
        <div className='max-md:hidden flex w-full max-w-[600px] justify-center items-center mt-3'>
          <SearchInput/> 
        </div>

        {/*User items o Link to realcolor shop*/}
        <article className='flex gap-x-6 max-sm:gap-x-3 pr-3 items-center mt-[8px] w-[190px]'>
          <div className='flex text-white items-center w-full gap-2 justify-between max-sm:justify-end'>
            <button className='hover:scale-110 flex items-center text-nowrap gap-1' title='Mi cuenta'>
              <PiUserCircleFill className='text-3xl'/>
              <span className='max-sm:hidden'>Mi cuenta</span>
            </button>

            <button className='text-2xl relative hover:scale-110 duration-300' title='Ir al carrito'>
              <span className='bg-white w-5 h-5 text-black text-xs flex justify-center items-center -top-2 -right-3 rounded-full border border-blue-500 absolute'>1</span>
              <FaShoppingCart />
            </button>
          </div>
        </article>
      </section>

      {/*---Nav bottom Full Screen---*/}
      <section className='hidden md:flex z-50 w-full items-center justify-around gap-x-5 bg-page-blue-normal text-slate-50 text-[15px]'>
        <article className='w-3/4 max-lg:w-full px-10 flex h-[60px] items-center justify-around min-w-[640px]'>
          <CategoriesMenu/>
        </article>
      </section>

      {/*---Nav bottom  MD screen---*/}
      <section className='md:hidden flex h-[60px] w-full items-center justify-center gap-x-5 bg-page-blue-normal text-slate-50 max-md:justify-start max-sm:justify-between max-md:px-20 max-sm:px-10'>
        {/* Categorias */}
        <CategoriesMenu/>        
        
        <article className='flex items-center rounded-full w-full'>
          <SearchInput/>
        </article>
      </section>
    </nav>
  )
}
