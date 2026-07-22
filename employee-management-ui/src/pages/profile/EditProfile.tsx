import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    FiUser,
    FiCamera,
    FiCheckCircle,
    FiAlertCircle,
    FiPhone,
    FiMapPin,
    FiSave,
    FiX
} from "react-icons/fi";

import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadProfilePictureMutation,
} from "../../features/profile/profileApi";

import { useNavigate } from "react-router-dom";



type ProfileForm = {

    firstName: string;

    lastName: string;

    phone: string;

    address: string;

};




function EditProfile() {


    const navigate = useNavigate();



    const {
        data,
        isLoading: profileLoading
    } = useGetProfileQuery();



    const [
        updateProfile,
        {
            isLoading: saving
        }
    ] = useUpdateProfileMutation();



    const [
        uploadImage,
        {
            isLoading: uploading
        }
    ] = useUploadProfilePictureMutation();



    const user = data?.data;



    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }

    } = useForm<ProfileForm>();



    const [
        preview,
        setPreview
    ] = useState<string | null>(null);



    const [
        status,
        setStatus
    ] = useState<any>(null);





    useEffect(() => {


        if (user) {

            reset({

                firstName: user.firstName || "",

                lastName: user.lastName || "",

                phone: user.phone || "",

                address: user.address || ""

            });

        }


    }, [user, reset]);







    const submit = async (data: ProfileForm) => {


        setStatus(null);


        try {


            await updateProfile(data).unwrap();


            setStatus({

                type: "success",

                message: "Profile updated successfully"

            });


        }
        catch (error: any) {


            setStatus({

                type: "error",

                message:
                    error?.data?.message ||
                    "Profile update failed"

            });


        }


    };








    const imageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        const file = e.target.files?.[0];


        if (!file) return;



        setPreview(
            URL.createObjectURL(file)
        );



        const formData = new FormData();


        formData.append(
            "image",
            file
        );



        try {


            await uploadImage(formData).unwrap();



            setStatus({

                type: "success",

                message: "Profile picture updated"

            });



        }
        catch (error: any) {


            setStatus({

                type: "error",

                message:
                    error?.data?.message ||
                    "Image upload failed"

            });


        }


    };






    if (profileLoading) {


        return (

            <div className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-50
            ">


                <div className="
                    rounded-2xl
                    bg-white
                    p-8
                    shadow
                ">

                    Loading profile...

                </div>


            </div>

        );

    }






    return (


        <div className="
            min-h-screen
            bg-slate-50
            p-6
        ">


            <div className="
                mx-auto
                max-w-3xl
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-xl
            ">



                {/* Header */}

                <div className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    p-8
                    text-white
                ">


                    <h1 className="
                        text-3xl
                        font-bold
                    ">

                        Edit Profile

                    </h1>


                    <p className="
                        mt-2
                        text-blue-100
                    ">

                        Manage your personal information

                    </p>


                </div>







                <div className="p-8">





                    {/* Avatar */}


                    <div className="
                        flex
                        items-center
                        gap-6
                    ">



                        <div className="relative">


                            <div className="
                                h-28
                                w-28
                                overflow-hidden
                                rounded-full
                                border-4
                                border-white
                                bg-blue-100
                                shadow-lg
                                flex
                                items-center
                                justify-center
                            ">


                                {
                                    preview || user?.avatarUrl

                                        ?

                                        <img
                                            src={
                                                preview ||
                                                user?.avatarUrl
                                            }
                                            className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                        />

                                        :

                                        <FiUser size={40} />

                                }


                            </div>





                            <label
                                htmlFor="image"
                                className="
                                    absolute
                                    bottom-1
                                    right-1
                                    flex
                                    h-9
                                    w-9
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-600
                                    text-white
                                    shadow
                                    hover:bg-blue-700
                                "
                            >

                                <FiCamera size={18} />

                            </label>



                            <input

                                id="image"

                                hidden

                                type="file"

                                accept="image/*"

                                onChange={imageUpload}

                            />



                        </div>





                        <div>


                            <h3 className="
                                text-xl
                                font-semibold
                            ">

                                {
                                    user?.firstName
                                }

                                {" "}

                                {
                                    user?.lastName
                                }

                            </h3>


                            <p className="
                                text-sm
                                text-slate-500
                            ">

                                {
                                    uploading
                                        ?
                                        "Uploading image..."
                                        :
                                        "Click camera to change photo"
                                }

                            </p>


                        </div>



                    </div>









                    <form
                        onSubmit={
                            handleSubmit(submit)
                        }

                        className="
                            mt-10
                            space-y-6
                        "
                    >




                        <div className="
                            grid
                            gap-5
                            md:grid-cols-2
                        ">



                            <div>


                                <label className="label">
                                    First Name
                                </label>


                                <input

                                    className="
                                        input
                                        w-full
                                        rounded-xl
                                    "

                                    {...register(
                                        "firstName",
                                        {
                                            required:
                                                "First name required"
                                        }
                                    )}

                                />


                                {
                                    errors.firstName &&

                                    <p className="text-xs text-red-500">

                                        {
                                            errors.firstName.message
                                        }

                                    </p>
                                }


                            </div>




                            <div>

                                <label className="label">
                                    Last Name
                                </label>


                                <input

                                    className="
                                        input
                                        w-full
                                        rounded-xl
                                    "

                                    {...register(
                                        "lastName"
                                    )}

                                />

                            </div>


                        </div>







                        <div>


                            <label className="label flex gap-2">

                                <FiPhone />

                                Phone

                            </label>


                            <input

                                className="
                                    input
                                    w-full
                                    rounded-xl
                                "

                                {...register("phone")}

                            />

                        </div>






                        <div>


                            <label className="label flex gap-2">

                                <FiMapPin />

                                Address

                            </label>


                            <textarea

                                rows={4}

                                className="
                                    input
                                    w-full
                                    rounded-xl
                                "

                                {...register("address")}

                            />


                        </div>








                        {
                            status &&

                            <div className={`
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                p-4
                                text-sm

                                ${status.type === "success"
                                    ?
                                    "bg-green-50 text-green-700"
                                    :
                                    "bg-red-50 text-red-600"
                                }
                            `}>


                                {
                                    status.type === "success"
                                        ?
                                        <FiCheckCircle />
                                        :
                                        <FiAlertCircle />
                                }


                                {
                                    status.message
                                }


                            </div>

                        }







                        <div className="
                            flex
                            justify-end
                            gap-4
                        ">


                            <button

                                type="button"

                                onClick={() =>
                                    navigate(
                                        "/dashboard/profile"
                                    )
                                }

                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    px-6
                                    py-3
                                    hover:bg-slate-100
                                "

                            >

                                <FiX />

                                Cancel

                            </button>





                            <button

                                disabled={saving}

                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-blue-600
                                    px-6
                                    py-3
                                    font-semibold
                                    text-white
                                    hover:bg-blue-700
                                    disabled:opacity-50
                                "

                            >

                                <FiSave />


                                {
                                    saving
                                        ?
                                        "Saving..."
                                        :
                                        "Save Changes"
                                }


                            </button>


                        </div>



                    </form>


                </div>


            </div>


        </div>


    );


}


export default EditProfile;