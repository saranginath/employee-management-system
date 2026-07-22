import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import { useChangePasswordMutation } from "../../features/profile/profileApi";

type PasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

function ChangePassword() {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const [show, setShow] = useState({
        current: false,
        next: false,
        confirm: false,
    });

    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<PasswordForm>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = watch("newPassword");

    const passwordStrength =
        newPassword?.length >= 10
            ? "Strong"
            : newPassword?.length >= 6
                ? "Medium"
                : newPassword?.length > 0
                    ? "Weak"
                    : "";

    const strengthColor =
        passwordStrength === "Strong"
            ? "bg-emerald-500 w-full"
            : passwordStrength === "Medium"
                ? "bg-amber-500 w-2/3"
                : passwordStrength === "Weak"
                    ? "bg-red-500 w-1/3"
                    : "w-0";

    const onSubmit = async (data: PasswordForm) => {
        setApiError(null);
        setSuccess(false);

        try {
            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }).unwrap();

            setSuccess(true);
            reset();
        } catch (err: any) {
            setApiError(err?.data?.message ?? "Failed to update password. Please try again.");
        }
    };

    const fields: {
        key: keyof PasswordForm;
        label: string;
        placeholder: string;
        visKey: keyof typeof show;
    }[] = [
            { key: "currentPassword", label: "Current Password", placeholder: "Enter current password", visKey: "current" },
            { key: "newPassword", label: "New Password", placeholder: "Enter new password", visKey: "next" },
            { key: "confirmPassword", label: "Confirm New Password", placeholder: "Re-enter new password", visKey: "confirm" },
        ];

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        <FiLock />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
                        <p className="text-sm text-slate-500">Keep your account secure</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
                    {fields.map((f) => (
                        <div key={f.key}>
                            <label className="text-sm font-semibold text-slate-700">{f.label}</label>
                            <div className="relative mt-2">
                                <input
                                    type={show[f.visKey] ? "text" : "password"}
                                    placeholder={f.placeholder}
                                    {...register(f.key, {
                                        required: `${f.label} is required`,
                                        ...(f.key === "newPassword" && {
                                            minLength: {
                                                value: 6,
                                                message: "New password must be at least 6 characters",
                                            },
                                        }),
                                        ...(f.key === "confirmPassword" && {
                                            validate: (value: string) =>
                                                value === newPassword || "Passwords do not match",
                                        }),
                                    })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm outline-none transition focus:ring-4 focus:ring-blue-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow({ ...show, [f.visKey]: !show[f.visKey] })}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                    aria-label={show[f.visKey] ? "Hide password" : "Show password"}
                                >
                                    {show[f.visKey] ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>

                            {errors[f.key] && (
                                <p className="mt-1 text-xs text-red-500">{errors[f.key]?.message}</p>
                            )}

                            {f.key === "newPassword" && newPassword && (
                                <div className="mt-2">
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div className={`h-full rounded-full transition-all ${strengthColor}`} />
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Strength: <span className="font-medium">{passwordStrength}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                    {apiError && (
                        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            <FiAlertCircle className="mt-0.5 shrink-0" />
                            {apiError}
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            <FiCheckCircle className="mt-0.5 shrink-0" />
                            Password updated successfully.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-sm transition hover:shadow-md disabled:opacity-50"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;