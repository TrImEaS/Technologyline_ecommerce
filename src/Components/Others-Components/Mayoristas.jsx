export default function Mayoristas () {
  return (
    <section className="flex flex-col gap-10">
      <article className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Venta Mayorista
        </h1>
        <p className="text-pretty">
          Real Color dispone de un canal de venta a empresas que proporciona a través de sus ejecutivos de cuenta y personal técnico
          calificado un servicio personalizado y pensado para cada cliente. Ofreciendo un abanico de beneficios que nos destacan
          como una opción importante a la hora de elegir para su empresa un Proveedor Integral de Tecnología.
        </p>
      </article>

      <article className="flex flex-col gap-5">
        <p className="flex flex-col">
          <h1 className="text-xl font-bold">
            AMPLIA VARIEDAD DE MARCAS Y PRODUCTOS:
          </h1>
          <span className="text-pretty">
            Comprendiendo productos de gama baja, media y alta.
          </span>
        </p>

        <p className="flex flex-col">
          <h1 className="text-xl font-bold">
            PRODUCTOS CON GARANTÍA:
          </h1>
          <span className="text-pretty">
            Poseemos el respaldo y garantía oficial de todas las marcas que comercializamos.
          </span>
        </p>

        <p className="flex flex-col">
          <h1 className="text-xl font-bold">
            OPCIONES DE PAGO:
          </h1>
          <span className="text-pretty">
            Línea de Crédito, Cuenta Corriente, Transferencia bancaria, etc.
          </span>
        </p>
        
        <p className="flex flex-col">
          <h1 className="text-xl font-bold">
            LOGÍSTICA:
          </h1>
          <span className="text-pretty">
            Entregas a nivel nacional dentro de las 48 horas.
          </span>
        </p>

        <p className="flex flex-col">
          <h1 className="text-xl font-bold">
            INFORMACIÓN ACTUALIZADA:
          </h1>
          <span className="text-pretty">
            Web con actualización diaria e e-mail marketing semanal con novedades y ofertas.
          </span>
        </p>
      </article>

      <article>
        <h1 className="text-xl font-bold">
          ¿SOS MAYORISTA?
        </h1>

        <p className="text-pretty">
          Si sos un mayorista, podés registrarte aquí y obtener descuentos en la compra de los productos.
          Completá con tus datos y nos comunicaremos con vos para darte de alta en nuestro sistema.
        </p>
      </article>

      <form className="flex flex-col gap-y-10 w-full justify-center items-center">
        <article className="flex flex-col gap-3 justify-center items-center w-full">
          <div className="flex gap-5 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="name_mayoristas">
                Nombre y apellido
              </label>
              <input 
                className="border-2 border-black rounded-lg p-2" 
                type="text" 
                id="name_mayoristas"
                placeholder="Escribá aqui su nombre completo"/>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="company-name_mayoristas">
              Empresa / Local
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="text"
              id="company-name_mayoristas"
              placeholder="Escribá aqui el nombre de su empresa o local"/>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="email_mayoristas">
              E-mail
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="email" 
              id="email_mayoristas"
              placeholder="Escribá aqui su e-mail"/>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="phone_mayoristas">
              Teléfono
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="number"
              min={0}
              id="company-name_mayoristas"
              placeholder="Escribá aqui su telefono"/>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="user-name_mayoristas">
              Nombre de usuario
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="text"
              id="user-name_mayoristas"
              placeholder="Escribá aqui su nombre de usuario"/>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="password_mayoristas">
              Contraseña
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="text"
              id="password_mayoristas"
              placeholder="Escribá aqui su contraseña"/>
          </div>

          <button className="w-[200px] border-2 border-black py-3 rounded-lg hover:text-white hover:bg-black duration-300">
            Enviar
          </button>
        </article>
      </form>
    </section>
  )
}