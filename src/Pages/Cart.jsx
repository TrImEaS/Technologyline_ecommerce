import { FaDotCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { NavLink } from "react-router-dom";


export default function Cart({ showCart, setShowCart }) {
  const { cartProducts, getTotalOfProducts, deleteProductOfCart, addProductToCart } = useCart()

  return (
    <div className={`fixed top-0 right-0 w-[80%] min-h-[100%] flex flex-col max-w-[500px] overflow-y-auto gap-5 p-3 bg-gray-100 border-2 text-gray-800 cart ${showCart === 3 && 'hidden'} ${showCart ? 'show' : 'hide'}`}>
      <button onClick={()=> setShowCart(0)}>
        <FaTimesCircle className="text-xl"/>
      </button>

      <section className="w-full">
        {getTotalOfProducts() < 0 
          ? (
            <article className="flex w-full flex-col justify-center items-center text-center">
              <h3 className="font-bold">Tu carrito está vacío</h3>
              <span>Aún no agregaste productos al carrito.</span>
            </article>
          )
          : (
            <article className="flex flex-col gap-3 w-full justify-center border-b-2 pb-4 border-gray-800 items-center">
              <h3 className="font-bold border-b-2 border-gray-800 tracking-wider text-gray-800">Mi carrito</h3>
              <div className="flex justify-around items-center w-full px-5">
                <NavLink className='group flex flex-col'>
                  <p className="flex items-center gap-x-1">
                    <FaDotCircle className="text-sm"/> 
                    <span>Ir a mi carrito</span>
                  </p>
                  <span className="group-hover:w-full h-[1.5px] w-0 bg-gray-800 duration-300"></span>
                </NavLink>

                <button className="group flex flex-col">
                  <p className="flex items-center gap-x-1">
                    <FaDotCircle className="text-sm"/> 
                    <span>Vaciar carrito</span>
                  </p>
                  <span className="group-hover:w-full h-[1.5px] w-0 bg-gray-800 duration-300"></span>
                </button>
              </div>
            </article>
          )
        }
      </section>
      
      <section className="px-5">
        {getTotalOfProducts() > 0 &&
          cartProducts.map(product => (
            <article className="flex items-center p-2 gap-5 w-full shadow-lg rounded-xl bg-white text-gray-800">
              <header className="w-[40%]">
                <img className="w-full h-full object-contain rounded-xl" src={product.img_base}/>
              </header>

              <aside className="w-[60%] flex flex-col text-sm gap-y-2">
                <NavLink onClick={()=> setShowCart(0)} to={`/products?product=${product.sku}`}>
                  {product.name.replace(/EAN.*/,'').substring(0, 50)}...
                </NavLink>

                <div className="w-full flex justify-center text-white items-center">
                  <button onClick={()=> deleteProductOfCart(product.id)} className="w-7 bg-sky-400 rounded-md flex justify-center items-center border hover:bg-sky-700 duration-300">-</button>
                  <span className="min-w-7 bg-sky-400 rounded-md flex justify-center items-center border px-1">{getTotalOfProducts()}</span>
                  <button onClick={()=> addProductToCart(product.id)} className="w-7 bg-sky-400 rounded-md flex justify-center items-center border hover:bg-sky-700 duration-300">+</button>
                </div>
              </aside>
            </article>
          ))
        }
      </section>
    </div>
  )
}