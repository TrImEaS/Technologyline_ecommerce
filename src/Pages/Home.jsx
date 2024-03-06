import React from 'react'
import ProductsCarousel from '../Components/ProductsCarousel'
import BannersCards from '../Components/BannersCards'
import BannerCarousel from '../Components/BannerCarousel.jsx'
import CategoriesCarousel from '../Components/CategoriesCarousel'
import homeicon1 from '../Assets/Some-icons/home-icon1.svg'
import homeicon2 from '../Assets/Some-icons/home-icon3.svg'
import homeicon3 from '../Assets/Some-icons/home-icon2.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function Home() {

  return (
    <>
      <div 
        name='home' 
        className={`flex flex-col items-center gap-10 min-h-screen h-full w-full gap-y-24`}>
        <section className='max-md:min-h-[170px]'>
          <BannerCarousel/>
        </section>
        {/*Banners*/}
        <section className='flex flex-col items-center w-full gap-y-10'>
          <BannersCards/>
          <div className='flex items-center justify-center w-3/4 h-[130px] rounded-sm bg-page-gray-light text-black font-bold xl:text-xl text-sm px-5 gap-x-5'>
            <p className='flex gap-x-3 justify-center items-center w-full'>
              <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[80px] min-h-[80px]'>
                <img src={homeicon1}/>
              </i>

              <span className='hidden md:block text-pretty'>
                Envíos a domicilio
              </span>
            </p>
            <p className='flex gap-x-3 justify-center items-center w-full'>
              <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[80px] min-h-[80px]'>
                <img src={homeicon2}/>
              </i>

              <span className='hidden md:block text-pretty'>
                Pagos en creditos y débitos
              </span>
            </p>
            <p className='flex gap-x-3 justify-center items-center w-full'>
              <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[80px] min-h-[80px]'>
                <img src={homeicon3}/>
              </i>

              <span className='hidden md:block text-pretty'>
                Centro de preguntas
              </span>
            </p>
          </div>
        </section>

        {/*Categories*/}
        <section className='w-4/5 mt-[-50px]'>
          <CategoriesCarousel/>
        </section>

        {/*Products sale carousel*/}
        <section className='flex flex-col justify-center w-3/4 gap-y-10'>
          <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
            OFERTAS
          </h1>
            <ProductsCarousel/>
        </section>

        {/*Products news carousel*/}
        <section className='flex flex-col justify-center w-3/4 gap-y-10'>
          <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
            NOVEDADES
          </h1> 
            <ProductsCarousel/>
        </section>

        {/*Products recomendations carousel*/}
        <section className='flex flex-col justify-center w-3/4 gap-y-10'>
          <h1 className='font-bold text-3xl max-[680px]:w-full w-3/4'>
            TE RECOMENDAMOS
          </h1>
            <ProductsCarousel/>
        </section>
        
      </div>
    </>
  )
}