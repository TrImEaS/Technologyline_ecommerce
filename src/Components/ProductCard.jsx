import { NavLink } from "react-router-dom"

export default function ProductCard({ product }) {
  console.log(product)
  const limitedName = product.name.length > 40 ? `${product.name.substring(0, 40)}...`: product.name
  
  const formattedPrice = (price) => { 
    return parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  // const formattedDiscount = parseFloat(discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  
  // const totalDiscount = (price, discount) => {
  //   const normalPrice = parseFloat(price);
  //   const discountedPrice = parseFloat(discount);

  //   const percentage = ((normalPrice - discountedPrice) / normalPrice) * 100;
  
  //   return Math.round(percentage);
  // }

  return(
    <NavLink
      to={`/products/?product=${product.sku}`} 
      className="flex flex-col hover:scale-105 box-border items-center my-3 justify-between bg-white p-2 mx-auto max-[430px]:ml-4 max-[375px]:ml-1 duration-300 hover:cursor-pointer shadow-border border-2 rounded-md"
      style={{ minHeight: '400px', minWidth: '270px', height: '400px', width: '270px' }}>
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
          <span>{limitedName}</span>
        </p> 
        <p className="font-bold text-2xl">${formattedPrice(product.price)}</p>
      </article>
    </NavLink>
  )
}