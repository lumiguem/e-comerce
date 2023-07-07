import { useForm } from "react-hook-form"
import { loginUser, logout } from "../store/slices/userInfo.slice"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {

  const { token, user } = useSelector((store) => store.userInfo)

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const submit = (dataForm) => {

    dispatch(loginUser(dataForm))

  }

  const handleClickLogout = ()=>{
    dispatch(logout())
  }

  return (
    <section className="bg-gray-100 grid place-content-center px-2">

      {

        token ? (
        <section  className=" grid gap-6 bg-white rounded-xl p-4 w-[300px] text-center" >
          <i className='bx bxs-user-circle text-center text-8xl text-gray-400'></i>
          <span className="font-bold">{user.firstName} {user.lastName}</span>
          <button onClick={handleClickLogout} className="bloc w-full py-2 bg-red-600 text-white hover:bg-red-500 transition-colors rounded-md">Logout</button>
        </section>
        ) : (
          <form
            onSubmit={handleSubmit(submit)}
            className=" grid gap-6 bg-white rounded-xl p-4 max-w-[350px]">
            <h3 className="font-semibold text-xl p-4 ]">Welcome! Enter your email and password to continue</h3>

            <section className="bg-[#d8f5fd] p-4 rounded-md py-2">

              <h5 className="text-center font-bold mb-4">Test data</h5>

              <div className="flex items-center gap-2">
                <i className='bx bx-envelope text-xl'></i>
                <span>john@gmail.com</span>
              </div>

              <div className="flex items-center gap-2">
                <i className='bx bx-lock-alt text-xl'></i>
                <span>john1234</span>
              </div>

            </section>
            <div className="grid gap-2">
              <label className="text-sm " htmlFor="email">Email</label>
              <input {...register("email")} className="border-gray-300 border-[1px] outline-none px-2 rounded-sm" id="email" type="text" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm " htmlFor="password">Password</label>
              <input {...register("password")} autoComplete="none" className="border-gray-300 border-[1px] outline-none px-2 rounded-sm" id="password" type="password" />
            </div>

            <button className="block w-full py-2 bg-red-600 text-white hover:bg-red-500 transition-colors">Login</button>
            <span className="text-sm">Don't have an account? Sign up</span>
          </form>
        )

      }
      


    </section>
  )
}

export default Login