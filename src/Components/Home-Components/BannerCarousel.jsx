import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../../Context/ProductsContext'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from 'axios'

// Asegúrate de que API_URL está correctamente definido
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function BannerCarousel () {
  const [desktopBanners, setDesktopBanners] = useState([])
  const [mobileBanners, setMobileBanners] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830)
  const { mostViewed } = useProducts()

  // Este es el nombre del banner estático (fondo) que usas para el producto más visto
  const staticBannerImageName = !isMobile ? 'static_baner_home_2.jpg' : 'static_baner_home_mobile_2.jpg'
  const navigate = useNavigate()

  useEffect(() => {
    fetchBanners()
    const handleResize = () => setIsMobile(window.innerWidth <= 830)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fetchBanners = () => {
    // Usamos axios para consistencia, aunque fetch también funciona
    axios.get(`${API_URL}/api/page/getBanners?ts=${Date.now()}`)
      .then(res => {
        const data = res.data
        const mobile = data.filter(b => b.name.includes('mobile') && b.path).sort((a, b) => a.position - b.position)
        const desktop = data.filter(b => b.name.includes('desktop') && b.path).sort((a, b) => a.position - b.position)
        setMobileBanners(mobile)
        setDesktopBanners(desktop)
      })
      .catch(error => console.error('Error fetching banners:', error))
  }

  const addViewToProduct = ({ id }) => {
    axios.patch(`${API_URL}/api/products/addView/${id}`)
      .then(res => {
        if (res.status !== 200) return console.log(res)
        console.log('view updated')
      })
      .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  // 1. COMBINAR LOS BANNERS (Banners Dinámicos + Banner Estático)
  const bannersFromApi = isMobile ? mobileBanners : desktopBanners

  // Crea el objeto para el banner del producto más visto, si existe
  const mostViewedBannerData = mostViewed ? {
    // Usamos un id que sabemos que no colisionará con los de la API, y una flag
    id: 'most-viewed-static',
    isStatic: true,
    // La ruta del banner estático (fondo)
    path: `https://technologyline.com.ar/banners-images/${staticBannerImageName}`,
    // La ruta a la que debe navegar
    path_to: `/products/?product=${mostViewed.sku}`,
    product_id: mostViewed.id // El ID para la función addViewToProduct
  } : null

  // Combina el banner estático (si existe) con los banners de la API
  const allBannersToShow = [
    ...(mostViewedBannerData ? [mostViewedBannerData] : []),
    ...bannersFromApi
  ]

  const shouldShowCarousel = allBannersToShow.length > 0

  // 2. LÓGICA DE CLICK UNIFICADA
  const handleClick = (index) => {
    const banner = allBannersToShow[index]

    if (!banner || !banner.path_to) return

    // Maneja la lógica específica para el banner estático
    if (banner.isStatic) {
      // Llama a la función de contador de vistas
      addViewToProduct({ id: banner.product_id })
      // Navega internamente
      navigate(banner.path_to)
      return
    }

    // Lógica para banners dinámicos
    const target = banner.path_to.trim()

    // URL externa
    if (/^https?:\/\//i.test(target)) {
      window.location.href = target
      return
    }

    // Path interno (lo normaliza)
    const normalized = target.startsWith('/') ? target : `/${target}`
    navigate(normalized)
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
          onClickItem={handleClick} // Usamos el índice directo, que ahora es correcto
          className="cursor-pointer"
        >
          {/* 3. Mapeo ÚNICO para todos los banners */}
          {allBannersToShow.map((banner, index) => (
            <div
              key={banner.id ?? `banner-${index}`} // Usamos ID o un key combinado
              className="w-full h-full relative overflow-hidden"
            >
              <img
                // Usa banner.path, que contiene la ruta de la imagen, ya sea estática o dinámica
                src={banner.path}
                className="h-full w-full object-cover inset-0 select-none"
                loading="lazy"
                alt={banner.isStatic ? 'Banner más visto' : `banner ${index + 1}`}
              />

              {/* Contenido adicional SOLO para el banner estático */}
              {banner.isStatic && mostViewed && mostViewed.img_url && (
                <div className='absolute z-[50] rounded-full right-[28%] top-[16%] max-md:right-[25.7%] max-md:top-[10%] text-black w-[15.2%] h-[75%] max-md:w-[20%] max-md:h-[85%] text-3xl font-bold'>
                  <img
                    className='w-full h-full rounded-full object-contain'
                    src={mostViewed.img_url_2 ? mostViewed.img_url_2 : mostViewed.img_url}
                  />
                </div>
              )}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}
