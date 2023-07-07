import Product from "./Product"

const ListProducts = ({products}) => {
  return (
    <section className=" grid gap-12 justify-center sm grid-cols-[repeat(auto-fill,_280px)]">
          {products.map((product) => (
          <Product key={product.id} product={product}/>
          ))}
        </section>
  )
}

export default ListProducts