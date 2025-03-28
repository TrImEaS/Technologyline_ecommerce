import { FaDotCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { NavLink } from "react-router-dom";


export default function MiniCart({ showCart, setShowCart }) {
  const { cartProducts, getTotalOfProducts, deleteOneProductOfCart, addProductToCart, cleanCart } = useCart()

  return (
    <div className={`fixed top-0 z-[999999] right-0 w-[80%] max-sm:w-full min-h-[100%] cart flex flex-col max-w-[500px] overflow-y-auto gap-5 p-3 bg-gray-100 border-2 text-gray-800 ${showCart === 3 && 'hidden'} ${showCart ? 'show' : 'hide'}`}>
      <button onClick={()=> setShowCart(0)}>
        <FaTimesCircle className="text-xl text-sky-500"/>
      </button>

      <section className="w-full">
        {getTotalOfProducts() === 0 
          ? (
            <article className="flex w-full flex-col justify-center items-center text-center">
              <h3 className="font-bold">Tu carrito está vacío</h3>
              <span>Aún no agregaste productos al carrito.</span>
            </article>
          )
          : (
            <article className="flex flex-col gap-3 w-full justify-center border-b-2 pb-4 border-gray-200 items-center">
              <h3 className="font-bold border-b-2 border-sky-500 px-3 tracking-wider text-sky-500">
                Mi carrito
              </h3>

              <div className="flex justify-around items-center w-full px-5">
                <NavLink to='/cart' onClick={()=> setShowCart(0)} className='group flex flex-col'>
                  <p className="flex items-center gap-x-1 text-sky-500">
                    <FaDotCircle className="text-sm"/> 
                    <span>Ir a mi carrito</span>
                  </p>
                  <span className="group-hover:w-full h-[1.5px] w-0 bg-sky-500 duration-300 text-sky-500"></span>
                </NavLink>

                <button onClick={() => cleanCart()} className="group flex flex-col">
                  <p className="flex items-center gap-x-1 text-sky-500">
                    <FaDotCircle className="text-sm"/> 
                    <span>Vaciar carrito</span>
                  </p>
                  <span className="group-hover:w-full h-[1.5px] w-0 bg-sky-500 duration-300"></span>
                </button>
              </div>
            </article>
          )
        }
      </section>
      
      <section className="px-5 overflow-y-auto h-[26rem] flex flex-col gap-5">
        {getTotalOfProducts() > 0 &&
          cartProducts.map(product => (
            <article key={product.id} className="flex items-center max-h-[180px] p-3 gap-5 w-full shadow-lg rounded-xl bg-white text-gray-800 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-sky-100">
              <header className="w-[40%] overflow-hidden rounded-xl">
                <img className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300" src={product.img_url}/>
              </header>

              <aside className="w-[60%] min-h-[100px] flex flex-col text-xs gap-y-2 justify-between">
                <NavLink onClick={()=> setShowCart(0)} className='flex flex-col hover:text-sky-700 transition-colors duration-300'  to={`/products?product=${product.sku}`}>
                  <span className="uppercase font-bold text-page-blue-normal">{product.brand}</span>
                  <span className="truncate whitespace-normal font-medium">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
                  <span className="pt-1 font-bold text-gray-700">Precio Lista - <span className="text-green-600">${product.price_list_3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
                </NavLink> 

                <div className="w-full flex justify-center text-white items-center mt-1">
                  <button onClick={()=> deleteOneProductOfCart({ productID: product.id })} className="w-8 h-7 bg-gradient-to-r from-sky-500 to-sky-600 rounded-l-md flex justify-center items-center border-0 hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-bold">-</button>
                  <span className="min-w-8 min-h-7 bg-sky-500 flex justify-center items-center border-x-0 px-2 font-medium">{product.quantity_selected}</span>
                  <button onClick={()=> addProductToCart({ product })} className="w-8 h-7 bg-gradient-to-r from-sky-600 to-sky-500 rounded-r-md flex justify-center items-center border-0 hover:from-sky-700 hover:to-sky-600 transition-all duration-300 font-bold">+</button>
                </div>
              </aside>
            </article>
          ))
        }

        {getTotalOfProducts() > 0 &&
          <NavLink
            to="/cart" 
            onClick={() => setShowCart(0)}
            className="bg-gradient-to-r from-sky-500 to-blue-600 fixed bottom-5 w-[90%] z-[10000] hover:from-sky-600 hover:to-blue-700 hover:scale-[1.02] text-white py-4 px-6 rounded-lg text-center font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Finalizar Pedido
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </NavLink>
        }
      </section>
    </div>
  )
}