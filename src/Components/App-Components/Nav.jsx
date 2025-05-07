import { NavLink } from 'react-router-dom'
import { useCart } from '../../Context/CartContext.jsx';
import { FaArrowUp, FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import SearchInput from './Nav-Components/SearchInput.jsx'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import MiniCart from '../../Pages/MiniCart.jsx';
import { PiUserCircleFill } from 'react-icons/pi';

export default function Nav() {
  const { getTotalOfProducts } = useCart()
  const [showCart, setShowCart] = useState(3)

  return (
    <nav className='z-50 flex flex-col w-full relative items-center bg-color'>
      <NavLink to='/shipments' className='flex z-50 h-8 text-center max-sm:h-10 gap-2 px-3 max-sm:gap-1 max-sm:px-5 cursor-pointer bg-slate-100 w-full items-center text-slate-900 justify-center text-[14px] max-sm:text-[12px]'>
        <FaArrowUp className='text-[10px] mt-1 animate-bounce'/>
        <span className='select-none font-medium duration-300'>Envios a todo el pais con precio promocional a las sigueintes localidades</span>
        <FaArrowUp className='text-[10px] mt-1 animate-bounce'/>
      </NavLink>
      
      <section className='flex gap-x-5 max-sm:gap-x-2 max-sm:max-h-[100px] justify-between items-center h-28 w-3/4 max-lg:w-full px-2 max-sm:px-0'>
        <NavLink to='/' className='h-[100px] min-w-[200px] flex items-center max-xl:justify-center'>
          <img src={`https://technologyline.com.ar/banners-images/Assets/logo-tline.svg`} alt="company-logo" className='w-full max-sm:max-w-[170px] max-w-[200px] pb-3'/>
        </NavLink>

        {/*Search input*/}
        <div className='max-md:hidden flex w-full max-w-[600px] justify-center items-center mt-3'>
          <SearchInput/> 
        </div>

        {/*User items */}
        <article className='flex gap-x-6 max-sm:gap-x-3 pr-5 max-sm:pr-8 items-center mt-[8px] w-fit'>
          <div className='flex text-white items-center w-full gap-2 justify-between max-sm:justify-end'>
            <NavLink to='/login' className='flex items-center'>
              <button className='flex items-center text-nowrap gap-1 text-opacity-15' title='Ir a mi cuenta'>
                <PiUserCircleFill className='text-3xl'/>
              </button>
            </NavLink>

            <button 
              className='text-2xl relative hover:scale-110 duration-300'
              onClick={()=> setShowCart(true)}
              title='Ir al carrito'
            >
              <span className='bg-white w-5 h-5 text-black text-xs flex justify-center items-center -top-2 -right-3 rounded-full border border-blue-500 absolute'>
                {getTotalOfProducts()}
              </span>

              <FaShoppingCart />
            </button>
          </div>
        </article>
      </section>

      {/*---Nav bottom Full Screen---*/}
      <section className='hidden md:flex z-50 w-full items-center justify-around gap-x-5 text-slate-50 text-[15px]'>
        <article className='w-3/4 max-lg:w-full px-10 flex h-[60px] items-center justify-around min-w-[640px]'>
          <CategoriesMenu/>
        </article>
      </section>

      {/*---Nav bottom  MD screen---*/}
      <section className='md:hidden flex h-[50px] w-full items-center justify-between text-slate-50 max-sm:justify-between max-md:px-5 max-sm:px-2 max-sm:pl-4'> 
        {/* Categorias */}
        <CategoriesMenu/>        
        
        <article className='flex items-center w-full rounded-full max-sm:hover:w-full duration-300 max-sm:w-fit'>
          <SearchInput/>
        </article>
      </section>

      <MiniCart showCart={showCart} setShowCart={setShowCart}/>
    </nav>
  )
}
