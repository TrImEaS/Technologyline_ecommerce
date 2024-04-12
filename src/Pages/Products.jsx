import React, { useState, useEffect } from 'react'
import { productsFilter } from '../Mocks/processProducts.js'
import { useNavigate } from 'react-router-dom'
import productsJson from '../Data/products.json'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'
import ImageSlider from '../Components/Products/ImageSlider.jsx'
import Spinner from '../Components/Products/Spinner.jsx'

export default function Products () {
  const [product, setProduct] = useState('')
  const [loadedImages, setLoadedImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(false)
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
      setLoadingImages(true)
      setProduct(newProduct)
    }

  }, [location.search, navigate])

  useEffect(() => {
    const loadImages = async (product) => {
      const images = []
      const baseUrl = '../../products-images'
  
      // Cargar la imagen principal
      const mainImage = `${baseUrl}/${product.sku}.jpg`
      if (await imageExists(mainImage)) {
        images.push(mainImage)
      }
  
      // Cargar las imágenes adicionales
      for (let i = 1; i <= 10; i++) {
        const additionalImage = `${baseUrl}/${product.sku}_${i}.jpg`
        if (await imageExists(additionalImage)) {
          images.push(additionalImage)
        } else {
          // Si la imagen no existe, se detiene el bucle
          break
        }
      }
  
      setLoadedImages(images)
      setLoadingImages(false)
    }
  
    if (product) {
      loadImages(product)
    }
  }, [product])

  const imageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve(true) // La imagen se ha cargado correctamente
      }
      img.onerror = () => {
        resolve(false) // La imagen no se pudo cargar
      }
      img.src = url
    })
  }

  const getStockQuantity = () => {
    const quantity = product.stock
    if(quantity === 3){
      return (
        <span className='text-red-600'>
          Ultima unidad
        </span>
        )
    }

    if(quantity < 10){
      return (
        <span className='text-orange-400 font-semibold'>
          Ultimas unidades
        </span>
        )
    }

    return (
      <span className='text-green-600 font-semibold'>
        Existente
      </span>
    )
  }

  return (
    <section className={`flex flex-col items-center h-full w-[90%] gap-y-14 py-14 max-md:pt-10`}>

      <header className='w-full h-full flex max-md:flex-col justify-center sm:p-5 bg-[#f2f2f2] rounded-3xl py-5'>
        <section className='w-[55%] max-sm:w-full h-full'>
        {loadingImages ? <Spinner /> : <ImageSlider loadedImages={loadedImages}/>}
        </section>

        <section className='flex flex-col w-[45%] justify-start max-sm:px-10 items-start py-5 h-full max-md:w-full'>
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
                  Stock:
                </span>
                <span className='font-bold'>
                  {getStockQuantity()}
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
