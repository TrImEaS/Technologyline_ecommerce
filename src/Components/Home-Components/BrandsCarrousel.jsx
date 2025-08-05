import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NavLink } from 'react-router-dom'

export default function BrandsCarrousel () {
  const settings = {
    infinite: true,
    speed: 2000,
    autoplaySpeed: 100,
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }

  return (
    <Slider {...settings}>
      <section>
        <NavLink to={'/search?brand=drean'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer w-'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-1.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=liliana'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-2.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=bgh'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-3.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=netmark'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-11.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=whirlpool'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-5.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=atma'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-10.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=gama'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-7.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=rca'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-8.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>

      <section>
        <NavLink to={'/search?brand=philco'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img
            src={'https://technologyline.com.ar/banners-images/Assets/Brands/brand-12.svg'}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>
    </Slider>
  )
}
