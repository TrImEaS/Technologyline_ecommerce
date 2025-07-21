import { NavLink } from "react-router-dom"
import axios from "axios"
import useFormattedPrice from '../Utils/useFormattedPrice'
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export default function ProductCard({ product }) {
  const { addProductToCart } = useCart()
 
  const addViewToProduct = () => {
    axios.patch(`${API_URL}/api/products/addView/${product.id}`)
    .then(res => {
      if(res.status !== 200){
        return console.log(res)
      }
      // console.log('view updated')
    })
    .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  const getPercentageValue = (a, b) => ((1 - (parseFloat(b)/parseFloat(a))) * 100)

  return(
    <div className={`${product.brand.toLowerCase().includes('philco') ? 'border-cyan-300 dropshadow-cyan' : 'rounded-md'} flex flex-col h-[420px] max-sm:w-[98%] w-[270px] max-md:max-w-[100%] sm:my-4 mx-auto duration-300 rounded-3xl border-t-page-blue-normal hover:cursor-pointer group sm:hover:scale-[1.01] shadow-border border-2 bg-white rounded-b-xl border-b-transparent`}>
      <NavLink
        to={`/products/?product=${product.sku}`} 
        onClick={addViewToProduct}
        className='flex flex-col group box-border items-center justify-between h-[90%]'
      >     
        <header className="relative w-full h-[60%] box-border">
          <img 
            src={product.img_url ? product.img_url : `https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg`}
            alt={product.name}
            className="w-full h-full max-h-[250px] pt-1 object-contain rounded-3xl"
            onError={(e) => e.target.src = `https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg`}
          />
          {product.brand.toLowerCase().includes('philco') && <img className="absolute top-1 right-1 object-contain h-10 w-30 rounded-lg" src="https://technologyline.com.ar/banners-images/Assets/philco-days.webp"/>}
        </header>

        <article className="w-full h-[40%] box-border flex flex-col justify-center gap-1 border-x rounded-3xl">
          {/* 
          <p className="font-semibold text-xs flex justify-center text-page-blue-normal">
            <span className="line-through">${product.price_list_1 ? useFormattedPrice(product.price_list_1) : '  -  -  -  -  -  -'}</span>
          </p> */}

          <p className="font-bold text-xl flex flex-col max-sm:text-base text-page-blue-darkMarine px-2">
            {/* <span className="text-base tracking-tighter">PROMO EFECTIVO</span>  */}
            <span className="text-xs text-gray-500 max-sm:text-[9px]">SKU: {product.sku}</span>
            <span className="tracking-normal text-2xl max-sm:text-lg">${product.price_list_2 ? useFormattedPrice(product.price_list_2) : '  -  -  -  -  -  -'}</span>
          </p>
      
          <p className='flex text-[#888] flex-col tracking-widest text-xs px-2'>
            <span>
              Precio lista s/imp. nac.
            </span>
            <span>
              <b className='text-[10px] text-[#888]'>{`$${useFormattedPrice(product.price_list_1 / ((product.tax_percentage / 100) + 1))}`}</b>
            </span>
          </p>

          <p className="flex flex-col px-2">
            <span className="line-clamp-2 text-xs  text-[#333]">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
          </p> 

        </article>
      </NavLink>

      <button onClick={()=> addProductToCart({ product })} className="bg-page-blue-darkMarine rounded-b-xl flex gap-2 justify-center items-center w-full h-[10%] text-white">
        <span className="text-lg max-sm:text-base">AGREGAR</span>
        <FaCartPlus className="text-2xl max-sm:text-xl"/>
      </button>
    </div>
  )
}