/* global localStorage */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import axios from 'axios'
import GoogleLoginBtn from '../Components/Login/GoogleLoginBtn'
import Swal from 'sweetalert2'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export default function Login () {
  const [isRegister, setIsRegister] = useState(false)
  const { setToken, setEmail } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    dni: '',
    address: '',
    location: '',
    postal_code: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}

    if (isRegister) {
      if (!formData.name.trim()) newErrors.name = 'Campo obligatorio'
      if (!formData.username.trim()) newErrors.username = 'Campo obligatorio'
      if (!/^\d+$/.test(formData.dni)) newErrors.dni = 'Solo números'
      if (!formData.address.trim()) newErrors.address = 'Campo obligatorio'
      if (!formData.location.trim()) newErrors.location = 'Campo obligatorio'
      if (!/^\d+$/.test(formData.postal_code)) newErrors.postal_code = 'Solo números'
      if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'Solo números'
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (!formData.email.includes('@')) newErrors.email = 'Correo inválido'
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (isRegister) {
        const res = await axios.post(`${API_URL}/api/page/registerUser`, formData, { withCredentials: true })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('email', formData.email)
        setToken(res.data.token)
        setEmail(formData.email)
        navigate('/myaccount/profile')
      } else {
        const res = await axios.post(
          `${API_URL}/api/page/loginUser`,
          { email: formData.email, password: formData.password },
          { withCredentials: true }
        )
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('email', formData.email)
        setToken(res.data.token)
        setEmail(formData.email)
        navigate('/myaccount/profile')
      }
    } catch (err) {
      if (!isRegister && err.response?.status === 400) {
        Swal.fire('Error', 'Correo o contraseña incorrectos.', 'error')
      } else if (isRegister && err.response?.status === 409) {
        Swal.fire('Error', 'Este correo ya se encuentra registrado.', 'error')
      } else {
        Swal.fire('Error', 'Ocurrió un error inesperado. Inténtalo nuevamente.', 'error')
      }
      console.error('Error en la autenticación:', err)
    }
  }

  const handleGoogleLogin = async (user) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/page/loginGoogle`,
        { email: user.email, name: user.name, sub: user.sub },
        { withCredentials: true }
      )
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', user.email)
      setToken(res.data.token)
      setEmail(user.email)
      navigate('/myaccount/profile')
    } catch (err) {
      console.error('Error en login con Google:', err)
      Swal.fire('Error', 'Ocurrió un error inesperado. Intente nuevamente.', 'error')
    }
  }

  return (
    <div className={`${isRegister && 'py-10'} flex justify-center items-center min-h-[600px] max-sm:p-5 w-full bg-gray-100`}>
      <section className="w-full max-w-lg min-h-[400px] bg-[#fafafa] flex flex-col items-center gap-5 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center">
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {isRegister && (
            <>
              <InputField name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} error={errors.name} />
              <InputField name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} error={errors.username} />
              <InputField name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} error={errors.dni} type="text" pattern="\d+" />
              <InputField name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} error={errors.address} />
              <InputField name="location" placeholder="Localidad y Provincia" value={formData.location} onChange={handleChange} error={errors.location} />
              <InputField name="postal_code" placeholder="Código Postal" value={formData.postal_code} onChange={handleChange} error={errors.postal_code} type="text" pattern="\d+" />
              <InputField name="phone" placeholder="Celular" value={formData.phone} onChange={handleChange} error={errors.phone} type="text" pattern="\d+" />
            </>
          )}

          <InputField name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} error={errors.email} type="email" />
          <InputField name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} error={errors.password} type="password" minLength={6} />
          {isRegister && <InputField name="confirmPassword" placeholder="Repetir contraseña" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} type="password" minLength={6} />}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            {isRegister ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <div className="flex items-center w-full">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <article className="w-full">
          <GoogleLoginBtn onSuccess={handleGoogleLogin} />
        </article>

        <p className="text-center mt-4 text-sm">
          {isRegister ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-blue-500 hover:underline">
            {isRegister ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </p>
      </section>
    </div>
  )
}

const InputField = ({ name, placeholder, value, onChange, error, type = 'text', pattern, minLength }) => (
  <div className="w-full">
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      minLength={minLength}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
)
