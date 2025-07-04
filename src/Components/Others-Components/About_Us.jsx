import { GoDotFill } from "react-icons/go";

export default function About_Us () {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="font-bold text-page-blue-darkMarine">
          TECHNOLOGY LINE
        </span>
        <p className="flex flex-col gap-3">
          <span>Durante más de 5 años, hemos liderado la venta mayorista y minorista de electrodomésticos para el hogar y empresas, convirtiendo cada desafío en una oportunidad para sorprender. Nuestra pasión por la innovación y la excelencia nos mueve a ofrecerte:</span>

          <p className="flex flex-col gap-3">
            <span className="flex items-center gap-2 pl-2"><GoDotFill className="text-page-blue-darkMarine"/> Precios imbatibles gracias a alianzas estratégicas con las mejores marcas.</span>

            <span className="flex items-center gap-2 pl-2"><GoDotFill className="text-page-blue-darkMarine"/> Stock garantizado para despachos rápidos y sin contratiempos.</span>

            <span className="flex items-center gap-2 pl-2"><GoDotFill className="text-page-blue-darkMarine"/> Asesoramiento experto y atención personalizada en cada compra.</span>
          </p>

          <span>Empresas de renombre y miles de hogares ya confían en nuestro equipo, que trabaja con honestidad, compromiso y energía inagotable. En Technology Line, tu satisfacción y éxito son el motor de nuestro día a día.</span>
        </p>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-page-blue-darkMarine">
          OBJETIVO
        </span>
        <p>
          Nuestro objetivo prioritario y constante es trabajar con eficiencia y responsabilidad, superarnos día 
          a día y mantener una comunicación continúa con nuestros clientes para cubrir todas las necesidades y 
          expectativas que requiere el mercado.
        </p>
      </div>
      
      <div className="flex flex-col">
        <span className="font-bold text-page-blue-darkMarine">
          VISIÓN
        </span>
        <p>
          Ofrecer un servicio completo de venta y el más amplio abanico de 
          productos en el mercado tanto para el usuario hogareño, hasta las grandes empresas.
        </p>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-page-blue-darkMarine">
          MISIÓN
        </span>
        <p>
          Fortalecer nuestra participación nacional en el mercado de insumos y accesorios de informática para 
          lograr una expansión a nivel nacional junto a nuestros socios de negocios, apoyándonos en los valores de 
          la empresa, la óptima calidad, constante innovación y la fuerte presencia y respaldo de nuestras marcas.
        </p>
      </div>
    </section>
  )
}