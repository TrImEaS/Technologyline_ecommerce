import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import Swal from 'sweetalert2'
import axios from 'axios'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function Profile () {
  const { userData, getUserData, userIsLoged } = useAuth()
  const [personalDataModal, setPersonalDataModal] = useState(false)
  const [passFormData, setPassFormData] = useState({
    actualPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [editedData, setEditedData] = useState({
    fullname: '',
    dni: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    postal_code: ''
  })

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

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (userData) {
      setEditedData({
        fullname: userData.fullname || '',
        dni: userData.dni || '',
        phone: userData.phone || '',
        email: userData.email || '',
        address: userData.address || '',
        location: userData.location || '',
        postal_code: userData.postal_code || ''
      })
    }
  }, [userData])

  const changePass = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Actualizando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const res = await axios.patch(`${API_URL}/api/page/changeUserPassword`, {
        ...passFormData,
        email: userData.email
      })

      Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success')
      setPassFormData({ actualPassword: '', newPassword: '' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al actualizar la contraseña'
      Swal.fire('Error', msg, 'error')
    }
  }

  const changePersonalData = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se actualizarán tus datos personales',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Actualizando...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      try {
        const res = await axios.patch(`${API_URL}/api/page/changeUserData`, editedData)
        Swal.fire('Éxito', 'Datos actualizados correctamente', 'success')
        getUserData()
        setPersonalDataModal(false)
      } catch (err) {
        Swal.fire('Error', 'Ocurrió un error al actualizar', 'error')
      }
    }
  }

  return (
    <div className="flex flex-col items-center relative justify-center gap-10 pb-20 w-3/4 max-lg:w-full min-h-[500px] p-5">
      <section className="flex items-center gap-2 w-full">
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount">Mi cuenta</NavLink>
        <span>{'>'}</span>
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount/profile">Perfil</NavLink>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center gap-1 w-full">
        <h1 className="text-2xl font-bold text-center">Mi perfil</h1>
        <p className="text-center">Aquí puedes editar tus datos personales, cambiar tu contraseña y más.</p>

        <div className="flex flex-1 max-sm:flex-col w-full gap-5 pt-5 items-stretch justify-center max-sm:items-center">
          <div className="flex-1 w-full max-w-lg p-6 bg-white rounded-lg border border-blue-400 flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Datos Personales</h2>
            <p className="font-bold text-sm">Nombre completo: <span className="font-thin">{userData.fullname || ''}</span></p>
            <p className="font-bold text-sm">DNI/CUIT: <span className="font-thin">{userData.dni || ''}</span></p>
            <p className="font-bold text-sm">Celular: <span className="font-thin">{userData.phone || ''}</span></p>
            <p className="font-bold text-sm">Email: <span className="font-thin">{userData.email || ''}</span></p>
            <p className="font-bold text-sm">Dirección: <span className="font-thin">{userData.address || ''}</span></p>
            <p className="font-bold text-sm">Localidad y Provincia: <span className="font-thin">{userData.location || ''}</span></p>
            <p className="font-bold text-sm">Código Postal: <span className="font-thin">{userData.postal_code || ''}</span></p>
            <button onClick={() => setPersonalDataModal(true)} className="mt-5 bg-page-blue-normal text-white px-4 py-2 rounded hover:bg-blue-300 duration-300">Editar Datos</button>
          </div>

          <div className="flex-1 w-full max-w-lg p-6 bg-white rounded-lg border border-blue-400 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Cambiar Contraseña</h2>
            <form className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium">Contraseña Actual <br /> <span className="text-[10.5px]">(no es necesario llenar este campo si no tenia una antes)</span></label>
                <input
                  autoComplete="off"
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={passFormData.actualPassword}
                  onChange={(e) => setPassFormData(prevState => ({ ...prevState, actualPassword: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nueva Contraseña</label>
                <input
                  autoComplete="off"
                  type="password"
                  minLength={8}
                  className="w-full p-2 border border-gray-300 rounded"
                  value={passFormData.newPassword}
                  onChange={(e) => setPassFormData(prevState => ({ ...prevState, newPassword: e.target.value }))}
                />
              </div>
              {passFormData.newPassword &&
                <div>
                  <label className="block text-sm font-medium">Confirmar nueva contraseña</label>
                  <input
                    autoComplete="off"
                    type="password"
                    className={`w-full p-2 border rounded ${passFormData.confirmNewPassword && passFormData.confirmNewPassword !== passFormData.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                    value={passFormData.confirmNewPassword}
                    onChange={(e) => setPassFormData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                  />
                  {passFormData.confirmNewPassword && passFormData.confirmNewPassword !== passFormData.newPassword && (
                    <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>
                  )}
                </div>
              }
              <button
                onClick={(e) => changePass(e)}
                className="bg-page-blue-normal text-white px-4 py-2 rounded hover:bg-blue-300 duration-300 disabled:opacity-20 disabled:hover:bg-page-blue-normal"
                disabled=
                {
                  !passFormData.actualPassword ||
                  !passFormData.newPassword ||
                  passFormData.newPassword.length < 8 ||
                  passFormData.newPassword !== passFormData.confirmNewPassword
                }
              >
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </section>

      {personalDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col justify-center shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Editar Datos Personales</h2>

            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Nombre completo"
              onChange={(e) => setEditedData(prev => ({ ...prev, fullname: e.target.value }))}
              value={editedData.fullname || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="DNI/CUIT"
              onChange={(e) => setEditedData(prev => ({ ...prev, dni: e.target.value }))}
              value={editedData.dni || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Celular"
              onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
              value={editedData.phone || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Email"
              onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
              value={editedData.email || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Ej: Dirección 123"
              onChange={(e) => setEditedData(prev => ({ ...prev, address: e.target.value }))}
              value={editedData.address || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Ej: Localidad y Provincia"
              onChange={(e) => setEditedData(prev => ({ ...prev, location: e.target.value }))}
              value={editedData.location || ''} />
            <input
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Codigo postal"
              onChange={(e) => setEditedData(prev => ({ ...prev, postal_code: e.target.value }))}
              value={editedData.postal_code || ''} />
            <button
              type="button"
              onClick={changePersonalData}
              className="mt-4 bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600 duration-300"
            >
              Editar
            </button>

            <button
              onClick={() => {
                setPersonalDataModal(false)
                setEditedData({
                  fullname: userData.fullname,
                  dni: userData.dni,
                  phone: userData.phone,
                  email: userData.email,
                  address: userData.address,
                  location: userData.location,
                  postal_code: userData.postal_code
                })
              }}
              className="mt-4 bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
