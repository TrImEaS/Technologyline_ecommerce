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
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <header 
          onClick={handleToggleCategory}
          className={`flex justify-between items-center p-4 cursor-pointer transition-all duration-300 ${isCategoryOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <h2 className="font-semibold text-lg max-sm:text-base text-gray-800 flex items-center gap-2">
            Categorías
          </h2>
          <span className={`text-blue-500 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}>
            {isCategoryOpen ? <FaAngleUp size={20}/> : <FaAngleDown size={20}/>}
          </span>
        </header>

        <div className={`transition-all duration-300 ease-in-out ${isCategoryOpen ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
          <div className="p-4 space-y-1">
            {categories.slice(0, visibleCategories).map((category) => (
              <div key={category} className="group">
                <NavLink 
                  className="flex items-center gap-2 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200" 
                  to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}sub_category=${category.toLowerCase()}`}
                >
                  <span className="text-blue-500 transition-transform duration-200 group-hover:translate-x-1">
                    <GoTriangleRight size={18}/>
                  </span>
                  <span className="text-sm font-medium">
                    {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                  </span>
                </NavLink>
              </div>
            ))}

            {categories.length > 5 && (
              <button 
                onClick={handleToggleCategories}
                className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              >
                {visibleCategories === categories.length ? 'Ver menos' : 'Ver más categorías...'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <header 
          onClick={handleToggleBrand}
          className={`flex justify-between items-center p-4 cursor-pointer transition-all duration-300 ${isBrandOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        >
          <h2 className="font-semibold text-lg max-sm:text-base text-gray-800 flex items-center gap-2">
            Marcas
          </h2>
          <span className={`text-blue-500 transition-transform duration-300 ${isBrandOpen ? 'rotate-180' : ''}`}>
            {isBrandOpen ? <FaAngleUp size={20}/> : <FaAngleDown size={20}/>}
          </span>
        </header>

        <div className={`transition-all duration-300 ease-in-out ${isBrandOpen ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
          <div className="p-4 space-y-1">
            {brands.slice(0, visibleBrands).map((brand) => (
              <div key={brand} className="group">
                <NavLink 
                  className="flex items-center gap-2 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200" 
                  to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}brand=${brand.toLowerCase()}`}
                >
                  <span className="text-blue-500 transition-transform duration-200 group-hover:translate-x-1">
                    <GoTriangleRight size={18}/>
                  </span>
                  <span className="text-sm font-medium">
                    {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
                  </span>
                </NavLink>
              </div>
            ))}

            {brands.length > 5 && (
              <button 
                onClick={handleToggleBrands}
                className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:bg-blue-50 rounded-lg"
              >
                {visibleBrands === brands.length ? 'Ver menos' : 'Ver más marcas...'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}