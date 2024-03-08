import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import jsonProducts from '../Data/products.json'
import { FaBars } from 'react-icons/fa'
import { productsFilter } from '../Mocks/processProducts.js'

export default function CategoriesMenu () {
  const [categoriesHideMenu, setCategoriesHideMenu] = useState(false)
  const products = productsFilter(jsonProducts)
  const uniqueCategories = [...new Set(products.map(product => product.category))]
  const uniqueSubCategories = [...new Set(products.map(product => product.sub_category))]
  const selectedCategories = [
    'Electro y Aires',
    'TV y Audio',
    'Mas categorias',
    'Informatica',
    'Tecnologia'
  ]

  const handleClickCategories = () => setCategoriesHideMenu(!categoriesHideMenu)

  return(
    <>
    {/*Categorias hamburger hide menu*/}
      <div className='group rounded-full'>
        <button
          onClick={handleClickCategories} 
          className={`group`}
        >
          <p className={`${categoriesHideMenu ? 'bg-page-lightblue rounded-full' : ''} group group-hover:bg-white flex items-center gap-x-2 px-2 py-1 pl-3 duration-300 max-md:px-3 rounded-full`}>
            <FaBars className='mb-[1px] group-hover:text-black duration-300'/>
            <span className="max-md:hidden group group-hover:text-black rounded-full p-1 px-2 duration-300">
              Categorías
            </span>
          </p>
        </button>

        {/*Categorias hide menu */}
        {categoriesHideMenu ?
          <div className='absolute flex items-center justify-center min-h-[300px] p-10 mt-[15px] z-50 max-xl:w-4/6 bg-slate-100 min-w-[300px]'>
            <section className='grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 justify-center gap-x-10 gap-y-2 text-black'>
              
              <div className='w-full h-12 col-span-3 max-xl:col-span-2 max-md:col-span-1 border-b-2 border-page-blue-dark'>
                <NavLink 
                  to={'/search'} 
                  onClick={handleClickCategories} 
                  className={'hover:text-page-lightblue max-sm:text-xl text-2xl duration-300 font-bold'}>
                  Todos los productos
                </NavLink>
              </div>

              {/*Mapear Categorias */}
              {uniqueCategories.map(category => (
              <div key={category}>
                <ul 
                  className='flex flex-wrap justify-between py-4'
                >
                  <li className='hover:text-page-lightblue duration-300 border-b border-page-blue-normal'>
                    <NavLink 
                      to={`/search/?category=${category.toLowerCase()}`} 
                      className={'font-semibold'}
                      onClick={handleClickCategories}>
                      {category.toUpperCase()}
                    </NavLink>
                  </li>
                </ul>

                {/*Mapear subcategorias */}
                <ul className='flex flex-col gap-4 flex-wrap justify-between pl-2'>
                {uniqueSubCategories
                  .filter(sub_category => products.some(product => product.category === category && product.sub_category === sub_category))
                  .map(sub_category => (
                    <li 
                      key={sub_category} 
                      className='hover:text-page-lightblue text-xs duration-300'
                    >
                      <NavLink 
                        to={`/search/?category=${category.toLowerCase()}&sub_category=${sub_category.toLowerCase()}`}
                        onClick={handleClickCategories}>
                        {sub_category}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              ))}
            </section>
          </div>
          : ''}
      </div>

      {/*Categorias for full screen and xl screen */}
      <section className='hidden xl:flex justify-center min-w-[530px] w-full pr-[150px]'>
        <ul className='flex gap-x-2'>
          {uniqueCategories.map((category, index) => (
            <li 
              key={category.toLowerCase()}
              className='hover:bg-white hover:text-black rounded-full p-1 px-2 duration-300'>
              <NavLink 
                to={`/search/?category=${category.toLowerCase()}`}>
                {selectedCategories[index]}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}