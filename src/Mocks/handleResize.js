// Ajusta el número de productos al cargar inicialmente
export default function handleResize () {
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