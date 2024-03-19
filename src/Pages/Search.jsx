import ProductsSearch from '../Components/Search-Components/ProductsSearch.jsx'
import CategoriesFilters from '../Components/Search-Components/CategoriesFilters.jsx'
import productsJson from '../Data/products.json'
import { productsFilter } from '../Mocks/processProducts.js'
import { useState, useEffect } from 'react'
import { useLocation, Outlet, NavLink } from 'react-router-dom'

export default function Search () {
  const location = useLocation()
  const [filterMenu, setFilterMenu] = useState(false)
  const [sortOption, setSortOption] = useState('default')
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0.00,
    maxPrice: 99999999999.00,
    search_name: '' ,
    search_category: '',
    search_subCat: '',
    search_brand: '',
    search: '',
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    
    setFilters((prevState) => ({
      ...prevState,
      search_name: queryParams.get('name') || '',
      search_category: queryParams.get('category') || '',
      search_subCat: queryParams.get('sub_category') || '',
      search_brand: queryParams.get('brand') || '',
      search: queryParams.get('search') || ''
    }))
    
    const queryCat = queryParams.get('sub_category') || queryParams.get('category') || ''
    const queryBrand = queryParams.get('brand') || ''
    const categories = 
    (queryCat.charAt(0).toUpperCase() + queryCat.slice(1).toLowerCase()) + 
    '/' +
    (queryBrand.charAt(0).toUpperCase() + queryBrand.slice(1).toLowerCase())
  }, [location.search])

  const products = productsFilter(productsJson)

  const filterProducts = (products) => {
    const sortedProducts = products.sort((a, b) => {
      switch (sortOption) {
        case 'min':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'max':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'A-Z':
          return a.name.localeCompare(b.name)
        case 'Z-A':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })
    
    return sortedProducts.filter(product => {
      return (
        parseFloat(product.price) >= filters.minPrice 
        &&
        parseFloat(product.price) <= filters.maxPrice 
        &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        ) 
        &&
        product.name.toUpperCase().includes(filters.search_name.toUpperCase()) 
        &&
        product.category.toUpperCase().includes(filters.search_category.toUpperCase()) 
        &&
        product.sub_category.toUpperCase().includes(filters.search_subCat.toUpperCase()) 
        &&
        (filters.search_brand.length === 0 || filters.search_brand.includes(product.brand.toLowerCase())) 
        &&
        (
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.sub_category.toLowerCase().includes(filters.search.toLowerCase())
        )
      )
    })
  }
  
  const filteredProducts = filterProducts(products) 
  const handleResetFilters = () => {

    setFilters((prevFilters) => ({
      ...prevFilters,
      search_category: '',
      search_subCat: '',
      search_brand: '',
      category: 'all',
      minPrice: 0.00,
      maxPrice: 99999999999.00,
    }))
  }
  const handleFilterMenu = () => setFilterMenu(!filterMenu)

  {/*Componente search*/}
  return (
    <section className="flex flex-col w-3/4 items-center py-10">
      <header className="flex w-4/5 justify-end pb-14 max-sm:flex-col">
        <article className="flex items-center w-full max-sm:justify-center">
          <div>
            <NavLink
              className={'group font-semibold hover:text-page-lightblue duration-300'} 
              to={'/search'}>
              INICIO
              <span className='group-hover:text-black'>/</span>
            </NavLink>

            {filters.search ?
              <NavLink
                className={'group font-semibold hover:text-page-lightblue duration-300'} 
                to={`/${filters.search}`}>
                {filters.search.toLocaleUpperCase()}
                <span className='group-hover:text-black'>/</span>
              </NavLink>
            : ''}

            {filters.search_category ?
              <NavLink
                className={'group font-semibold hover:text-page-lightblue duration-300'} 
                to={`/${filters.search_category}`}>
                {filters.search_category.toLocaleUpperCase()}
                <span className='group-hover:text-black'>/</span>
              </NavLink>
            : ''}

            {filters.search_subCat ? 
            <NavLink
              className={'group font-semibold hover:text-page-lightblue duration-300'}
              to={filters.search_category ? `&sub_category=${filters.search_subCat.toLowerCase()}` : `?sub_category=${filters.search_subCat.toLowerCase()}`}>
              {filters.search_subCat.toLocaleUpperCase()}
              <span className='group-hover:text-black'>/</span>
            </NavLink> 
            :''}
            
            {filters.search_brand ? 
            <NavLink
              className={'font-semibold hover:text-page-lightblue duration-300'}
              to={`${window.location.pathname}${window.location.search ? `${window.location.search}&` : '/?'}brand=${filters.search_brand.toLowerCase()}`}>
              {filters.search_brand.toLocaleUpperCase()}
            </NavLink> 
            :''}
          </div>
        </article>

        <article className="flex gap-x-2 items-center max-sm:justify-center">
          <select 
            name="filter"
            className="px-2 py-1 border-2 font-bold border-black rounded-lg"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}>
            <option
              className='max-[1366px]:text-sm' 
              value="default">
              Orden por defecto
            </option>
            <option
              className='max-[1366px]:text-sm'
              value="min">
              Menor precio
            </option>
            <option
              className='max-[1366px]:text-sm' 
              value="max">
              Mayor precio
            </option>
            <option
              className='max-[1366px]:text-sm' 
              value="A-Z">
              A-Z
            </option>
            <option
              className='max-[1366px]:text-sm' 
              value="Z-A">
              Z-A
            </option>
          </select>
          
          {/*Aside filters for mobile*/}
          <div 
            className='max-[1366px]:text-sm max-[1366px]:flex hidden relative z-10'>
            <span 
              className='text-black border-2 border-black px-2 py-1 font-bold rounded-lg cursor-pointer'
              onClick={handleFilterMenu}>
              Filtros
            </span>
            <div className={`flex-col gap-y-5 rounded w-[210px] absolute top-[40px] left-[-80px] bg-white border-2 p-5 ${filterMenu ? 'flex' : 'hidden'}`}>
              <CategoriesFilters 
                onFilterChange={setFilters} 
                products={filteredProducts}/>
              <button onClick={handleResetFilters} className='h-10 flex items-center justify-center bg-white rounded-lg hover:bg-black hover:text-white duration-500 active:text-sm active:duration-0 font-bold border border-black'>
                Limpiar Filtros
              </button>
            </div>
          </div>

        </article>
      </header>

      <main className="flex max-lg:flex-col gap-x-3 w-full h-full">
        {/*Aside filters max screen*/}
        <aside className="max-[1366px]:hidden flex flex-col gap-y-8 min-w-[15%] w-[15%] pt-2">
          <div className='max-[1366px]:hidden flex flex-col gap-y-8'>
            <CategoriesFilters 
              onFilterChange={setFilters} 
              products={filteredProducts}/>
            <button onClick={handleResetFilters} className='h-10 flex items-center justify-center bg-white rounded-lg hover:bg-black hover:text-white duration-500 active:text-sm active:duration-0 font-bold border border-black'>
              Limpiar Filtros
            </button>
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