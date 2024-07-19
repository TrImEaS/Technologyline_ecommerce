import { useEffect, useState, useMemo } from 'react'
import ProductsCarousel from '../Components/ProductsCarousel'
import BannersCards from '../Components/Home-Components/BannersCards.jsx'
import BannerCarousel from '../Components/Home-Components/BannerCarousel.jsx'
import CategoriesCarousel from '../Components/Home-Components/CategoriesCarousel.jsx'
import homeicon1 from '../Assets/Some-icons/home-icon1.svg'
import homeicon2 from '../Assets/Some-icons/home-icon3.svg'
import homeicon3 from '../Assets/Some-icons/home-icon2.svg'
import Spinner from '../Components/Products/Spinner.jsx'
import BrandsCarrousel from '../Components/Home-Components/BrandsCarrousel.jsx'
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default function Home() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)

  /* Get products */
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('https://technologyline.com.ar/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
        document.title = `Home | Technology Line`
      } 
      catch (err) {
        console.log(err)
      }
    })()
  }, [])

  /* Add new view to web */
  useEffect(() => {
    try {
      fetch('https://technologyline.com.ar/api/clients/addView',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' } 
      })
      .then(res => {
        if(!res.ok){
          throw new Error('Bad request')
        }
        return res.json()
      })
      .then(data => console.log('Success: ', data))
      .catch(e => console.error('Error: ', e))
    } 
    catch (err) {
      console.log(err)
    }
  }, [])

  const firstCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('calefones') || 
      product.sub_category.toLowerCase().includes('aires') ||
      product.sub_category.toLowerCase().includes('calefaccion')
    ).sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }, [products]);

  const secondCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('televisores') || 
      product.sub_category.toLowerCase().includes('notebook') || 
      product.sub_category.toLowerCase().includes('auriculares') || 
      product.sub_category.toLowerCase().includes('tv') ||
      product.sub_category.toLowerCase().includes('lavado') || 
      product.sub_category.toLowerCase().includes('hardware') && 
      !product.name.toLowerCase().includes('control')
    );
  }, [products]);

  const thirdCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.sub_category.toLowerCase().includes('cocina') || 
      product.sub_category.toLowerCase().includes('coccion') || 
      product.sub_category.toLowerCase().includes('electrodomesticos') || 
      product.sub_category.toLowerCase().includes('heladeras') && 
      !product.name.toLowerCase().includes('ventilador') && 
      !product.name.toLowerCase().includes('control')
    );
  }, [products]);

  const fourthCarousel = useMemo(() => {
    if (!products) return [];
    return products.filter(product => 
      product.brand.toLowerCase().includes('gama') 
    );
  }, [products]);
  
  return (
      <div name='home' className={`flex bg-lok flex-col items-center gap-10 min-h-screen h-full w-full pb-5`}>
        <BannerCarousel/>
        {/*Banners*/}
        <section className='flex flex-col items-center w-full gap-y-10'>
          <BannersCards/>
          <div className='flex items-center justify-center w-4/5 h-[130px] rounded-3xl bg-gray-300 text-black font-bold xl:text-xl text-sm px-5 gap-x-5'>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon1}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Envíos a domicilio
                </span>
              </p>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon2}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Pagos en creditos y débitos
                </span>
              </p>
              <p className='flex gap-x-3 justify-center items-center w-full'>
                <i className='flex justify-center items-center border-2 border-black rounded-full xl:min-w-[100px] xl:min-h-[100px] min-w-[65px] min-h-[65px]'>
                  <img src={homeicon3}/>
                </i>

                <span className='hidden md:block text-pretty'>
                  Centro de preguntas
                </span>
              </p>
          </div>
        </section>

        {/*Categories*/}
        <section className='w-4/5'>
          <CategoriesCarousel/>
        </section>

        {/*Products sale carousel*/}
        {
        loading ? <Spinner/>
        :
        <div className='flex flex-col gap-y-20 w-[82%] max-sm:w-[71%]'>
          {/*Products sale carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-medium text-3xl max-[680px]:w-full text-gray-800 w-fit'>
              OFERTAS CLIMATIZACION
            </h1>
            <ProductsCarousel style={'pb-5'} rows={1} filterProducts={firstCarousel}/>
          </section>

          {/*Products news carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-medium text-3xl max-[680px]:w-full text-gray-800 w-fit'>
              OFERTAS TECNOLOGIA
            </h1> 
              <ProductsCarousel style={'pb-5'} rows={1} filterProducts={secondCarousel}/>
          </section>

          {/*Products recomendations carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-medium text-3xl max-[680px]:w-full text-gray-800 w-fit'>
              OFERTAS PARA HOGAR
            </h1>
              <ProductsCarousel style={'pb-5'} rows={1} filterProducts={thirdCarousel}/>
          </section>

          {/*Products gama carousel*/}
          <section className='relative flex flex-col justify-center w-full gap-y-10'>
            <h1 className='font-medium text-3xl max-[680px]:w-full text-gray-800 w-fit'>
              OFERTAS PARA CUIDADO PERSONAL
            </h1> 
              <ProductsCarousel style={'pb-5'} rows={1} filterProducts={fourthCarousel}/>
          </section>
        </div>
        }

        <section className='w-3/4 h-fit flex flex-col gap-y-5 pt-10'>
          <span className='font-bold text-2xl text-gray-800 w-full'>Conoce nuestras marcas</span>

          <div className='select-none'>
            <BrandsCarrousel/>
          </div>
        </section>
      </div>
  )
}