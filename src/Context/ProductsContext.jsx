import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export const ProductsContext = createContext()
export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mostViewed, setMostViewed] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => {
        const sortedByViews = [...res.data].sort((a, b) => b.week_views - a.week_views)
        setMostViewed(sortedByViews[0])
        setProducts(res.data)
        setLoading(false)
      })
      .catch(e => setError(e))
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, setLoading, error, mostViewed }}>
      {children}
    </ProductsContext.Provider>
  )
}
