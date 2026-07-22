import { useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordForm } from "../../features/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
function Resetpassword() {
    const { token } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema)
    })
    const navigate = useNavigate()
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const onSubmit = async (data: ResetPasswordForm) => {
        try {
            await resetPassword({
                token: token!,
                password: data.password
            }).unwrap();
            toast.success("Password reset successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Invalid or expired reset link");
            console.log(error)
        }
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-red-500 via-orange-400 to-indigo-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl p-8">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        EMS
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-gray-800">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-gray-500 text-center">
                        Create a new password for your account.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                {...register("password")}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="w-full rounded-xl border border-gray-300 py-3 pl-4 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                {...register("confirmPassword")}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Resetpassword;