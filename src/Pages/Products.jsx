import React from 'react'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'
import ImageSlider from '../Components/Products/ImageSlider.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Products () {
  const [loadedImages, setLoadedImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(false)
  const [product, setProduct] = useState(null)
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [descriptionMenu, setDescriptionMenu] = useState('desc')
  const productQuery = new URLSearchParams(location.search).get('product')
  const navigate = useNavigate()

  useEffect(() => {
    
    (async function () {
      try {
        const response = await fetch('https://technologyline.com.ar/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        const newProduct = data.find(product => product.sku === productQuery)
        if (!newProduct) {
          navigate('/error')
        } 
        else {
          setLoadingImages(true)
          setProduct(newProduct)
          setProducts(data)
          setLoading(false);
        }
      } 
      catch (err) {
        console.log(err)
      }
    })()
  }, [location.search, navigate])
  
  useEffect(() => {
    const loadImages = async (product) => {
      const images = []
      const baseUrl = 'https://technologyline.com.ar/products-images'
  
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

  if(loading){
    return(<Spinner/>)
  }

  const formattedPrice = parseFloat(product.price).toLocaleString(undefined)
  let cat = product.sub_category || ''
  let name = product.name || ''
  const recomendProducts = products
  .filter(
    product => product.sub_category.toLowerCase().includes(cat.toLowerCase()) && 
    !product.name.toLowerCase().includes(name.toLowerCase()))
  .sort((a, b) => parseFloat(b.price) - parseFloat(a.price)).slice(0,9)

  const handleStockQuantity = () => {
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

  const handleAddViewToProduct = async () => {
    await fetch(`https://technologyline.com.ar/api/products/addView/${product.id}`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if(!response.ok){
        return console.log('Error al sumar una view')
      }
      console.log('view updated')
    })
    .catch(e => console.error('Error al sumar view al producto: ', e))

  }

  return (
    <section className={`flex flex-col items-center h-full w-full gap-y-14 py-14 max-md:pt-10`}>

      <header className='w-[90%] h-full flex max-md:flex-col justify-center sm:p-5 rounded-3xl py-5'>
        <section className='w-[55%] max-sm:w-full h-full'>
        {loadingImages ? <Spinner /> : <ImageSlider loadedImages={loadedImages}/>}
        </section>

        <section className='flex flex-col w-[45%] justify-start max-sm:px-10 items-start py-8 h-full max-md:w-full'>
          <div className='min-h-[200px] flex flex-col gap-y-2'>
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
                  {handleStockQuantity()}
                </span>
              </div>
              <span>{product.ean && 'EAN: ' + product.ean}</span>
            </div>
          </div>

          <div className='w-[65%]'>
            <button 
            onClick={handleAddViewToProduct}
            className='rounded-xl border-2 border-black font-bold hover:bg-black hover:text-white active:text-sm active:duration-0 duration-300 w-[190px] h-[50px]'>
              Consultar Articulo
            </button>
          </div>
        </section>
      </header>

      <div className='flex flex-col w-[82%] bg-blue-400 rounded-lg font-bold border shadow-lg'>
        <div className='flex p-2 gap-x-3'>
          <span 
            onClick={() => setDescriptionMenu('desc')}          
            className={`${descriptionMenu === 'desc' ? 'text-white' : ''} hover:font-bold hover:text-white rounded-xl px-2 py-1 duration-300 cursor-pointer`}>
            Descripción
          </span>
          <span className='py-1'>|</span>
          <span 
            onClick={() => setDescriptionMenu('spec')}
            className={`${descriptionMenu === 'spec' ? 'text-white' : ''} hover:font-bold hover:text-white rounded-xl px-2 py-1 duration-300 cursor-pointer`}>
            Especificaciones
          </span>
        </div>
        <div className='p-2 bg-gray-100 min-h-[100px]'>
          {descriptionMenu === 'desc' 
          ?
            <p>
              {product.description ? '' : 'Este articulo no posee descripciones.'}
            </p>
          :
            <p>
              {product.specifications ? '' : 'Este articulo no posee especificaciones.'}
            </p>
          }
        </div>
      </div>

      <section className='flex flex-col gap-y-10 w-[82%] max-sm:w-[70%]'>
        {/* Seccion de descripcion */}
        <div className='w-full flex flex-col gap-y-10'>
          <span className='text-3xl font-bold max-sm:text-2xl'>
            Tambien te recomendamos
          </span>
          <ProductsCarousel filterProducts={recomendProducts}/>
        </div>

        <div className='w-full flex flex-col gap-y-10'>
          <span className='text-3xl font-bold max-sm:text-2xl'>
            Ofertas recomendadas
          </span>
          <ProductsCarousel filterProducts={recomendProducts}/>
        </div>


      </section>
    </section>
  )
}
