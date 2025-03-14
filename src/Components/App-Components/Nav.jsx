import { NavLink } from 'react-router-dom'
import { useCart } from '../../Context/CartContext.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import SearchInput from './Nav-Components/SearchInput.jsx'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import MiniCart from '../../Pages/MiniCart.jsx';

export default function Nav() {
  const { getTotalOfProducts } = useCart()
  const [showCart, setShowCart] = useState(3)

  return (
    <nav className='z-50 flex flex-col w-full relative items-center bg-color'>
    {/*---Nav top---*/}
      <section className='flex gap-x-5 max-sm:gap-x-2 max-sm:max-h-[100px] justify-between items-center h-28 w-3/4 max-lg:w-full px-2 max-sm:px-0'>
        {/*Logo*/}
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
            {/* <button disabled className='flex items-center text-nowrap gap-1 text-opacity-15' title='Lo sentimos, esta opcion esta en mantenimiento, opcion en mantenimiento'>
              <PiUserCircleFill className='text-3xl'/>
              <span className='max-sm:hidden'>Mi cuenta</span>
            </button> */}

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
      <section className='md:hidden flex h-[50px] pb-3 w-full items-center justify-between text-slate-50 max-sm:justify-between max-md:px-5 max-sm:px-2 max-sm:pl-4'> 
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
