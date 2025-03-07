import { FaSearch } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Spinner from '../../Products/Spinner'
import { useProducts } from '../../../Context/ProductsContext';

export default function SearchInput() {
  const [keyword, setKeyword] = useState('')
  const [searchMenu, setSearchMenu] = useState(false)
  
  const inputRef = useRef(null)
  const navigate = useNavigate()
  
  const handleChange = (e) => setKeyword(e.target.value)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/?search=${keyword}`)
    setKeyword('')
  }

  const handleFocusMenu = () => setSearchMenu(true)

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSearchMenu(false)
    }
  }

  useEffect(() => {
    setSearchMenu(false)
  }, [location.search, navigate])

  useEffect(() =>{
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  },[])

  return(
    <form 
      className='flex relative rounded-full bg-gray-100 max-sm:bg-transparent group flex-col w-full text-black gap-2 justify-between duration-500 items-center px-2 z-[9999]'
      onSubmit={handleSubmit}
      ref={inputRef}
    >
      <label htmlFor='inputSearch' className='flex w-full sm:px-2 items-center min-w-8 rounded-full duration-500 justify-end'>
        <span className='max-sm:text-white duration-500 max-sm:h-8 max-sm:rounded-r-none w-10 max-sm:mb-[1px] group-hover:bg-gray-200 group-hover:text-black text-lg group-hover:p-1 rounded-full flex items-center justify-center'>
          <FaSearch/>
        </span>
        
        <input 
          type="text" 
          id='inputSearch'
          className='w-full max-sm:w-0 max-sm:group-hover:w-full max-sm:mr-[-45px] max-sm:group-hover:mr-0 max-sm:bg-transparent max-sm:group-hover:bg-gray-100 duration-500 max-sm:rounded-l-none placeholder:text-gray-500 rounded-full bg-gray-100 outline-none px-3 py-1'
          placeholder='Buscar'
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocusMenu}
        />
      </label>
      {searchMenu !== false && keyword !== '' && <SearchResults keyword={keyword} />}
    </form>
  )
}

function SearchResults({ keyword }) {
  const { products, loading } = useProducts()

  if(loading){
    return(
      <section className='flex flex-col absolute top-10 gap-2 w-full max-h-[500px] bg-white border-2 rounded-lg z-[9999] overflow-y-auto p-3 h-[500px]'>
        <Spinner />
      </section>
    )
  }

  const formattedPrice = (price) => parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()) ||
    product.sku.toLowerCase().includes(keyword.toLowerCase()) ||
    product.sub_category.toLowerCase().includes(keyword.toLowerCase())
  )
  return (
    <section className={`flex flex-col absolute top-9 gap-2 w-full max-h-[500px] min-h-[100px] bg-white border-2 rounded-lg z-[9999] overflow-y-auto p-3 ${filteredProducts.length === 0 ? 'h-14' : 'h-[500px]'}`}>
    {filteredProducts.length === 0 
    ? (
      <div>
        <p className='font-bold text-lg'>
          No se encontraron resultados...
        </p>
      </div>
    ) 
    : (
      filteredProducts.map((product) => (
        <NavLink 
          to={`/products/?product=${product.sku}`}
          key={product.id} 
          className="flex box-border items-center justify-between bg-white p-1 duration-500 border-2 rounded-sm hover:cursor-pointer z-[99999] w-full min-h-[180px] max-h-[150px] shadow-border">
          <header className="relative w-[50%] h-full box-border">
            <img 
              src={product.img_base} 
              loading="eager"
              alt={product.name}
              onError={(e) => e.target.src = 'https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg'}
              className="w-full h-full object-contain" />
          </header>

          <article className="w-[50%] h-full box-border flex flex-col justify-between">
            <p className='flex flex-col text-sm'>
              <span className='text-xs text-gray-500'>SKU: {product.sku}</span>
              <span className='line-clamp-3'>{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
            </p>
            <p className="font-bold text-xl max-[1025px]:text-sm">${formattedPrice(product.price_list_1)}</p>
          </article>
        </NavLink>
      ))
    )}
    </section>
  )
}