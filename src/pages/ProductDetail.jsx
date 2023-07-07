import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { axiosEcommerce } from "../utils/configAxios"
import ListProducts from "../components/home/ListProducts"
import { addProductCart } from "../store/slices/cart.slice"
import { useDispatch } from "react-redux"

const sliderStyles = {
  1: "-ml-[0%]",
  2: "-ml-[100%]",
  3: "-ml-[200%]",
}

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [imageToShow, setImageToShow] = useState(1);


  const { id } = useParams()

  const dispatch = useDispatch()

  const handleClickPlus = () => setQuantity(quantity + 1)
  const handleClickMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleClickNextImage = () => {
    if (imageToShow < 3) {
      setImageToShow(imageToShow + 1)
    }
  }
  const handleClickPreviusImage = () => {
    if (imageToShow > 1) {
      setImageToShow(imageToShow - 1)
    }
  };

  const handleClickAddProduct = () => {
    const productToAdd = {
      quantity,
      productId: product.id,
    }
    dispatch(addProductCart(productToAdd))
  }

  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => console.log(err))

  }, [id])

  useEffect(() => {

    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product.categoryId}`)
        .then(({ data }) => {
          const filteredProducts = data.filter((item) => item.id !== product.id)
          setSimilarProducts(filteredProducts)
        })
        .catch((err) => console.log(err))

    }

  }, [product])
  return (
    <section className="p-2  mx-auto items-center px-16">
      <section className="flex text-xs sm:text-2xl gap-2 items-center py-20">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square rounded-full bg-red-700"></div>
        <span className="font-bold w-[200px] sm:w-max">{product?.title}</span>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {/* slider */}
        <article className="overflow-hidden relative mt-4">
          <section className={`flex w-[300%] ${sliderStyles[imageToShow]} transition-all duration-300`}>
            <div className=" h-[300px] w-[calc(100%_/_3)]">
              <img className="w-full h-full object-contain" src={product?.images[0].url} alt="" />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)]">
              <img className="w-full h-full object-contain" src={product?.images[1].url} alt="" />
            </div>
            <div className="h-[300px] w-[calc(100%_/_3)]">
              <img className="w-full h-full object-contain" src={product?.images[2].url} alt="" />
            </div>

          </section>
          <button onClick={handleClickPreviusImage} className="absolute top-1/2 left-2 text-2xl bg bg-red-600  hover:bg-red-500  rounded-full h-[35px] aspect-square text-white -translate-y-1/2"><i className='bx bxs-chevron-left'></i></button>
          <button onClick={handleClickNextImage} className="absolute top-1/2 right-2 text-2xl bg bg-red-600  hover:bg-red-500  rounded-full h-[35px] aspect-square text-white -translate-y-1/2"><i className='bx bxs-chevron-right'></i></button>
        </article>
        {/* detalle del producto */}
        <article className="grid gap-6 px-10 sm:px-16">
          <div>
            <h4 className="text-gray-400 sm: text-2xl font-semibold">{product?.brand}</h4>
            <span className="font-semibold text-gray-800 text-lg sm:text-3xl ml-2 block">{product?.title}</span>
          </div>
          <section className="grid grid-cols-2">
            <article>
              <h4 className="text-gray-300 font-semibold">Price</h4>
              <span className="font-semibold text-gray-800 text-lg ml-2 block">$ {product?.price}</span>
            </article>

            <article>
              <h5 className="text-sm text-gray-300 font-semibold ">Quantity</h5>
              <div className="flex max-w-max border text-gray-800 ">
                <button className="p-1 px-3 border-r" onClick={handleClickMinus}>-</button>
                <div className="p-1 px-3 border-r ">{quantity}</div>
                <button className="p-1 px-3" onClick={handleClickPlus}>+</button>
              </div>
            </article>
          </section>
          <button onClick={handleClickAddProduct} className="bloc w-full py-4 bg-red-600 text-white hover:bg-red-500 transition-colors">Add to cart <i className="bx bx-cart"></i></button>
          <p className="text-sm">{product?.description}</p>
        </article>
      </section>

      <section className="py-8 grid gap-4">
        <h3 className="p-8 sm:text-2xl text-red-500 font-semibold">Discover similar items </h3>
        
        <ListProducts products={similarProducts} />
      </section>
    </section>
  )
}

export default ProductDetail