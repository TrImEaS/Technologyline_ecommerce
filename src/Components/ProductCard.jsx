import Spinner from './Products/Spinner'
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProductCard({ price, name, sku, img }) {
  const maxNameLength = 50
  const limitedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...`: name
  const formattedPrice = parseFloat(price).toLocaleString(undefined)
  const [imageLoaded, setImageLoaded] = useState(true)


  return(
    <NavLink
      to={`/products/?product=${sku}`} 
      className="flex flex-col box-border items-center my-2 justify-between bg-white p-2 mx-auto max-[430px]:ml-4 max-[375px]:ml-1 hover:drop-shadow-md hover:border-[#333] duration-500 border-2 rounded-xl hover:cursor-pointer min-h-[400px] h-[400px] w-[270px] min-w-[270px]">
      <header className="w-full h-[55%] box-border">
        {!imageLoaded && <Spinner />}
        <img 
          src={img}
          alt={name}
          loading="eager" 
          className={`w-full h-full object-contain rounded-lg ${imageLoaded ? '' : 'hidden'}`}
          onError={(e) => e.target.src = 'page-icon.jpeg'}
        />
      </header>

      <article className="w-full h-[35%] box-border flex flex-col justify-between">
        <p>{limitedName}</p>
        <p className="font-bold text-2xl">${formattedPrice}</p>
      </article>
    </NavLink>
  )
}