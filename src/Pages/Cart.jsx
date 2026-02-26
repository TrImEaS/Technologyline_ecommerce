import { useEffect, useState } from 'react'
import { useCart } from '../Context/CartContext'
import { FaExclamationTriangle, FaInfoCircle, FaShippingFast, FaTrash } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuth } from '../Context/AuthContext'
import useFormattedPrice from '../Utils/useFormattedPrice'
import useDocumentTitle from '../Utils/useDocumentTitle'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function Cart () {
  const { userData, userIsLoged, CPValues, calculateShipping } = useAuth()
  const { cartProducts, getTotalOfProducts, deleteOneProductOfCart, addProductToCart, deleteProductOfCart, cleanCart } = useCart()
  const [price, setPrice] = useState(1)
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [shipment, setShipment] = useState(0)
  const [shippingResult, setShippingResult] = useState(null)
  const [loadingShipping, setLoadingShipping] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [clientData, setClientData] = useState({
    fullname: '',
    dni: '',
    address: '',
    location: '',
    email: '',
    postalCode: '',
    phone: ''
  })

  const navigate = useNavigate()

  useDocumentTitle('Carrito de compras')

  // 1. Calculamos el volumen total
  const totalVolume = cartProducts.reduce((acc, p) => acc + (parseFloat(p.volume || 0) * +p.quantity_selected), 0);

  // 2. Verificamos si hay algún producto con volumen 0 o no definido
  const hasMissingVolume = cartProducts.some(p => !p.volume || parseFloat(p.volume) === 0);

  // 3. Recargo del 2% solo si elige cuotas
  const shippingSurcharge = [3, 4, 5, 6].includes(price) ? 1.02 : 1.0;

  // 4. Valores finales para el total
  const finalShippingValue = shippingResult ? (shippingResult.total * shippingSurcharge) : 0;
  const subtotalProducts = cartProducts.reduce((acc, p) => acc + (parseFloat(p[`price_list_${price}`]) * +p.quantity_selected), 0);
  const totalPrice = subtotalProducts + finalShippingValue;

  // const totalPrice = cartProducts.reduce((acc, p) => acc + (parseFloat(p[`price_list_${price}`]) * +p.quantity_selected), 0)

  useEffect(() => {
    if (hasMissingVolume) {
      setShippingResult(null);
      setLoadingShipping(false);
      return;
    }

    // Solo calculamos si la opción es 1 (Factura) o 2 (Domicilio)
    if (shipment === 1 || shipment === 2) {
      const cpToCalculate = shipment === 1 ? clientData.postalCode : postalCode
      
      if (!cpToCalculate || cpToCalculate.length < 4) {
        setShippingResult(null)
        return
      }

      setLoadingShipping(true)
      setNotFound(false)

      const delayDebounceFn = setTimeout(() => {
        // Usamos el totalVolume calculado arriba
        const result = calculateShipping(totalVolume, cpToCalculate, CPValues)

        if (result) {
          setShippingResult(result)
          setNotFound(false)
        } else {
          setShippingResult(null)
          setNotFound(cpToCalculate.length >= 4)
        }
        setLoadingShipping(false)
      }, 800)

      return () => clearTimeout(delayDebounceFn)
    } else {
      // Si retira en local o no eligió nada, limpiamos
      setShippingResult(null)
      setNotFound(false)
    }
  }, [shipment, postalCode, clientData.postalCode, totalVolume, CPValues])

  useEffect(() => {
    if (userData.email) {
      setClientData({
        fullname: userData.fullname,
        dni: userData.dni,
        address: userData.address,
        location: userData.location,
        email: userData.email,
        postalCode: userData.postal_code,
        phone: userData.phone
      })
    }
  }, [userData])

  useEffect(() => {
    if (!userIsLoged) {
      const redirectToLogin = async () => {
        const result = await Swal.fire({
          title: 'Atención',
          text: 'Para poder ver carrito y finalizar el pedido debes iniciar sesión.',
          icon: 'warning',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Iniciar sesión',
          customClass: {
            confirmButton: 'bg-page-blue-normal text-white px-4 py-2 rounded hover:opacity-90'
          }
        })
        if (result.isConfirmed) navigate('/login')
      }

      redirectToLogin()
    }
  }, [userIsLoged])

  useEffect(() => {
    if (shipment === 1) {
      setPostalCode(clientData.postalCode)
      setAddress(clientData.address)
    } else if (shipment === 3) {
      setPostalCode('---')
      setAddress('---')
    } else {
      setPostalCode('')
      setAddress('')
    }
  }, [shipment])

  const handleSubmit = async () => {
    const mails = [
      'subsistemas@real-color.com.ar',
      'revendedores@realcolor.com.ar',
      'mercadolibre4@real-color.com.ar',
      'p.camio@real-color.com.ar'
    ]

    if (!clientData?.email) {
      return Swal.fire('Atención', 'Tu sesión expiró, vuelve a iniciar sesión', 'warning')
    }

    if (!price || !address || !postalCode || !clientData.address || !clientData.fullname || !clientData.dni || !clientData.postalCode || !clientData.phone) {
      return Swal.fire('Atención', 'Faltan campos a completar', 'warning')
    }

    // Mostrar loader mientras se procesa
    Swal.fire({
      title: 'Procesando pedido...',
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const orderMovementRes = await axios.get(`${API_URL}/api/page/getOrderMovement`)
      if (orderMovementRes.status !== 200) { throw new Error('Error obteniendo número de orden') }

      const orderMovement = orderMovementRes.data.movement.toString().padStart(8, '0')
      const datos_de_orden = {
        movimiento_numero: orderMovement,
        client_email: userData.email,
        company: 'Technology line',
        footer_img: 'https://technologyline.com.ar/banners-images/Assets/logo-tlineNew.svg',
        datos_cliente: {
          nombre_completo: clientData.fullname,
          dni: clientData.dni,
          direccion: clientData.address,
          location: clientData.location,
          cp: clientData.postalCode,
          celular: clientData.phone,
          email: clientData.email
        },
        productos: cartProducts.map(p => ({
          sku: p.sku,
          descripcion: p.name,
          precio: parseFloat(p[`price_list_${price}`]),
          cantidad_seleccionada: p.quantity_selected
        })),
        opcion_de_entrega: {
          retira_en_local: shipment === 3 ? 'Retira en local' : 'No',
          cp: postalCode || '-',
          direccion: address || '-'
        },
        total: totalPrice,
        abona_en:
          price === 1
            ? '1 Pago Débito - Crédito'
            : price === 2
              ? 'Efectivo - Transferencia'
              : price === 3
                ? '3 cuotas fijas'
                : price === 4
                  ? '6 cuotas fijas'
                  : price === 5
                    ? '9 cuotas fijas'
                    : price === 6 ? '12 cuotas fijas' : ''
      }

      const mailRes = await axios.post(`${API_URL}/api/page/sendOrderEmail`, { datos_de_orden, mails })

      if (mailRes.status === 403) {
        throw { response: { status: 403 } }
      }

      if (mailRes.status !== 200) { throw new Error('Error enviando el correo') }

      const setOrderRes = await axios.post(`${API_URL}/api/page/setOrderMovement`)
      if (setOrderRes.status !== 200) { throw new Error('Error actualizando el número de orden') }

      Swal.fire({
        title: 'Orden enviada con éxito',
        text: `¡Gracias por elegirnos! Su pedido #${orderMovement} esta siendo procesado, para finalizar su compra un operador se pondra en contacto via Whatsapp (De Lunes a Viernes de 09:00 a 18:00hs), de no recibir respuesta, en las proximas 24hs hábiles puede llamar a este numero: 1133690584. Hemos enviado el detalle completo de su pedido a su correo electrónico, de no encontrarlo, por favor revise su carpeta de correo no deseado o spam.`,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar'
      })

      cleanCart()
      navigate('/')
    } catch (error) {
      console.error(error)

      let errorMessage = 'Lo sentimos, ocurrió un error inesperado. Intente más tarde.'

      if (error.response && error.response.status === 403) {
        errorMessage = 'Excedió el límite de pedidos por hora. Intente más tarde.'
      }

      Swal.fire({
        title: 'Error al crear pedido',
        text: errorMessage,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Entendido'
      })
    }
  }

  return (
    <div className="flex flex-col w-full gap-10 pb-5 items-center min-h-[700px]">
      <section className="w-full tracking-widest flex border-b-2 border-gray-200 pt-3 pb-1 font-semibold text-xl text-gray-600 justify-center items-center">
        <h1>Carrito de compras</h1>
      </section>

      {getTotalOfProducts() === 0
        ? (
          <article className="flex w-full flex-col justify-center items-center text-center">
            <h3 className="font-bold">Tu carrito está vacío</h3>
            <span>Aún no agregaste productos al carrito.</span>
          </article>
          )
        : (
        <>
          <section className="flex flex-col rounded-lg border shadow-lg p-5 max-sm:w-[90%] w-[80%]">
            <h3 className="w-full border-b border-sky-100 tracking-wider text-lg pl-1">
              Productos
            </h3>

            {cartProducts.map(p => (
              <article
                key={p.id}
                className="flex flex-col relative gap-3 box-border border-b-2 border-sky-100 pb-5 justify-center items-center"
              >
                <section className="w-[150px]">
                  <img src={p.img_url} className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300" />
                </section>

                <NavLink to={`/products?product=${p.sku}`} className="flex flex-col justify-center items-center gap-2">
                  <span className="uppercase text-page-blue-normal font-bold">{p.brand}</span>
                  <span className="text-center tracking-wide px-5 font-medium text-gray-800 text-sm">{p.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
                </NavLink>

                <section className="w-full flex justify-center text-white items-center mt-1">
                  <button onClick={() => deleteOneProductOfCart({ productID: p.id })} className="w-8 h-7 bg-gradient-to-r from-sky-500 to-sky-600 rounded-l-md flex justify-center items-center border-0 hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-bold">-</button>
                  <span className="min-w-8 min-h-7 bg-sky-500 flex justify-center items-center border-x-0 px-2 font-medium">{p.quantity_selected}</span>
                  <button onClick={() => addProductToCart({ product: p })} className="w-8 h-7 bg-gradient-to-r from-sky-600 to-sky-500 rounded-r-md flex justify-center items-center border-0 hover:from-sky-700 hover:to-sky-600 transition-all duration-300 font-bold">+</button>
                </section>

                <button
                  className="absolute top-2 right-2 hover:text-red-500 duration-300"
                  onClick={() => deleteOneProductOfCart({ productID: p.id, quantity: 99999999999 })}
                >
                  <FaTrash/>
                </button>
              </article>
            ))}
          </section>

          <section className="flex flex-col rounded-lg border gap-3 shadow-lg p-5 max-sm:w-[90%] w-[80%]">
            <h3 className="w-full border-b border-sky-100 tracking-wider text-lg pl-1">
              Datos para facturacion <b>*</b>
            </h3>

            <>
              <label htmlFor="Nombre completo" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="Nombre completo"
                  value={clientData.fullname || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, fullname: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="Nombre completo"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Nombre completo <b>*</b>
                </span>
              </label>

              <label htmlFor="DNI" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="DNI"
                  value={clientData.dni || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, dni: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="DNI"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  DNI <b>*</b>
                </span>
              </label>

              <label htmlFor="Address" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="Address"
                  value={clientData.address || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, address: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="Address"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Direccion <b>*</b>
                </span>
              </label>

              <label htmlFor="Location" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="Location"
                  value={clientData.location || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, location: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="Localidad"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Localidad <b>*</b>
                </span>
              </label>

              <label htmlFor="CodigoPostal" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="CodigoPostal"
                  value={clientData.postalCode || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="CodigoPostal"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Codigo Postal <b>*</b>
                </span>
              </label>

              <label htmlFor="Phone" className="relative flex rounded-md items-center px-2 border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="Phone"
                  value={clientData.phone || ''}
                  onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent h-14 px-3 focus:ring-0 placeholder:text-xs outline-none"
                  placeholder="Phone"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Celular <b>*</b>
                </span>
              </label>

              <label htmlFor="Email" className="relative flex rounded-md items-center px-2 border border-gray-200 bg-opacity-55 text-opacity-55 shadow-xs ">
                <input
                  type="email"
                  id="Email"
                  value={clientData.email}
                  onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                  className="peer bg-transparent border-transparent w-full placeholder-transparent cursor-default h-14 px-3 focus:ring-0 placeholder:text-xs text-gray-600 outline-none"
                  placeholder="Email"
                  readOnly
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Email
                </span>
              </label>
            </>
          </section>

          <section className="flex flex-col rounded-lg border gap-3 shadow-lg p-5 max-sm:w-[90%] w-[80%]">
            <h3 className="w-full border-b border-sky-100 tracking-wider text-lg pl-1">
              Opciones de entrega <b>*</b>
            </h3>

            <fieldset>
              <div className="mt-4 space-y-2">
                <label htmlFor="delivery_factura" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="delivery_factura"
                      name="delivery_factura"
                      onChange={() => setShipment(1)}
                      checked={shipment === 1}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">Usar mismos datos de la factura</span>
                  </div>
                </label>

                <label htmlFor="delivery" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="delivery"
                      name="delivery"
                      onChange={() => setShipment(2)}
                      checked={shipment === 2}
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-light text-gray-700">Envío a domicilio</span>
                  </div>
                </label>

                <label htmlFor="local" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="local"
                      name="local"
                      onChange={() => setShipment(3)}
                      checked={shipment === 3}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">Retiro en local</span>
                  </div>
                </label>
              </div>
            </fieldset>

            {shipment === 1 || shipment === 2 ? (
              <div className='mt-4 max-w-[400px] space-y-3'>
                {shipment === 2 && (
                  <div className="flex flex-col gap-3">
                    <label htmlFor="Codigo postal" className="relative flex rounded-md items-center px-2 max-w-[580px] border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                      <input
                        type="number"
                        id="Codigo postal"
                        value={postalCode}
                        onKeyDown={(e) => ['.', ',', '-', 'e'].includes(e.key) && e.preventDefault()}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="peer bg-transparent border-transparent w-full h-14 px-3 outline-none"
                        placeholder="Codigo postal"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Codigo postal de envío <b>*</b>
                      </span>
                      <FaShippingFast className="text-2xl text-page-blue-normal"/>
                    </label>

                    <label htmlFor="Direccion" className="relative flex rounded-md items-center px-2 max-w-[580px] border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                      <input
                        type="text"
                        id="Direccion"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="peer bg-transparent border-transparent w-full h-14 px-3 outline-none"
                        placeholder="Direccion"
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Direccion de entrega <b>*</b>
                      </span>
                    </label>
                  </div>
                )}

                {/* VISUALIZACIÓN DEL RESULTADO DEL ENVÍO */}
                <div className='bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm'>
                  <div className='p-4 min-h-[80px] flex items-center justify-center'>
                    {loadingShipping ? (
                      <div className='flex flex-col items-center gap-2'>
                        <span className='text-[10px] text-slate-400 animate-pulse'>Calculando costo de envío...</span>
                      </div>
                    ) : hasMissingVolume ? (
                      /* CASO: PRODUCTO SIN VOLUMEN CARGADO */
                      <div className='flex flex-col items-center gap-2 bg-amber-50 p-3 rounded-lg w-full border border-amber-100'>
                        <p className='text-xs font-bold text-amber-700 text-center uppercase tracking-tighter leading-tight'>
                          No podemos calcular el costo de envío automáticamente
                        </p>
                        <a 
                          href="https://wa.me/5491131019901" 
                          target="_blank" 
                          rel="noreferrer"
                          className='text-[11px] bg-green-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-green-600 transition-colors shadow-sm'
                        >
                          CONSULTA POR WPP
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
                      <div className='w-full flex flex-col gap-1'>
                        <div className='flex justify-between items-center'>
                          <div className='flex flex-col'>
                            <span className='text-xs text-slate-500 uppercase font-bold tracking-tighter'>Costo de Envío:</span>
                          </div>
                          <span className='text-lg font-black text-page-blue-normal'>
                            ${(shippingResult.total * shippingSurcharge).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <p className='text-[12px] text-slate-500'>
                          Entrega estimada: <b>{shippingResult.time} días hábiles</b> a CP {shipment === 1 ? clientData.postalCode : postalCode}.
                        </p>
                      </div>
                    ) : (
                      <p className='text-xs text-slate-400 italic'>Ingresá un CP para cotizar el envío.</p>
                    )}
                  </div>
                </div>
              </div>
            ) : shipment === 3 ? (
              <article className="flex tracking-tight flex-col gap-3 pt-3">
                <p className="flex flex-col text-gray-800 text-sm">
                  <span><b>(*) Direccion:</b> Roma 560 (unidad 8), Versalles, Liniers</span>
                  <span><b>(*) Horarios:</b> Lunes a viernes de 09:00 a 18:00hs</span>
                </p>
                <div className='flex items-center gap-2 bg-blue-50 p-2 rounded'>
                  <FaInfoCircle className='text-page-blue-normal'/>
                  <span className="text-[12px] text-gray-700 tracking-wider">Sin costo adicional por retiro.</span>
                </div>
              </article>
            ) : null}
          </section>

          <section className="flex flex-col rounded-lg border gap-3 shadow-lg p-5 max-sm:w-[90%] w-[80%]">
            <h3 className="w-full border-b border-sky-100 tracking-wider text-lg pl-1">
              Pago <b>*</b>
            </h3>

            <fieldset>
              <div className="mt-4 space-y-2">
                <label htmlFor="cash" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="cash"
                      name="cash"
                      onChange={() => setPrice(2)}
                      checked={price === 2}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">Efectivo o Transferencia desde CBU/CVU o Depósito bancario</span>
                  </div>
                </label>

                <label htmlFor="lista" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="lista"
                      name="lista"
                      onChange={() => setPrice(1)}
                      checked={price === 1}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">Un pago con debito o credito</span>
                  </div>
                </label>

                <label htmlFor="threeQuotes" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="threeQuotes"
                      name="threeQuotes"
                      onChange={() => setPrice(3)}
                      checked={price === 3}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">3 cuotas fijas</span>
                  </div>
                </label>

                <label htmlFor="sixQuotes" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="sixQuotes"
                      name="sixQuotes"
                      onChange={() => setPrice(4)}
                      checked={price === 4}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">6 cuotas fijas</span>
                  </div>
                </label>

                <label htmlFor="nineQuotes" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="nineQuotes"
                      name="nineQuotes"
                      onChange={() => setPrice(5)}
                      checked={price === 5}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">9 cuotas fijas</span>
                  </div>
                </label>

                <label htmlFor="twelveQuotes" className="flex cursor-pointer items-start gap-4">
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="radio"
                      className="size-4 rounded-sm border-gray-300"
                      id="twelveQuotes"
                      name="twelveQuotes"
                      onChange={() => setPrice(6)}
                      checked={price === 6}
                    />
                  </div>

                  <div>
                    <span className="font-light text-gray-700">12 cuotas fijas</span>
                  </div>
                </label>
              </div>
            </fieldset>

            <footer className="flex flex-col w-full items-center justify-center">
              <h3 className="text-xl text-page-blue-normal">Total:</h3>
              <span className="font-bold text-2xl text-page-blue-normal">$ {useFormattedPrice(totalPrice)}</span>
            </footer>

            {/* {price === 2 &&
              <div className="flex items-center gap-2">
                <b className="bg-yellow-400 rounded-full text-white border-yellow-400 border-2 text-lg"><FaInfoCircle/></b>
                <span className="text-sm">¡Importante! La cuenta desde la que transfieras debe coincidir con tu cuenta de facturación.</span>
              </div>
            } */}
          </section>

          <button onClick={handleSubmit} className="flex flex-col justify-center items-center rounded-lg border shadow-lg h-16 w-full bg-gradient-to-l from-sky-400 to-sky-800 text-white hover:brightness-125 max-w-[360px]">
            Generar pedido
          </button>
        </>
          )
      }
    </div>
  )
}
