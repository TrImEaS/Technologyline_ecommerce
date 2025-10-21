import { FaUserCircle } from 'react-icons/fa'
import { BsCardChecklist } from 'react-icons/bs'
import NavCard from '../Components/My-Account-Components/NavCard'
import Swal from 'sweetalert2'
import { useAuth } from '../Context/AuthContext'
import { useEffect } from 'react'

export default function MyAccount () {
  const { setToken, setUserIsLoged, userIsLoged, setEmail } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userIsLoged) {
        Swal.fire({
          title: 'Acceso denegado',
          text: 'Debes iniciar sesión para acceder a esta página.',
          icon: 'error',
          confirmButtonText: 'Iniciar sesión',
          customClass: {
            confirmButton: 'bg-page-blue-normal text-white px-4 py-2 rounded hover:opacity-90'
          }
        }).then(() => {
          window.location.href = '/login'
        })
      }
    }, 3000)

    return () => clearTimeout(timer) // limpia si se desmonta antes
  }, [userIsLoged])

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'bg-page-blue-normal text-white px-4 py-2 rounded hover:opacity-90',
        cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded ml-2 hover:opacity-90'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        setToken(null)
        setEmail(null)
        setUserIsLoged(false)
        window.location.href = '/login'
      }
    })
  }

  return (
    <div className="flex flex-col min-h-[500px] gap-10 max-sm:w-full w-2/3 flex-wrap items-center py-10 px-3">
      <h1 className='text-xl font-bold w-full'>Mi cuenta</h1>

      <section className="flex flex-wrap w-full gap-5 place-content-center items-center">
        <NavCard
          title={'Mis datos'}
          icon={<FaUserCircle/>}
          description={'Editar datos personales, cambiar contraseña, etc.'}
          namelink={'Ir a mis datos'}
          link={'/myaccount/profile'}
        />

        <NavCard
          title={'Mis pedidos'}
          icon={<BsCardChecklist/>}
          description={'Ver el historial de mis pedidos, detalles, etc.'}
          namelink={'Ir a mis pedidos'}
          link={'/myaccount/orders'}
        />

        {/* <NavCard
          title={'Favoritos'}
          icon={<FaHeartCircleCheck/>}
          description={'Ver los productos que he marcado como favoritos.'}
          namelink={'Ir a mis favoritos'}
          link={'/myaccount/favorites'}
        /> */}
{/*
        <NavCard
          title={'Mis direcciones'}
          icon={<GrMap/>}
          description={'Administrar mis direcciones de envío.'}
          namelink={'Ir a mis direcciones'}
          link={'/myaccount/addresses'}
        /> */}
      </section>

      <button
        className="bg-page-blue-normal min-w-[200px] min-h-[50px] text-white rounded-sm hover:bg-blue-300 duration-300 hover:text-slate-500"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  )
}
