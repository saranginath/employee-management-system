import { baseApi } from "../../api/baseApi";


import type { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from "./types";





export const departmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDepartment: builder.mutation<

            {
                success: boolean;

                message: string;

                data: Department;

            },

            CreateDepartmentRequest

        >({


            query: (data) => ({


                url: "/departments",


                method: "POST",


                body: data


            }), invalidatesTags: [

                {
                    type: "Department",
                    id: "LIST"
                }

            ]



        }),
        getDepartments:
            builder.query<{
                success: boolean;

                data: Department[];

            }, void>({
                query: () => ({
                    url: "/departments", method: "GET"
                }), providesTags: (result) => [
                    {
                        type: "Department",
                        id: "LIST"
                    },



                    ...(result?.data || []).map(

                        department => ({

                            type: "Department" as const,

                            id: department._id

                        })

                    )


                ]



            }),










        // ===============================
        // GET SINGLE DEPARTMENT
        // GET /departments/:id
        // ===============================



        getDepartmentById:


            builder.query<

                {
                    success: boolean;

                    data: Department;

                },


                string


            >({



                query: (id) => ({


                    url: `/departments/${id}`,


                    method: "GET"


                }),




                providesTags: (result) => [


                    {

                        type: "Department",

                        id: result?.data._id

                    }


                ]



            }),










        // ===============================
        // UPDATE DEPARTMENT
        // PUT /departments/:id
        // ===============================




        updateDepartment:



            builder.mutation<

                {

                    success: boolean;

                    message: string;

                    data: Department;


                },


                UpdateDepartmentRequest


            >({



                query: ({ id, data }) => ({



                    url: `/departments/${id}`,



                    method: "PATCH",



                    body: data



                }),




                invalidatesTags: (result) => [



                    {

                        type: "Department",

                        id: result?.data._id

                    },


                    {

                        type: "Department",

                        id: "LIST"

                    }


                ]



            }),











        // ===============================
        // DELETE DEPARTMENT
        // DELETE /departments/:id
        // ===============================




        deleteDepartment:



            builder.mutation<

                {

                    success: boolean;

                    message: string;

                },


                string


            >({



                query: (id) => ({



                    url: `/departments/${id}`,



                    method: "DELETE"



                }),




                invalidatesTags: [



                    {

                        type: "Department",

                        id: "LIST"

                    }


                ]



            })





    }),




    overrideExisting: false



});







export const {


    useCreateDepartmentMutation,


    useGetDepartmentsQuery,


    useGetDepartmentByIdQuery,


    useUpdateDepartmentMutation,


    useDeleteDepartmentMutation



} = departmentApi;