import { NavLink } from "react-router-dom"

export default function ProductCard({ img, price, name, sku }) {
  const imageNotFound = 'https://ih1.redbubble.net/image.1893341687.8294/fposter,small,wall_texture,product,750x1000.jpg'
  const maxNameLength = 50
  const limitedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...`: name
  const formattedPrice = parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  return(
    <NavLink
      to={`/products/?product=${sku}`} 
      className="flex flex-col box-border items-center justify-between bg-white p-2 drop-shadow-xl hover:border-[#333] duration-500 border-2 rounded-xl hover:cursor-pointer min-h-[400px] h-[400px] w-[270px] min-w-[270px]">
      <header className="w-full h-[50%] box-border">
        <img 
          src={`https://www.technologyline.com.ar/products-images/${img}.jpg`} 
          loading="lazy"
          alt={name}
          className={`w-full h-full object-contain`} 
        />
      </header>

      <article className="w-full h-[35%] box-border flex flex-col justify-between">
        <p>{limitedName}</p>
        <p className="font-bold text-2xl">${formattedPrice}</p>
      </article>
    </NavLink>
  )
}