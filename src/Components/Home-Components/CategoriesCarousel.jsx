import { useEffect, useState } from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function CategoriesCarousel () {
  const [categories, setCategories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(7)
  const [isHovering, setIsHovering] = useState(false)

  const updateItemsPerPage = () => {
    const width = window.innerWidth
    if (width < 640) setItemsPerPage(3)
    else if (width < 768) setItemsPerPage(4)
    else if (width < 1024) setItemsPerPage(5)
    else setItemsPerPage(7)

    setCurrentIndex(0)
  }

  useEffect(() => {
    updateItemsPerPage()
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
    <div
      className="relative w-full py-4 "
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center">
        <button
          onClick={prev}
          className={`absolute flex items-center justify-center left-2 z-10 h-10 w-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-full text-gray-800 hover:bg-white hover:text-page-blue-normal transition-all duration-300 transform ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <div className="overflow-hidden w-full px-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
          >
            {categories.map(c => (
              <div
                key={c.id}
                className="flex-shrink-0 flex flex-col mx-auto items-center px-3"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <NavLink
                  to={`/search/?sub_category=${c.category.trim().toLowerCase()}`}
                  className="group relative w-[7rem] h-[7rem] max-sm:w-[5rem] max-sm:h-[5rem] my-3 overflow-hidden rounded-3xl hover:scale-110 border-2 rounded-bl-sm rounded-tr-sm shadow-border border-[#3669ab71] hover:rotate-3 duration-300 hover:rounded-tl-sm hover:rounded-br-sm hover:rounded-tr-3xl hover:rounded-bl-3xl"
                >
                  <div className="absolute inset-0 bg-page-blue-marine transition-opacity duration-300" />
                  <img
                    src={c.img_url}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.5] group-hover:rotate-[3deg]"
                    alt={c.category}
                  />
                </NavLink>
                <p className="uppercase w-full text-center font-medium text-sm max-sm:text-xs mt-3 text-gray-700 tracking-wide">
                  {c.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className={`absolute flex items-center justify-center right-2 z-10 h-10 w-10 bg-white/80 backdrop-blur-sm shadow-lg rounded-full text-gray-800 hover:bg-white hover:text-page-blue-normal transition-all duration-300 transform ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>
    </div>
  )
}
