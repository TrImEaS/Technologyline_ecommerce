import { useEffect } from 'react'
import { GiAirplane } from "react-icons/gi"

export default function HotSale () {
  
  useEffect(() => {
    const banner = document.getElementById('hotsale')
    banner.classList.add('animate-hot-sale')
    
    return () => {
      banner.classList.remove('animate-hot-sale')
    }
  }, [])

  return (
    <div id="hotsale" className="hot-sale-banner fixed flex top-0 overflow-hidden select-none w-[120%] max-sm:pr-20">
      <img className="object-cover h-[38px] w-full max-sm:pr-2" src={'https://technologyline.com.ar/banners-images/Assets/barra-hotsale.svg'} alt="Hot Sale Banner"/>
      <GiAirplane className='text-6xl scale-150 pb-4 text-red-700 min-w-[40px]'/>
    </div>
  )
}