import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProductCard from "../ProductCard"

export default function ProductsSearch({ products }) {
  const location = useLocation()
  const navigate = useNavigate()

  const params = new URLSearchParams(location.search)
  const initialPage = parseInt(params.get("page")) || 1

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [productsPerPage, setProductsPerPage] = useState(9)
  const maxPageButtons = 4

  const totalPages = Math.ceil(products.length / productsPerPage)

  const getPagesToShow = () => {
    const pages = []
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

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(newPage)

    const newParams = new URLSearchParams(location.search)
    newParams.set("page", newPage)
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true })
  }

  useEffect(() => {
    const handleResize = () => {  
      const width = window.innerWidth
      if (width >= 2100) setProductsPerPage(15)
      else if (width >= 1680) setProductsPerPage(12)
      else setProductsPerPage(9)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryPage = parseInt(params.get("page")) || 1
    setCurrentPage(queryPage)
  }, [location])

  return (
    <section className="flex flex-col w-full rounded-lg">
      {products.length === 0 && (
        <div className="text-pretty flex flex-col gap-y-4 px-10 py-8 bg-gray-50 rounded-lg">
          <p className="text-xl font-semibold">No se han encontrado resultados para tu búsqueda.</p>
          <p className="font-semibold">Sugerencias:</p>
          <ul className="list-disc px-5">
            <li>Asegúrate de que todas las palabras estén escritas correctamente.</li>
            <li>Prueba diferentes palabras clave.</li>
            <li>Prueba palabras clave más generales.</li>
            <li>Prueba menos palabras clave.</li>
          </ul>
        </div>
      )}

      {products.length > 0 && (
        <div className="flex w-full justify-center min-h-[500px]">
          <div className="
            grid grid-cols-5 gap-5
            max-[2100px]:grid-cols-4
            max-[1680px]:grid-cols-3
            max-lg:grid-cols-2 max-lg:gap-5 max-sm:gap-1 max-sm:gap-y-10 max-sm:px-2">
            {products
              .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}

      {/* Paginación */}
      <div className="flex w-full justify-center items-center mt-12 mb-8 gap-2">
        {currentPage > 3 && (
          <span onClick={() => handlePageChange(1)} className="cursor-pointer p-2 px-4 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
            1
          </span>
        )}

        {currentPage > Math.floor(maxPageButtons / 2) + 1 && <span className="px-2">...</span>}

        {getPagesToShow().map((page) => (
          <span
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer p-2 px-4 rounded transition-colors ${
              currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {page}
          </span>
        ))}

        {currentPage <= totalPages - Math.floor(maxPageButtons / 2) && <span className="px-2">...</span>}

        {currentPage < totalPages && totalPages > maxPageButtons && (
          <span onClick={() => handlePageChange(totalPages)} className="cursor-pointer p-2 px-4 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
            {totalPages}
          </span>
        )}
      </div>
    </section>
  )
}
