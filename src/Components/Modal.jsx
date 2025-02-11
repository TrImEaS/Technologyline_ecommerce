import { useEffect, useState } from "react";

export default function Modal({ progress, product }) {
  const [visible, setVisible] = useState(false);
  const limitedName = product.name.length > 75 ? `${product.name.substring(0, 40)}...`: product.name

  useEffect(() => {
    if (progress > 0) { 
      setVisible(true);
    } 
    
    setTimeout(() => 
      setVisible(false)
    , 4000);
  }, [progress]);

  return (
    <div className={`fixed top-10 right-0 flex rounded-sm gap-5 modal bg-white w-full max-w-[350px] h-[180px] border-2 transition-transform duration-300 ease-in-out transform ${visible ? "show" : "hide"}`} >
      <main className="flex flex-col w-full items-center gap-5 justify-between">
        <header className="font-bold w-full text-page-lightblue text-center">
          Producto agregado con exito al carrito!
        </header>

        <section className="flex justify-center px-1 border-gray-100 w-full h-full gap-5">
          <div className="flex-1 flex justify-around items-center">
            <img 
              src={product.img_base} 
              className="w-full max-w-[110px] h-[65px] object-cover" 
            />
          </div>
          <p className="flex-1 flex flex-col font-semibold text-sm">
            <span className="uppercase font-bold text-page-blue-normal">{product.brand}</span>
            <span className="text-gray-800">{limitedName.replace(/EAN.*/,'')}</span>
          </p>
        </section>

        <footer className="w-full bg-gray-300 h-2">
          <div className="w-full h-full bg-page-blue-normal" style={{ width: `${progress}%`, transition: 'width 4s ease-out' }} />
        </footer>
      </main>
    </div>
  );
}
