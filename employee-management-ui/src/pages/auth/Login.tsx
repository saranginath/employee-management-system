import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../api/hooks";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../features/auth/authSchema";
import { useState } from "react";
interface LoginForm {
    email: string;
    password: string
}

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
    const [login, { isLoading }] = useLoginMutation()
    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await login(data).unwrap()
            console.log(response)
            dispatch(setCredentials({
                user: response.data.user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            }))
            navigate('/dashboard')
        } catch (error) {
            console.error("Login failed", error)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center flex-col gap-10 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#eff6ff_45%,_#f8fafc_100%)] px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
                <div className="">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">EMS</div>
                    <h1 className="text-center font-bold text-3xl mb-4">Welcome back</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                        <p className="text-center text-gray-500">Login to Employee Management System</p>
                        <input className="border rounded-lg p-2"{...register("email")} placeholder="Email" />
                        {errors.email && <p className="text-red-500 test-sm">{errors.email.message}</p>}
                        <input className="border rounded-lg p-2" {...register("password")} placeholder="Password" />
                        {errors.password && <p className="text-red-500 text-sm ">{errors.password.message}</p>}
                        <div className="flex items-center text-sm justify-between">
                            <label className="items-cneter flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <button type="button" onClick={() => navigate('/recovery')}>Forgot password?</button>
                        </div>
                        <button className="border rounded-lg p-2 bg-blue-600" type="submit" disabled={isLoading}>{isLoading ? "Logging in" : "Login"}</button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-6">Don't have an account?</p>
                    <button className="ml-42 text-sm text-blue-600 font-medium hover:underline text-center" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        </div >
    )
}
export default Login;