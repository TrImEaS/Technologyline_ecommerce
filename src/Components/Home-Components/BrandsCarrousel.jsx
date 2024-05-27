import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../Assets/Brands/brand-1.svg'
import image2 from '../../Assets/Brands/brand-2.svg'
import image3 from '../../Assets/Brands/brand-3.svg'
import image4 from '../../Assets/Brands/brand-4.svg'
import image5 from '../../Assets/Brands/brand-5.svg'
import image6 from '../../Assets/Brands/brand-6.svg'
import image7 from '../../Assets/Brands/brand-7.svg'
import image8 from '../../Assets/Brands/brand-8.svg'
import image9 from '../../Assets/Brands/brand-9.svg'

export default function BrandsCarrousel() {
  const settings = {
    infinite: true,
    speed: 2000,
    autoplaySpeed: 100,
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  }

  return(
    <Slider {...settings}>
      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer w-'>
          <img 
            src={image1 ? image1 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>
      
      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image2 ? image2 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image3 ? image3 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image4 ? image4 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image5 ? image5 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image6 ? image6 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image7 ? image7 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image8 ? image8 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>

      <section>
        <div className='flex flex-col items-center relative justify-center gap-y-2 hover:drop-shadow-xl duration-300 cursor-pointer'>
          <img 
            src={image9 ? image9 : defaultImage} 
            className='w-28 h-28 rounded-full max-sm:px-1'>
          </img>
        </div>
      </section>
    </Slider>
  )
}