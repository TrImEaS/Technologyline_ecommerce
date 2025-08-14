import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../Context/ProductsContext'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from 'axios'

const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function BannerCarousel () {
  const [desktopBanners, setDesktopBanners] = useState([])
  const [mobileBanners, setMobileBanners] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830)
  const { mostViewed } = useProducts()
  const bannerName = !isMobile ? 'static_baner_home.jpg' : 'static_baner_home_mobile.jpg'
  const navigate = useNavigate()

  useEffect(() => {
    fetchBanners()
    const handleResize = () => setIsMobile(window.innerWidth <= 830)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fetchBanners = () => {
    fetch(`${API_URL}/api/page/getBanners?ts=${Date.now()}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetching banners')
        }
        return res.json()
      })
      .then(data => {
        const mobile = data.filter(banner => banner.name.includes('mobile') && banner.path).sort((a, b) => a.position - b.position)
        const desktop = data.filter(banner => banner.name.includes('desktop') && banner.path).sort((a, b) => a.position - b.position)
        setMobileBanners(mobile)
        setDesktopBanners(desktop)
      })
      .catch(error => console.error(error))
  }

  const bannersToShow = isMobile ? mobileBanners : desktopBanners
  const shouldShowCarousel = bannersToShow.length > 0

  const handleClick = (index) => {
    const adjustedIndex = mostViewed ? index - 1 : index
    const banner = bannersToShow[adjustedIndex]
    if (banner && banner.path_to) {
      navigate(banner.path_to)
    }
  }

  const addViewToProduct = ({ id }) => {
    axios.patch(`${API_URL}/api/products/addView/${id}`)
      .then(res => {
        if (res.status !== 200) {
          return console.log(res)
        }
        console.log('view updated')
      })
      .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  return (
    <div className='flex flex-col h-full w-full items-center sm:pb-1'>
      {shouldShowCarousel && (
        <Carousel
          autoPlay
          interval={5000}
          showStatus={false}
          infiniteLoop
          transitionTime={500}
          showThumbs={false}
          stopOnHover
          swipeable
          emulateTouch
          onClickItem={handleClick}
          className="cursor-pointer"
        >
          {mostViewed &&
            <div
              className='w-full h-full'
              onClick={() => {
                addViewToProduct({ id: mostViewed.id })
                navigate(`/products/?product=${mostViewed && mostViewed.sku}`)
              }
              }>
              <div className="w-full h-full cursor-pointer relative overflow-hidden">
                <img
                  src={`https://technologyline.com.ar/banners-images/${bannerName}`}
                  className="h-full w-full object-cover inset-0 select-none"
                  loading="lazy"
                  alt={'banner'}
                />
                <div className='absolute z-[50] rounded-full right-[28%] top-[16%] max-md:right-[25.7%] max-md:top-[10%] text-black w-[15.2%] h-[75%] max-md:w-[20%] max-md:h-[85%] text-3xl font-bold'>
                  <img className='w-full h-full rounded-full object-cover' src={mostViewed && mostViewed.img_url} />
                </div>
              </div>
            </div>
          }
          {bannersToShow.map((banner, index) => (
            <div key={index + new Date()} className="w-full h-full relative overflow-hidden">
              <img
                src={banner.path}
                className="h-full w-full object-cover inset-0 select-none"
                loading="lazy"
                alt={`banner ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}
