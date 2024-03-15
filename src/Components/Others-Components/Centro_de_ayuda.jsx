export default function Centro_de_ayuda () {
  return (
    <section className="flex flex-col gap-10">
      <article className="flex flex-col gap-5">
        <p>
          En nuestro Centro de Ayuda si tenes algún inconveniente o consulta sobre tu compra, contáctanos al 11-3227-6985.
        </p>
        <p className="font-semibold">
          Nuestros horarios de atención son de lunes a viernes de 9 a 17hs, con excepción de los feriados.
          Te pedimos que tengas tu facturade la compra en tu mano, vamos a solicitártelo para poder analizar tu caso.
        </p>
        <p>
          También podes escribirnos completando el formulario de abajo, y un agente se estará comunicando con vos dentro de las próximas 48hs hábiles.
        </p>
      </article>

      <form 
        className="flex flex-col gap-5 justify-center items-center">
        <section className="flex flex-col w-full">
          <label htmlFor="name-help">
            Nombre y apellido
          </label>
          <input 
            type="text" 
            className="border-2 border-black p-2 rounded-lg"
            placeholder="Escriba aqui su nombre completo" />
        </section>
        
        <section className="flex gap-5 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="name-help">
              Telefono
            </label>
            <input 
              type="number" 
              className="border-2 border-black p-2 rounded-lg"
              placeholder="Escriba aqui su telefono" />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name-help">
              E-mail
            </label>
            <input 
              type="email" 
              className="border-2 border-black p-2 rounded-lg"
              placeholder="Escriba aqui su e-mail" />
          </div>
        </section>

        <section className="flex flex-col w-full">
          <label htmlFor="name-help">
            Motivo de su mensaje
          </label>
          <textarea 
            type="email" 
            placeholder="Escriba aqui su e-mail" rows={6}
            className="border-2 border-black rounded-lg p-2" />
        </section>
        
        <button className="w-[200px] border-2 border-black py-3 rounded-lg hover:text-white hover:bg-black duration-300">
          Enviar
        </button>
      </form>
    </section>
  )
}