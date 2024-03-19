import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa"
import { FaAngleLeft } from "react-icons/fa"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import image1 from '../../Assets/CategoriesCarousel-images/AURI301N_D.jpg'
// import image2 from '../../Assets/CategoriesCarousel-images/CEL1283.jpg'
import image3 from '../../Assets/CategoriesCarousel-images/GAMA6390.jpg'
import image4 from '../../Assets/CategoriesCarousel-images/LAB6B-3.jpg'
import image5 from '../../Assets/CategoriesCarousel-images/LAB146.jpg'
import image6 from '../../Assets/CategoriesCarousel-images/LAB535_A.jpg'
import image7 from '../../Assets/CategoriesCarousel-images/PAR4299-2.jpg'
import defaultimage from '../../Assets/CategoriesCarousel-images/default.webp'


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
        <NavLink to={'/search/?sub_category=auriculares'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image1 ? image1 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p>
            <span>AURICULARES</span>
          </p>
        </NavLink>
      </div>

      {/* <div>
        <NavLink to={'/search/?sub_category=celulares'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image2 ? image2 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>CELULARES</span>
          </p>
        </NavLink>
      </div> */}

      <div>
        <NavLink to={'/search/?sub_category=cuidado personal'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image3 ? image3 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>CUIDADO PERSONAL</span>
          </p>
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?sub_category=lavado'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image4 ? image4 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>LAVADO</span>
          </p>
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?sub_category=pequeños electro'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image5 ? image5 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>PEQUEÑOS ELECTRO</span>
          </p>
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?sub_category=ventilacion'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image6 ? image6 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>VENTILADORES</span>
          </p>
        </NavLink>
      </div>

      <div>
        <NavLink to={'/search/?sub_category=parlantes'} className='flex flex-col items-center justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image7 ? image7 : defaultImage} 
            className='w-28 h-28 rounded-full hover:border-[#333] duration-500 border-2 shadow-lg bg-marine-100'>
          </img>
          <p className='text-center'>
            <span>PARLANTES</span>
          </p>
        </NavLink>
      </div>
    </Slider>
  )}

