import { NavLink } from 'react-router-dom'
import axios from 'axios'
import useFormattedPrice from '../Utils/useFormattedPrice'
import { FaCartPlus } from 'react-icons/fa'
import { useCart } from '../Context/CartContext'

const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function ProductCard ({ product }) {
  const { addProductToCart } = useCart()

  const addViewToProduct = () => {
    axios.patch(`${API_URL}/api/products/addView/${product.id}`)
      .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  return (
    <div className={`${product.brand.toLowerCase() === 'drean' ? 'dropshadow-cyan border-cyan-500' : 'border-gray-200'} flex flex-col h-[420px] max-sm:w-[98%] w-[270px] max-md:max-w-[100%] sm:my-4 mx-auto rounded-3xl border  bg-white shadow-sm hover:shadow-lg duration-300 overflow-hidden group`}>
      <NavLink
        to={`/products/?product=${product.sku}`}
        onClick={addViewToProduct}
        className="flex flex-col items-center justify-between h-[90%]"
      >
        {/* Imagen */}
        <header className="relative w-full h-[55%] flex items-center justify-center overflow-hidden">
          <img
            src={product.img_url || 'https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg'}
            alt={product.name}
            className="w-full h-full p-3 max-h-[250px] object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg' }}
          />

          { product.brand.toLowerCase() === 'drean' &&
            <img src='https://technologyline.com.ar/banners-images/Assets/DREAN_WEEK.svg' className='absolute h-7 top-3 left-3'/>
          }
          {/* <img src='https://technologyline.com.ar/banners-images/Assets/cyber2025.webp' className='absolute h-12 top-1 right-0.5'/> */}
        </header>

        {/* Datos */}
        <article className="w-full h-[45%] flex flex-col justify-between px-3 py-2">
          <div>
            <span className="text-[11px] text-gray-400 font-medium">SKU: {product.sku}</span>
            <p className="text-sm font-semibold text-gray-700 leading-tight line-clamp-2 mt-1">
              {product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}
            </p>
          </div>

          <div className="mt-2">
            <p className="text-2xl font-bold text-page-blue-darkMarine max-sm:text-lg">
              {product.price_list_1 ? `$${useFormattedPrice(product.price_list_1)}` : '---'}
            </p>

            <p className="text-xs font-medium text-red-500 mt-1">
              OFERTA CONTADO:{' '}
              <b className="text-sm text-red-500">{`$${useFormattedPrice(product.price_list_2)}`}</b>
            </p>

            <p className="text-[11px] text-gray-500 mt-1">
              Precio lista s/imp. nac.:{' '}
              <b className='text-gray-500'>{`$${useFormattedPrice(product.price_list_1 / ((product.tax_percentage / 100) + 1))}`}</b>
            </p>
          </div>
        </article>
      </NavLink>

      {/* Botón */}
      <button
        onClick={() => addProductToCart({ product })}
        className="bg-page-blue-darkMarine hover:bg-page-blue-normal transition-colors duration-300 rounded-b-xl flex gap-2 justify-center items-center w-full h-[10%] text-white font-medium"
      >
        <span className="text-base max-sm:text-sm">Agregar</span>
        <FaCartPlus className="text-xl max-sm:text-lg"/>
      </button>
    </div>
  )
}
