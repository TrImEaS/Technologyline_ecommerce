import { useState, useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { FaBars } from 'react-icons/fa'
import Spinner from "../../Products/Spinner"

export default function CategoriesMenu () {
  const [categoriesHideMenu, setCategoriesHideMenu] = useState(false)
  const location = useLocation()
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  let uniqueCategories
  let uniqueSubCategories

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('https://technologyline.com.ar/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } 
      catch (err) {
        console.log(err)
      }
    })()
  }, [])

  useEffect(() => {
    setCategoriesHideMenu(false);
  }, [location.search]);

  if(loading){
    return(<Spinner/>)
  }

  if(!loading){
    uniqueCategories = [...new Set(products.map(product => product.category))]
    uniqueSubCategories = [...new Set(products.map(product => product.sub_category))]
  }

  const selectedCategories = [
    'Informatica',
    'TV y Audio',
    'Tecnologia',
    'Electro y Aires',
    'Mas categorias',
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
          <div className='absolute flex items-center justify-center rounded-lg min-h-[300px] p-10 mt-[15px] max-w-[1300px] z-[99999999] max-xl:w-4/6 bg-slate-100 min-w-[300px]'>
            <section className='flex flex-wrap justify-evenly gap-5 text-black'>
              
              <div className='w-full h-12 border-b-[4px] border-page-lightblue'>
                <NavLink 
                  to={'/search'} 
                  onClick={handleClickCategories} 
                  className={'hover:text-page-lightblue max-sm:text-xl text-2xl duration-300 font-bold'}>
                  Todos los productos
                </NavLink>
              </div>

              {/*Mapear Categorias */}
              {uniqueCategories.map((category, index) => (
              <div className="max-md:w-full min-w-[280px]" key={category}>
                <ul 
                  className='flex flex-wrap justify-between py-4'
                >
                  <li className='hover:text-page-lightblue duration-300 border-b-[3px] border-page-blue-normal'>
                    <NavLink 
                      to={`/search/?category=${category.toLowerCase()}`} 
                      className={'font-semibold'}
                      onClick={handleClickCategories}>
                      {selectedCategories[index].toUpperCase()}
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
                      className='hover:text-page-lightblue text-xs duration-300'>
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