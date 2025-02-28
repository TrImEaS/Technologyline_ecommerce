import { useEffect, useState } from 'react'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(7)

  const updateItemsPerPage = () => {
    const width = window.innerWidth
    if (width < 640) setItemsPerPage(3)
    else if (width < 768) setItemsPerPage(4)
    else if (width < 1024) setItemsPerPage(5)
    else setItemsPerPage(7)
  
    setCurrentIndex(0)
  }

  useEffect(() => {
    updateItemsPerPage() // Initial check
    window.addEventListener('resize', updateItemsPerPage)
    
    return () => {
      window.removeEventListener('resize', updateItemsPerPage)
    }
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/api/page/getCategoriesForCarrousel`)
      .then(res => {
        setCategories(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  const next = () => {
    setCurrentIndex(prev => 
      prev + itemsPerPage >= categories.length ? 0 : prev + itemsPerPage
    )
  }
  
  const prev = () => {
    setCurrentIndex(prev => 
      prev - itemsPerPage < 0 ? Math.max(categories.length - itemsPerPage, 0) : prev - itemsPerPage
    )
  }
  
  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <button 
          onClick={prev}
          className="absolute flex items-center justify-center left-0 max-sm:-left-5 z-10 h-5 w-5 p-2 bg-slate-950 rounded-full text-white active:bg-gray-700 duration-300"
        >
          <FaAngleLeft />
        </button>
  
        <div className="overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {categories.map(c => (
              <div 
                key={c.id} 
                className="flex-shrink-0 flex flex-col mx-auto items-center px-2"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <NavLink
                  to={`/search/?sub_category=${c.category.trim().toLowerCase()}`}
                  className="w-[7rem] h-[7rem] max-sm:w-[5rem] max-sm:h-[5rem]"
                >
                  <img 
                    src={c.img_url} 
                    className="w-full h-full rounded-full hover:bg-blend-lighten duration-500 border-[2px] shadow-xl object-cover"
                    alt={c.category}
                  />
                </NavLink>
                <p className="uppercase w-full text-center text-sm max-sm:text-xs mt-2">
                  {c.category}
                </p>
              </div>
            ))}
          </div>
        </div>
  
        <button 
          onClick={next}
          className="absolute flex items-center justify-center right-0 max-sm:-right-5 z-10 h-5 w-5 p-2 bg-slate-950 rounded-full text-white active:bg-gray-700 duration-300"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

