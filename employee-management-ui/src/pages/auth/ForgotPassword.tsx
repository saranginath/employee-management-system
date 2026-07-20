import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordForm) => {
        console.log("Password recovery requested for", data.email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#eff6ff_45%,_#f8fafc_100%)] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                        EMS
                    </div>
                </div>

                <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
                    Forgot password?
                </h1>
                <p className="mb-6 text-center text-sm text-gray-500">
                    Enter your email and we’ll help you reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div>
                        <input
                            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="email"
                            placeholder="Email address"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Send reset link
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
