import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../../features/auth/authSchema";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    mode: "onTouched",
  });
  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await registerUser(data).unwrap();

      toast.success(response.message || "Registration successful");

      navigate("/login");
    } catch (error: any) {
      const message = error?.data?.message || "Registration failed";
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <div
      className=" min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600  via-indigo-600 to-purple-600 px-4 py-8
        "
    >
      <div
        className="
            w-full
            max-w-md
            bg-white
            rounded-3xl
            shadow-2xl
            p-6
            sm:p-8
            "
      >
        <div
          className="
                text-center
                mb-8
                "
        >
          <div
            className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                   bg-linear-to-br from-blue-600 to-purple-600
                    text-white
                    flex font-bold text-2xl
                    items-center
                    justify-center
                    shadow-lg
                    "
          >
            EMS
          </div>

          <h1
            className="
                    text-3xl
                    font-bold
                    text-gray-800
                    mt-4
                    "
          >
            Create Account
          </h1>

          <p
            className="
                    text-gray-500
                    text-sm
                    mt-2
                    "
          >
            Join Employee Management System
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
                space-y-5
                "
        >
          {/* First Name */}

          <div>
            <label className="text-sm font-medium">First Name</label>

            <input
              {...register("firstName")}
              placeholder="Enter first name"
              className="
                        w-full
                        mt-1
                        px-4
                        py-3
                        border
                        rounded-xl
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
            />

            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}

          <div>
            <label className="text-sm font-medium">Last Name</label>

            <input
              {...register("lastName")}
              placeholder="Enter last name"
              className="
                        w-full
                        mt-1
                        px-4
                        py-3
                        border
                        rounded-xl
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
            />

            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className="
                        w-full
                        mt-1
                        px-4
                        py-3
                        border
                        rounded-xl
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}

                {...register("password")}

                placeholder="Enter password"

                className="
                            w-full
                            mt-1
                            px-4
                            py-3
                            pr-12
                            border
                            rounded-xl
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
              />
              <button
                type="button"

                onClick={() => setShowPassword(!showPassword)}

                className="
                            absolute
                            right-4
                            top-4
                            text-gray-500
                            "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && (
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
          )}
          <button
            disabled={isLoading}

            className="
                    w-full
                    py-3
                    rounded-xl
                    bg-linear-to-br from-blue-600 to-purple-600
                    hover:bg-blue-700
                    disabled:bg-gray-400
                    text-white
                    font-semibold
                    transition
                    "
          >
            {isLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <div
          className="
                text-center
                text-sm
                mt-6
                "
        >
          <span className="text-gray-500">Already have an account?</span>

          <button
            onClick={() => navigate("/login")}

            className="
                    ml-2
                    text-blue-600
                    font-semibold
                    hover:underline
                    "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
