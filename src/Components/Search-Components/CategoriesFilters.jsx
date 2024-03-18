import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { GoTriangleRight } from "react-icons/go"
import { getAllSubCategories, getAllBrands } from '../../Mocks/processProducts.js'


export default function CategoriesFilters ({ products, onFilterChange }) {
  //Arreglar para que reciba el array products filtrado
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [visibleCategories, setVisibleCategories] = useState(5)
  const [visibleBrands, setVisibleBrands] = useState(5)
  
  const categories = getAllSubCategories(products)
  const brands = getAllBrands(products)

  const handleToggleCategory = () => setIsCategoryOpen(!isCategoryOpen)
  const handleToggleBrand = () => setIsBrandOpen(!isBrandOpen)
  const handleTogglePrice = () => setIsPriceOpen(!isPriceOpen)
  const handleToggleCategories = () => setVisibleCategories((prevVisibleCategories) => prevVisibleCategories === categories.length ? 5 : categories.length) 
  const handleToggleBrands = () => setVisibleBrands((prevVisibleBrands) => prevVisibleBrands === brands.length ? 5 : brands.length) 
  const handleSelectMinPrice = (e) => setMinPrice(parseFloat(e.target.value)) 
  const handleSelectMaxPrice = (e) => setMaxPrice(parseFloat(e.target.value))
  const handleSubmitPrice = (e) => {
    e.preventDefault()

    onFilterChange((prevFilters) => ({
      ...prevFilters,
      minPrice: minPrice,
      maxPrice: maxPrice,
    }))
  }

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

        <section className={`${isCategoryOpen ? 'hidden' : 'flex'} flex-col gap-y-2`}>
          {categories.slice(0, visibleCategories).map((category) => (
            <div 
              key={category.name} 
              className="flex cursor-pointer group">
              <NavLink 
                className={'flex hover:text-page-blue-normal duration-300 items-center gap-x-1'} 
                to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}sub_category=${category.name.toLowerCase()}`}>
                <span><GoTriangleRight/></span>
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
            className="font-bold cursor-pointer flex justify-between pr-1 w-full items-center">
            Marcas
            {isBrandOpen 
              ? <FaAngleUp/> 
              : <FaAngleDown/>}
          </span>
        </header>

        <section className={`${isBrandOpen ? 'hidden' : 'flex'} flex-col gap-y-2`}>
          {brands.slice(0, visibleBrands).map((brand) => (
            <div 
              key={brand.name} 
              className="flex cursor-pointer group">
              <NavLink className={'flex hover:text-page-blue-normal duration-300 items-center gap-x-1'} to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}brand=${brand.name.toLowerCase()}`}>
                <span><GoTriangleRight/></span>
                <span className="group-hover">
                  {brand.name.charAt(0).toUpperCase() + brand.name.slice(1).toLowerCase()}
                </span>
              </NavLink>
            </div>
          ))}
          {brands.length > 5 && (
            <span
              className="cursor-pointer text-page-lightblue hover:text-page-blue-normal"
              onClick={handleToggleBrands}
            >
              {visibleBrands === brands.length ? 'Ver menos' : 'Ver más...'}
            </span>
          )}
        </section>
      </div>

      {/*Prices hidden(hasta que se arregle)*/}
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

        <form
          onSubmit={handleSubmitPrice} 
          className={`${isPriceOpen ? 'hidden' : 'flex'} flex-wrap gap-3 justify-center items-center w-full pb-5`}>
          <div className="flex items-center">
            <label htmlFor="min-price" className="w-[50px]">
              Min:
            </label>
            <input 
              id="min-price"
              className="w-[90%] border p-1 border-black rounded-md"
              type="number" 
              min={0}
              value={minPrice}
              onChange={handleSelectMinPrice}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="max-price" className="w-[50px]">
              Max:
            </label>
            <input 
              id="max-price"
              className="w-[90%] border p-1 border-black rounded-md"
              type="number" 
              min={0} 
              value={maxPrice}
              onChange={handleSelectMaxPrice}
            />
          </div>
          <button className="py-1 px-5 rounded-lg border border-black" type="submit">Filtrar</button>
        </form>
      </div>
    </>
  )
}