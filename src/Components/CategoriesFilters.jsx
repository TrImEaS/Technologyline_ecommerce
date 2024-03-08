import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { getAllSubCategories, getAllBrands } from '../Mocks/processProducts.js'


export default function CategoriesFilter ({ products }) {
  //Arreglar para que reciba el array products filtrado
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [selectPrice, setSelectPrice] = useState(minPrice)
  const [visibleCategories, setVisibleCategories] = useState(5)
  
  const categories = getAllSubCategories(products)
  const brands = getAllBrands(products)

  const handleToggleCategory = () => setIsCategoryOpen(!isCategoryOpen)
  const handleToggleBrand = () => setIsBrandOpen(!isBrandOpen)
  const handleTogglePrice = () => setIsPriceOpen(!isPriceOpen)
  const handleSelectPrice = (e) => setSelectPrice(parseFloat(e.target.value))
  const handleToggleCategories = () => {
    setVisibleCategories((prevVisibleCategories) =>
      prevVisibleCategories === categories.length ? 5 : categories.length
    )
  }

  useEffect(() => {
    // Calcular el precio mínimo y máximo
    const { minPrice, maxPrice } = products.reduce(
      (acc, product) => {
        const price = parseFloat(product.price)

        // Actualizar el precio mínimo si es menor que el actual
        acc.minPrice = (price < acc.minPrice) ? price : acc.minPrice

        // Actualizar el precio máximo si es mayor que el actual
        acc.maxPrice = (price > acc.maxPrice) ? price : acc.maxPrice

        return acc
      },
      { minPrice: Infinity, maxPrice: -Infinity }
    )

    // Actualizar los estados de precio mínimo y máximo
    setMinPrice(minPrice)
    setMaxPrice(maxPrice)
  }, [products])

  return (
    <>
      {/*Categories*/}
      <div className="flex flex-col gap-y-2 border-t border-black">
        <header className="flex justify-between items-center py-1">
          <span 
            onClick={handleToggleCategory} 
            className="font-bold cursor-pointer flex justify-between pr-1 w-full items-center">
            Categoría
            {isCategoryOpen 
              ? <FaAngleUp/> 
              : <FaAngleDown/>}
          </span>
        </header>

        <section className="flex flex-col gap-y-2">
          {categories.slice(0, visibleCategories).map((category) => (
            <div 
              key={category.name} 
              className="flex cursor-pointer group">
              <NavLink to={`/?category=${category.name}`}>
                <span>◾</span>
                <span className="group-hover">
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}
                </span>
              </NavLink>
            </div>
          ))}

          {categories.length > 5 && (
            <span
              className="cursor-pointer text-page-lightblue hover:text-page-blue-normal"
              onClick={handleToggleCategories}
            >
              {visibleCategories === categories.length ? 'Ver menos' : 'Ver más...'}
            </span>
          )}
        </section>
      </div>

      {/*Brands*/}
      <div className="flex flex-col gap-y-2 border-t border-black">
        <header className="flex justify-between items-center py-1">
          <span 
            onClick={handleToggleBrand} 
            className="fon/t-bold cursor-pointer flex justify-between pr-1 w-full items-center">
            Marcas
            {isBrandOpen 
              ? <FaAngleUp/> 
              : <FaAngleDown/>}
          </span>
        </header>

        <section className={`${isBrandOpen ? 'hidden' : 'flex'} flex-col gap-y-2`}>
          {brands.map((brand) => (
            <article 
              key={brand.name}
              className="flex items-center gap-x-3">
              <input 
                id={`${brand.name}-checkbox`}
                className="w-4 h-4"
                type="checkbox"
                value={brand.name}>
              </input>
              <label htmlFor={`${brand.name}-checkbox`}>{brand.name.charAt(0).toUpperCase() + brand.name.slice(1).toLowerCase()}</label>
            </article>
          ))}

          <span className="cursor-pointer text-page-lightblue hover:text-page-blue-normal">
            Ver mas...
          </span>
        </section>
      </div>

      {/*Prices*/}
      <div className="flex flex-col gap-y-2 border-t border-black w-full">
        <header className="flex flex-col justify-between items-center py-1 w-full">
          <span 
            onClick={handleTogglePrice} 
            className="font-bold cursor-pointer flex justify-between pr-1 w-full items-center">
            Precios
            {isPriceOpen 
              ? <FaAngleUp/> 
              : <FaAngleDown/>}
          </span>
        </header>

        <section className={`${isPriceOpen ? 'hidden' : 'flex'} flex-col justify-center items-center w-full`}>
          <div className="flex justify-between w-full">
            <p className="flex flex-col justify-between items-start w-full">
              <span>Determinar precio minimo:</span>
              <span>{selectPrice}</span>
            </p>
          </div>
          <input 
            className="w-[90%]"
            type="range" 
            min={minPrice} 
            max={maxPrice}
            value={selectPrice}
            onChange={handleSelectPrice}
          />
        </section>
      </div>
    </>
  )
}