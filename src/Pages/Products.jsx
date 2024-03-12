import { useState, useEffect } from 'react'
import { productsFilter } from '../Mocks/processProducts.js'
import { useNavigate } from 'react-router-dom'
import productsJson from '../Data/products.json'
import ProductCard from '../Components/ProductCard.jsx'

const maxImages = 4

export default function Products () {
  const [selectedImg, setSelectedImg] = useState("https://http2.mlstatic.com/D_NQ_NP_622122-MLU74089433592_012024-O.webp")
  const [product, setProduct] = useState('')
  const [loadedImages, setLoadedImages] = useState([])
  const formattedPrice = parseFloat(product.price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  let cat = product.sub_category
  const navigate = useNavigate()
  const products = productsFilter(productsJson)
  const recomendProducts = products.filter(product => product.name.toLowerCase().includes(cat))
  // const loadImages = async () => {
  //   const imageElements = [];
  
  //   const indexVariations = ['_1','_2', '_3', '_4', '_A', '_B', '_C', '_D', '-1','-2', '-3', '-4'];
  
  //   for (const variation of indexVariations) {
  //     const imageName = `${product.sku}${variation}.png`;
  //     const imageUrl = `https://www.technologyline.com.ar/products-images/${imageName}`;
  
  //     // Agregar una condición para verificar si la imagen es undefined.jpg
  //     if (imageName.includes('undefined')) {
  //       // No hacer nada y continuar con la siguiente iteración
  //       continue;
  //     }
  
  //     try {
  //       await new Promise((resolve, reject) => {
  //         const img = new Image();
  //         img.onload = resolve;
  //         img.onerror = reject;
  //         img.src = imageUrl;
  //       });
  
  //       // Si la imagen se carga correctamente, agregarla al array de elementos
  //       imageElements.push(
  //         <article
  //           key={variation}
  //           className='w-[130px] h-[130px] box-border cursor-pointer rounded-lg hover:shadow-md hover:shadow-page-lightblue duration-300'
  //         >
  //           <img
  //             src={imageUrl}
  //             alt={`Product Image ${variation}`}
  //             className="w-full h-full border-2 border-gray-400 rounded-lg object-contain"
  //           />
  //         </article>
  //       );
  //     } catch (error) {
  //       console.error(`Error al cargar la imagen ${imageName}:`, error);
  //     }
  //   }
  
  //   setLoadedImages(imageElements);
  // }

  useEffect(() => {
    const productQuery = new URLSearchParams(location.search).get('product');
    const newProduct = products.find(product => product.sku === productQuery);

    if (!newProduct) {
      navigate('/error')
    } else {
      setProduct(newProduct)
    }

    // loadImages();
  }, [location.search, navigate])

  return (
    <section className='flex flex-col h-full w-3/4 pb-[100px]'>
      <header className='w-full flex justify-center items-center min-h-[500px]'>
        {/*Item Image section*/} 
        <section className='flex w-1/2 h-full'>
        {/* <aside className='flex flex-col w-[30%] h-full gap-y-3'>
         {loadedImages}
        </aside> */}

        {/*Item description*/}
          <article className='w-[70%] h-[300px] flex p-5 items-center justify-center border-2 rounded-lg'>
            <img 
              src={`https://www.technologyline.com.ar/products-images/${product.sku}.jpg`}
              className='rounded-lg cursor-zoom-in w-full h-full object-contain'
            />
          </article>
        </section>
          
        <section className='flex flex-col  gap-y-8 w-1/2 h-full'>
          <div className='min-h-[250px] flex flex-col gap-y-3'>
            <h1 className='font-semibold text-4xl'>
              {product.name}
            </h1>

            <span className='text-xl'>{product.sku}</span>

            <div className='flex flex-col w-full gap-y-6 justify-center'>
              <h2 className='text-3xl font-semibold'>
                {`$${formattedPrice}`}
              </h2>
              <div className='flex gap-x-5 text-xl w-full items-center'>
                <span>
                  Cantidad:
                </span>
                <span className='font-bold'>
                  {product.stock}
                </span>
              </div>
              <span></span>
            </div>
          </div>

          <div className='flex items-center gap-x-10 pl-[5px]'>
            <button className='rounded-lg border border-black font-bold hover:bg-black hover:text-white duration-300 px-3 py-2'>
              Consultar Articulo
            </button>
          </div>
        </section>
      </header>

      <section className='flex flex-col bg-gray-100'>
        <div className='flex gap-x-3 p-2 w-full bg-page-gray-light rounded-lg font-bold'>
          <span>Descripción</span>
          <span>|</span>
          <span>Especificaciones</span>
        </div>

        <div className='h-[200px]'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ipsa, eligendi, velit maxime expedita reprehenderit magnam qui mollitia ex voluptate doloremque alias. Architecto incidunt perferendis consequuntur harum consectetur enim cumque!</p>
        </div>
      </section>

      <section>
        <span>Tambien te recomendamos</span>
        <div>
          {recomendProducts.map(product =>{
            <ProductCard
            name={product.name}
            >

            </ProductCard>
          })}
             
        </div>
      </section>
    </section>
  )
}