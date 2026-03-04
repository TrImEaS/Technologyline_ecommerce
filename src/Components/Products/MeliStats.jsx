import React from 'react'
import { FiAward } from 'react-icons/fi'
import { BiMessageDetail, BiTimeFive } from 'react-icons/bi'
import { FaCheckCircle } from 'react-icons/fa'

export default function MeliStats() {
  return (
    <div className="border border-gray-200 rounded-lg p-5 w-full bg-white font-sans">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full border border-gray-200 flex-shrink-0 flex items-center justify-center p-2 overflow-hidden">
          <img 
            src="https://real-color.com.ar/banners-images/Assets/logo_azulNew.svg" 
            alt="Real Color Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-[17px]">REAL-COLOR</h3>
          </div>
          <p className="text-[13px] text-gray-500 mt-1">
            <span className="font-semibold text-gray-800">+500</span> Seguidores <span className="font-semibold text-gray-800 ml-1">+100</span> Productos
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2 text-[#00a650]">
          <FiAward className="text-xl -mt-0.5" />
          <span className="font-semibold text-[15px]">Somos "MercadoLíder Platinum"</span>
        </div>
        <p className="text-gray-500 text-[13px] mt-0.5 ml-7">
          ¡Uno de los mejores del sitio!
        </p>
      </div>

      <div className="flex gap-1 mt-4 h-2.5 items-end">
        <div className="flex-1 h-[6px] bg-[#ffe0e0]"></div>
        <div className="flex-1 h-[6px] bg-[#ffebd9]"></div>
        <div className="flex-1 h-[6px] bg-[#fff2cc]"></div>
        <div className="flex-1 h-[6px] bg-[#e6f4d5]"></div>
        <div className="flex-1 h-full bg-[#00a650]"></div>
      </div>

      <div className="flex justify-between mt-5 text-center px-1">
        <div className="flex flex-col items-center flex-1">
          <span className="font-semibold text-gray-800 text-[20px] leading-tight">+5mil</span>
          <span className="text-[12px] text-gray-500 mt-1">Ventas</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative flex items-center justify-center h-[22px]">
            <BiMessageDetail className="text-[22px] text-gray-700" />
            <div className="absolute -bottom-1 -right-1.5 bg-white rounded-full p-[1px]">
               <FaCheckCircle className="text-[#00a650] text-[11px]" />
            </div>
          </div>
          <span className="text-[12px] text-gray-500 mt-1.5 leading-tight px-1">Buena atención</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="relative flex items-center justify-center h-[22px]">
             <BiTimeFive className="text-[22px] text-gray-700" />
             <div className="absolute -bottom-1 -right-1.5 bg-white rounded-full p-[1px]">
               <FaCheckCircle className="text-[#00a650] text-[11px]" />
            </div>
          </div>
          <span className="text-[12px] text-gray-500 mt-1.5 leading-tight px-1">Entrega a tiempo</span>
        </div>
      </div>

      <a 
        href="https://www.mercadolibre.com.ar/pagina/real-color?item_id=MLA1469582655&category_id=MLA431202&seller_id=109089&client=recoview-selleritems&recos_listing=true#origin=pdp&component=sellerData&typeSeller=eshop" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-6 block w-full text-center py-2.5 bg-[#eaf0ff] text-[#3483fa] font-semibold rounded-md hover:bg-[#d9e4ff] transition-colors text-[14px]"
      >
        Visitar tienda de Mercado Libre
      </a>
    </div>
  )
}
