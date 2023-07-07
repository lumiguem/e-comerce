import { Link } from "react-router-dom"
import { changeIsShowCart } from "../../store/slices/cart.slice"
import { useDispatch, useSelector } from "react-redux"




const Header = () => {

  const { products } = useSelector(store => store.cart);
  const dispatch = useDispatch()

  const handleClickShowCart = () => dispatch(changeIsShowCart())

  const totalItems = products.length

  return (
    <header className="sticky -top-0 z-40  bg-white">    

      <nav className="grid grid-cols-5 h-[70px] items-center border-b">
        <div className="sm:border-r h-full grid items-center col-span-2 px-6">
        <Link className="text-sm sm:text-3xl text-red-500 font-bold sm:px-2" to="/">e-comerce</Link>
        </div>
        <div className="border-r h-full grid items-center justify-center">
        <Link className="text-xl text-gray-400 hover:text-red-500" to="/login"><i className='bx bxs-user'></i></Link >
        </div>
        <div className=" border-r h-full grid items-center justify-center">
        <Link className="text-xl text-gray-400 hover:text-red-500" to="/purchases"> <i className='bx bx-box'></i></Link>
        </div>
        <div className="border-r h-full  grid items-center justify-center">
        <button className="text-2xl text-gray-400 hover:text-red-500" onClick={handleClickShowCart}><i className='bx bx-cart'></i><div className="fixed text-xs bg-red-500 aspect-square rounded-full px-1 text-white translate-x-4 -translate-y-5">{totalItems} </div> </button>
        </div>
        
      </nav>
      
    </header>
  )
}

export default Header