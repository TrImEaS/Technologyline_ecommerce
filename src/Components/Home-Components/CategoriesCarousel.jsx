import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa"
import { FaAngleLeft } from "react-icons/fa"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import image1 from '../../Assets/CategoriesCarousel-images/img1.jpg'
import image3 from '../../Assets/CategoriesCarousel-images/img6.jpg'
import image4 from '../../Assets/CategoriesCarousel-images/img3.jpg'
import image5 from '../../Assets/CategoriesCarousel-images/img4.jpg'
import image6 from '../../Assets/CategoriesCarousel-images/img5.jpg'
import image7 from '../../Assets/CategoriesCarousel-images/img2.jpg'
import hotsale_icon from '../../Assets/hotsale-icon.svg'

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
        <NavLink to={'/search/?sub_category=televisores'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image1 ? image1 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[4px] shadow-xl bg-marine-100'>
          </img>
          <p>
            <span>TELEVISORES</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>
      
      <div>
        <NavLink to={'/search/?search=planchita'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image7 ? image7 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[3px] shadow-xl bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>PLANCHITAS</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=lavado'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image4 ? image4 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[4px] shadow-xl bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>LAVADO</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=cocina'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image5 ? image5 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[4px] shadow-xl bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>COCINAS</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=heladeras'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image6 ? image6 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[4px] shadow-xl bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>HELADERAS</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?search=secador'} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image3 ? image3 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-[4px] shadow-xl bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>SECADOR</span>
          </p>
          <img className='h-10 w-10 absolute top-0 right-0' src={hotsale_icon} alt="" />
        </NavLink>
      </div>
    </Slider>
  )}

