import { baseApi } from "../../api/baseApi";
import type { EmployeeForm } from "./employeeSchema";

export interface Department {
    _id: string;
    name: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    designation: string;
    salary: number;
    department: {
        _id: string;
        name: string;
    };
    user: {
        _id: string;
        email: string;
        role: "admin" | "manager" | "employee";
        isActive: boolean;
    };
}


export const employeeApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        // Create Employee
        createEmployee: builder.mutation<
            ApiResponse<Employee>,
            EmployeeForm
        >({
            query: (data) => ({
                url: "/employees",
                method: "POST",
                body: data,
            }),

            invalidatesTags: [{
                type: "Employee",
                id: "LIST"
            }],
        }),



        // Get All Employees
        getEmployees: builder.query<
            {
                success: boolean;
                data: Employee[];
            },
            void
        >({
            query: () => ({
                url: "/employees",
                method: "GET",
            }),

            providesTags: (result) => [
                {
                    type: "Employee",
                    id: "LIST",
                },
                ...(result?.data.map((employee) => ({
                    type: "Employee" as const,
                    id: employee._id,
                })) ?? []),
            ],
        }),



        // Get Employee By Id
        getEmployeeById: builder.query<
            ApiResponse<Employee>,
            string
        >({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "GET",
            }),

            providesTags: ["Employee"],
        }),




        // Update Employee
        updateEmployee: builder.mutation<
            ApiResponse<Employee>,
            {
                id: string;
                data: Partial<EmployeeForm>;
            }
        >({
            query: ({
                id,
                data
            }) => ({
                url: `/employees/${id}`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: (result) => [
                {
                    type: "Employee",
                    id: result?.data._id
                },
                {
                    type: "Employee",
                    id: "LIST"
                }
            ],
        }),




        // Delete Employee
        deleteEmployee: builder.mutation<
            {
                message: string;
            },
            string
        >({
            query: (id) => ({
                url: `/employees/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: [
                {
                    type: "Employee",
                    id: "LIST"
                }
            ],
        }),

    }),

    overrideExisting: false,

});



export const {
    useCreateEmployeeMutation,
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;