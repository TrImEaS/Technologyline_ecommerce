import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Spinner from './Products/Spinner'

export default function ProductCard({ img, price, name, sku }) {
  const imageNotFound = 'https://ih1.redbubble.net/image.1893341687.8294/fposter,small,wall_texture,product,750x1000.jpg'
  const maxNameLength = 50
  const limitedName = name.length > maxNameLength ? `${name.substring(0, maxNameLength)}...`: name
  const formattedPrice = parseInt(price).toLocaleString(undefined)
  const [imageSrc, setImageSrc] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleImageLoad = () => {
    setLoading(false)
  }

  const handleImageError = () => {
    setLoading(false)
    setError(true)
  }

  useEffect(() => {
    fetch(`https://technologyline.com.ar/products-images/${img}.jpg`)
      .then(response => {
        if (response.ok) {
          setImageSrc(`https://technologyline.com.ar/products-images/${img}.jpg`)
          setLoading(false)
        } else {
          setLoading(false)
          setError(true)
        }
      })
      .catch(error => {
        console.error('Error checking image:', error)
        setLoading(false)
        setError(true)
      })
  }, [img])

  return(
    <NavLink
      to={`/products/?product=${sku}`} 
      className="flex flex-col box-border items-center justify-between bg-white p-2 drop-shadow-xl hover:border-[#333] duration-500 border-2 rounded-xl hover:cursor-pointer min-h-[400px] h-[400px] w-[270px] min-w-[270px]">
      <header className="w-full h-[55%] box-border">
        {loading && <Spinner />}
        {error && 
          <img 
            src={img} 
            alt="Image not found"
            loading="lazy" 
            className={`w-full h-full object-cover rounded-lg`}/>
        }
        {!loading && !error && (
          <img 
            src={imageSrc}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            alt={name}
            className={`w-full h-full object-contain rounded-lg`} 
          />
        )}
      </header>

      <article className="w-full h-[35%] box-border flex flex-col justify-between">
        <p>{limitedName}</p>
        <p className="font-bold text-2xl">${formattedPrice}</p>
      </article>
    </NavLink>
  )
}