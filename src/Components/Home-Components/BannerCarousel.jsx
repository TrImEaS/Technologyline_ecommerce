import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import banner1 from '../../Assets/BannerCarousel-images/banner1.jpg'
import banner2 from '../../Assets/BannerCarousel-images/banner2.jpg'
import banner3 from '../../Assets/BannerCarousel-images/banner3.jpg'
import banner4 from '../../Assets/BannerCarousel-images/banner4.jpg'
import bannerMobile_1 from '../../Assets/BannerCarousel-images/banner-mobile.jpg'
import bannerMobile_2 from '../../Assets/BannerCarousel-images/banner-mobile2.jpg'
import bannerMobile_3 from '../../Assets/BannerCarousel-images/banner-mobile3.jpg'
import bannerMobile_4 from '../../Assets/BannerCarousel-images/banner-mobile4.jpg'

export default function BannerCarousel() {
  const mobileScreen = 768
  const [currentBanner1, setCurrentBanner1] = useState(window.innerWidth < mobileScreen ? bannerMobile_1 : banner1)
  const [currentBanner2, setCurrentBanner2] = useState(window.innerWidth < mobileScreen ? bannerMobile_2 : banner2)
  const [currentBanner3, setCurrentBanner3] = useState(window.innerWidth < mobileScreen ? bannerMobile_3 : banner3)
  const [currentBanner4, setCurrentBanner4] = useState(window.innerWidth < mobileScreen ? bannerMobile_4 : banner4)


  useEffect(() => {
    const handleResize = () => {
      setCurrentBanner1(window.innerWidth < mobileScreen ? bannerMobile_1 : banner1)
      setCurrentBanner2(window.innerWidth < mobileScreen ? bannerMobile_2 : banner2)
      setCurrentBanner3(window.innerWidth < mobileScreen ? bannerMobile_3 : banner3)
      setCurrentBanner4(window.innerWidth < mobileScreen ? bannerMobile_4 : banner4)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <section>
      <Carousel 
        autoPlay={5000}
        infiniteLoop
        stopOnHover
        transitionTime={300}
        showThumbs={0}
        swipeable
        emulateTouch
      >
        {/* {carouselImages.map(img =>(
          <div key={img.id}>
            <img 
              src={img.src} 
              alt={`img ${i}`} 
            />
          </div>  
        ))} */}
        <div className="w-full h-full">
          <img 
            src={currentBanner1}
            className="h-full w-full object-fill"
            loading="eager"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src={currentBanner2}
            className="h-full w-full object-fill"
            loading="lazy"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src={currentBanner3}
            className="h-full w-full object-fill"
            loading="eager"
          />
        </div>
        <div className="w-full h-full">
          <img 
            src={currentBanner4}
            className="h-full w-full object-fill"
            loading="eager"/>
        </div>
      </Carousel>
    </section>
  )
}