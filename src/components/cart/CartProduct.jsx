import { useDispatch } from "react-redux"
import { deleteProductCart } from "../../store/slices/cart.slice"

const CartProduct = ({ cartProduct }) => {
   
    const dispatch = useDispatch()

    const totalPrice = (cartProduct.quantity * cartProduct.product.price).toFixed(2)

    const handleClickDelete = () => {
    
        dispatch(deleteProductCart(cartProduct.id))
    }
    return (
        <article className="grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 border-t-2 py-1">
            <div className="p-2 h-[80px] aspect-square">
                <img className="w-full h-full object-contain" src={cartProduct.product.images[0].url} alt="" />
            </div>

            <div>
                <span className="text-sm line-clamp-2 ">{cartProduct.product.title}</span>
                <article className="mt-2">
                    <div className="flex max-w-max border-[1px]">
                        <button className="p-1 px-3 border-2" >-</button>
                        <div className="p-1 px-3 border-2">{cartProduct.quantity}</div>
                        <button className="p-1 px-3 border-2" >+</button>
                    </div>
                </article>
            </div>
            <i onClick={handleClickDelete} className=" bx bx-trash text-end cursor-pointer justify-self-end self-start p-2"></i>
            <span className="col-span-2 text-end text-sm">Total </span>
            <span className="px-2 text-sm">${totalPrice}</span>
        
        </article>
    )
}

export default CartProduct