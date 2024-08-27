import React from 'react'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'
import ImageSlider from '../Components/Products/ImageSlider.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import DOMPurify from 'dompurify'
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
          document.title = `${newProduct.name} | Technology Line`
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
      let notFoundCount = 0
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
          notFoundCount++
          if(notFoundCount === 2) {
            break
          }
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

  const formattedPrice = parseFloat(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const formattedDiscount = parseFloat(product.discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const message = encodeURIComponent(`Hola me comunico desde la pagina Technology-Line, me interesaria saber mas informacion acerca de este articulo: ${product.sku} - ${product.name} - ${product.price}`)

  const totalDiscount = (price, discount) => {
    // Convertir los precios a números
    const normalPrice = parseFloat(price);
    const discountedPrice = parseFloat(discount);
  
    // Calcular el porcentaje de descuento
    const percentage = ((normalPrice - discountedPrice) / normalPrice) * 100;
  
    // Devolver el porcentaje como un número entero
    return Math.round(percentage);
  }

  const percentageOff = totalDiscount(product.price, product.discount)

  let cat = product.sub_category || ''
  let name = product.name || ''
  const recomendProducts = products
  .filter(product => 
    product.sub_category.toLowerCase().includes(cat.toLowerCase()) && 
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
    <section className={`flex flex-col items-center h-full w-full min-h-[600px] gap-y-10 pb-14 max-md:pt-10`}>
      <header className='w-[90%] relative h-full flex max-md:flex-col max-md:items-center sm:p-5 rounded-3xl py-5'>
        <section className='relative w-[55%] max-sm:w-full h-full min-h-[450px]'>
        {product.discount > 0
        ?
          <img className="absolute h-14 w-14 right-7 top-10" src={'https://technologyline.com.ar/banners-images/Assets/sale-icon.svg'} alt="" />
        :
          ''
        }
          {loadingImages ? <Spinner /> : <ImageSlider loadedImages={loadedImages}/>}
        </section>

        <section className='flex flex-col w-[45%] sm:mt-12 justify-start max-sm:px-10 items-start h-fit max-md:w-full border-2 rounded-lg p-8 sm:mb-10 shadow-lg'>
          <div className='min-h-[200px] flex flex-col gap-y-2'>
            <span className='text-sm text-gray-500'>
              SKU: {product.sku}
            </span>

            <h1 className='text-2xl'>
              {product.name}
            </h1>

            <div className='flex flex-col w-full gap-y-3 justify-center'>
              {product.discount > 0
              ?
                <div>
                  <div className='flex items-center gap-x-1'>
                    <p className="text-sm line-through">${formattedPrice}</p>
                    <span className='text-sm mb-1 bg-orange-400 text-white px-2 rounded-full'>{percentageOff}% OFF</span>
                  </div>
                  <p className="font-bold text-2xl">${formattedDiscount}</p>
                </div>
              :
                <h2 className='text-2xl font-semibold'>
                  {`$${formattedPrice}`}
                </h2>
              }
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

          <div className='w-full flex max-md:justify-center items-center'>
            <a
              href={`https://wa.me/541133690584?text=${message}`} 
              target='_blank'
              onClick={handleAddViewToProduct}
              className='rounded-xl flex items-center justify-center text-lg border-2 border-black font-bold hover:bg-black hover:text-white active:text-sm active:duration-0 py-1 px-2 duration-300 w-[200px] h-[50px]'>
              Consultar Articulo
            </a>
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
            ? <section className='flex flex-col px-4 py-2'>
                <article dangerouslySetInnerHTML={{ __html: product.description ? DOMPurify.sanitize(manipulateHTML(product.description)) : 'Este articulo no posee descripciones.' }} />
              </section>
            : <section className='flex flex-col px-4 py-2'>
                <article dangerouslySetInnerHTML={{ __html: product.specifications ? DOMPurify.sanitize(manipulateHTML(product.specifications)) : 'Este articulo no posee descripciones.' }} />
              </section>
          }
        </div>
      </div>

      <section className='flex flex-col gap-y-10 w-[82%] max-sm:w-[70%]'>
        {/* Seccion de descripcion */}
        { recomendProducts.length > 0 ?
          <div className='w-full flex flex-col gap-y-10'>
            <span className='text-3xl font-bold max-sm:text-2xl'>
              Tambien te recomendamos
            </span>
            <ProductsCarousel rows={1} filterProducts={recomendProducts}/>
          </div>
          : ''
        }
      </section>
    </section>
  )
}
