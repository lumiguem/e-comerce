import { Link } from "react-router-dom"
import { addProductCart } from "../../store/slices/cart.slice"
import { useDispatch } from "react-redux"

const Product = ({product}) => {

  const dispatch  = useDispatch()
   
  const handleClickAddProduct =(e) => {
    e.preventDefault();
    const productToAdd = {quantity: 1, productId: product.id};
    dispatch(addProductCart(productToAdd));
  }
  return (
    <Link className="border hover:border-2 border-gray-300 rounded-xl relative" to={`/products/${product.id}`}>
        <div className="h-[180px] mt-8 mb-6 overflow-hidden p-4 relative group">
            <img className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-500"  src={product.images[0].url} alt="" />

            <div className="absolute top-0 left-0 w-full h-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <img className=" w-full h-full object-contain" src={product.images[1].url} alt="" />

            </div>
        </div>
        <section className="border-t grid p-6  px-4 ">
            <h5 className="text-sm font-semibold text-gray-400">{product.brand}</h5>
            <h4 className="px-2 text-sm font-bold text-gray-600">{product.title}</h4>
            <span className="text-sm font-semibold text-gray-400">Price</span>
            <span className="px-2 text-sm font-bold text-gray-600">$ {product.price}</span>
            <button className="text-xl text-white absolute bottom-4 right-6" onClick={handleClickAddProduct}><i className='bx bx-cart bg-red-500 aspect-square rounded-full p-3'></i></button>
        </section>
        

    </Link>
  )
}

export default Product