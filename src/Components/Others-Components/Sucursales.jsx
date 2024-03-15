import GoogleMap from '../GoogleMap.jsx'

export default function Sucursales() {
  return (
    <section className='flex w-full h-[400px] gap-10'>
      <div className='w-full h-full flex flex-col justify-center items-center gap-y-2'>
        <GoogleMap longitud={-34.612692533970275} latitud={-58.43802934631814}/>
        <article className='flex flex-col justify-center items-center'>
          <h1 className='font-bold'>
            SUCURSAL CABALLITO
          </h1>
          <p>
            Acoyte 493 - Tel.: 11-2188-0990
          </p>
          <span>
            E-mail: caballito@real-color.com.ar
          </span>
        </article>
      </div>

      <div className='w-full h-full flex flex-col justify-center items-center gap-y-2'>
        <GoogleMap longitud={-34.5759494755361} latitud={-58.484568193383}/>
        <article className='flex flex-col justify-center items-center'>
          <h1 className='font-bold'>
            SUCURSAL VILLA URQUIZA
          </h1>
          <p>
            Olazábal 4976 - Tel.: 4521-9236
          </p>
          <span>
            E-mail: urquiza@real-color.com.ar
          </span>
        </article>
      </div>
    </section>
  ) 
}