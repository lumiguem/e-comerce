import { useEffect, useState } from "react"
import { axiosEcommerce } from "../utils/configAxios"
import Product from "../components/home/Product";
import ListProducts from "../components/home/ListProducts";


const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const productsByName = products.filter((product) => product.title.toLowerCase().includes(productName))

  console.log(productsByName)

  // const productsByName =

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentProductName = e.target.productName.value
    setProductName(currentProductName.toLowerCase())
  };

  const handleClickCategory = (e) => {
    setCurrentCategory(e.target.dataset.category)
  }

  const handleClickCategoryList = () => {
    setIsOpen(!isOpen)
  }


  useEffect(() => {
    axiosEcommerce
      .get("/categories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axiosEcommerce
      .get(`/products?categoryId=${currentCategory}`)
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))

  }, [currentCategory])

  return (
    <section>
      <form className="grid sm:grid-cols-[auto_1fr] grid-rows-[aut_1fr] gap-2 relative" onSubmit={handleSubmit}>
        <section className="hidden sm:block row-span-2 px-4 py-4 w-[280px] text-gray-800">
          
          <div className="hidden fixed sm:grid grid-cols-1">
            <div onClick={handleClickCategoryList} className="w-[250px] border-b-2 flex justify-between cursor-pointer">
              <h4>Category</h4>
              <div className="text-2xl">
                {isOpen ? (<i className='bx bx-chevron-down'></i>) : (<i className='bx bx-chevron-up'></i>)}
              </div>
            </div>
            <ul className={`${isOpen ? "block" : "hidden"} mt-4 px-4 `}>
              <li onClick={handleClickCategory} data-category={""} className="cursor-pointer hover:font-semibold">All</li>
              {
                categories.map((category) => (
                  <li onClick={handleClickCategory}  className="cursor-pointer hover:font-semibold" data-category={category.id} key={category.id}>{category.name}</li>
                ))}
            </ul>
          </div>
        </section>

        <div className=" flex justify-center py-10 mx-8 sm:mx-16">
          <input className="border w-[180px] sm:w-full px-4" id="productName" type="text" />
          <button className="bg-red-500 text-white sm:text-xl sm:p-2 px-4 sm:px-10"><i className='bx bx-search-alt-2'></i></button>
        </div>




        <ListProducts products={productsByName} />
      </form>
    </section>
  );
};

export default Home