import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

export default function SubCategories ({ containerStyle, itemStyle }) {
  const location = useLocation();
  const getPath = (path) => {
    location.pathname === path ? 'isActive' : ''
  }
  
  const subCategories = [
    'Televisores',
  ]

  return(
    <ul className={`${containerStyle} flex gap-5`}>
      {subCategories.map(subCategorie => (
        <li 
        key={subCategorie} 
        className={`${itemStyle} ${getPath(subCategorie)} md:hover:bg-sky-500 duration-300 py-1 px-2 md:rounded-2xl flex justify-between`}>
          <NavLink 
          to={`/search/:${subCategorie}`}
          className={`${getPath(`/search/${subCategorie}`)} w-full`}>
            {subCategorie}
          </NavLink>

          <div className={`flex md:hidden justify-center items-center border border-gray-300 text-3xl h-full w-10 bg-gray-100 hover:border-sky-500 cursor-pointer`}>
            <FaAngleDown/>
          </div>
        </li>
      ))}
    </ul>
  )
}