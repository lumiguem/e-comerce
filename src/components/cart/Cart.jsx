import { useDispatch, useSelector } from "react-redux"
import store from "../../store";
import { changeIsShowCart, checkOutCart, getCartProducts } from "../../store/slices/cart.slice";
import { useEffect } from "react";
import CartProduct from "./CartProduct";

const Cart = () => {

    const { isShowCart, products } = useSelector(store => store.cart);
    const { token } = useSelector(store => store.userInfo)
    const dispatch = useDispatch()
   
    const handleClickChangeShowCart = () =>  dispatch(changeIsShowCart());

    const handleClickCheckOut = () =>  dispatch(checkOutCart())
    
    const totalPriceCheckOut = products.reduce(
    (acc, product)=> acc + (product.quantity * product.product.price) , 0)


    useEffect (()=>{
        if(token && isShowCart){
            dispatch(getCartProducts());
        }
    },[isShowCart]);
    return (
        <section className={`fixed top-0 bg-white h-screen ${isShowCart && token ? "right-0" : "-right-full"} w-[300px] transition-all duration-200 p-2 shadow-2xl shadow-black/30 grid grid-rows-[auto_1fr_auto] z-50`}>
            <button onClick={handleClickChangeShowCart} className="absolute top-3 right-3 text-xl text-red-500"><i className='bx bxs-x-circle '></i></button>
            <h3 className="font-bold text-xl">Shopping Cart</h3>

            {/* productos del carrito */}
            <section className="grid gap-6 content-start py-4 overflow-y-auto">
            {
                products.map((cartProduct)=>(
                <CartProduct  key={cartProduct.id} cartProduct={cartProduct}/>
                ))}

            </section>

            {/* Total Price */}
            <section className=" grid border-t-[1px] border-gray-300 p-4 grid-cols-2 grid-rows-2 gap-4">
                <span className="text-gray-500">Total</span>
                <span className="text-end"> ${(totalPriceCheckOut).toFixed(2)}</span>
                <button onClick={handleClickCheckOut} className="col-span-2 block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">Checkout</button>
            </section>
        </section>
    )
}

export default Cart