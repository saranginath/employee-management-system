import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

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
      setApiError(
        err?.data?.message ?? "Failed to update password. Please try again.",
      );
    }
  };

  const fields: {
    key: keyof PasswordForm;
    label: string;
    placeholder: string;
    visKey: keyof typeof show;
  }[] = [
    {
      key: "currentPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      visKey: "current",
    },
    {
      key: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      visKey: "next",
    },
    {
      key: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Re-enter new password",
      visKey: "confirm",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Account Security</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your password and keep your account protected
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Security Info */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-100
                        text-blue-600
                        text-xl
                    "
            >
              <FiLock />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Password Security</h3>

              <p className="text-sm text-slate-500">Protect your account</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div
              className="
                        rounded-xl
                        bg-slate-50
                        p-4
                    "
            >
              <p className="text-sm font-semibold text-slate-700">
                Strong password tips
              </p>

              <ul
                className="
                            mt-3
                            space-y-2
                            text-sm
                            text-slate-500
                        "
              >
                <li>✓ Minimum 6 characters</li>

                <li>✓ Use uppercase and lowercase letters</li>

                <li>✓ Add numbers and symbols</li>

                <li>✓ Avoid common passwords</li>
              </ul>
            </div>

            <div
              className="
                        rounded-xl
                        bg-blue-50
                        p-4
                        text-sm
                        text-blue-700
                    "
            >
              🔒 Never share your password with anyone.
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div
          className="
                lg:col-span-2
                rounded-3xl
                border
                border-slate-100
                bg-white
                p-8
                shadow-sm
            "
        >
          <div className="mb-6">
            <h2
              className="
                        text-xl
                        font-bold
                        text-slate-900
                    "
            >
              Change Password
            </h2>

            <p
              className="
                        text-sm
                        text-slate-500
                    "
            >
              Update your password regularly to secure your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {fields.map((f) => (
              <div key={f.key}>
                <label
                  className="
                                text-sm
                                font-semibold
                                text-slate-700
                            "
                >
                  {f.label}
                </label>

                <div className="relative mt-2">
                  <input
                    type={show[f.visKey] ? "text" : "password"}

                    placeholder={f.placeholder}

                    {...register(f.key, {
                      required: `${f.label} is required`,

                      ...(f.key === "newPassword" && {
                        minLength: {
                          value: 6,
                          message: "Password must contain minimum 6 characters",
                        },
                      }),

                      ...(f.key === "confirmPassword" && {
                        validate: (value) =>
                          value === newPassword || "Passwords do not match",
                      }),
                    })}

                    className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3
                                    pr-12
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-blue-100
                                    "
                  />

                  <button
                    type="button"

                    onClick={() =>
                      setShow({
                        ...show,
                        [f.visKey]: !show[f.visKey],
                      })
                    }

                    className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                    hover:text-blue-600
                                    "
                  >
                    {show[f.visKey] ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {errors[f.key] && (
                  <p
                    className="
                                    mt-1
                                    text-xs
                                    text-red-500
                                "
                  >
                    {errors[f.key]?.message}
                  </p>
                )}

                {f.key === "newPassword" && newPassword && (
                  <div className="mt-3">
                    <div
                      className="
                                        h-2
                                        overflow-hidden
                                        rounded-full
                                        bg-slate-100
                                    "
                    >
                      <div
                        className={`
                                            h-full
                                            rounded-full
                                            transition-all
                                            ${strengthColor}
                                            `}
                      />
                    </div>

                    <p
                      className="
                                        mt-2
                                        text-xs
                                        text-slate-500
                                    "
                    >
                      Password strength:
                      <span className="ml-1 font-semibold">
                        {passwordStrength}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}

            {apiError && (
              <div
                className="
                            flex
                            gap-2
                            rounded-xl
                            bg-red-50
                            p-4
                            text-sm
                            text-red-600
                        "
              >
                <FiAlertCircle />
                {apiError}
              </div>
            )}

            {success && (
              <div
                className="
                            flex
                            gap-2
                            rounded-xl
                            bg-emerald-50
                            p-4
                            text-sm
                            text-emerald-700
                        "
              >
                <FiCheckCircle />
                Password updated successfully.
              </div>
            )}

            <button
              disabled={isLoading}

              className="
                        mt-3
                        w-full
                        rounded-xl
                        bg-blue-700
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-800
                        disabled:opacity-50
                        "
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
