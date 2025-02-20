import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;


export default function BannerCarousel() {
  const [desktopBanners, setDesktopBanners] = useState([]);
  const [mobileBanners, setMobileBanners] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchBanners = () => {
    fetch(`${API_URL}/api/page/getBanners`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetching banners');
        }
        return res.json();
      })
      .then(data => {
        const mobile = data.filter(banner => banner.name.includes('mobile') && banner.path);
        const desktop = data.filter(banner => banner.name.includes('desktop') && banner.path);

        setMobileBanners(mobile);
        setDesktopBanners(desktop);
      })
      .catch(error => console.error(error));
  };

  // Determinar qué banners mostrar basado en la resolución
  const bannersToShow = isMobile ? mobileBanners : desktopBanners;
  const shouldShowCarousel = bannersToShow.length > 0;

  const handleClick = (index) => {
    const banner = bannersToShow[index];
    if (banner.path_to) {
      navigate(banner.path_to); 
    }
  };

  return (
    <div className='flex flex-col w-full items-center sm:pb-3'>
      {shouldShowCarousel ? (
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
        >
          {bannersToShow.map((banner, index) => (
            <div key={index + new Date()} className="w-full h-full min-h-[500px] max-h-[550px] max-sm:min-h-[380px] max-sm:max-h-[380px]">
              <img
                src={banner.path}
                className="h-full w-full object-fill select-none"
                loading="lazy"
                alt={`banner ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      ) : ''}
    </div>
  );
}
