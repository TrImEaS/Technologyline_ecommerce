import ProductsCarousel from '../Components/ProductsCarousel'
import BannersCards from '../Components/Home-Components/BannersCards.jsx'
import BannerCarousel from '../Components/Home-Components/BannerCarousel.jsx'
import CategoriesCarousel from '../Components/Home-Components/CategoriesCarousel.jsx'
import homeicon1 from '../Assets/Some-icons/home-icon1.svg'
import homeicon2 from '../Assets/Some-icons/home-icon3.svg'
import homeicon3 from '../Assets/Some-icons/home-icon2.svg'
import Spinner from '../Components/Products/Spinner.jsx'
import { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function Home() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if(loading){
    return(<Spinner/>)
  }

  const saleProducts = products.filter(product => product.brand.toLowerCase().includes('gama') && parseFloat(product.price) < 50000.00).slice(0,9)
  const newProducts = products.filter(product => parseFloat(product.price) > 1000000).slice(0,9)
  const recomendProducts = products.filter(product => product.sub_category.toLowerCase().includes('televisores') && !product.name.toLowerCase().includes('ventilador') && !product.name.toLowerCase().includes('control')).slice(0,9)
  return (
      <div 
        name='home' 
        className={`flex flex-col items-center gap-10 min-h-screen h-full w-full pb-20`}>
        <BannerCarousel/>

        {/*Banners*/}
        <section className='flex flex-col items-center w-full gap-y-10'>
          <BannersCards/>
          <div className='flex items-center justify-center w-4/5 h-[130px] rounded-3xl bg-gray-300 text-black font-bold xl:text-xl text-sm px-5 gap-x-5'>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon1}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Envíos a domicilio
                </span>
              </p>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon2}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Pagos en creditos y débitos
                </span>
              </p>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon3}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Centro de preguntas
                </span>
              </p>
          </div>
        </section>

        {/*Categories*/}
        <section className='w-4/5 my-5'>
          <CategoriesCarousel/>
        </section>

        {/*Products sale carousel*/}
        <div className='flex flex-col gap-y-20 w-[82%] max-sm:w-[71%]'>
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
              OFERTAS
            </h1>
              <ProductsCarousel filterProducts={saleProducts}/>
          </section>

          {/*Products news carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
              NOVEDADES
            </h1> 
              <ProductsCarousel filterProducts={newProducts}/>
          </section>

          {/*Products recomendations carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
              TE RECOMENDAMOS
            </h1>
              <ProductsCarousel filterProducts={recomendProducts}/>
          </section>
        </div>
        
      </div>
  )
}