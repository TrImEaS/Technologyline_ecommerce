import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Profile() {
  const { userData } = useAuth();

  useEffect(() => {
    console.log(userData)
  },[])
  
  return (
    <div className="flex flex-col items-center justify-center gap-10 pb-20 w-3/4 max-lg:w-full min-h-[500px] p-5">
      <section className="flex items-center gap-2 w-full">
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount">Mi cuenta</NavLink>
        <span>{`>`}</span>
        <NavLink className="hover:text-page-blue-normal duration-300" to="/myaccount/profile">Perfil</NavLink>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center gap-1 w-full">
        <h1 className="text-2xl font-bold text-center">Mi perfil</h1>
        <p className="text-center">Aquí puedes editar tus datos personales, cambiar tu contraseña y más.</p>

        <div className="flex flex-1 max-sm:flex-col w-full gap-5 pt-5 items-stretch max-sm:items-center">
          <div className="flex-1 w-full max-w-lg p-6 bg-white rounded-lg border border-blue-400 flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Datos Personales</h2>
            <p>Nombre completo: <span className="text-sm">{userData.name || ''}</span></p>
            <p>DNI/CUIT: <span className="text-sm">{userData.dni || ''}</span></p>
            <p>Celular: <span className="text-sm">{userData.celular || ''}</span></p>
            <p>Email: <span className="text-sm">{userData.email || ''}</span></p>
            <p>Dirección: <span className="text-sm">{userData.address || ''}</span></p>
            <button className="mt-5 bg-page-blue-normal text-white px-4 py-2 rounded hover:bg-blue-300 duration-300">Editar Datos</button>
          </div>

          <div className="flex-1 w-full max-w-lg p-6 bg-white rounded-lg border border-blue-400 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Cambiar Contraseña</h2>
            <form className="flex flex-col gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium">Contraseña Actual</label>
                <input autoComplete="off" type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Nueva Contraseña</label>
                <input autoComplete="off" type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="bg-page-blue-normal text-white px-4 py-2 rounded hover:bg-blue-300 duration-300">
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}