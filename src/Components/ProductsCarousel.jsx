import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function ProductsCarousel({ filterProducts }) {
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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          sku={product.sku}
          img={product.img_base}
          price={product.price}
          name={product.name}
        />
      ))}
    </Slider>
  );
}
