import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import formattedPrice from "../../Utils/useFormattedPrice";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const API_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

export default function Orders() {
  const { userData, userIsLoged } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userIsLoged) {
        Swal.fire({
          title: 'Acceso denegado',
          text: 'Debes iniciar sesión para acceder a esta página.',
          icon: 'error',
          confirmButtonText: 'Iniciar sesión',
          customClass: {
            confirmButton: 'bg-page-blue-normal text-white px-4 py-2 rounded hover:opacity-90'
          }
        }).then(() => {
          window.location.href = '/login';
        });
      }
    }, 3000);

    return () => clearTimeout(timer); // limpia si se desmonta antes
  }, [userIsLoged]);


  useEffect(() => {
    if (!userData?.email) return;

    axios.get(`${API_URL}/api/page/getClientOrders?t=${new Date()}&email=${userData.email}`)
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, [userData]);

  const openOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getCLientBill = () => {
    if (selectedOrder.order_header.invoice_number !== 0 && selectedOrder.order_header.invoice_number !== null) {
      window.open(`${API_URL}/bills/client_${userData.id}/fc-${selectedOrder.order_header.invoice_number}_movement-${selectedOrder.order_header.movement}.pdf`, '_blank');
    } 
    else {
      Swal.fire({
        title: 'Disculpe',
        text: 'La factura no se encuentra disponible aun, intentelo más tarde!',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
      });
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 pb-20 w-3/4 min-h-[300px] p-4">
      <section className="flex items-center gap-2 w-full">
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount">Mi cuenta</NavLink>
        <span>&gt;</span>
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount/orders">Pedidos</NavLink>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {orders.map(o => (
          <div 
            key={o.order_header.id} 
            onClick={() => openOrder(o)}
            className="p-4 bg-white rounded-lg border shadow hover:shadow-page-blue-normal hover:shadow-sm hover:border-page-blue-normal cursor-pointer transition"
          >
            <p className="uppercase italic"><strong className="text-page-blue-normal">Pedido #{o.order_header.movement.toString().padStart(8, '0')}</strong></p>
            <p><strong className="text-page-blue-normal">Fecha:</strong> {new Date(o.order_header.date).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
            <p><strong className="text-page-blue-normal">Total:</strong> ${formattedPrice(o.order_header.total_price)}</p>
            <p><strong className="text-page-blue-normal">Estado:</strong> {o.order_header.order_state}</p>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4 bg-white rounded-lg border shadow text-center">
            <p>No tienes pedidos realizados.</p>
            <p>Cuando realices un pedido, aparecerá aquí.</p>
          </div>
        )}
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[80%] max-lg:w-[95%] min-h-[80vh] justify-between max-h-[90vh] flex flex-col p-8 max-sm:p-5 rounded-lg shadow-lg overflow-auto">
            <div className="flex-col relative flex gap-6 w-full">
              <div className="absolute right-2">
                <button onClick={() => setShowModal(false)} className="text-blue-500 hover:text-blue-700 text-2xl duration-300">
                  <FaTimesCircle />
                </button>
              </div>

              <div className="">
                <h2 className="text-xl tracking-wide"><strong className="text-page-blue-normal">Pedido #{selectedOrder.order_header.movement.toString().padStart(8, '0')}</strong></h2>
                <h2 className="text-xl tracking-wide"><strong className="text-page-blue-normal">Estado:</strong> <span className="uppercase text-base font-bold text-gray-600">{selectedOrder.order_header.order_state}</span></h2>
              </div>
              
              {/* Datos del cliente */}
              <div>
                <h2 className="text-lg text-page-blue-normal"><strong>Datos de pedido:</strong></h2>
                <p className="text-sm max-sm:text-[12px]"><strong className="text-page-blue-normal">-Dirección de facturacion:</strong> {userData.address}, CP {userData.postal_code}</p>
                <p className="text-sm max-sm:text-[12px]"><strong className="text-page-blue-normal">-Dirección de entrega:</strong> {selectedOrder.order_header.address}</p>
                <p className="text-sm max-sm:text-[12px]"><strong className="text-page-blue-normal">-Condición de venta:</strong> {selectedOrder.order_header.payment}</p>
                <p className="text-sm max-sm:text-[12px]"><strong className="text-page-blue-normal">-Fecha de pedido:</strong> {new Date(selectedOrder.order_header.date).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
                <p className="text-sm max-sm:text-[12px]"><strong className="text-page-blue-normal">-Precio total:</strong> ${formattedPrice(selectedOrder.order_header.total_price)}</p>
              </div>

              {/* Detalles */}
              <div className="flex flex-col w-full">
                <h2 className="text-lg text-page-blue-normal"><strong>Detalle de pedido:</strong></h2>

                {/* Card layout for mobile */}
                <div className="flex flex-col gap-4 sm:hidden">
                  {selectedOrder.order_details.map((d, i) => (
                    <div key={i} className="border-b first:border-t border-page-blue-normal p-3 text-sm max-md:text-[12px]">
                      <p><strong className="text-page-blue-normal">SKU:</strong> {d.sku}</p>
                      <p><strong className="text-page-blue-normal">Descripción:</strong> <span className="tracking-tight">{d.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span></p>
                      <p><strong className="text-page-blue-normal">Cantidad:</strong> {d.quantity}</p>
                      <p><strong className="text-page-blue-normal">Precio:</strong> ${formattedPrice(d.price)}</p>
                    </div>
                  ))}
                </div>

                {/* Table layout for desktop */}
                <table className="w-full mb-4 text-left hidden sm:table">
                  <thead>
                    <tr>
                      <th className="p-2 text-sm max-md:text-[12px] text-page-blue-normal">SKU</th>
                      <th className="p-2 text-sm max-md:text-[12px] text-page-blue-normal">DESCRIPCION</th>
                      <th className="p-2 text-sm max-md:text-[12px] text-page-blue-normal text-center">CANTIDAD</th>
                      <th className="p-2 text-sm max-md:text-[12px] text-page-blue-normal text-center">PRECIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.order_details.map((d, i) => (
                      <tr key={i} className="border-t border-page-blue-normal">
                        <td className="p-2 text-xs max-md:text-[10px]">{d.sku}</td>
                        <td className="p-2 text-xs max-md:text-[10px] tracking-tight">{d.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</td>
                        <td className="p-2 text-xs max-md:text-[10px] text-center">{d.quantity}</td>
                        <td className="p-2 text-xs max-md:text-[10px] text-center">${formattedPrice(d.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="h-full flex items-end justify-center mt-4">
              <button
                title="Descargar factura"
                className={`${selectedOrder.order_header.invoice_number === 0 ? 'bg-blue-600/50 hover:bg-blue-700/50' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded duration-300 disabled:opacity-50`}
                onClick={getCLientBill}
              >
                Descargar factura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
