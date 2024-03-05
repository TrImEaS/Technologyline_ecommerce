import React from "react"
import bannerCard_1 from '../Assets/BannerCards-images/banner-1.jpg'
import bannerCard_2 from '../Assets/BannerCards-images/banner-2.jpg'
import bannerCard_3 from '../Assets/BannerCards-images/banner-3.jpg'

export default function BannersCards() {
  return (
    <div className='flex flex-wrap justify-center items-center gap-8 w-3/4'>
     
      <article className='flex relative items-center justify-center group text-4xl text-white'>
        <button className="absolute bottom-2 left-5 w-32 group text-lg rounded bg-page-blue-normal max-sm:w-20 max-sm:text-sm max-sm:left-3 duration-500">
          VER MAS
        </button>
        <img 
          src={bannerCard_1}
          className="object-fill w-full h-full rounded-xl shadow-xl group-hover:shadow-page-blue-normal duration-500"
        />
      </article>

      <article className='flex relative items-center justify-center group rounded-full text-4xl text-white'>
        <button className="absolute bottom-2 left-5 w-32 group text-lg rounded bg-page-blue-normal max-sm:w-20 max-sm:text-sm max-sm:left-3 duration-500">
          VER MAS
        </button>
        <img 
          src={bannerCard_2}
          className="object-fill w-full h-full rounded-xl shadow-xl group-hover:shadow-page-blue-normal duration-500"
        />
      </article>

      <article className='flex relative items-center justify-center group rounded-full text-4xl text-white'>
        <button className="absolute bottom-2 left-5 w-32 group text-lg rounded bg-page-blue-normal max-sm:w-20 max-sm:text-sm max-sm:left-3 duration-500">
          VER MAS
        </button>
        <img 
          src={bannerCard_3}
          className="object-fill w-full h-full rounded-xl shadow-xl group-hover:shadow-page-blue-normal duration-500"
        />
      </article>
    </div>

  )
}