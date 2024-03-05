import React, { useState } from 'react'

export default function Products (product) {
  const [selectedImg, setSelectedImg] = useState("https://http2.mlstatic.com/D_NQ_NP_622122-MLU74089433592_012024-O.webp")


  return (
    <section className='flex flex-col h-full w-3/4'>
      
      <header className='w-full flex justify-center items-center min-h-[500px]'>
        {/*Item Image section*/} 
        <section className='flex w-1/2 h-full'>
          <aside className='flex flex-col w-[30%] h-full gap-y-3'>
            <article className='w-[130px] h-[130px] box-border cursor-pointer rounded-lg 
            hover:shadow-md hover:shadow-page-lightblue duration-300'>
              <img 
                src="https://http2.mlstatic.com/D_NQ_NP_622122-MLU74089433592_012024-O.webp" 
                className="w-full h-full border-2 border-gray-400 rounded-lg object-contain"
              />
            </article>
            <article className='w-[130px] h-[130px] box-border cursor-pointer rounded-lg 
            hover:shadow-md hover:shadow-page-lightblue duration-300'>
              <img 
                src="https://http2.mlstatic.com/D_NQ_NP_622122-MLU74089433592_012024-O.webp" 
                className="w-full h-full border-2 border-gray-400 rounded-lg object-contain"
              />
            </article>
            <article className='w-[130px] h-[130px] box-border cursor-pointer rounded-lg 
            hover:shadow-md hover:shadow-page-lightblue duration-300'>
              <img 
                src="https://http2.mlstatic.com/D_NQ_NP_622122-MLU74089433592_012024-O.webp" 
                className="w-full h-full border-2 border-gray-400 rounded-lg object-contain"
              />
            </article>
          </aside>

        {/*Item description*/}
          <article className='w-[70%] flex p-5 items-center justify-center'>
            <img 
              src={selectedImg}
              className='drop-shadow-lg rounded-lg cursor-zoom-in'
            />
          </article>
        </section>
          
        <main className='flex flex-col gap-y-8 w-1/2 h-full bg-blue-300'>
          <div className='min-h-[250px] bg-red-300 flex flex-col gap-y-3'>
            <h1 className='font-semibold text-4xl'>
              Title asdasdasdasdasdasd
            </h1>

            <span>SKU: </span>

            <ul className='pl-5 flex flex-col gap-y-3 w-full'>
              <li>🔵Detail</li>
              <li>🔵Detail</li>
              <li>🔵Detail</li>
            </ul>

            <div className='flex flex-col w-full gap-y-6 justify-center'>
              <h2 className='text-3xl font-semibold'>
                $152500
              </h2>
              <div className='flex gap-x-5 w-full items-center'>
                <span>
                  Cantidad:
                </span>
                <select id="units" className='rounded-lg px-2 py-1'>
                  <option value="1">1 Unidad</option>
                  {/*Depende stock opcion a 6 unidades y si hay mas dejar un input para tomar la cantidad deseada*/}
                </select>
              </div>
              <span>Disponible: </span>
            </div>
          </div>

          <div className='flex items-center gap-x-10 pl-[60px]'>
            <div>
              <button className='rounded-lg bg-page-gray-light px-3 py-1'>
                Añadir al carrito
              </button>
            </div>
            
            <div>
              <span>share-icon</span>
              <span>heart-icon</span>
            </div>
          </div>
        </main>
      </header>
    </section>
  )
}