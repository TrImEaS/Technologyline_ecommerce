import { useCart } from '../../Context/CartContext'
import ImageSlider from './ImageSlider'
import Spinner from './Spinner'
import useFormattedPrice from '../../Utils/useFormattedPrice'
import { FaCartPlus } from 'react-icons/fa'

export default function ProductHeader ({ product, loading }) {
  const { addProductToCart, completeOrder } = useCart()

  const handleStockQuantity = () => {
    const quantity = product.stock
    if (quantity === 1) {
      return (
        <span className='text-red-600'>
          Ultima unidad
        </span>
      )
    }

    if (quantity < 5) {
      return (
        <span className='text-orange-400 font-semibold'>
          Bajo
        </span>
      )
    }

    if (quantity < 10) {
      return (
        <span className='text-yellow-400 font-semibold'>
          Medio
        </span>
      )
    }

    return (
      <span className='text-green-600 font-semibold'>
        Alto
      </span>
    )
  }

  return (
    <header className='w-[100%] relative h-full flex max-md:flex-col max-md:items-center sm:p-5 rounded-3xl py-5 max-sm:pt-10 sm:gap-5'>
      {/* <img className="absolute top-12 right-8 object-contain h-12 w-12 rounded-lg" src="https://technologyline.com.ar//banners-images/Assets/sale-icon.svg"/> */}
      {/* <img src='https://technologyline.com.ar/banners-images/Assets/cyber2025.webp' className='absolute h-12 top-12 right-8'/> */}

      <section className='relative w-[60%] max-md:w-full h-full sm:mt-5 sm:min-h-[620px] min-h-[500px] sm:pb-10 sm:p-5 max-sm:px-1 rounded-lg'>
        <span className='text-sm tracking-wide w-full'>
          SKU: {product.sku}
        </span>

        <h1 className='text-2xl font-semibold max-sm:text-xl mb-5'>
          {product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}
        </h1>

        {loading
          ? <div><Spinner /></div>
          : <ImageSlider loadedImages={product.img_urls}/>
        }

        {/* { product.brand.toLowerCase() === 'drean' &&
          <img src='https://technologyline.com.ar/banners-images/Assets/DREAN_WEEK.svg' className='absolute h-8 top-0 right-3'/>
        } */}
      </section>

      <section className='flex tracking-wider flex-col w-[40%] mt-5 min-h-[620px] max-sm:min-h-[500px] justify-center items-center h-fit max-md:w-full border rounded-lg p-8 max-sm:py-5 sm:mb-10 shadow-lg'>
        <div className='min-h-[200px] flex flex-col gap-y-2'>
          <div className='flex flex-col w-full gap-y-3 justify-center'>
            <section className='flex flex-col items-center text-lg w-full gap-2 border-b pb-3 border-dashed border-page-blue-normal'>
              <div className='flex flex-col text-center text-[#333333] tracking-widest mb-2 text-2xl'>
                <span>
                  PRECIO LISTA
                </span>
                <span>
                  <b className='font-semibold text-[#333333]'>{`$${useFormattedPrice(product.price_list_1)}`}</b>
                </span>

                <p className='flex text-center text-[#888] tracking-widest text-xs'>
                  <span>
                    PRECIO LISTA S/IMP. NAC.
                  </span>
                  <span>
                    <b className='text-xs text-[#888]'>{`$${useFormattedPrice(product.price_list_1 / ((product.tax_percentage / 100) + 1))}`}</b>
                  </span>
                </p>
              </div>

              <div className='flex font-semibold text-red-600 flex-col text-center items-center text-base tracking-tighter'>
                <span>PROMO: EFECTIVO / TRANSFERENCIA BANCARIA: </span>
                <p className='pl-5 font-semibold flex gap-1 text-[#15803d] items-center tracking-normal'>
                  <span>{`$${useFormattedPrice(product.price_list_2)}`}</span>
                  <span className='text-xs text-[#dc7b26]'>(Ahorras: ${((product.price_list_2 - product.price_list_1) * -1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
                </p>
              </div>
            </section>

            <section className='flex flex-col items-center mb-5 w-full gap-y-3 justify-center'>
              <span className='font-bold text-[#2563eb]'>¡Opcion de compra en cuotas fijas!</span>

              <article className='flex flex-col'>
                <p className='flex w-fit justify-center gap-1 p-1'>
                  <span className='text-[#1e40af] font-semibold'>3</span>
                  <span className='text-[#1e40af]'>cuotas</span>
                  <span>de:</span>
                  <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_3) / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </p>
              </article>

              <article className='flex flex-col'>
                <p className='flex w-fit justify-center gap-1 p-1'>
                  <span className='text-[#1e40af] font-semibold'>6</span>
                  <span className='text-[#1e40af]'>cuotas</span>
                  <span>de:</span>
                  <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_4) / 6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </p>
              </article>

              <article className='flex flex-col'>
                <p className='flex w-fit justify-center gap-1 p-1'>
                  <span className='text-[#1e40af] font-semibold'>9</span>
                  <span className='text-[#1e40af]'>cuotas</span>
                  <span>de:</span>
                  <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_5) / 9).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </p>
              </article>

              <article className='flex flex-col'>
                <p className='flex w-fit justify-center gap-1 p-1'>
                  <span className='text-[#1e40af] font-semibold'>12</span>
                  <span className='text-[#1e40af]'>cuotas</span>
                  <span>de:</span>
                  <span className='text-[#1e40af] font-semibold'>{`$${(parseFloat(product.price_list_6) / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </p>

              </article>

              <ul className="flex text-3xl max-[1500px]:ml-0 gap-x-4">
                <img className='bg-gray-700 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon2.svg'/>
                <img className='bg-red-600 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon3.svg'/>
                <img className='bg-blue-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon4.svg'/>
                <img className='bg-yellow-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon5.svg'/>
                <img className='bg-orange-500 rounded-lg w-[45px] h-[30px]' src='https://technologyline.com.ar/banners-images/Assets/Some-icons/card-icon1.svg'/>
              </ul>
            </section>
          </div>
        </div>

        <div className='w-full flex max-md:justify-center flex-col gap-5 items-center'>
          <span className='text-sm uppercase tracking-widest font-semibold text-gray-700'>
            DISPONIBILIDAD: {handleStockQuantity()}
          </span>
          <button
            onClick={() => completeOrder({ product })}
            className='max-sm:hidden bg-page-blue-normal active:text-sm active:duration-0 rounded-xl flex items-center justify-center text-sm font-bold bg-gradient-to-l from-sky-400 to-sky-800 duration-300 border border-gray-300 text-white py-1 px-2 w-[90%] h-[50px] cart hover:brightness-105'
          >
            REALIZAR PEDIDO
          </button>
          <button
            onClick={() => addProductToCart({ product })}
            className='max-sm:hidden gap-3 bg-blue-200 active:text-sm active:duration-0 rounded-xl flex items-center justify-center text-sm font-bold duration-300 border border-gray-300 text-page-blue-normal py-1 px-2 w-[90%] h-[50px] cart hover:brightness-105'
          >
            <FaCartPlus className="text-xl max-sm:text-lg"/>
            <span>AGREGAR AL CARRITO</span>
          </button>
        </div>
      </section>
    </header>
  )
}
