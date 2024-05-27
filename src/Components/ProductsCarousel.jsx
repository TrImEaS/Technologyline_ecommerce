import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function ProductsCarousel({ filterProducts, rows, style }) {
  const NextArrow = (props) =>{
    const { onClick, style, className } = props 
    return (
      <FaAngleRight 
        onClick={onClick} 
        style={{...style, color: 'white', background: 'black', borderRadius: '100%'}} 
        className={className}
      />
    )
  }
  
  const PrevArrow = (props) =>{
    const { onClick, style, className } = props 
    return (
      <FaAngleLeft
        onClick={onClick} 
        style={{...style, color: 'white', background: 'black', borderRadius: '100%'}} 
        className={className}
      />
    )
  }

  const products = filterProducts;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    rows: rows,
    speed: 500,
    slidesToShow: filterProducts.length > 4 ? 4 : filterProducts.length,
    slidesToScroll: filterProducts.length > 4 ? 4 : filterProducts.length,
    pauseOnDotsHover: true,
    class: 'spinner-container',
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: filterProducts.length > 3 ? 3 : filterProducts.length,
          slidesToScroll: filterProducts.length > 3 ? 3 : filterProducts.length,
          dots: true
        }
      },
      {
        breakpoint: 768,
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
          slidesToShow: filterProducts.length > 1 ? 1 : filterProducts.length,
          slidesToScroll: filterProducts.length > 1 ? 1 : filterProducts.length
        }
      }
    ]
  };

  return (
    <Slider className={`${style}`} {...settings}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          sku={product.sku}
          img={product.img_base}
          price={product.price}
          name={product.name}
          discount={product.discount}
        />
      ))}
    </Slider>
  );
}
