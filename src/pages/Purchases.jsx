import { useEffect, useState } from "react"
import { axiosEcommerce, getConfig } from "../utils/configAxios"
import Purchase from "../components/purchases/Purchase"
import { Link } from "react-router-dom"

const Purchases = () => {

  const [purchasesHistory, setPurchasesHistory] = useState([])

  useEffect (()=>{
    axiosEcommerce
    .get("/purchases", getConfig())
    .then(({data})=>{
      const orderedPurchases = data.sort(
        (a,b)=>
         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
         setPurchasesHistory(orderedPurchases)
         
    })
    .catch((err)=>console.log(err))

  },[])

  return (
    <section className="max-w-[700px] w-auto p-4 sm:mx-auto text-gray-700">
      <section className="flex text-xs sm:text-lg gap-2 items-center py-2">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square rounded-full bg-red-700"></div>
        <span className="font-bold w-[200px] sm:w-max">purchases</span>
      </section>
      <h3 className="font-bold py-6">My Purchases</h3>

      <section className="grid gap-8 px-2 mt-8">
        {
          purchasesHistory.map(purchase => <Purchase key={purchase.id} purchase = {purchase}/>)
        }
      </section>

    </section>
  )
}

export default Purchases