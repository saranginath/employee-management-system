import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../api/hooks";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../features/auth/authSchema";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";


interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean
}


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [apiError, setApiError] = useState("")

    const navigate = useNavigate();

    const dispatch = useAppDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });


    const [login, { isLoading }] = useLoginMutation();



    const onSubmit = async (data: LoginForm) => {

        try {

            const response = await login(data).unwrap();


            dispatch(
                setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken,
                    rememberMe: data.rememberMe ?? false
                })
            );
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error: any) {
            const message =
                error?.data?.message ||
                "Registration failed";
            toast.error("Login failed");
            setApiError(message)
        }
    };
    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-linear-to-br
                from-blue-500
                via-green-900
                to-indigo-900
                px-4
                py-8
            "
        >


            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    p-6
                    sm:p-8
                "
            >




                <div className="text-center">


                    <div
                        className="
                            mx-auto
                            w-16
                            h-16
                            rounded-full
                            flex
                            text-white
                            items-center
                            justify-center
                            bg-linear-to-br from-blue-600 to-purple-600
                            font-bold
                            text-2xl
                        "
                    >
                        EMS
                    </div>



                    <h1
                        className="
                            mt-5
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-gray-800
                        "
                    >
                        Welcome Back
                    </h1>



                    <p className="mt-2 text-sm text-gray-500">
                        Login to Employee Management System
                    </p>


                </div>



                {/* Form */}


                <form
                    onSubmit={handleSubmit(onSubmit)} noValidate
                    className="
                        mt-8
                        flex
                        flex-col
                        gap-5
                    "
                >



                    <div>


                        <input

                            type="email"

                            className="
                                w-full
                                border
                                rounded-lg
                                px-4
                                py-3
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                transition
                            "

                            {...register("email")}

                            placeholder="Email address"

                        />


                        {
                            errors.email &&
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        }


                    </div>





                    <div className="relative">


                        <input

                            type={showPassword ? "text" : "password"}

                            className="
                        w-full
                        border
                        rounded-lg
                        px-4
                        py-3
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        transition
                        "

                            {...register("password")}

                            placeholder="Password"

                        />


                        <button

                            type="button"

                            onClick={() =>
                                setShowPassword(!showPassword)
                            }

                            className="
                                                    absolute
                                                    right-4
                                                    top-4
                                                    text-gray-500
                                                    "

                        >

                            {
                                showPassword
                                    ?
                                    <EyeOff size={20} />
                                    :
                                    <Eye size={20} />
                            }


                        </button>


                        {
                            errors.password &&
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        }


                    </div>





                    {/* Options */}


                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            text-sm
                        "
                    >


                        <label
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-600
                                cursor-pointer
                            "
                        >

                            <input

                                type="checkbox"

                                checked={rememberMe}

                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }

                                className="
                                    w-4
                                    h-4
                                "

                            />


                            Remember me


                        </label>




                        <button

                            type="button"

                            onClick={() => navigate("/recovery")}

                            className="
                                text-blue-600
                                hover:underline
                                font-medium
                            "
                        >

                            Forgot password?

                        </button>



                    </div>


                    {
                        apiError && (

                            <div
                                className="
        bg-red-100
        text-red-600
        px-4
        py-3
        rounded-lg
        text-sm
        "
                            >
                                {apiError}
                            </div>

                        )
                    }


                    {/* Login button */}


                    <button

                        type="submit"

                        disabled={isLoading}

                        className="
                            w-full
                            bg-linear-to-br from-blue-600 to-purple-600
                            hover:bg-blue-700
                            disabled:bg-blue-300
                            text-white
                            font-semibold
                            py-3
                            rounded-lg
                            transition
                            shadow-md
                        "

                    >

                        {
                            isLoading
                                ? "Logging in..."
                                : "Login"
                        }


                    </button>



                </form>





                {/* Register */}


                <div
                    className="
                        mt-6
                        flex
                        justify-center
                        items-center
                        gap-2
                        text-sm
                    "
                >

                    <span className="text-gray-500">
                        Don't have an account?
                    </span>


                    <button

                        onClick={() => navigate("/register")}

                        className="
                            text-blue-600
                            font-medium
                            hover:underline
                        "

                    >

                        Register

                    </button>


                </div>



            </div>



        </div>

    );
}


export default Login;