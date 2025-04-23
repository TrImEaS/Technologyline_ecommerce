import { useState, useEffect } from 'react'
import { useLocation, Outlet, NavLink } from 'react-router-dom'
import { useProducts } from '../Context/ProductsContext'
import { FaAngleDown } from 'react-icons/fa'
import ProductsSearch from '../Components/Search-Components/ProductsSearch.jsx'
import CategoriesFilters from '../Components/Search-Components/CategoriesFilters.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import useDocumentTitle from '../Utils/useDocumentTitle'

export default function Search () {
  const { products, loading } = useProducts()
  const location = useLocation()
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0.00,
    maxPrice: 99999999999.00,
    search_name: '' ,
    search_category: '',
    search_subCat: '',
    search_brand: '',
    search_white_line: 0,
    search: '',
  })
  const [filterMenu, setFilterMenu] = useState(false)
  const [sortOption, setSortOption] = useState('')

  useDocumentTitle('Buscar')

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    
    setFilters((prevState) => ({
      ...prevState,
      search_name: queryParams.get('name') || '',
      search_category: queryParams.get('category') || '',
      search_subCat: queryParams.get('sub_category') || '',
      search_white_line: queryParams.get('white_line') || 0,
      search_brand: queryParams.get('brand') || '',
      search: queryParams.get('search') || ''
    }))

    setFilterMenu(false)
  }, [location.search])
  
  if(loading){
    return(<Spinner/>)
  }

  const filterProducts = (products) => {
    const filtered = products.filter(product => {
      return (
        parseFloat(product.price_list_1) >= filters.minPrice &&
        parseFloat(product.price_list_1) <= filters.maxPrice &&
        (filters.category === 'all' || product.category === filters.category) &&
        product.name.toUpperCase().includes(filters.search_name.toUpperCase()) &&
        product.category.toUpperCase().includes(filters.search_category.toUpperCase()) &&
        product.sub_category.toUpperCase().includes(filters.search_subCat.toUpperCase()) &&
        (filters.search_white_line == 1 ? product.white_line == 1 : true) &&
        (filters.search_brand.length === 0 || filters.search_brand.includes(product.brand.toLowerCase())) &&
        (
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.sub_category.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    });
  
    return filtered.sort((a, b) => {
      if (sortOption === 'min') {
        return parseFloat(a.price_list_1) - parseFloat(b.price_list_1);
      }
      if (sortOption === 'max' || sortOption === '') {
        return parseFloat(b.price_list_1) - parseFloat(a.price_list_1);
      }
      if (sortOption === 'A-Z') {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === 'Z-A') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  };
  
  const filteredProducts = products && filterProducts(products) 

  const handleFilterMenu = () => setFilterMenu(!filterMenu)

  {/*Componente search*/}
  return (
    <section className="flex flex-col w-4/5 max-sm:w-full items-center py-10">
      <header className="flex w-full justify-end gap-y-5 pb-14 max-sm:flex-col max-sm:w-full max-sm:items-center max-sm:pb-8">
        <article className="flex items-center w-full max-sm:w-4/5">
          <nav className="flex items-center flex-wrap space-x-2 text-sm font-medium">
            <NavLink
              className="flex items-center w-fit text-gray-600 hover:text-page-lightblue transition-colors duration-200" 
              to="/search">
              <span className="font-semibold w-fit whitespace-nowrap">TODOS</span>
            </NavLink>

            {(filters.search || filters.search_category || filters.search_subCat || filters.search_brand) && 
              <span className="text-gray-400">/</span>
            }

            {filters.search &&
              <div className="flex items-center">
                <NavLink
                  className="text-gray-600 w-fit hover:text-page-lightblue transition-colors duration-200" 
                  to={`/search/?search=${filters.search}`}>
                  <span className="font-semibold w-fit whitespace-nowrap">{filters.search.toLocaleUpperCase()}</span>
                </NavLink>
                {(filters.search_category || filters.search_subCat || filters.search_brand) && 
                  <span className="text-gray-400 ml-2">/</span>
                }
              </div>
            }

            {filters.search_category &&
              <div className="flex items-center">
                <NavLink
                  className="text-gray-600 w-fit hover:text-page-lightblue transition-colors duration-200" 
                  to={`/search/?category=${filters.search_category}`}>
                  <span className="font-semibold w-fit whitespace-nowrap">{filters.search_category.toLocaleUpperCase()}</span>
                </NavLink>
                {(filters.search_subCat || filters.search_brand) && 
                  <span className="text-gray-400 ml-2">/</span>
                }
              </div>
            }

            {filters.search_subCat &&
              <div className="flex items-center">
                <NavLink
                  className="text-gray-600 w-fit hover:text-page-lightblue transition-colors duration-200"
                  to={`/search/?${filters.search_category ? `category=${filters.search_category}&` : ''}sub_category=${filters.search_subCat.toLowerCase()}`}>
                  <span className="font-semibold w-fit whitespace-nowrap">{filters.search_subCat.toLocaleUpperCase()}</span>
                </NavLink>
                {filters.search_brand && 
                  <span className="text-gray-400 ml-2">/</span>
                }
              </div>
            }
            
            {filters.search_brand &&
              <NavLink
              className="text-gray-600 w-fit hover:text-page-lightblue transition-colors duration-200"
              to={`/search/?${filters.search_category ? `category=${filters.search_category}&` : ''}${filters.search_subCat ? `sub_category=${filters.search_subCat.toLowerCase()}&` : ''}brand=${filters.search_brand.toLowerCase()}`}>
                <span className="font-semibold w-fit whitespace-nowrap">{filters.search_brand.toLocaleUpperCase()}</span>
              </NavLink>
            }
          </nav>
        </article>

        {/*Aside filters for mobile*/}
        <article className="max-[1366px]:flex hidden flex-wrap gap-5 text-gray-600 items-center max-sm:justify-center">
          <select 
            name="filter"
            className="w-[240px] max-sm:text-sm text-center h-9 outline-none border font-medium shadow-lg hover:shadow-xl rounded-lg"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option className='max-[1366px]:text-sm' value="">
              Orden por defecto
            </option>
            <option className='max-[1366px]:text-sm' value="min">
              Menor precio
            </option>
            <option className='max-[1366px]:text-sm' value="max">
              Mayor precio
            </option>
            <option className='max-[1366px]:text-sm' value="A-Z">
              A-Z
            </option>
            <option className='max-[1366px]:text-sm' value="Z-A">
              Z-A
            </option>
          </select>
          
          <div className='relative z-10'>
            <p 
              className='text-gray-600 max-sm:text-sm w-[240px] flex justify-center items-center h-9 border font-medium rounded-lg shadow-lg hover:shadow-xl cursor-pointer'
              onClick={handleFilterMenu}>
              <span className='w-full text-center'>Filtros</span>
              <FaAngleDown className='text-base'/>
            </p>

            <div className={`flex-col gap-y-5 rounded w-[240px] h-[330px] overflow-x-hidden absolute top-[40px] bg-white border-2 p-3 ${filterMenu ? 'flex' : 'hidden'}`}>
              <CategoriesFilters onFilterChange={setFilters} products={filteredProducts}/>
              <NavLink to='/search' className='h-10 py-2 flex items-center justify-center bg-white rounded-lg duration-500 active:text-sm active:duration-0 font-medium border shadow-lg hover:shadow-xl'>
                Limpiar Filtros
              </NavLink>
            </div>
          </div>
        </article>
      </header>
      
      <main className="flex max-lg:flex-col gap-x-3 w-full h-full">
        {/*Aside filters max screen*/}
        <aside className="max-[1366px]:hidden flex flex-col gap-y-8 min-w-[20%] w-[20%] pt-2">
          <select 
            name="filter"
            className="w-[180px] max-sm:text-sm text-center h-9 outline-none border font-medium shadow-lg hover:shadow-xl rounded-lg"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option className='max-[1366px]:text-sm' value="">
              Orden por defecto
            </option>
            <option className='max-[1366px]:text-sm' value="min">
              Menor precio
            </option>
            <option className='max-[1366px]:text-sm' value="max">
              Mayor precio
            </option>
            <option className='max-[1366px]:text-sm' value="A-Z">
              A-Z
            </option>
            <option className='max-[1366px]:text-sm' value="Z-A">
              Z-A
            </option>
          </select>
          <div className='max-[1366px]:hidden flex flex-col gap-y-8'>
            <CategoriesFilters onFilterChange={setFilters} products={filteredProducts}/>
            <NavLink to='/search' className='h-10 flex items-center justify-center bg-white rounded-lg duration-500 active:text-sm active:duration-0 font-medium border shadow-lg hover:shadow-xl'>
              Limpiar Filtros
            </NavLink>
          </div>
        </aside>
        
        <section className='w-full'>
          <ProductsSearch products={filteredProducts}/>
        </section>
      </main>
      
      <Outlet/>
    </section>
  )    
}