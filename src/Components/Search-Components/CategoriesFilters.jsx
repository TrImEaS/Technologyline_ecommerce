import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { GoTriangleRight } from "react-icons/go"

export default function CategoriesFilters ({ products, onFilterChange }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isBrandOpen, setIsBrandOpen] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState(5)
  const [visibleBrands, setVisibleBrands] = useState(5)
  const categories = [...new Set(products.map(product => product.sub_category))]
  const brands = [...new Set(products.map(product => product.brand))]
  
  const handleToggleBrand = () => setIsBrandOpen(!isBrandOpen)
  const handleToggleBrands = () => setVisibleBrands((prevVisibleBrands) => prevVisibleBrands === brands.length ? 5 : brands.length) 
  const handleToggleCategory = () => setIsCategoryOpen(!isCategoryOpen)
  const handleToggleCategories = () => setVisibleCategories((prevVisibleCategories) => prevVisibleCategories === categories.length ? 5 : categories.length) 

  return (
    <>
      {/*Categories*/}
      <div className="flex flex-col gap-y-2 border-t-[3px] border-page-lightblue">
        <header className="flex justify-between items-center py-1">
          <p onClick={handleToggleCategory} className="font-medium text-xl cursor-pointer flex justify-between pr-1 w-full items-center">
            Categorías
            <span className="text-page-lightblue text-lg">{isCategoryOpen ? <FaAngleUp/> : <FaAngleDown/>}</span>
          </p>
        </header>

        <section className={`${isCategoryOpen ? 'hidden' : 'flex'} flex-col gap-y-2`}>
          {categories.slice(0, visibleCategories).map((category) => (
            <div key={category} className="flex cursor-pointer group">
              <NavLink className={'flex hover:text-page-blue-normal duration-300 items-center'} to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}sub_category=${category.toLowerCase()}`}>
                <span className="text-page-lightblue text-2xl"><GoTriangleRight/></span>
                <span className="group-hover">{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</span>
              </NavLink>
            </div>
          ))}

          {categories.length > 5 && (
            <span className="cursor-pointer text-page-lightblue hover:text-page-blue-normal" onClick={handleToggleCategories}>
              {visibleCategories === categories.length ? 'Ver menos' : 'Ver más...'}
            </span>
          )}
        </section>
      </div>

      {/*Brands*/}
      <div className="flex flex-col gap-y-2 border-t-[3px] border-page-lightblue">
        <header className="flex justify-between items-center py-1">
          <p onClick={handleToggleBrand} className="font-medium text-xl cursor-pointer flex justify-between pr-1 w-full items-center">
            Marcas
            <span className="text-page-lightblue text-lg">{isBrandOpen ? <FaAngleUp/> : <FaAngleDown/>}</span>
          </p>
        </header>
 
        <section className={`${isBrandOpen ? 'hidden' : 'flex'} flex-col gap-y-2`}>
          {brands.slice(0, visibleBrands).map((brand) => (
            <div key={brand} className="flex cursor-pointer group">
              <NavLink className={'flex hover:text-page-blue-normal duration-300 items-center'} to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}brand=${brand.toLowerCase()}`}>
                <span className="text-page-lightblue text-2xl"><GoTriangleRight/></span>
                <span className="group-hover">{brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}</span>
              </NavLink>
            </div>
          ))}

          {brands.length > 5 && (
            <span className="cursor-pointer text-page-lightblue hover:text-page-blue-normal" onClick={handleToggleBrands}>
              {visibleBrands === brands.length ? 'Ver menos' : 'Ver más...'}
            </span>
          )}
        </section>
      </div>
    </>
  )
}


  // const [maxPrice, setMaxPrice] = useState('')
  // const [isPriceOpen, setIsPriceOpen] = useState(false)
  // const [minPrice, setMinPrice] = useState('')
  // const handleSelectMinPrice = (e) => setMinPrice(parseFloat(e.target.value)) 
  // const handleSelectMaxPrice = (e) => setMaxPrice(parseFloat(e.target.value))
  // const handleTogglePrice = () => setIsPriceOpen(!isPriceOpen)
  // const handleSubmitPrice = (e) => {
  //   e.preventDefault()

  //   onFilterChange((prevFilters) => ({
  //     ...prevFilters,
  //     minPrice: minPrice,
  //     maxPrice: maxPrice,
  //   }))
  // }
        /*Prices hidden(hasta que se arregle)*/
      /* <div className="flex flex-col gap-y-2 border-t-[3px] border-page-lightblue w-full">
        <header className="flex flex-col justify-between items-center py-1 w-full">
          <p 
            onClick={handleTogglePrice} 
            className="font-bold cursor-pointer flex justify-between pr-1 w-full items-center">
            Precios
            <span className="text-page-lightblue text-lg">{isPriceOpen ? <FaAngleUp/> : <FaAngleDown/>}</span>
          </p>
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
      </div> */