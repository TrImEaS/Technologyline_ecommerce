import axios from "axios"
import { NavLink } from "react-router-dom"
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export default function ProductCard({ product }) {
  const formattedPrice = (price) => { 
    return parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const addViewToProduct = () => {
    axios.patch(`${API_URL}/api/products/addView/${product.id}`)
    .then(res => {
      if(res.status !== 200){
        return console.log(res)
      }
      console.log('view updated')
    })
    .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  return(
    <NavLink
      to={`/products/?product=${product.sku}`} 
      onClick={addViewToProduct}
      className="flex flex-col hover:scale-105 box-border items-center my-3 justify-between bg-white p-2 mx-auto duration-300 hover:cursor-pointer shadow-border border-2 rounded-md h-[400px] w-[270px] max-md:max-w-[90%]"
    >     
      <header className="relative w-full flex-grow-[0.55] box-border">
        <img 
          src={product.img_base}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
          onError={(e) => e.target.src = `https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg`}
        />
      </header>

      <article className="w-full flex-grow-[0.35] box-border flex flex-col justify-between">
        <p className="flex flex-col">
          <span className="text-xs text-gray-500">SKU: {product.sku}</span>
          <span className="line-clamp-2">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
        </p> 
        <p className="font-bold text-xl">${formattedPrice(product.price_list_1)}</p>
      </article>
    </NavLink>
  )
}