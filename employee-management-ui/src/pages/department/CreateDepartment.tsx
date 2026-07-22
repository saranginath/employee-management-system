import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiBriefcase, FiCode, FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";

import {
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useGetDepartmentByIdQuery
} from "../../features/department/departmentApi";
import { useEffect } from "react";


interface DepartmentForm {
    name: string;
    code: string;
    description?: string;
    status: "active" | "inactive";
}

const CreateDepartment = () => {
    const { id } = useParams();
    console.log(id)
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const [
        createDepartment,
        {
            isLoading: isCreating
        }
    ] = useCreateDepartmentMutation();
    const [
        updateDepartment,
        {
            isLoading: isUpdating
        }
    ] = useUpdateDepartmentMutation();


    const isLoading = isCreating || isUpdating;

    const {
        data: response,
    } = useGetDepartmentByIdQuery(id!, {
        skip: !id,
    });

    const department = response?.data;




    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }

    } = useForm<DepartmentForm>({

        defaultValues: {
            status: "active"
        }

    });
    useEffect(() => {
        if (department) {
            reset({
                name: department.name,
                code: department.code,
                description: department.description,
                status: department.status,
            });
        }
    }, [department, reset]);

    const onSubmit = async (data: DepartmentForm) => {
        try {
            if (isEditMode) {
                await updateDepartment({
                    id: id!,
                    data
                }).unwrap();
            }
            else {
                await createDepartment(data).unwrap();
            }
            navigate("/dashboard/departments");
        }
        catch (error) {
            console.log(error);
        }
    };

    const inputClass = `

        mt-2
        w-full
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-4
        py-3
        text-sm
        text-slate-800
        outline-none
        transition

        focus:border-blue-500
        focus:bg-white
        focus:ring-4
        focus:ring-blue-100

    `;





    const labelClass = `

        text-sm
        font-semibold
        text-slate-700

    `;






    return (
        <div className="
        min-h-screen
        bg-slate-50
        p-5
        md:p-8">
            <div className="
            mx-auto
            max-w-4xl
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-xl
            border
            border-slate-100
        ">





                {/* Header */}


                <div className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                px-8
                py-10
                text-white
            ">



                    <div className="
                    flex
                    items-center
                    gap-4
                ">


                        <div className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white/20
                        backdrop-blur
                    ">

                            <FiBriefcase size={32} />


                        </div>




                        <div>

                            <h1 className="
                            text-3xl
                            font-bold
                        ">
                                {isEditMode ? "Update Department" : "Create Department"}
                            </h1>


                            <p className="
                            mt-2
                            text-blue-100
                        ">
                                {
                                    isEditMode
                                        ? "Update department information."
                                        : "Add and manage company departments."
                                }
                            </p>

                        </div>



                    </div>


                </div>








                <form

                    onSubmit={
                        handleSubmit(onSubmit)
                    }

                    className="
                    space-y-8
                    p-6
                    md:p-10
                "

                >






                    {/* Basic Information */}


                    <div>


                        <h2 className="
                    mb-5
                    flex
                    items-center
                    gap-2
                    text-lg
                    font-bold
                    text-slate-800
                ">


                            <FiBriefcase />

                            Department Information


                        </h2>





                        <div className="
                    grid
                    grid-cols-1
                    gap-6
                    md:grid-cols-2
                ">




                            {/* Name */}


                            <div>


                                <label className={labelClass}>
                                    Department Name
                                </label>



                                <input

                                    {...register(
                                        "name",
                                        {
                                            required:
                                                "Department name is required"
                                        }
                                    )}

                                    placeholder="Engineering"

                                    className={inputClass}

                                />



                                {
                                    errors.name &&

                                    <p className="
                            mt-1
                            text-xs
                            text-red-500
                        ">

                                        {errors.name.message}

                                    </p>

                                }



                            </div>









                            {/* Code */}



                            <div>


                                <label className={labelClass}>
                                    Department Code
                                </label>



                                <div className="relative">


                                    <FiCode
                                        className="
                        absolute
                        left-4
                        top-6
                        text-slate-400
                    "
                                    />


                                    <input


                                        {...register(
                                            "code",
                                            {
                                                required:
                                                    "Department code is required"
                                            }
                                        )}


                                        placeholder="ENG"


                                        className="
                    pl-11
                    mt-2
                    w-full
                    rounded-xl
                    border
                    bg-slate-50
                    px-4
                    py-3
                    uppercase
                    "


                                    />

                                </div>




                                {
                                    errors.code &&

                                    <p className="
                        mt-1
                        text-xs
                        text-red-500
                        ">

                                        {errors.code.message}

                                    </p>
                                }




                            </div>







                        </div>


                    </div>









                    {/* Description */}


                    <div>


                        <label className={labelClass}>

                            Description

                        </label>



                        <div className="relative">


                            <FiFileText
                                className="
                    absolute
                    left-4
                    top-5
                    text-slate-400
                    "
                            />


                            <textarea


                                {...register(
                                    "description"
                                )}


                                rows={4}


                                placeholder="
                Describe department responsibility
                "


                                className="
                mt-2
                w-full
                rounded-xl
                border
                bg-slate-50
                px-12
                py-3
                focus:ring-4
                focus:ring-blue-100
                "

                            />



                        </div>


                    </div>








                    {/* Status */}


                    <div>


                        <label className={labelClass}>
                            Status
                        </label>



                        <select

                            {...register(
                                "status"
                            )}

                            className={inputClass}

                        >


                            <option value="active">
                                Active
                            </option>


                            <option value="inactive">
                                Inactive
                            </option>


                        </select>



                    </div>









                    {/* Buttons */}



                    <div className="
                flex
                gap-4
                border-t
                pt-6
            ">



                        <button

                            type="button"

                            onClick={() => navigate(
                                "/dashboard/departments"
                            )}

                            className="
                flex-1
                rounded-xl
                bg-slate-200
                py-3
                font-semibold
                text-slate-700
                hover:bg-slate-300
                "

                        >

                            Cancel


                        </button>






                        <button

                            disabled={isLoading}

                            className="
                flex-1
                rounded-xl
                bg-blue-600
                py-3
                font-semibold
                text-white
                hover:bg-blue-700
                disabled:opacity-50
                "

                        >


                            {
                                isLoading
                                    ?
                                    "Saving..."
                                    :
                                    isEditMode
                                        ?
                                        "Update Department"
                                        :
                                        "Create Department"
                            }


                        </button>



                    </div>







                </form>



            </div>



        </div>


    );

};


export default CreateDepartment;