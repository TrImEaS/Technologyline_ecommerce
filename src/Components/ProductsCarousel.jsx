import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

//Los dots si el numero de productos que se muestra es impar, se rompe al final
// si es par no se rompe, arreglar en futuro C:

export default function ProductsCarousel({ filterProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [numberOfProducts, setNumberOfProducts] = useState(5)
  const products = filterProducts
  const visibleProducts = products.slice(currentIndex, currentIndex + numberOfProducts);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - numberOfProducts, 0));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + numberOfProducts, products.length - numberOfProducts));
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1920) {
        setNumberOfProducts(5);
      } else if (screenWidth >= 1680) {
        setNumberOfProducts(4);
      } else if (screenWidth >= 1280) {
        setNumberOfProducts(3);
      } else if (screenWidth >= 768) {
        setNumberOfProducts(2);
      } else {
        setNumberOfProducts(1);
      }
    }

    // Ajusta el número de productos al cargar inicialmente
    handleResize()

    // Agrega un listener para el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <section className='relative w-full '>
      {/*Left Arrow*/}
      <button
        className='absolute text-4xl left-[-30px] z-[9999] h-[397px] w-10 hover:bg-gray-300 duration-500 active:text-5xl active:duration-75'
        onClick={handlePrev}
        disabled={currentIndex === 0}>
        {`<`}
      </button>

      {/*Right Arrow*/}
      <button
        className='absolute text-4xl right-[-30px] z-[9999] h-[397px] w-10 hover:bg-gray-300 duration-500 active:text-5xl active:duration-75'
        onClick={handleNext}
        disabled={currentIndex === products.length - numberOfProducts}>
        {`>`}
      </button>

      {/*Product Container*/}
      <div 
        className='flex w-full min-h-[400px] relative items-center justify-around gap-x-2 flex-shrink-0'>
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            sku={product.sku}
            img={product.img}
            price={product.price}
            name={product.name}
          ></ProductCard>
        ))}
      </div>

      {/*Dots*/}
      <div className='flex mt-5 justify-center'>
        {Array(Math.ceil(products.length / numberOfProducts)).fill(null).map((_, dotIndex) => (
          <div
            key={dotIndex}
            className={`w-2 h-2 mx-1 rounded-full bg-gray-300 
            ${dotIndex * numberOfProducts === currentIndex ? 'bg-gray-800' : ''}`}
            onClick={() => setCurrentIndex(dotIndex * numberOfProducts)}
          />
        ))}
      </div>
    </section>
  );
}
