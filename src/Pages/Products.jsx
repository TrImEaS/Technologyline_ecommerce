import React, { useState, useEffect } from 'react'
import { productsFilter } from '../Mocks/processProducts.js'
import { useNavigate } from 'react-router-dom'
import productsJson from '../Data/products.json'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'

const maxImages = 4

export default function Products () {
  const [product, setProduct] = useState('')
  const [selectedImg, setSelectedImg] = useState('')
  const [loadedImages, setLoadedImages] = useState([])
  const [zoom, setZoom] = useState(false)
  const formattedPrice = parseInt(product.price).toLocaleString(undefined)

  let cat = product.sub_category || ''
  let name = product.name || ''
  const navigate = useNavigate()
  const products = productsFilter(productsJson)
  const recomendProducts = products
  .filter(
    product => product.sub_category.toLowerCase().includes(cat.toLowerCase()) && 
    !product.name.toLowerCase().includes(name.toLowerCase()))
  .sort((a, b) => parseFloat(b.price) - parseFloat(a.price)).slice(0,10)

  useEffect(() => {
    const productQuery = new URLSearchParams(location.search).get('product')
    const newProduct = products.find(product => product.sku === productQuery)

    if (!newProduct) {
      navigate('/error')
    } else {
      setProduct(newProduct)
    }

  }, [location.search, navigate])

  const handleZoomImage = () => {
    if(zoom) { 
      setZoom(false)
      document.body.style.overflowY = 'visible'
    }
    else {
      setZoom(true)
      document.documentElement.scrollTop = 0
      document.body.style.overflowY = 'hidden'
    }
  }

  return (
    <section className={`flex flex-col items-center h-full w-[75%] gap-y-14 py-14 max-md:pt-10`}>

      <header className='w-full flex max-md:flex-col justify-center items-center gap-x-10 sm:p-10 bg-[#efeeee] rounded-3xl'>
        {/*Item Image section*/} 
        <section
          onClick={handleZoomImage}
          className={`flex w-[40%] max-md:w-full justify-center items-center h-full border-3 border-[#444] rounded-xl pb-5 max-w-[330px] ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <article
            className={`w-full h-[300px] flex p-5 items-center justify-center rounded-lg
            ${
              zoom ? 'absolute z-[9999999] bg-[#111] h-screen w-screen top-0 right-[0] max-sm:min-w-[390px] max-sm:min-h-[650px]  rounded-none' : ''
            }`}
          >
            <span className='text-4xl absolute top-5 right-5 text-white'>x</span>
            <img
              src={product.img}
              className={`rounded-lg ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'} w-full h-full object-contain`}
            />
          </article>
        </section>
          
        <section className='flex flex-col w-[40%] justify-center items-start py-5 h-full max-md:w-full'>
          <div className='min-h-[250px] flex flex-col gap-y-2'>
            <h1 className='font-semibold text-2xl'>
              {product.name}
            </h1>

            <span className='text-lg'>
              {product.sku}
            </span>

            <div className='flex flex-col w-full gap-y-3 justify-center'>
              <h2 className='text-2xl font-semibold'>
                {`$${formattedPrice}`}
              </h2>
              <div className='flex gap-x-5 text-xl w-full items-center'>
                <span>
                  Cantidad:
                </span>
                <span className='font-bold'>
                  {product.stock}
                </span>
              </div>
              <span>EAN: {product.ean}</span>
            </div>
          </div>

          <div className='w-[65%]'>
            <button className='rounded-lg border border-black font-bold hover:bg-black hover:text-white duration-300 px-3 py-2'>
              Consultar Articulo
            </button>
          </div>
        </section>
      </header>

      <div className='flex flex-col w-full bg-page-gray-light rounded-lg font-bold'>
        <div className='flex p-2 gap-x-3'>
          <span>Descripción</span>
          <span>|</span>
          <span>Especificaciones</span>
        </div>
        <div className='p-2 bg-gray-100'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ipsa, eligendi, 
            velit maxime expedita reprehenderit magnam qui mollitia ex voluptate doloremque alias. 
            Architecto incidunt perferendis consequuntur harum consectetur enim cumque!
          </p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ipsa, eligendi, 
          velit maxime expedita reprehenderit magnam qui mollitia ex voluptate doloremque alias. 
          Architecto incidunt perferendis consequuntur harum consectetur enim cumque!
          </p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ipsa, eligendi, 
          velit maxime expedita reprehenderit magnam qui mollitia ex voluptate doloremque alias. 
          Architecto incidunt perferendis consequuntur harum consectetur enim cumque!
          </p>
        </div>
      </div>

      <section className='flex flex-col w-full gap-y-10'>
        {/* Seccion de descripcion */}
        <div className='w-full flex flex-col gap-y-10'>
          <span className='text-3xl font-bold max-sm:text-2xl'>
            Tambien te recomendamos
          </span>
          <ProductsCarousel filterProducts={recomendProducts}/>
        </div>

      </section>
    </section>
  )
}
