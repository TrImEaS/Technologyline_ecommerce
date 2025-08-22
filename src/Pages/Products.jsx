/* global location */
import { useState, useEffect } from 'react'
import { useProducts } from '../Context/ProductsContext.jsx'
import { NavLink, useNavigate } from 'react-router-dom'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'
import ProductHeader from '../Components/Products/ProductHeader.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import DOMPurify from 'dompurify'
import axios from 'axios'
import { useCart } from '../Context/CartContext.jsx'

const API_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV

export default function Products () {
  const { products } = useProducts()
  const { addProductToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [descriptionMenu, setDescriptionMenu] = useState('desc')
  const productQuery = new URLSearchParams(location.search).get('product')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${API_URL}/api/products?sku=${productQuery}`)
      .then(response => {
        if (!response.status === 200) { throw new Error('Error al obtener productos') }

        const newProduct = response.data[0]
        setProduct(newProduct)
        document.title = `${newProduct.name} | Technology Line`
      })
      .catch(err => {
        console.log(err)
        navigate('/error')
      })
      .finally(() => setLoading(false))
  }, [location.search, navigate])

  if (loading) { return (<Spinner/>) }

  const cat = product.sub_category || ''
  const name = product.name || ''
  const recomendProducts = products
    .filter(product =>
      product.sub_category.toLowerCase().includes(cat.toLowerCase()) &&
      !product.name.toLowerCase().includes(name.toLowerCase())
    )
    .sort((a, b) => parseFloat(b.price_list_1) - parseFloat(a.price_list_1)).slice(0, 9)

  const manipulateHTML = (html) => {
    // Crear un contenedor temporal para el HTML
    const container = document.createElement('div')
    container.innerHTML = html

    // Seleccionar todos los elementos <a>
    const links = container.querySelectorAll('a')

    links.forEach(link => {
      // Opción 1: Reemplazar <a> con <span>
      const span = document.createElement('span')
      span.innerHTML = link.innerHTML
      link.parentNode.replaceChild(span, link)
    })

    return container.innerHTML
  }

  return (
    <section className={'flex relative flex-col items-center h-full w-[90%] min-h-[600px] pb-14 pt-5 max-md:pt-10'}>
      <div className='tracking-tight text-sm w-full sm:pl-10 max-sm:text-xs'>
        <NavLink
          className="text-gray-600 hover:text-page-lightblue transition-colors duration-200"
          to={`/search/?category=${product.category.toLowerCase()}`}>
          <span className="font-semibold truncate">{product.category.toLocaleUpperCase()}</span>
        </NavLink>
        <span className='text-gray-400 mx-2'> / </span>
        <NavLink
          className="text-gray-600 hover:text-page-lightblue transition-colors duration-200"
          to={`/search/?category=${product.category.toLowerCase()}&sub_category=${product.sub_category.toLowerCase()}`}>
          <span className="font-semibold truncate">{product.sub_category.toLocaleUpperCase()}</span>
        </NavLink>
        <span className='text-gray-400 mx-2'> / </span>
        <NavLink
          className="text-gray-600 hover:text-page-lightblue transition-colors duration-200"
          to={`/search/?category=${product.category.toLowerCase()}&sub_category=${product.sub_category.toLowerCase()}&brand=${product.brand.toLowerCase()}`}>
          <span className="font-semibold truncate">{product.brand.toLocaleUpperCase()}</span>
        </NavLink>
      </div>

      <ProductHeader product={product} loading={loading}/>

      <div className='flex flex-col max-sm:w-full w-[95%] bg-blue-400 rounded-lg border shadow-lg'>
        <div className='flex p-2 gap-x-3'>
          <span
            onClick={() => setDescriptionMenu('desc')}
            className={`${descriptionMenu === 'desc' ? 'text-white' : ''} font-bold hover:text-white rounded-xl px-2 py-1 duration-300 cursor-pointer`}>
            Descripción
          </span>
          <span className='py-1'>|</span>
          <span
            onClick={() => setDescriptionMenu('spec')}
            className={`${descriptionMenu === 'spec' ? 'text-white' : ''} font-bold hover:text-white rounded-xl px-2 py-1 duration-300 cursor-pointer`}>
            Especificaciones
          </span>
        </div>
        <div className='p-2 bg-gray-100 min-h-[100px]'>
          {
            descriptionMenu === 'desc'
              ? (
              <section className='flex flex-col px-4 py-2'>
                <article dangerouslySetInnerHTML={{ __html: product.descriptions ? DOMPurify.sanitize(manipulateHTML(product.descriptions)) : 'Este articulo no posee descripciones.' }} />
              </section>
                )
              : (
              <section className='flex flex-col px-4 py-2'>
                <article dangerouslySetInnerHTML={{ __html: product.specifications ? DOMPurify.sanitize(manipulateHTML(product.specifications)) : 'Este articulo no posee descripciones.' }} />
              </section>
                )
          }
        </div>
      </div>

      <section className='flex flex-col gap-y-10 pt-10 w-full max-sm:w-[95%]'>
        { recomendProducts.length > 0 &&
          <div className='w-full flex flex-col gap-y-10'>
            <span className='text-3xl font-bold max-sm:text-2xl tracking-tight sm:pl-8 whitespace-nowrap'>
              Tambien te recomendamos
            </span>

            <div className='w-full'>
              <ProductsCarousel rows={1} filterProducts={recomendProducts}/>
            </div>
          </div>
        }
      </section>

      <button
        onClick={() => addProductToCart({ product })}
        className='sm:hidden fixed bottom-5 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-l from-sky-400 to-sky-800 duration-300 border border-gray-300 text-white py-1 px-2 w-[90%] h-[50px] cart hover:brightness-125'
      >
        AGREGAR AL CARRITO
      </button>
    </section>
  )
}
