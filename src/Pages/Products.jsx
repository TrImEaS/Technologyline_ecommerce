import { useState, useEffect } from 'react'
import { productsFilter } from '../Mocks/processProducts.js'
import { useNavigate } from 'react-router-dom'
import productsJson from '../Data/products.json'
import ProductsCarousel from '../Components/ProductsCarousel.jsx'

const maxImages = 4

export default function Products () {
  const [product, setProduct] = useState('')
  const [selectedImg, setSelectedImg] = useState('')
  const [zoom, setZoom] = useState(false)
  const [loadedImages, setLoadedImages] = useState([])
  const formattedPrice = parseFloat(product.price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

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
    const productQuery = new URLSearchParams(location.search).get('product');
    const newProduct = products.find(product => product.sku === productQuery);

    if (!newProduct) {
      navigate('/error')
    } else {
      setProduct(newProduct)
    }

    // loadImages();
  }, [location.search, navigate])

  const handleZoomImage = () => setZoom(!zoom)


  return (
    <section className='flex flex-col h-full w-3/4 pb-[30px] gap-y-5'>
      <header className='w-full flex max-sm:flex-col justify-center items-center gap-x-10 min-h-[450px]'>
        {/*Item Image section*/} 
        <section className={'flex w-1/2 max-sm:w-full justify-center items-center h-full border border-[#444] rounded-xl pb-5 max-w-[330px]'}>

          <article
            onClick={handleZoomImage} 
            className={`w-[70%] h-[300px] flex p-5 items-center justify-center rounded-lg`}>
            <img 
              src={`https://www.technologyline.com.ar/products-images/${product.sku}.jpg`}
              className='rounded-lg cursor-zoom-in w-full h-full object-cover'
            />
          </article>
        </section>
          
        <section className='flex flex-col gap-y-8 w-1/2 max-sm:w-full justify-center items-center py-5 h-full'>
          <div className='min-h-[250px] flex flex-col gap-y-3'>
            <h1 className='font-semibold text-2xl'>
              {product.name}
            </h1>

            <span className='text-lg'>
              {product.sku}
            </span>

            <div className='flex flex-col w-full gap-y-6 justify-center'>
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
              <span></span>
            </div>
          </div>

          <div className='flex items-center gap-x-10 pl-[5px]'>
            <button className='rounded-lg border border-black font-bold hover:bg-black hover:text-white duration-300 px-3 py-2'>
              Consultar Articulo
            </button>
          </div>
        </section>
      </header>

      <section className='flex flex-col gap-y-10'>
        {/* <div className='flex flex-col w-full bg-page-gray-light rounded-lg font-bold'>
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
        </div> */}


        <section className='w-full flex flex-col h-[500px] gap-y-10'>
          <span className='text-3xl font-bold max-sm:text-xl'>
            Tambien te recomendamos
          </span>
          <ProductsCarousel filterProducts={recomendProducts}/>
        </section>
      </section>
    </section>
  )
}