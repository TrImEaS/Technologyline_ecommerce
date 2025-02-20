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
      
      <section className="px-5 flex flex-col gap-5">
        {getTotalOfProducts() > 0 &&
          cartProducts.map(product => (
            <article key={product.id} className="flex items-center max-h-[180px] p-2 gap-5 w-full shadow-lg rounded-xl bg-white text-gray-800">
              <header className="w-[40%]">
                <img className="w-full h-full object-contain rounded-xl" src={product.img_base}/>
              </header>

              <aside className="w-[60%] min-h-[100px] flex flex-col text-xs gap-y-2 justify-between">
                <NavLink onClick={()=> setShowCart(0)} className='flex flex-col'  to={`/products?product=${product.sku}`}>
                  <span className="uppercase font-bold text-page-blue-normal">{product.brand}</span>
                  <span className="truncate whitespace-normal">{product.name.replace(/EAN.*/,'')}</span>
                  <span className="pt-1 font-bold text-gray-700">Precio Lista - ${product.price_list_3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </NavLink> 

                <div className="w-full flex justify-center text-white items-center">
                  <button onClick={()=> deleteOneProductOfCart({ productID: product.id })} className="w-7 h-6 bg-sky-500 rounded-md flex justify-center items-center border hover:bg-sky-700 duration-300">-</button>
                  <span className="min-w-7 min-h-6 bg-sky-500 rounded-md flex justify-center items-center border px-1">{product.quantity_selected}</span>
                  <button onClick={()=> addProductToCart({ product })} className="w-7 h-6 bg-sky-500 rounded-md flex justify-center items-center border hover:bg-sky-600 duration-300">+</button>
                </div>
              </aside>
            </article>
          ))
        }
      </section>
    </div>
  )
}