import React from "react"
import bannerCard_1 from '../Assets/BannerCards-images/banner-1.jpg'
import bannerCard_2 from '../Assets/BannerCards-images/banner-2.jpg'
import bannerCard_3 from '../Assets/BannerCards-images/banner-3.jpg'
import { NavLink } from "react-router-dom"

export default function BannersCards() {
  return (
    <div className='flex justify-between items-center gap-3 max-sm:flex-wrap w-4/5'>

      <article className='flex relative items-center justify-center rounded-full group text-4xl text-white      hover:scale-95 duration-500 w-full z-10'>
        <img 
          src={bannerCard_1}
          className="object-fill w-full h-full rounded-xl shadow-lg group-hover:shadow-page-blue-normal duration-500 group"
        />
        <NavLink to={'/search/?sub_category=televisores'} className="absolute bottom-[4%] max-xl:bottom-[2%] left-[5%] group text-lg max-xl:text-sm max-md:text-xs max-sm:text-lg font-semibold rounded bg-page-blue-normal duration-500 opacity-20 group-hover:opacity-100 w-[45%] z-10">
          VER MAS
        </NavLink>
      </article>

      <article className='flex relative items-center justify-center group rounded-full text-4xl text-white hover:scale-95 duration-500 w-full z-10'>
        <img 
          src={bannerCard_2}
          className="object-fill w-full h-full rounded-xl shadow-lg group-hover:shadow-page-blue-normal duration-500 group"
        />
        <NavLink to={'/search/?sub_category=heladeras'} className="absolute bottom-[4%] max-xl:bottom-[2%] left-[5%] group text-lg max-xl:text-sm max-md:text-xs max-sm:text-lg font-semibold rounded bg-page-blue-normal duration-500 opacity-20 group-hover:opacity-100 w-[45%] z-10">
          VER MAS
        </NavLink>
      </article>

      <article className='flex relative items-center justify-center group rounded-full text-4xl text-white hover:scale-95 duration-500 w-full z-10'>
        <img 
          src={bannerCard_3}
          className="object-fill w-full h-full rounded-xl shadow-lg group-hover:shadow-page-blue-normal duration-500 group"
        />
        <NavLink to={'/search/?sub_category=aires acondicionados'} className="absolute bottom-[4%] max-xl:bottom-[2%] left-[5%] group text-lg max-xl:text-sm max-md:text-xs max-sm:text-lg font-semibold rounded bg-page-blue-normal duration-500 opacity-20 group-hover:opacity-100 w-[45%] z-10">
          VER MAS
        </NavLink>
      </article>
    </div>

  )
}