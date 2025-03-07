import { useEffect, useState } from "react";

export default function Modal({ progress, product, toAdd = 1 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (progress === 1) { 
      setVisible(true);
    } 
    
    setTimeout(() => 
      setVisible(false)
    , 3000);
  }, [progress]);

  return (
    <div className={`fixed top-2 right-0 flex rounded-sm modal bg-white w-full max-w-[300px] h-[120px] border-2 transition-transform duration-300 ease-in-out transform ${visible ? "show" : "hide"}`}>
      <main className="flex flex-col w-full h-full items-center gap-2 justify-between relative">
        <header className={`${toAdd ? 'text-page-lightblue' : 'text-red-500'} font-bold w-full text-center text-xs leading-tight px-2`}>
          {toAdd ? "Producto agregado con éxito al carrito!" : "Producto eliminado del carrito con éxito!"}
        </header>

        <section className="flex justify-between w-full px-2 items-center">
          <div className="w-[40%] flex justify-center">
            <img src={product.img_base} className="w-[65px] h-[65px] object-cover" />
          </div>
          <p className="w-[55%] flex flex-col font-semibold text-xs">
            <span className={`${toAdd ? 'text-page-blue-normal' : 'text-red-500'} uppercase font-bold`}>{product.brand}</span>
            <span className="text-gray-800 truncate whitespace-normal">{product.name.replace(/EAN(?::\s*|\s+)\d{5,}/gi, '')}</span>
          </p>
        </section>

        <footer className="w-full bg-gray-300 h-1">
          <div className={`h-full ${toAdd ? 'bg-page-lightblue' : 'bg-red-400'}`} style={{ width: `${progress}%`, transition: 'width 3s ease-out' }} />
        </footer>

        <span className={`${toAdd ? 'text-sky-500' : 'text-red-500'} font-bold absolute top-[45%] left-2 text-xs`}>{toAdd ? '+1' : '-1'}</span>
      </main>
    </div>
  );
}
