import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Spinner from '../Products/Spinner';

export default function BannerCarousel() {
  const [currentBanners, setCurrentBanners] = useState([]);
  const [loading, setLoading] = useState(true)
  const mobileScreen = 768

  const desktopBanners = [
    'https://technologyline.com.ar/banners-images/banner.jpg',
    'https://technologyline.com.ar/banners-images/banner2.jpg',
    'https://technologyline.com.ar/banners-images/banner3.jpg',
    'https://technologyline.com.ar/banners-images/banner4.jpg',
    'https://technologyline.com.ar/banners-images/banner5.jpg',
  ];

  const mobileBanners = [
    'https://technologyline.com.ar/banners-images/banner-mobile.jpg',
    'https://technologyline.com.ar/banners-images/banner-mobile2.jpg',
    'https://technologyline.com.ar/banners-images/banner-mobile3.jpg',
    'https://technologyline.com.ar/banners-images/banner-mobile4.jpg',
    'https://technologyline.com.ar/banners-images/banner-mobile5.jpg',
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

  return (
    <Carousel 
      autoPlay={5000}
      showStatus={false}
      infiniteLoop
      transitionTime={500}
      showThumbs={false}
      stopOnHover={true}
      swipeable={true}
      // emulateTouch
    >
      {loading ? <Spinner/> :
       currentBanners.map((banner, index) => (
        <div key={index} className="w-full h-full min-h-[200px]">
          <img
            src={banner}
            className="h-full w-full object-fill select-none"
            loading="eager"
            alt={`banner ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  )
}