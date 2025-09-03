import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Slider from 'react-slick'
import ProductCard from './ProductCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function ProductsCarousel ({ filterProducts, rows, style }) {
  const NextArrow = (props) => {
    const { onClick, style } = props
    return (
      <div
        onClick={onClick}
        className="absolute -right-5 max-sm:right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      >
        <div className="flex items-center text-xl max-sm:text-base max-sm:w-5 max-sm:h-5 justify-center w-7 h-7 bg-black/20 hover:bg-white text-black hover: rounded-full shadow-lg transition-all duration-300 hover:scale-110">
          <FaAngleRight className="" />
        </div>
      </div>
    )
  }

  const PrevArrow = (props) => {
    const { onClick, style } = props
    return (
      <div
        onClick={onClick}
        className="absolute -left-5 max-sm:left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
      >
        <div className="flex items-center text-xl max-sm:text-base max-sm:w-5 max-sm:h-5 justify-center w-7 h-7 bg-black/20 hover:bg-white text-black hover: rounded-full shadow-lg transition-all duration-300 hover:scale-105">
          <FaAngleLeft className="" />
        </div>
      </div>
    )
  }

  const products = filterProducts

  const settings = {
    dots: true,
    infinite: products.length > 1,
    autoplay: products.length > 1,
    autoplaySpeed: 3000,
    rows,
    speed: 500,
    slidesToShow: filterProducts.length > 4 ? 4 : filterProducts.length,
    slidesToScroll: filterProducts.length > 4 ? 4 : filterProducts.length,
    pauseOnDotsHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots custom-dots',
    cssEase: 'cubic-bezier(0.87, 0, 0.13, 1)',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: filterProducts.length > 3 ? 3 : filterProducts.length,
          slidesToScroll: filterProducts.length > 3 ? 3 : filterProducts.length,
          initialSlide: 2
        }
      },
      {
        breakpoint: 975,
        settings: {
          slidesToShow: filterProducts.length > 2 ? 2 : filterProducts.length,
          slidesToScroll: filterProducts.length > 2 ? 2 : filterProducts.length,
          initialSlide: 2
        }
      },
      {
        breakpoint: 525,
        settings: {
          dots: false,
          slidesToShow: filterProducts.length > 2 ? 2 : filterProducts.length,
          slidesToScroll: filterProducts.length > 2 ? 2 : filterProducts.length
        }
      }
    ]
  }

  if (products.length === 0) {
    return ''
  }

  return (
    <div className="relative">
      <Slider className={`${style} product-carousel`} {...settings}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </Slider>
    </div>
  )
}
