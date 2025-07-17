import { NavLink } from "react-router-dom"
import axios from "axios"
import useFormattedPrice from '../Utils/useFormattedPrice'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export default function ProductCard({ product }) {
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
    <NavLink
      to={`/products/?product=${product.sku}`} 
      onClick={addViewToProduct}
      className={`
        ${product.brand.toLowerCase().includes('philco') ? 'border-cyan-300 dropshadow-cyan' : 'rounded-md'}
        flex flex-col sm:hover:scale-[1.01] box-border items-center justify-between bg-white p-2 mx-auto duration-300 rounded-3xl rounded-tr-none rounded-bl-none border-b-cyan-400 border-t-cyan-200 hover:cursor-pointer shadow-border border-2 h-[420px] max-sm:h-[300px] max-sm:w-[98%] w-[270px] max-md:max-w-[100%] sm:my-4`
      }
    >     
      <header className="relative w-full flex-grow-[0.55] box-border">
        <img 
          src={product.img_url ? product.img_url : `https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg`}
          alt={product.name}
          className="w-full h-full max-h-[250px] object-contain rounded-lg"
          onError={(e) => e.target.src = `https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg`}
        />
        {product.brand.toLowerCase().includes('philco') && <img className="absolute top-1 right-1 object-contain h-10 w-30 rounded-lg" src="https://technologyline.com.ar/banners-images/Assets/philco-days.webp"/>}
      </header>

      <article className="w-full flex-grow-[0.35] box-border flex flex-col justify-between">
        <p className="flex flex-col">
          <span className="text-xs text-gray-500 max-sm:text-[9px]">SKU: {product.sku}</span>
          <span className="line-clamp-2 font-medium max-sm:text-[10px]">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
        </p> 

        <p className="font-semibold text-xs flex justify-center text-page-blue-normal">
          <span className="line-through">${product.price_list_1 ? useFormattedPrice(product.price_list_1) : '  -  -  -  -  -  -'}</span>
        </p>

        <p className="font-bold text-xl text-center flex flex-col max-sm:text-base text-cyan-700">
          <span className="text-base tracking-tighter">PROMO EFECTIVO</span> 
          <span className="tracking-normal text-2xl">${product.price_list_2 ? useFormattedPrice(product.price_list_2) : '  -  -  -  -  -  -'}</span>
        </p>
      </article>
    </NavLink>
  )
}