import { NavLink } from "react-router-dom";

export default function Orders() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 pb-20 w-3/4 min-h-[500px] p-4 ">
      <section className="flex items-center gap-2 w-full">
        <NavLink className='hover:text-page-blue-normal duration-300' to='/myaccount'>Mi cuenta</NavLink>
        <span>{`>`}</span>
        <NavLink className='hover:text-page-blue-normal duration-300' to='/myaccount/profile'>Pedidos</NavLink>
      </section>
    </div>
  );
}