import { useState, useEffect } from 'react'
import { useProducts } from '../Context/ProductsContext.jsx'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'
import ImageSlider from '../Components/Products/ImageSlider.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import DOMPurify from 'dompurify'
import axios from 'axios'
import { useCart } from '../Context/CartContext.jsx'

const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

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
      if (!response.status === 200)
        throw new Error('Error al obtener productos');
      
      const newProduct = response.data[0]
      console.log(newProduct)
      setProduct(newProduct)
      document.title = `${newProduct.name} | Technology Line`

      axios.post(`${API_URL}/api/products/addView/${newProduct.id}`)
      .then(res => {
        if(!res.ok){
          return console.log(`Error (${res.status}). Error al sumar una view: `)
        }
        console.log('view updated')
      })
      .catch(e => console.error('Error al sumar view al producto: ', e))
    })
    .catch (err => {
      console.log(err)
      navigate('/error')
    }) 
    .finally(() => setLoading(false))
  }, [location.search, navigate])
  
  if(loading)
    return(<Spinner/>)

  const formattedPrice = (price) => {
    return parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  let cat = product.sub_category || ''
  let name = product.name || ''
  const recomendProducts = products
    .filter(product => 
      product.sub_category.toLowerCase().includes(cat.toLowerCase()) && 
      !product.name.toLowerCase().includes(name.toLowerCase())
    )
    .sort((a, b) => parseFloat(b.price_list_1) - parseFloat(a.price_list_1)).slice(0,9)

  const handleStockQuantity = () => {
    const quantity = product.stock
    if(quantity === 1){
      return (
        <span className='text-red-600'>
          Ultima unidad
        </span>
        )
    }

    if(quantity < 5){
      return (
        <span className='text-orange-400 font-semibold'>
          Bajo
        </span>
        )
    }

    if(quantity < 10){
      return (
        <span className='text-yellow-400 font-semibold'>
          Medio
        </span>
        )
    }

    return (
      <span className='text-green-600 font-semibold'>
        Alto
      </span>
    )
  }

  const manipulateHTML = (html) => {
    // Crear un contenedor temporal para el HTML
    const container = document.createElement('div');
    container.innerHTML = html;
  
    // Seleccionar todos los elementos <a>
    const links = container.querySelectorAll('a');
  
    links.forEach(link => {
      // Opción 1: Reemplazar <a> con <span>
      const span = document.createElement('span');
      span.innerHTML = link.innerHTML;
      link.parentNode.replaceChild(span, link);
    });
  
    return container.innerHTML;
  }

  return (
    <section className={`flex relative flex-col items-center h-full w-[90%] min-h-[600px] gap-y-10 pb-14 max-md:pt-10`}>
      <header className='w-[100%] relative h-full flex max-md:flex-col max-md:items-center sm:p-5 rounded-3xl py-5 gap-5'>
        <section className='relative w-[60%] max-md:w-full h-full sm:mt-5 -mt-5 sm:min-h-[620px] min-h-[550px] sm:pb-10 p-5 rounded-lg shadow-lg'>
          <span className='text-sm tracking-wide w-full'>
            SKU: {product.sku}
          </span>

          <h1 className='text-2xl font-semibold'>
            {product.name.replace(/EAN.*/,'')}
          </h1>

          {loading 
            ? <div><Spinner /></div> 
            : <ImageSlider loadedImages={product.img_urls}/>
          }
        </section>

        <section className='flex tracking-wider flex-col w-[40%] mt-5 min-h-[620px] max-sm:min-h-[500px] justify-center items-center h-fit max-md:w-full border rounded-lg p-8 max-sm:py-0 sm:mb-10 shadow-lg'>
          <div className='min-h-[200px] flex flex-col gap-y-2'>
            <div className='flex flex-col w-full gap-y-3 justify-center'>
              <section className='flex flex-col text-lg w-full gap-2 border-b pb-3 border-dashed border-page-blue-normal'>
                <p className='flex flex-col text-center text-[#333333] tracking-widest mb-2 text-2xl'>
                  <span>
                    PRECIO LISTA
                  </span>
                  <span>
                    <b className='font-semibold text-[#333333]'>{`$${formattedPrice(product.price_list_1)}`}</b>
                  </span>
                </p>

                <div className='flex font-semibold text-red-600 flex-col text-center items-center text-base tracking-tighter'>
                  <span>PROMO: EFECTIVO / TRANSFERENCIA BANCARIA: </span>
                  <p className='pl-5 font-semibold flex gap-1 text-[#15803d] items-center tracking-normal'>
                    <span>{`$${formattedPrice(product.price_list_2)}`}</span>
                    <span className='text-xs text-[#dc7b26]'>(Ahorras: ${((product.price_list_2 - product.price_list_3)*-1).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})})</span>
                  </p>
                </div>
              </section>
              
              <section className='flex flex-col items-center mb-5 w-full gap-y-3 justify-center'>
                <span className='font-bold text-[#2563eb]'>¡Opcion de compra en cuotas fijas!</span>

                <article className='flex flex-col'>
                  <p className='flex w-fit justify-center gap-1 p-1'>
                    <span className='text-[#1e40af] font-semibold'>3</span> 
                    <span className='text-[#1e40af]'>cuotas</span>
                    <span>de:</span> 
                    <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_3)/3).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</span>
                  </p>
                </article>  

                <article className='flex flex-col'>
                  <p className='flex w-fit justify-center gap-1 p-1'>
                    <span className='text-[#1e40af] font-semibold'>6</span> 
                    <span className='text-[#1e40af]'>cuotas</span>
                    <span>de:</span> 
                    <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_4)/6).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</span>
                  </p>
                </article>  

                <article className='flex flex-col'>
                  <p className='flex w-fit justify-center gap-1 p-1'>
                    <span className='text-[#1e40af] font-semibold'>9</span> 
                    <span className='text-[#1e40af]'>cuotas</span>
                    <span>de:</span> 
                    <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_5)/9).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</span>
                  </p>
                </article>  

                <article className='flex flex-col'>
                  <p className='flex w-fit justify-center gap-1 p-1'>
                    <span className='text-[#1e40af] font-semibold'>12</span> 
                    <span className='text-[#1e40af]'>cuotas</span>
                    <span>de:</span> 
                    <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_6)/12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</span>
                  </p>

                </article>  

                <ul className="flex text-3xl max-[1500px]:ml-0 gap-x-4">
                  <img className='bg-gray-700 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon2.svg'/>
                  <img className='bg-red-600 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon3.svg'/>
                  <img className='bg-blue-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon4.svg'/>
                  <img className='bg-yellow-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon5.svg'/>
                  <img className='bg-orange-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon1.svg'/>
                </ul>
              </section>
            </div>
          </div>

          <div className='w-full flex max-md:justify-center flex-col gap-5 items-center'>
            <span className='text-sm uppercase tracking-widest font-semibold text-gray-700'>
              DISPONIBILIDAD: {handleStockQuantity()}
            </span>
            <button
              onClick={()=> addProductToCart({ product })}
              className='max-sm:hidden bg-page-blue-normal active:text-sm active:duration-0 hover:bg-page-lightblue rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-l from-sky-400 to-sky-800 duration-300 border border-gray-300 text-white py-1 px-2 w-[90%] h-[50px] cart hover:brightness-125'
            >
              AGREGAR AL CARRITO
            </button>
          </div>
        </section>
      </header>

      <div className='flex flex-col max-sm:w-[90%] w-[83%] bg-blue-400 rounded-lg border shadow-lg'>
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

      <section className='flex flex-col gap-y-10 w-[82%] max-sm:w-[70%]'>
        {/* Seccion de descripcion */}
        { recomendProducts.length > 0 &&
          <div className='w-full flex flex-col gap-y-10'>
            <span className='text-3xl font-bold max-sm:text-2xl'>
              Tambien te recomendamos
            </span>
            <ProductsCarousel rows={1} filterProducts={recomendProducts}/>
          </div>
        }
      </section>

      <button
        onClick={()=> addProductToCart({ product })}
        className='sm:hidden fixed bottom-5 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-l from-sky-400 to-sky-800 duration-300 border border-gray-300 text-white py-1 px-2 w-[90%] h-[50px] cart hover:brightness-125'
      >
        AGREGAR AL CARRITO
      </button>
    </section>
  )
}
