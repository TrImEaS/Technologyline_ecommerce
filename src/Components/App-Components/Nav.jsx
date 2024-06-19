import { NavLink } from 'react-router-dom'
import UserIcons from './Nav-Components/UserIcons.jsx'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import SearchInput from './Nav-Components/SearchInput.jsx'

export default function Nav() {
  return (
    <nav 
      className='z-50 flex flex-col w-full relative items-center bg-blue-400'>
    {/*---Nav top---*/}
      <section className={`flex gap-x-10 justify-between items-center h-28 w-3/4 px-2 max-md:w-full`}>
      {/*Logo*/}
        <NavLink 
          className='h-[100px] flex items-center max-xl:justify-center'
          to='/'>
          <img 
            src="/logo-tline.svg"  
            alt="company-logo"
            className='w-[200px] max-w-[200px] pb-3'/>
        </NavLink>

        {/*Search input*/}
        <div className='max-xl:hidden flex w-[80%]'>
          <SearchInput/> 
        </div>
        {/*User items*/}
        <article className='flex gap-x-6 max-sm:gap-x-3 justify-end max-xl:justify-center'>
          <UserIcons/>
        </article>
      </section>

      {/*---Nav bottom Full Screen---*/}
      <section className='hidden xl:flex z-50 w-full items-center justify-around gap-x-5 bg-page-blue-normal text-slate-50 text-[15px]'>
        <article className='w-3/4 flex h-[60px] items-center justify-around min-w-[640px]'>
          <CategoriesMenu/>
        </article>
      </section>

      {/*---Nav bottom  MD screen---*/}
      <section className='xl:hidden flex h-[60px] w-full items-center justify-center gap-x-5 bg-page-blue-normal text-slate-50 max-md:justify-start max-md:px-20 max-sm:px-10'>

        {/* Categorias */}
        <CategoriesMenu/>        
       
        <article className='rounded-full w-[70%] max-md:w-full'>
          <SearchInput/>
        </article>
        
      </section>
    </nav>
  )
}
