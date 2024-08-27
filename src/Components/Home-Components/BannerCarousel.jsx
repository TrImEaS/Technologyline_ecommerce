import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Spinner from '../Products/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';

export default function BannerCarousel() {
  const [currentBanners, setCurrentBanners] = useState([]);
  const [loading, setLoading] = useState(true)
  const mobileScreen = 768
  const navigate = useNavigate();

  const desktopBanners = [
    {
      id: 1,
      banner: 'https://technologyline.com.ar/banners-images/banner.jpg',
      to:'search?white_line=1',
    },
    {
      id: 2,
      banner: 'https://technologyline.com.ar/banners-images/banner2.jpg',
      to:'products/?product=CEL1689',
    },
    {
      id: 3,
      banner: 'https://technologyline.com.ar/banners-images/banner3.jpg',
      to:'',
    },
    {
      id: 4,
      banner: 'https://technologyline.com.ar/banners-images/banner4.jpg',
      to:'search?sub_category=tv',
    },
    {
      id: 5,
      banner: 'https://technologyline.com.ar/banners-images/banner5.jpg',
      to:'',
    },
  ];

  const mobileBanners = [
    {
      id: 1,
      banner: 'https://technologyline.com.ar/banners-images/banner-mobile.jpg',
      to:'search?white_line=1',
    },
    {
      id: 2,
      banner: 'https://technologyline.com.ar/banners-images/banner-mobile2.jpg',
      to:'products/?product=CEL1689',
    },
    {
      id: 3,
      banner: 'https://technologyline.com.ar/banners-images/banner-mobile3.jpg',
      to:'',
    },
    {
      id: 4,
      banner: 'https://technologyline.com.ar/banners-images/banner-mobile4.jpg',
      to:'search?sub_category=tv',
    },
    {
      id: 5,
      banner: 'https://technologyline.com.ar/banners-images/banner-mobile5.jpg',
      to:'',
    },
  ];

  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const fetchAvailableBanners = async (banners) => {
    const checkImages = banners.map(banner => checkImageExists(banner));
    const results = await Promise.all(checkImages);
    return banners.filter((banner, index) => results[index]);
  };

  const updateBanners = async () => {
    setLoading(true);
    const bannersToCheck = window.innerWidth < mobileScreen ? mobileBanners : desktopBanners;
    const availableBanners = await fetchAvailableBanners(bannersToCheck);
    setCurrentBanners(availableBanners.length ? availableBanners : bannersToCheck);
    setLoading(false);
  };

  useEffect(() => {
    updateBanners();
    window.addEventListener('resize', updateBanners);
    return () => window.removeEventListener('resize', updateBanners);
  }, []);

  const handleClick = (index) => {
    const banner = currentBanners[index];
    if (banner.to) {
      navigate(banner.to); // Navegar a la ruta especificada
    }
  };

  return (
    <Carousel 
      autoPlay={5000}
      showStatus={false}
      infiniteLoop
      transitionTime={500}
      showThumbs={false}
      stopOnHover={true}
      swipeable={true}
      onClickItem={handleClick}
    >
      {loading ? <Spinner/> :
       currentBanners.map((banner) => (
        <div key={banner.id + banner.banner} className={`w-full h-full min-h-[200px]`}>
          <img
            src={banner.banner}
            className={`h-full w-full object-fill select-none`}
            loading="eager"
            alt={`banner ${banner.id + banner.banner}`}
          />
        </div>
      ))}
    </Carousel>
  )
}