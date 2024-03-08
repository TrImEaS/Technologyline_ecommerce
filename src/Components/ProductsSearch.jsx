import React, { useState } from "react"
import ProductCard from "./ProductCard"


export default function ProductsSearch({ products }) {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9
  const maxPageButtons = 5
  const handlePageChange = (newPage) => setCurrentPage(newPage)
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


  return (
    <section className="flex flex-col w-full h-full">
      {/* Renderizar productos */}
        <div className="flex flex-wrap pl-12 w-full gap-10">
          {products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map(
          (product) => (
            <ProductCard
              key={product.id}
              img={product.sku}
              price={product.price}
              name={product.name}
            />
          ))}
        </div>

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
        {currentPage < totalPages && (
          <span onClick={() => handlePageChange(totalPages)} className="cursor-pointer mx-2 p-2 bg-gray-200">
            {totalPages}
          </span>
        )}
      </div>
    </section>
  );
}
