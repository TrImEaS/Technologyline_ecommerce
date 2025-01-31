import { FaWhatsapp } from "react-icons/fa"
import Swal from "sweetalert2"
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;


export default function Revendedores () {
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    const body = {
      fullname: data.fullname,
      email: data.email,
      phone: parseInt(data.phone),
      comentary: data.comentary,
      view: 0
    }

    fetch(`${API_URL}/api/page`,{
      method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => {
      if(res.status === 500) {
        Swal.fire({
          title: "Error",
          text: 'Ocurio un error al enviar formulario, intentelo mas tarde.',
          timer: 4000,
          timerProgressBar: 4000,
          icon: 'error'
        })
        return
      }
      
      if(res.status === 409) {
        Swal.fire({
          title: "Atención",
          text: 'La informacion ingresada ya se encuentra cargada en el sistema.',
          timer: 4000,
          timerProgressBar: 4000,
          icon: 'info'
        })
        return
      }
      
      if(res.status === 422) {
        Swal.fire({
          title: "Atención",
          text: 'Revisar la informacion cargada, un dato es incorrecto!',
          timer: 4000,
          timerProgressBar: 4000,
          icon: 'warning'
        })
        return
      }

      Swal.fire({
        title: "Enviado correctamente!",
        text: 'Gracias por completar el formulario, pronto se contactara un agente contigo.!',
        timer: 4000,
        timerProgressBar: 4000,
        icon: 'success'
      })
    })
  }

  return (
    <section className="flex flex-col gap-10">
      <article className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Revendedores
        </h1>
        <p className="text-pretty">
          <b>Technology Line</b> dispone de un canal de venta <b>mayorista</b>. Ejecutivos de cuenta y personal técnico <b>especializado podran brindarte</b> un servicio personalizado y pensado para <b>vos</b>. 
        </p>
      </article>

      <article className="flex flex-col gap-5">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            AMPLIA VARIEDAD DE MARCAS Y PRODUCTOS:
          </h1>
          <span className="text-pretty">
            Comprendiendo productos de <b>gama baja, media y alta</b>.
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            PRODUCTOS CON GARANTÍA:
          </h1>
          <span className="text-pretty">
            Poseemos el <b>respaldo y garantia oficial</b> de todas las marcas que comercializamos.
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            OPCIONES DE PAGO:
          </h1>
          <span className="text-pretty">
            <b>Linea de credito, cuenta corriente, transferencias, entre otras mas.</b>.
          </span>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            LOGÍSTICA:
          </h1>
          <span className="text-pretty">
            Entregas <b>con y sin cargo</b> abarcando un <b>amplio radio</b> de distancia desde nuestra central.
          </span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold">
            INFORMACIÓN ACTUALIZADA:
          </h1>
          <span className="text-pretty">
            Web con <b>actualizacion diaria</b> y e-mail de marketing semanal con <b>novedades y ofertas</b>.
          </span>
        </div>
      </article>

      <article>
        <h1 className="text-xl font-bold">
          ¿QUERES SER REVENDEDOR?
        </h1>

        <p className="text-pretty">
          Envianos un mail a <b><a href="mailto:revendedores@realcolor.com.ar" className="hover:underline text-sm">REVENDEDORES@REALCOLOR.COM.AR</a></b>, mandanos un <b><a className="hover:underline" href="https://wa.me/541133690584?text=Hola me comunico desde la pagina Technology-Line, porque me interesa ser revendedor, mi nombre es ">WhatsApp</a></b> o completa el siguiente formulario. 
        </p>
        <p className="text-pretty">
          Contanos de vos y que productos estas interesado en vender asi <b>podemos armar una propuesta personalizad para vos</b> y de esta manera logres <b>la mayor rentabilidad para tu negocio</b>. 
        </p>
      </article>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-10 w-full justify-center items-center p-4 shadow-[#cbc8c8] shadow-lg">
        <article className="flex flex-col gap-3 justify-center items-center w-full">
          <div className="flex flex-col w-full hover:drop-shadow-xl duration-300">
            <label htmlFor="fullname_reseller_form">
              Nombre y apellido
            </label>
            <input 
              name="fullname"
              className="border-2 border-black rounded-lg p-2" 
              type="text" 
              minLength={2}
              id="fullname_reseller_form"
              placeholder="Escribá aqui su nombre completo"
              required
            />
          </div>

          <div className="flex flex-col w-full hover:drop-shadow-xl duration-300">
            <label htmlFor="email_reseller_form">
              E-mail
            </label>
            <input 
              name="email"
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="email"
              minLength={6}
              id="email_reseller_form"
              placeholder="Escribá aqui su e-mail"
            />
          </div>

          <div className="flex flex-col w-full hover:drop-shadow-xl duration-300">
            <label htmlFor="phone_reseller_form">
              Teléfono
            </label>
            <input 
              name="phone"
              className="border-2 border-black rounded-lg p-2 w-full" 
              type="number"
              minLength={8}
              min={100000000}
              id="phone_reseller_form"
              placeholder="Escribá aqui su telefono"
              required
            />
          </div>

          <div className="flex flex-col w-full hover:drop-shadow-xl duration-300">
            <label htmlFor="comentary_reseller_form">
              Comentario
            </label>
            <textarea 
              name="comentary"
              id="comentary_reseller_form"
              className="border-2 border-black rounded-lg p-2 w-full" 
              rows={3}
              placeholder="Comente por aqui"/>
          </div>

          <button className="w-[200px] border-2 border-black py-3 rounded-lg hover:text-white hover:bg-black duration-300">
            Enviar
          </button>
        </article>
      </form>
    </section>
  )
}