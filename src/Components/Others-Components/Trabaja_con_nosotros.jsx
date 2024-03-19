export default function Trabaja_con_nosotros () {
  return (
    <form className="flex flex-col gap-y-10 w-full justify-center items-center">
      <article className="flex flex-col w-full gap-3 justify-center items-center">
        <h1 className="text-2xl font-bold">
          Trabajá con nosotros
        </h1>
        <p className="text-pretty">
          Te interesa sumarte a una empresa con grandes desafíos y aprender sobre nuestro negocio, 
          esta es tu oportunidad para crecer juntos. Estamos seguros que hay un lugar para ti en nuestro equipo.
        </p>
      </article>

      <article className="flex flex-col gap-3 justify-center items-center w-full">
        <div className="flex max-sm:flex-col gap-5 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="name_work-with-us">
              Nombre
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2" 
              type="text" 
              id="name_work-with-us"
              placeholder="Escribá aqui su nombre"/>
          </div>
          
          <div className="flex flex-col w-full">
            <label htmlFor="lastname_work-with-us">
              Apellido
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2" 
              type="text" 
              id="lastname_work-with-us"
              placeholder="Escribá aqui su apellido"/>
          </div>
        </div>

        <div className="flex max-sm:flex-col gap-5 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="phone_work-with-us">
              Teléfono
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="number"
              min={0}
              id="phone_work-with-us"
              placeholder="Escribá aqui su telefono"/>
          </div>
          
          <div className="flex flex-col w-full">
            <label htmlFor="email_work-with-us">
              E-mail
            </label>
            <input 
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="email" 
              id="email_work-with-us"
              placeholder="Escribá aqui su e-mail"/>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="cv_work-with-us">
            Adjunta tu cv
          </label>
          <input 
            className="border-2 border-black rounded-lg p-2 w-full" 
            type="file"
            id="cv_work-with-us"
            placeholder="Selecciona un archivo"/>
        </div>  

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="presentation-card_work-with-us">
            Motivo de su solicitud
          </label>
          <textarea 
            id="presentation-card_work-with-us"
            className="border-black border-2 w-full rounded-lg p-2" 
            rows="5" 
            placeholder="Contanos brevemente para que puesto quisieras participar"/>
        </div>
        <button className="w-[200px] border-2 border-black py-3 rounded-lg hover:text-white hover:bg-black duration-300">
          Enviar
        </button>
      </article>
    </form>
  )
}