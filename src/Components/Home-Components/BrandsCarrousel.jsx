import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function BrandsCarrousel () {
  const [brands, setBrands] = useState([])
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

  useEffect(() => {
    axios.get(`${API_URL}/api/page/getBrandsForCarrousel?t=${Date.now()}`)
      .then(res => setBrands(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Slider {...settings}>
      {brands.map((brand, index) => (
        <section key={index}>
          <NavLink to={`/search?brand=${brand.name}`} className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer w'>
          <img
            src={brand.image_path}
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </NavLink>
      </section>
      ))}
    </Slider>
  )
}
