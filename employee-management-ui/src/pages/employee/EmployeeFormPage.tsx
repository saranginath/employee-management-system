import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  employeeSchema,
  type EmployeeForm,
} from "../../features/employee/employeeSchema";
import { useGetDepartmentsQuery } from "../../features/department/departmentApi";
import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../../features/employee/employeeApi";

import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiDollarSign,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import type { RootState } from "../../api/store";
export default function EmployeeFormPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === "admin";
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { data: employeeData, isLoading: employeeLoading } =
    useGetEmployeeByIdQuery(id!, {
      skip: !isEditMode,
    });

  const { data: departmentResponse, isLoading: departmentLoading } =
    useGetDepartmentsQuery();
  const departments = departmentResponse?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      role: "employee",
      salary: 0,
    },
  });

  useEffect(() => {
    if (employeeData?.data && isEditMode) {
      const employee = employeeData.data;

      reset({
        firstName: employee.firstName ?? "",

        lastName: employee.lastName ?? "",

        email: employee.email ?? "",

        phone: employee.phone ?? "",

        department:
          typeof employee.department === "string"
            ? employee.department
            : (employee.department?._id ?? ""),

        designation: employee.designation ?? "",

        role: employee.role ?? "employee",

        salary: employee.salary ?? 0,
      });
    }
  }, [employeeData, reset, isEditMode]);

  const [createEmployee, { isLoading: createLoading }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: updateLoading }] =
    useUpdateEmployeeMutation();

  const loading = createLoading || updateLoading;
  const submitHandler = async (data: EmployeeForm) => {
    setApiError("");

    try {
      if (!data.department) {
        return;
      }

      if (isEditMode) {
        const updateData = {
          ...data,
        };

        // manager and employee cannot update email
        if (!isAdmin) {
          delete updateData.email;
        }

        await updateEmployee({
          id: id!,

          data: updateData,
        }).unwrap();
      } else {
        await createEmployee(data).unwrap();
      }

      navigate("/dashboard/employees");
    } catch (error: any) {
      console.log(error);

      setApiError(
        error?.data?.message ||
          error?.data?.error ||
          "Something went wrong. Please try again.",
      );
    }
  };

  if (employeeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading employee...
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:ring-4 focus:ring-blue-100";

  const inputWithIconClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100";

  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FiUser size={32} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {isEditMode ? "Update Employee" : "Create Employee"}
                </h1>
                <p className="text-blue-100 mt-1">
                  {isEditMode
                    ? "Update employee details"
                    : "Add new employee to organization"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard/employees")}
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 transition"
            >
              <FiArrowLeft />
              Back
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-10">
          {/* PERSONAL INFORMATION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <FiUser />
              </div>
              <div>
                <h2 className="text-xl font-bold">Personal Information</h2>
                <p className="text-sm text-slate-500">Basic employee details</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* FIRST NAME */}
              <div>
                <label className={labelClass}>First Name</label>
                <input {...register("firstName")} className={inputClass} />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* LAST NAME */}
              <div>
                <label className={labelClass}>Last Name</label>
                <input {...register("lastName")} className={inputClass} />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              {/* EMAIL */}
              {/* EMAIL */}
              <div>
                <label className={labelClass}>Email Address</label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-5 text-slate-400" />

                  <input
                    {...register("email")}

                    disabled={isEditMode && !isAdmin}

                    className={`
                ${inputWithIconClass}

                ${
                  isEditMode && !isAdmin
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : ""
                }

            `}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}

                {isEditMode && !isAdmin && (
                  <p className="text-xs text-slate-500 mt-1">
                    Only admin can change employee email
                  </p>
                )}
              </div>

              {/* PHONE WITH COUNTRY SELECTOR */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:ring-4 focus-within:ring-blue-100">
                  <Controller
                    name="phone"

                    control={control}

                    render={({ field }) => (
                      <PhoneInput
                        international

                        defaultCountry="AE"

                        placeholder="Enter phone number"

                        value={field.value}

                        onChange={(value) => {
                          field.onChange(value ?? "");
                        }}
                      />
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* JOB INFORMATION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <FiBriefcase />
              </div>
              <div>
                <h2 className="text-xl font-bold">Job Information</h2>
                <p className="text-sm text-slate-500">
                  Employee role and salary details
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* DEPARTMENT */}
              <div>
                <label className={labelClass}>Department</label>
                <select
                  {...register("department")}

                  className={inputClass}
                >
                  <option
                    value=""

                    disabled
                  >
                    {departmentLoading
                      ? "Loading departments..."
                      : "Select Department"}
                  </option>

                  {departments.map((dep) => (
                    <option
                      key={dep._id}

                      value={dep._id}
                    >
                      {dep.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              {/* DESIGNATION */}
              <div>
                <label className={labelClass}>Designation</label>
                <input {...register("designation")} className={inputClass} />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation.message}
                  </p>
                )}
              </div>

              {/* ROLE */}
              {/* ROLE */}
              <div>
                <label className={labelClass}>Role</label>

                <select
                  {...register("role")}
                  disabled={isEditMode}
                  className={`${inputClass} ${
                    isEditMode
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : ""
                  }`}
                >
                  <option value="employee">Employee</option>

                  <option value="manager">Manager</option>

                  <option value="admin">Admin</option>
                </select>

                {isEditMode && (
                  <p className="text-xs text-slate-500 mt-1">
                    Role cannot be changed while updating employee
                  </p>
                )}
              </div>

              {/* SALARY */}
              <div>
                <label className={labelClass}>Salary</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-5 text-slate-400" />
                  <input
                    type="number"
                    {...register("salary", { valueAsNumber: true })}
                    className={inputWithIconClass}
                  />
                </div>
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          {apiError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-600">{apiError}</p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="border-t pt-6 flex gap-5">
            <button
              type="button"
              onClick={() => navigate("/dashboard/employees")}
              className="flex-1 py-3 rounded-xl bg-slate-200 font-semibold hover:bg-slate-300 transition"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEditMode
                  ? "Update Employee"
                  : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
