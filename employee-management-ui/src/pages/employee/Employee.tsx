import { useNavigate } from "react-router-dom";
import {
    useGetEmployeesQuery,
    useDeleteEmployeeMutation
} from "../../features/employee/employeeApi";


function Employee() {


    const navigate = useNavigate();


    const {
        data,
        isLoading,
        isError
    } = useGetEmployeesQuery();



    const [
        deleteEmployee,
        {
            isLoading: isDeleting
        }
    ] = useDeleteEmployeeMutation();



    const employees = data?.data ?? [];





    const handleDeleteEmployee = async (id: string) => {


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this employee?"
            );


        if (!confirmDelete) return;


        try {

            await deleteEmployee(id).unwrap();

        }
        catch (error) {

            console.log(error);

        }

    };





    if (isLoading) {

        return (

            <div className="p-6">

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow
                ">
                    Loading employees...
                </div>

            </div>

        );
    }





    if (isError) {

        return (

            <div className="
                rounded-xl
                bg-red-50
                p-5
                text-red-600
            ">

                Failed to load employees

            </div>

        );

    }






    return (

        <div className="
            space-y-6
            p-6
        ">





            {/* Header */}


            <div className="
            flex
            flex-col
            gap-5
            rounded-3xl
            bg-white
            p-6
            shadow-sm
            border
            border-slate-100
            md:flex-row
            md:items-center
            md:justify-between
        ">


                <div>


                    <div className="
                    flex
                    items-center
                    gap-3
                ">

                        <h1 className="
                        text-3xl
                        font-bold
                        text-slate-800
                    ">
                            Employees
                        </h1>


                        <span className="
                        rounded-full
                        bg-blue-100
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-blue-700
                    ">
                            {employees.length}
                        </span>


                    </div>



                    <p className="
                    mt-2
                    text-slate-500
                ">
                        Manage employees, roles and organization details.
                    </p>


                </div>





                <button

                    onClick={() =>
                        navigate(
                            "/dashboard/employees/create"
                        )
                    }

                    className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-semibold
            text-white
            shadow
            transition
            hover:bg-blue-700
            "

                >

                    + Add Employee

                </button>



            </div>







            {/* Table */}



            <div className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
        ">


                <div className="
            overflow-x-auto
        ">



                    <table className="
            min-w-full
            text-left
        ">



                        <thead>


                            <tr className="
            bg-slate-50
            text-sm
            text-slate-600
        ">


                                <th className="px-6 py-4">
                                    Employee
                                </th>


                                <th className="px-6 py-4">
                                    Role
                                </th>


                                <th className="px-6 py-4">
                                    Designation
                                </th>


                                <th className="px-6 py-4">
                                    Email
                                </th>


                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>


                            </tr>


                        </thead>







                        <tbody>



                            {
                                employees.length === 0

                                    ?

                                    (

                                        <tr>

                                            <td
                                                colSpan={5}
                                                className="
                py-12
                text-center
                text-slate-500
                "
                                            >

                                                No employees found

                                            </td>


                                        </tr>

                                    )


                                    :


                                    employees.map((employee) => (


                                        <tr

                                            key={employee._id}

                                            className="
            border-t
            hover:bg-slate-50
            transition
            "

                                        >





                                            {/* Employee */}


                                            <td className="
                px-6
                py-4
            ">


                                                <div className="
                flex
                items-center
                gap-3
            ">


                                                    <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-blue-600
                font-bold
                text-white
            ">

                                                        {
                                                            employee.firstName
                                                                ?.charAt(0)
                                                        }

                                                        {
                                                            employee.lastName
                                                                ?.charAt(0)
                                                        }


                                                    </div>





                                                    <div>

                                                        <p className="
                    font-semibold
                    text-slate-800
                ">

                                                            {
                                                                employee.firstName
                                                            }
                                                            {" "}
                                                            {
                                                                employee.lastName
                                                            }

                                                        </p>



                                                        <p className="
                    text-xs
                    text-slate-400
                ">

                                                            Employee ID:
                                                            {" "}
                                                            {employee._id.slice(-6)}

                                                        </p>


                                                    </div>


                                                </div>



                                            </td>








                                            {/* Role */}


                                            <td className="px-6 py-4">


                                                <span
                                                    className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${employee.user?.role === "admin"

                                                            ?
                                                            "bg-purple-100 text-purple-700"

                                                            :

                                                            employee.user?.role === "manager"

                                                                ?

                                                                "bg-green-100 text-green-700"

                                                                :

                                                                "bg-blue-100 text-blue-700"

                                                        }

                `}
                                                >

                                                    {employee.user?.role}

                                                </span>


                                            </td>








                                            <td className="
                px-6
                py-4
                text-slate-600
            ">

                                                {employee.designation || "-"}

                                            </td>







                                            <td className="
                px-6
                py-4
                text-slate-600
            ">

                                                {employee.email}

                                            </td>







                                            <td className="
                px-6
                py-4
            ">


                                                <div className="
                flex
                justify-center
                gap-3
            ">


                                                    <button

                                                        onClick={() =>
                                                            navigate(
                                                                `/dashboard/employees/${employee._id}/edit`
                                                            )
                                                        }

                                                        className="
            rounded-xl
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-600
            hover:bg-blue-100
            "

                                                    >

                                                        Edit

                                                    </button>






                                                    <button

                                                        disabled={isDeleting}

                                                        onClick={() =>
                                                            handleDeleteEmployee(
                                                                employee._id
                                                            )
                                                        }

                                                        className="
            rounded-xl
            bg-red-50
            px-4
            py-2
            text-sm
            font-medium
            text-red-600
            hover:bg-red-100
            disabled:opacity-50
            "

                                                    >

                                                        {
                                                            isDeleting
                                                                ?
                                                                "..."
                                                                :
                                                                "Delete"
                                                        }


                                                    </button>



                                                </div>


                                            </td>






                                        </tr>


                                    ))

                            }




                        </tbody>


                    </table>



                </div>


            </div>


        </div>

    );
}


export default Employee;