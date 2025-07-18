import { useEffect, useMemo, useState } from 'react'
import { useProducts } from '../Context/ProductsContext'
import ProductsCarousel from '../Components/ProductsCarousel'
import BannerCarousel from '../Components/Home-Components/BannerCarousel.jsx'
import CategoriesCarousel from '../Components/Home-Components/CategoriesCarousel.jsx'
import Spinner from '../Components/Products/Spinner.jsx'
import BrandsCarrousel from '../Components/Home-Components/BrandsCarrousel.jsx'
import useDocumentTitle from '../Utils/useDocumentTitle'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { NavLink } from 'react-router-dom'

export default function Home() {
  const { products, loading } = useProducts();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);
  const bannerName = !isMobile ? 'https://technologyline.com.ar/banners-images/Assets/banner_desktop_1_1752775213666.webp' : 'https://technologyline.com.ar/banners-images/Assets/banner_mobile_1_1752775192695.webp'

  useDocumentTitle('Home')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 830);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const firstCarousel = useMemo(() => {
    if (!products) return [];
    
    return products
      .filter(product => product.sub_category.toLowerCase().includes('aires'))
      .sort((a, b) => parseFloat(b.price_list_3) - parseFloat(a.price_list_3));
  }, [products]);

  const secondCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('celular') ||
      product.sub_category.toLowerCase().includes('tv') ||
      product.sub_category.toLowerCase().includes('televisores') && 
      !product.name.toLowerCase().includes('control')
    );
  }, [products]);

  const thirdCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('cocina') || 
      product.sub_category.toLowerCase().includes('coccion') || 
      product.sub_category.toLowerCase().includes('electrodomesticos') && 
      !product.name.toLowerCase().includes('ventilador') && 
      !product.name.toLowerCase().includes('control')
    );
  }, [products]);

  const fourthCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('consolas') ||
      product.sub_category.toLowerCase().includes('tablet') ||
      product.sub_category.toLowerCase().includes('celular') ||
      product.sub_category.toLowerCase().includes('parlante') ||
      product.name.toLowerCase().includes('0700306605861')
    );
  }, [products]);
  
  return (
      <div name='home' className={`flex box-border flex-col items-center gap-5 min-h-screen h-full w-full pb-5`}>
        {/*Banners*/}
        <section className='max-xl:min-h-[150px] min-h-[240px]'>
          <BannerCarousel/>
        </section>

        {/*Categories*/}
        <section className='w-4/5'>
          <CategoriesCarousel/>
        </section>

        <section className='w-[90%] h-[220px] duration-200 overflow-hidden hover:scale-[1.03]'>
          <NavLink to='/search?brand=philco' className='block h-full'>
            <img 
              src={bannerName} 
              className='w-full h-full rounded-[90px] max-md:rounded-[90px] object-contain duration-300' 
              alt="Philco Days Promotion"
            />
          </NavLink>
        </section>

        <section className='flex flex-col items-center w-full'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-4/5 max-w-7xl'>
            <div className='group max-sm:w-[100%] max-sm:h-[85%] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex flex-col xl:flex-row items-center gap-4'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300'>
                    <img 
                      src='https://technologyline.com.ar/banners-images/Assets/Some-icons/home-icon1.svg'
                      className='w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert'
                      alt='Delivery icon'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center md:items-start'>
                  <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-1'>Envíos a domicilio</h3>
                  <p className='text-sm text-gray-600 text-center md:text-left'>Entrega rápida y segura a tu puerta</p>
                </div>
              </div>
            </div>

            <div className='group max-sm:w-[100%] max-sm:h-[85%] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex flex-col xl:flex-row items-center gap-4'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300'>
                    <img 
                      src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/home-icon2.svg'}
                      className='w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert'
                      alt='Payment icon'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center md:items-start'>
                  <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-1'>Múltiples formas de pago</h3>
                  <p className='text-sm text-gray-600 text-center md:text-left'>Crédito, débito y más opciones</p>
                </div>
              </div>
            </div>

            <div className='group max-sm:w-[100%] max-sm:h-[85%] flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
              <div className='flex flex-col xl:flex-row items-center gap-4'>
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300'>
                    <img 
                      src={'https://technologyline.com.ar/banners-images/Assets/Some-icons/home-icon3.svg'}
                      className='w-10 h-10 md:w-12 md:h-12 object-contain brightness-0 invert'
                      alt='Support icon'
                    />
                  </div>
                </div>
                <div className='flex flex-col items-center md:items-start'>
                  <h3 className='text-lg md:text-xl font-semibold text-gray-800 mb-1'>Centro de ayuda</h3>
                  <p className='text-sm text-gray-600 text-center md:text-left'>Soporte personalizado 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Products sale carousel*/}
        {loading 
          ? (
            <Spinner/>
          )
          : (
            <div className='flex flex-col gap-y-20 pt-10 w-[85%]'>
              {/*Products sale carousel*/}
              <section className='relative flex flex-col justify-center w-full gap-y-10'>
                <h1 className='font-medium text-3xl max-sm:text-xl max-sm:text-center max-[680px]:w-full text-gray-800 w-fit'>
                  OFERTAS CLIMATIZACION
                </h1>
                <ProductsCarousel style={'pb-5'} rows={1} filterProducts={firstCarousel}/>
              </section>

              {/*Products news carousel*/}
              <section className='relative flex flex-col justify-center w-full gap-y-10'>
                <h1 className='font-medium text-3xl max-sm:text-xl max-sm:text-center max-[680px]:w-full text-gray-800 w-fit'>
                  OFERTAS TECNOLOGIA
                </h1> 
                  <ProductsCarousel style={'pb-5'} rows={1} filterProducts={secondCarousel}/>
              </section>

              {/*Products recomendations carousel*/}
              <section className='relative flex flex-col justify-center w-full gap-y-10'>
                <h1 className='font-medium text-3xl max-sm:text-xl max-sm:text-center max-[680px]:w-full text-gray-800 w-fit'>
                  OFERTAS PARA HOGAR
                </h1>
                  <ProductsCarousel style={'pb-5'} rows={1} filterProducts={thirdCarousel}/>
              </section>

              {/*Products gama carousel*/}
              <section className='relative flex flex-col justify-center w-full gap-y-10'>
                <h1 className='font-medium text-3xl max-sm:text-xl max-sm:text-center max-[680px]:w-full text-gray-800 w-fit'>
                  MAS OFERTAS
                </h1> 
                  <ProductsCarousel style={'pb-5'} rows={1} filterProducts={fourthCarousel}/>
              </section>
            </div>
          )
        }



        <section className='w-[82%] h-fit flex flex-col gap-y-5 pt-10'>
          <span className='font-medium text-3xl max-sm:text-xl text-gray-800 w-full'>Conoce nuestras marcas</span>

          <div className='select-none'>
            <BrandsCarrousel/>
          </div>
        </section>
        

      </div>
  )
}