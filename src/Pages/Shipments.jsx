import useDocumentTitle from '../Utils/useDocumentTitle'

export default function Shipments() {
  const localidades = [
    { id: 1, localidad: "Rosario" },
    { id: 2, localidad: "Tucuman" },
    { id: 3, localidad: "San Antonio Oeste" },
    { id: 4, localidad: "Salta" },
    { id: 5, localidad: "Villa la Angostura" },
    { id: 6, localidad: "Piedra del Aguila" },
    { id: 7, localidad: "Rio Turbio" },
    { id: 8, localidad: "Mar del Plata" },
    { id: 9, localidad: "Mendoza" },
    { id: 10, localidad: "Cutral Co" },
    { id: 11, localidad: "Ingeniero Jacobacci" },
    { id: 12, localidad: "El Bolson" },
    { id: 13, localidad: "Sarmiento" },
    { id: 14, localidad: "Rio Grande" },
    { id: 15, localidad: "Bahia Blanca" },
    { id: 16, localidad: "San Juan" },
    { id: 17, localidad: "Añelo" },
    { id: 18, localidad: "Junin de los Andes" },
    { id: 19, localidad: "Caleta Olivia" },
    { id: 20, localidad: "Cte. Piedra Buena" },
    { id: 21, localidad: "Ushuaia" },
    { id: 22, localidad: "La Pampa" },
    { id: 23, localidad: "Neuquen" },
    { id: 24, localidad: "Viedma" },
    { id: 25, localidad: "Chos Malal" },
    { id: 26, localidad: "Pico Truncado" },
    { id: 27, localidad: "Rio Gallegos" },
    { id: 28, localidad: "Cordoba (CAPITAL)" },
    { id: 29, localidad: "Catriel" },
    { id: 30, localidad: "Zapala" },
    { id: 31, localidad: "Bariloche" },
    { id: 32, localidad: "Comodoro Rivadavia" },
    { id: 33, localidad: "Pto. Santa Cruz" },
    { id: 34, localidad: "Rio Cuarto" },
    { id: 35, localidad: "Villa Regina" },
    { id: 36, localidad: "Trelew" },
    { id: 37, localidad: "San Martin de los Andes" },
    { id: 38, localidad: "Esquel" },
    { id: 39, localidad: "Calafate" },
    { id: 40, localidad: "Rio Colorado" },
    { id: 41, localidad: "General Roca" },
    { id: 42, localidad: "Rawson" },
    { id: 43, localidad: "Jujuy" },
    { id: 44, localidad: "Puerto Deseado" },
    { id: 45, localidad: "Cafayate" },
    { id: 46, localidad: "Choele Choel" },
    { id: 47, localidad: "Corrientes (Corrientes)" },
    { id: 48, localidad: "Resistencia (Chaco)" },
    { id: 49, localidad: "Puerto Madryn" },
    { id: 50, localidad: "Perito Moreno" },
    { id: 51, localidad: "Sierra Grande" },
    { id: 52, localidad: "Olavarria" },
    { id: 53, localidad: "Catamarca" },
    { id: 54, localidad: "San Rafael (Mdz)" },
    { id: 55, localidad: "Rincon de los Sauces" },
    { id: 56, localidad: "San Julian" }
  ].sort((a, b) => a.localidad.localeCompare(b.localidad));
  
  useDocumentTitle('Zonas de Envio')

  return (
    <div className="flex flex-col items-center min-h-[600px] p-5 py-10 w-full bg-gray-100 text-gray-900">
      <h1 className="text-3xl max-sm:text-2xl font-bold mb-6">Zonas de Envío</h1>
      <p className="mb-6 text-center max-w-2xl max-sm:text-base text-lg">
        Realizamos envíos recurrentes a las siguientes localidades. Si tu ciudad no está en la lista, contáctanos para consultar disponibilidad.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 select-none md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {localidades.map(({ id, localidad }) => (
          <div 
            key={id} 
            className="bg-white hover:italic text-gray-800 shadow-md rounded-lg p-4 rounded-t-3xl text-center max-sm:text-sm font-medium border border-gray-300 hover:shadow-lg duration-100 hover:scale-105"
          >
            {localidad}
          </div>
        ))}
      </div>
    </div>
  );
}
