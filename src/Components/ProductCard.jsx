import { NavLink } from "react-router-dom"
import { useState } from "react"
import page_icon from '../Assets/page-icon.jpeg'
import saleImg from '../Assets/hotsale-icon.svg'

export default function ProductCard({ price, name, sku, img, discount }) {
  const [imageError, setImageError] = useState(false)
  const maxNameLength = 50
  const limitedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...`: name
  const formattedPrice = parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const formattedDiscount = parseFloat(discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  const totalDiscount = (price, discount) => {
    // Convertir los precios a números
    const normalPrice = parseFloat(price);
    const discountedPrice = parseFloat(discount);
  
    // Calcular el porcentaje de descuento
    const percentage = ((normalPrice - discountedPrice) / normalPrice) * 100;
  
    // Devolver el porcentaje como un número entero
    return Math.round(percentage);
  }

  const percentageOff = totalDiscount(price, discount)

  return(
    <NavLink
      to={`/products/?product=${sku}`} 
      className="flex flex-col box-border items-center my-2 justify-between bg-white p-2 mx-auto max-[430px]:ml-4 max-[375px]:ml-1 hover:drop-shadow-md hover:border-[#333] duration-500 border-2 rounded-xl hover:cursor-pointer min-h-[400px] h-[400px] w-[270px] min-w-[270px]">
      <header className="relative w-full h-[55%] box-border">
        {discount > 0
        ?
          <img className="absolute h-10 w-10 right-0" src={saleImg} alt="" />
        :
          ''
        }
        <img 
          src={imageError ? page_icon : img}
          alt={name}
          loading="eager" 
          className={`w-full h-full object-contain rounded-lg `}
          onError={handleImageError}
        />
      </header>

      <article className="w-full h-[35%] box-border flex flex-col justify-between">
        <p>{limitedName}</p>
        {discount 
        ? 
          <div>
            <div className='flex items-center gap-x-1'>
              <p className="text-sm line-through">${formattedPrice}</p>
              <span className='text-sm mb-1 bg-orange-400 text-white px-2 rounded-full'>{percentageOff}% OFF</span>
            </div>
            <p className="font-bold text-2xl">${formattedDiscount}</p>
          </div>
        : 
          <p className="font-bold text-2xl">${formattedPrice}</p>
        }
      </article>
    </NavLink>
  )
}