import React from "react";

export default function ProductCard({ img, price, name, addItemCart }) {

  const maxNameLength = 50
  const limitedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...`: name

  
  return(
    <section className="flex flex-col box-border items-center justify-between bg-white p-2 shadow-xl hover:shadow-page-blue-normal hover:shadow-lg duration-500 border-2 rounded-xl hover:cursor-pointer min-h-[400px] h-[400px] w-[280px] min-w-[280px]">
      <header className="w-full h-[50%] box-border">
        <img 
          src={`https://www.technologyline.com.ar/products-images/${img}.jpg`} 
          loading="lazy"
          alt="Product-Card" 
          className="w-full h-full" 
        />
      </header>

      <article className="w-full h-[35%] box-border flex flex-col justify-between">
        <p>{limitedName}</p>
        <p className="font-bold text-xl">${parseFloat(price).toFixed(2)}</p>
      </article>

      {/* <button 
        className="bg-marine-100 h-[15%] font-bold text-white w-full"
        onClick={addItemCart}
      >
        Añadir al Carrito
      </button> */}
    </section>
  )
}