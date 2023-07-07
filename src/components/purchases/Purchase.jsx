import { formatDDMMYYYY } from "../../utils/date"

const Purchase = ({purchase}) => {

    const totalPrice = (purchase.quantity * purchase.product.price).toFixed(2)

  return (
    <article className="grid grid-cols-2 gap-2 text-sm items-center">
        {/* Sección izquierda */}
        <section className="flex items-center gap-2">
            <div className="h-[50px] aspect-square">
                <img className="h-full w-full object-contain" src={purchase.product.images[2].url} alt="" />
            </div>
            <span className="text-xs ml-6">{purchase.product.title}</span>
        </section>
        {/* Sección derecha  */}
        <section className="grid text-center gap-3 justify-center items-center sm:grid-cols-3">
            <span className="text-gray-400 text-xs">{formatDDMMYYYY(purchase.createdAt)}</span>
            <span className="p-1 border border-gray-300 text-xs">{purchase.quantity}</span>
            <span className="font-semibold text-xs">${totalPrice}</span>


        </section>
    </article>
  )
}

export default Purchase