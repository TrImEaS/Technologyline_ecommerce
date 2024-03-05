import ProductsSearch from '../Components/ProductsSearch'
import CategoriesFilters from '../Components/CategoriesFilters.jsx'
import products from '../Data/products.json'
import { processProducts } from '../Mocks/processProducts.js'
import { useState } from 'react'

export default function Search ({ history }) {
  const [filterMenu, setFilterMenu] = useState(false)
  const filterProducts = processProducts(products)
  
  const handleFilterMenu = () => setFilterMenu(!filterMenu)
  return (
    <section className="flex flex-col w-3/4 py-10">
      <header className="flex w-full justify-between pb-14 max-sm:flex-col">
        <article className="flex items-center max-sm:justify-center">
          <p>INICIO/TECNOLOGÍA/TELEVISORES</p>
        </article>

        <article className="flex gap-x-2 items-center max-sm:justify-center">
          <select 
            name="filter"
            className="px-2 py-1 border-2 border-black rounded-lg">
            <option
              className='max-sm:text-sm' 
              value="default">
              Orden por defecto
            </option>
            <option
              className='max-sm:text-sm' 
              value="min">
              Menor precio
            </option>
            <option
              className='max-sm:text-sm' 
              value="max">
              Mayor precio
            </option>
          </select>
          
          {/*Aside filters for mobile*/}
          <div 
            className='sm:hidden relative flex'>
            <span 
              className='text-black border-2 border-black px-2 py-1 rounded-lg cursor-pointer'
              onClick={handleFilterMenu}>
              Filtros
            </span>
            <div className={`
            sm:hidden flex-col gap-y-5 rounded w-[210px] absolute top-[40px] left-[-80px] bg-page-gray-light p-5
            ${filterMenu ? 'hidden' : 'flex'}
            `}>
              <CategoriesFilters products={filterProducts}/>
            </div>
          </div>

        </article>
      </header>

      <main className="flex max-sm:flex-col gap-x-5 w-full h-full">
        {/*Aside filters max screen*/}
        <aside className="flex flex-col gap-y-8 w-[20%]">
          <div className='max-sm:hidden flex flex-col gap-y-8'>
            <CategoriesFilters products={filterProducts}/>
          </div>
        </aside>
        
        <section>
          <ProductsSearch/>
        </section>
      </main>

    </section>
  )    
}