export default function MyAccount() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return(
    <div>
      <h1 className='text-center text-2xl font-bold'>Mi Cuenta</h1>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-lg'>Bienvenido a tu cuenta</p>
        <p className='text-lg'>Aquí podrás gestionar tus datos y pedidos.</p>
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}