import GoogleMap from '../GoogleMap.jsx'

export default function Sucursales() {
  return (
    <section className='flex'>
      <GoogleMap longitud={10} latitud={200}/>
      <GoogleMap longitud={200} latitud={200}/>
    </section>
  )
}