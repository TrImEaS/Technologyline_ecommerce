import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProductCard from "../ProductCard"

export default function ProductsSearch({ products }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9)
  const maxPageButtons = 5
  const location = useLocation();

  const handlePageChange = (newPage) => {
    window.scrollTo(200, 200)
    setCurrentPage(newPage)
  }

  const totalPages = Math.ceil(products.length / productsPerPage)

  const getPagesToShow = () => {
    const pages = []
    
    // Determinar el rango de páginas para mostrar
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = startPage + maxPageButtons - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  useEffect(() => {
    const handleResize = () => {  
      const screenWidth = window.innerWidth;
      
      if (screenWidth >= 2100) { setProductsPerPage(15) } 
      else if (screenWidth >= 1680) { setProductsPerPage(12) }
      else { setProductsPerPage(9) }   
    }
    // Ajusta el número de productos al cargar inicialmente
    handleResize()

    // Agrega un listener para el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);
    

    setCurrentPage(1)

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [location])
  
  return (
    <section className="flex flex-col w-full rounded-lg p-2">
      {/* Renderizar productos */}
      {products.length === 0 && (
        <div className="text-pretty flex flex-col gap-y-3 px-10">
          <p className="text-xl font-semibold">
            No se han encontrado resultados para tu búsqueda.
          </p>
          <p className="font-semibold">
            Sugerencias:
          </p>
          <ul className="list-disc px-5">
            <li>Asegúrate de que todas las palabras estén escritas correctamente.</li>
            <li>Prueba diferentes palabras clave.</li>
            <li>Prueba palabras clave más generales.</li>
            <li>Prueba menos palabras clave.</li>
          </ul>
        </div>
      )}

      {/* Renderizar productos */}
      {products.length > 0 && (
        <div className="flex w-full justify-center min-h-[500px]">
          <div className="
            grid grid-cols-5 gap-5
            max-[2100px]:grid-cols-4
            max-[1680px]:grid-cols-3
            max-lg:grid-cols-2
            max-sm:grid-cols-1">
            {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map(
              (product) => (
                <ProductCard
                  key={product.id}
                  sku={product.sku}
                  img={product.img_base}
                  price={product.price}
                  name={product.name}
                  discount={product.discount}
                />
              )
            )}
          </div>
        </div>
      )}
      {/* Paginación */}
      <div className="flex w-full justify-center items-center mt-20">
        
        {/* Primer página */}
        {currentPage > 3 && (
          <span onClick={() => handlePageChange(1)} className="cursor-pointer mx-2 p-2 bg-gray-200">
            1
          </span>
        )}

        {/* Elipsis a la izquierda si hay más páginas */}
        {currentPage > Math.floor(maxPageButtons / 2) + 1 && (
          <span className="mx-2">...</span>
        )}

        {/* Números de página */}
        {getPagesToShow().map((page) => (
          <span
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer mx-2 p-2 ${
              currentPage === page ? 'bg-gray-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </span>
        ))}

        {/* Elipsis a la derecha si hay más páginas */}
        {currentPage <= totalPages - Math.floor(maxPageButtons / 2) && (
          <span className="mx-2">...</span>
        )}

        {/* Última página */}
        {currentPage < totalPages && totalPages > maxPageButtons && (
          <span onClick={() => handlePageChange(totalPages)} className="cursor-pointer mx-2 p-2 bg-gray-200">
            {totalPages}
          </span>
        )}
      </div>
    </section>
  );
}
