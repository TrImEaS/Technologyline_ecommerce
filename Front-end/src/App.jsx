import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Home, Error, Search, Products } from './Pages/Routes.jsx'
import { FaWhatsapp } from "react-icons/fa"
import Nav from './Components/Nav'
import Footer from "./Components/Footer.jsx"
function App() {
  const [demoBtn, setDemoBtn] = useState(false)
  const handleclick = () => setDemoBtn(!demoBtn)

  return (
    <>
    {
    demoBtn ?
      <main className="flex flex-col items-center font-body justify-between bg-white text-black min-h-screen min-w-[390px] h-full p-0 m-0">
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          ></Route>
          
          <Route
            path="/products"
            element={<Products/>}
          >
            <Route 
              path=":product"
              element={<Products/>}
            ></Route>
          </Route>

          <Route path="/search" element={<Search />}>
            <Route path=":category/*" element={<Search />} />
            <Route path=":category/:subcategory/*" element={<Search />} />
            <Route path=":category/:subcategory/:brand" element={<Search />} />
          </Route>

          <Route
            path="*"
            element={<Error/>}
          ></Route>
        </Routes>
        <a 
          href="https://wa.me/" 
          className="fixed flex justify-center items-center bottom-[125px] right-5 cursor-pointer w-12 h-12 bg-[#25d366] rounded-2xl duration-300 hover:w-14 hover:h-14"
          target="_blank"
        >
          <FaWhatsapp className="text-white text-[40px]"/>
        </a>
        <Footer></Footer>
      </main>
    : 
      <div className="h-screen w-screen flex flex-col gap-10 justify-center items-center bg-[#333] text-white">
        <span className="text-3xl font-bold">Esto es una demo, la pagina esta en progreso...</span>
        <button
          id="btn"
          className="bg-white text-black font-bold p-5 rounded-3xl duration-500"
          onClick={handleclick}
        >
          Ver demo
        </button>
      </div>
    }
  </>
  )
}

export default App
