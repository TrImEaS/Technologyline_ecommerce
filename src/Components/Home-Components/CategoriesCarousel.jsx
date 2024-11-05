import { NavLink } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa"
import { FaAngleLeft } from "react-icons/fa"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function ProductsCarousel () {

  const NextArrow = (props) =>{
    const { onClick, style, className } = props 
    return (
        <FaAngleRight 
          onClick={onClick} 
          style={{...style, color: 'white', background: 'black', borderRadius: '100%'}} 
          className={className}
        />
    )
  }
  
  const PrevArrow = (props) =>{
    const { onClick, style, className } = props 
    return (
        <FaAngleLeft 
          onClick={onClick} 
          style={{...style, color: 'white', background: 'black', borderRadius: '100%'}} 
          className={className}
        />
    )
  }

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          nextArrow: <NextArrow/>,
          prevArrow: <PrevArrow/>,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          nextArrow: <NextArrow/>,
          prevArrow: <PrevArrow/>,
          dots: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          nextArrow: <NextArrow/>,
          prevArrow: <PrevArrow/>,
          dots: true,
        }
      }
    ]
  }

  return(
    <Slider {...settings}>
      <div>
        <NavLink to={'/search/?sub_category=tv'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img1.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p>
            <span>TELEVISORES</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={'https://technologyline.com.ar/banners-images/Assets/sale-icon.svg'} alt="" /> */}
        </NavLink>
      </div>
      
      <div>
        <NavLink to={'/search/?search=aires'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img2.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>AIRES</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" /> */}
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=lavado'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img3.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>LAVADO</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" /> */}
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=cocina'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img4.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>COCINAS</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" /> */}
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=heladeras'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img5.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>HELADERAS</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" /> */}
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=HORNO%20ELECTRICO'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={'https://technologyline.com.ar/banners-images/Assets/CategoriesCarousel-images/img6.jpg'} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[2px] shadow-xl object-cover bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>HORNITOS ELECTRICOS</span>
          </p>
          {/* <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" /> */}
        </NavLink>
      </div>
    </Slider>
  )}

