import { useForm } from "react-hook-form";
import type { RegisterRequest } from "../../features/auth/types";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

function Register() {
    const navigate = useNavigate()
    const [registerUser] = useRegisterUserMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
    const onSubmit = async (data: RegisterRequest) => {
        try {
            const response = await registerUser(data).unwrap();
            toast.success(response.message || "Account created successfully")
            navigate('/login')
            console.log(response)
        }
        catch (error) {
            toast.error("Registration failed")
            console.log(error)
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-600 via-indigo-600 to-purple-500 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shawdow-2xl p-8 ">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-blue-100 text-2xl font-bold">
                        EMS
                    </div>
                    < h1 className="font-bold text-3xl mt-4 text-gray-800"> Create Account</h1 >
                    <p className="text-gray-500">Join Employee Management Systme </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                        <input className="mt-10 border rounded-lg  p-2" {...register("firstName")} placeholder="FirstName" />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                        <input className=" border rounded-lg  p-2"  {...register("lastName")} placeholder="LastName" />
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                        <input className=" border rounded-lg  p-2" {...register("email")} placeholder="Email" />
                        {errors.email && <p>{errors.email.message}</p>}
                        <input className="border rounded-lg  p-2"{...register("password")} placeholder="Password" />
                        {errors.password && <p>{errors.password.message}</p>}
                        <button className="border p-2 rounded-lg">Register</button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-6 ">Already have an account</p>
                    <button onClick={() => navigate('/login')} className="ml-2 text-blue-600 font-medium hover:underline">Login</button>
                </div>
            </div >

        </div >
    )
}
export default Register;