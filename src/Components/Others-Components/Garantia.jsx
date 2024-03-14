export default function Garantia () {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="font-bold">
          Tramite para Garantía o Devolución
        </span>
        <p>
        Los plazos para generar cambios y devoluciones comienzan a correr a partir del día 
        de la compra, en el caso de envío a domicilio comenzará a correr a partir de la fecha 
        de entrega del producto.
        </p>
      </div>

      <div className="flex flex-col">
        <span className="font-bold">
          Para realizar cambios de productos adquiridos:
        </span>
        <p>
          Deberá acercarse a la sucursal por donde ha retirado el producto
        </p>
      </div>
      
      <div className="flex flex-col">
        <span className="font-bold">
          En caso de envío a domicilio
        </span>
        <p>
          Deberá tramitarse directamente con Casa Central Liniers. Deberá presentarse con la factura o comprobante de 
          compra correspondiente, junto con el producto con sus etiquetas y empaques originales y en buen estado.
        </p>
      </div>
    </section>
  )
}