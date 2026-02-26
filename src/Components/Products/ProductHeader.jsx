import { useCart } from '../../Context/CartContext'
import ImageSlider from './ImageSlider'
import Spinner from './Spinner'
import useFormattedPrice from '../../Utils/useFormattedPrice'
import { FaCartPlus } from 'react-icons/fa'
import { useAuth } from '../../Context/AuthContext'
import { useEffect, useState } from 'react'
import { FaTruck, FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

export default function ProductHeader ({ product, loading }) {
  const { addProductToCart, completeOrder } = useCart()
  const { postalCode, CPValues, calculateShipping} = useAuth()
  const [userCP, setUserCP] = useState(postalCode || '');
  const [shippingResult, setShippingResult] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const hasNoVolume = !product.volume || parseFloat(product.volume) === 0 || product.volume === '';

  useEffect(() => {
    // Si no hay volumen, limpiamos estados y no calculamos
    if (hasNoVolume) {
      setShippingResult(null);
      setNotFound(false);
      return;
    }

    if (userCP.length < 4) {
      setShippingResult(null);
      setNotFound(false);
      return;
    }

    setLoadingShipping(true);
    setNotFound(false);

    const delayDebounceFn = setTimeout(() => {
      // IMPORTANTE: Asegúrate de pasar 'userCP' como segundo argumento
      const result = calculateShipping(product.volume, userCP, CPValues);

      if (result) {
        setShippingResult(result);
        setNotFound(false);
      } else {
        setShippingResult(null);
        setNotFound(true);
      }
      setLoadingShipping(false);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [userCP, CPValues, product.volume, hasNoVolume]);

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
        {product.pre_sell === 1 && (
          <span className='absolute top-0 max-md:text-base max-md:-top-3 max-md:px-6 right-4 italic bg-red-400 tracking-widest text-white text-2xl px-10 font-semibold py-1 rounded'>
            PREVENTA
          </span>
        )}
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

        {/* SECCIÓN DE ENVÍO */}
        <div className='w-full my-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
          <div className='p-4 bg-white border-b border-slate-100'>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2 text-page-blue-normal'>
                <FaTruck className='text-lg' />
                <span className='text-xs font-bold uppercase tracking-wider'>Calcular envío</span>
              </div>
              
              <div className='relative flex items-center'>
                <FaMapMarkerAlt className='absolute left-3 text-slate-400 text-sm' />
                <input 
                  type="number" 
                  value={userCP}
                  min="0"
                  step="1" // Refuerza que sean enteros
                  onKeyDown={(e) => {
                    // Bloquea el punto (.), la coma (,), el signo menos (-) y la 'e' (exponenciales)
                    if (['.', ',', '-', 'e', 'E'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Solo actualiza si el valor es una cadena de dígitos vacía o numérica
                    if (/^\d*$/.test(val)) {
                      setUserCP(val);
                    }
                  }}
                  className='w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-page-blue-normal outline-none transition-all'
                  placeholder="Ingresá tu CP..."
                />
              </div>
            </div>
          </div>

          <div className='p-4 min-h-[80px] flex items-center justify-center'>
            {loadingShipping ? (
              <div className='flex flex-col items-center gap-2'>
                <span className='text-[10px] text-slate-400 animate-pulse'>Calculando costos...</span>
              </div>
            ) : hasNoVolume ? (
              /* MENSAJE DE WHATSAPP SI NO HAY VOLUMEN */
              <div className='flex flex-col items-center gap-2 bg-amber-50 p-3 rounded-lg w-full border border-amber-100'>
                <p className='text-[11px] font-bold text-amber-700 text-center uppercase tracking-tighter leading-tight'>
                  Lo sentimos, no pudimos calcular el envío automáticamente
                </p>
                <a 
                  href="https://wa.me/5491131019901" 
                  target="_blank" 
                  rel="noreferrer"
                  className='text-[10px] bg-green-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-green-600 transition-colors shadow-sm'
                >
                  CONSULTAR POR WHATSAPP
                </a>
              </div>
            ) : notFound ? (
              <div className='flex items-center gap-3 bg-red-50 p-3 rounded-lg w-full border border-red-100'>
                <FaExclamationTriangle className='text-red-400 text-xl' />
                <div>
                  <p className='text-xs font-bold text-red-700'>Lo sentimos, no llegamos a tu zona.</p>
                  <p className='text-[10px] text-red-500'>Probá con otro código postal cercano.</p>
                </div>
              </div>
            ) : shippingResult ? (
              <div className='w-full space-y-2'>
                <div className='flex flex-col justify-between items-center'>
                  <div className='flex flex-col items-center w-full'>
                    <span className='text-[11px] uppercase font-bold text-slate-400'>Costo estimado</span>
                    <span className='text-2xl font-black text-slate-800'>
                      ${shippingResult.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className='text-[11px] uppercase font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full'>
                    Llega en {shippingResult.time} días
                  </span>
                </div>
              </div>
            ) : (
              <p className='text-xs text-slate-400 text-center italic'>
                Ingresá un CP válido para ver opciones de entrega.
              </p>
            )}
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
