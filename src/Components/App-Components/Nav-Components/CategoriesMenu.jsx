import { useState, useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { FaBars } from 'react-icons/fa'
import Spinner from "../../Products/Spinner"
import { useProducts } from "../../../Context/ProductsContext";

export default function CategoriesMenu () {
  const { products, loading } = useProducts()
  const [categoriesHideMenu, setCategoriesHideMenu] = useState(false)
  const location = useLocation()
  let uniqueCategories
  let uniqueSubCategories

  useEffect(() => {
    setCategoriesHideMenu(false);
  }, [location.search]);

  if(loading){
    return(<Spinner/>)
  }

  if(!loading){
    uniqueCategories = [...new Set(products.map(product => product.category).sort((a, b) => a.localeCompare(b)))]
    uniqueSubCategories = [...new Set(products.map(product => product.sub_category).sort((a, b) => a.localeCompare(b)))]
  }

  const handleClickCategories = () => setCategoriesHideMenu(!categoriesHideMenu)

  return(
    <>
      {/* Categories Menu Button */}
      <div className='relative group'>
        <button
          onClick={handleClickCategories} 
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${categoriesHideMenu ? 'bg-page-lightblue text-white' : 'hover:bg-white hover:text-black'}`}
        >
          <FaBars className='text-lg'/>
          <span className="max-md:hidden font-medium tracking-wide">
            CATEGORÍAS
          </span>
        </button>

        {/* Dropdown Menu */}
        <div className={`absolute left-0 top-full mt-2 w-[300px] max-w-[500px] bg-white rounded-lg shadow-xl transform transition-all duration-300 origin-top ${categoriesHideMenu ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          <div className='max-h-[70vh] overflow-y-auto rounded-lg'>
            <div className='p-4 bg-gradient-to-r from-page-blue-normal to-page-lightblue'>
              <NavLink 
                to='/search' 
                onClick={handleClickCategories} 
                className='block text-white text-lg font-semibold hover:opacity-80 transition-opacity'>
                Todos los productos
              </NavLink>
            </div>

            {/* Categories List */}
            <div className='p-4'>
              {uniqueCategories.map((category) => (
                !category.includes('Cargar') && (
                  <div key={category} className="mb-6 last:mb-0">
                    <NavLink 
                      to={`/search/?category=${category.toLowerCase()}`} 
                      onClick={handleClickCategories}
                      className='block text-lg font-semibold text-gray-800 hover:text-page-lightblue transition-colors mb-2'>
                      {category}
                    </NavLink>

                    {/* Subcategories */}
                    <div className='pl-4 space-y-2'>
                      {uniqueSubCategories
                        .filter(sub_category => products.some(product => 
                          product.category === category && 
                          product.sub_category === sub_category
                        ))
                        .map(sub_category => (
                          <NavLink 
                            key={sub_category}
                            to={`/search/?category=${category.toLowerCase()}&sub_category=${sub_category.toLowerCase()}`}
                            onClick={handleClickCategories}
                            className='block text-sm text-gray-600 hover:text-page-lightblue transition-colors'>
                            {sub_category.replace(';', ',')}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Categories List for Large Screens */}
      <section className='hidden md:block w-full max-w-6xl mx-auto px-4'>
        <ul className='flex items-center justify-center gap-6 overflow-x-auto py-2 whitespace-nowrap'>
          {uniqueCategories.map((category) => (
            !category.includes('Cargar') && (
              <li key={category.toLowerCase()}>
                <NavLink 
                  to={`/search/?category=${category.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-300 hover:text-page-lightblue ${
                    new URLSearchParams(location.search).get('category') === category.toLowerCase() ? 'text-page-lightblue' : 'text-white'
                  }`}>
                  {category}
                </NavLink>
              </li>
            )
          ))}
        </ul>
      </section>
    </>
  )
}