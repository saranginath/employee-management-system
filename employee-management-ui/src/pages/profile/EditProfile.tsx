import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FiUser,
    FiCamera,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";

import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadProfilePictureMutation,
} from "../../features/profile/profileApi";


type ProfileForm = {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
};



function EditProfile() {


    const {
        data,
        isLoading: profileLoading
    } = useGetProfileQuery();


    const [
        updateProfile,
        { isLoading: saving }
    ] = useUpdateProfileMutation();


    const [
        uploadImage,
        { isLoading: uploading }
    ] = useUploadProfilePictureMutation();



    const user = data?.data;



    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm<ProfileForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            address: ""
        }
    });



    const [preview, setPreview] =
        useState<string | null>(null);



    const [status, setStatus] =
        useState<{
            type: "success" | "error";
            message: string;
        } | null>(null);




    // Load API data into form

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
                    "Failed to update profile"
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




    const cancel = () => {

        reset({

            firstName: user?.firstName || "",

            lastName: user?.lastName || "",

            phone: user?.phone || "",

            address: user?.address || ""

        });

    };




    if (profileLoading) {

        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading profile...
            </div>
        );

    }




    return (

        <div className="min-h-screen bg-slate-50 p-6">


            <div className="
            mx-auto max-w-xl
            rounded-3xl
            bg-white
            p-8
            shadow
            ">


                <h2 className="text-xl font-bold">
                    Edit Profile
                </h2>


                <p className="text-sm text-slate-500">
                    Update your personal details
                </p>



                {/* Avatar */}

                <div className="mt-6 flex items-center gap-5">


                    <div className="relative">

                        <div className="
                        flex h-20 w-20
                        items-center justify-center
                        overflow-hidden
                        rounded-full
                        bg-blue-100
                        text-blue-600
                        ">


                            {
                                preview ||
                                    user?.avatarUrl
                                    ?
                                    <img
                                        src={
                                            preview ||
                                            user?.avatarUrl
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                    :
                                    <FiUser size={30} />
                            }


                        </div>



                        <label
                            htmlFor="image"
                            className="
                            absolute bottom-0 right-0
                            flex h-7 w-7
                            cursor-pointer
                            items-center justify-center
                            rounded-full
                            bg-blue-600
                            text-white
                            "
                        >
                            <FiCamera size={14} />
                        </label>



                        <input
                            id="image"
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={imageUpload}
                        />

                    </div>


                    <span className="text-sm text-gray-500">

                        {
                            uploading
                                ? "Uploading..."
                                : "Change profile picture"
                        }

                    </span>


                </div>




                <form
                    onSubmit={handleSubmit(submit)}
                    className="mt-8 space-y-5"
                >



                    <div className="grid gap-5 sm:grid-cols-2">


                        <div>

                            <label>
                                First Name
                            </label>

                            <input
                                className="input w-full"
                                {...register(
                                    "firstName",
                                    {
                                        required: "First name required"
                                    }
                                )}
                            />


                            {
                                errors.firstName &&
                                <p className="text-xs text-red-500">
                                    {errors.firstName.message}
                                </p>
                            }


                        </div>




                        <div>

                            <label>
                                Last Name
                            </label>


                            <input
                                className="input w-full"
                                {...register("lastName")}
                            />

                        </div>


                    </div>




                    <div>

                        <label>
                            Phone
                        </label>


                        <input
                            className="input w-full"
                            {...register("phone")}
                        />

                    </div>




                    <div>

                        <label>
                            Address
                        </label>


                        <textarea
                            rows={3}
                            className="input w-full"
                            {...register("address")}
                        />

                    </div>




                    {
                        status && (

                            <div className={`
                            flex gap-2 rounded-xl p-3 text-sm
                            ${status.type === "success"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-red-50 text-red-600"
                                }
                            `}>


                                {
                                    status.type === "success"
                                        ?
                                        <FiCheckCircle />
                                        :
                                        <FiAlertCircle />
                                }


                                {status.message}


                            </div>

                        )
                    }




                    <div className="flex gap-3">


                        <button
                            disabled={saving}
                            className="
                            rounded-xl
                            bg-blue-600
                            px-6 py-3
                            text-white
                            "
                        >

                            {
                                saving
                                    ? "Saving..."
                                    : "Save Changes"
                            }

                        </button>



                        <button
                            type="button"
                            onClick={cancel}
                            className="
                            rounded-xl
                            border
                            px-6 py-3
                            "
                        >
                            Cancel
                        </button>


                    </div>



                </form>


            </div>


        </div>

    );

}


export default EditProfile;