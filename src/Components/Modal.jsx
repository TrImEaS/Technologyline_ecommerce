import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Modal ({ progress, product, toAdd = 1 }) {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (progress === 1 && product) {
      setVisible(true)
    }

    setTimeout(() =>
      setVisible(false)
    , 3000)
  }, [progress, product])

  const handleGoToCart = () => navigate('/cart')

  return (
    <div className={`fixed top-2 right-0 z-50 flex rounded-md modal bg-white w-full max-w-[320px] shadow-lg border-2 ${toAdd ? 'border-page-lightblue' : 'border-red-400'} transition-all duration-300 ease-in-out transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'}`}>
      <main className="flex flex-col w-full h-full items-center gap-3 justify-between relative py-3">
        <header className={`${toAdd ? 'text-page-lightblue' : 'text-red-500'} font-bold w-full text-center text-sm leading-tight px-3`}>
          {toAdd ? '¡Producto agregado con éxito al carrito!' : '¡Producto eliminado del carrito con éxito!'}
        </header>

        <section className="flex justify-between w-full px-3 items-center">
          <div className="w-[35%] flex justify-center">
            <img src={product.img_url} className="w-[70px] h-[70px] object-cover rounded-md shadow-sm" />
          </div>
          <p className="w-[60%] flex flex-col font-semibold text-xs">
            <span className={`${toAdd ? 'text-page-blue-normal' : 'text-red-500'} uppercase font-bold`}>{product.brand}</span>
            <span className="text-gray-800 truncate whitespace-normal">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
          </p>
        </section>

        {toAdd && (
          <button
            onClick={handleGoToCart}
            className="bg-page-blue-normal hover:bg-page-lightblue text-white font-bold py-2 px-4 rounded-md w-[90%] text-sm transition-colors duration-300"
          >
            Finalizar Pedido
          </button>
        )}

        <footer className="w-full bg-gray-200 h-1.5 mt-1">
          <div className={`h-full ${toAdd ? 'bg-page-lightblue' : 'bg-red-400'}`} style={{ width: `${progress}%`, transition: 'width 3s ease-out' }} />
        </footer>

        {/* <span className={`${toAdd ? 'text-sky-500' : 'text-red-500'} font-bold absolute top-[40%] left-2 text-sm`}>{toAdd ? '+1' : '-1'}</span> */}
      </main>
    </div>
  )
}
