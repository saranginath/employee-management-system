import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiEdit,
    FiLock
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import {
    useGetProfileQuery
} from "../../features/profile/profileApi";


function Profile() {


    const navigate = useNavigate();


    const {
        data,
        isLoading
    } = useGetProfileQuery();



    if (isLoading) {

        return (
            <div className="p-6">
                Loading profile...
            </div>
        );

    }



    const user = data?.data;



    return (

        <div className="p-6">


            <div
                className="
                max-w-4xl
                mx-auto
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-8
                "
            >


                {/* Header */}

                <div
                    className="
                    flex
                    justify-between
                    items-center
                    "
                >


                    <div
                        className="
                        flex
                        items-center
                        gap-5
                        "
                    >


                        <img

                            src={
                                user?.profilePicture ??
                                `https://ui-avatars.com/api/?name=${user?.firstName}`
                            }

                            className="
                            w-24
                            h-24
                            rounded-full
                            object-cover
                            border
                            "

                        />


                        <div>

                            <h1
                                className="
                                text-2xl
                                font-bold
                                text-slate-800
                                "
                            >

                                {user?.firstName} {user?.lastName}

                            </h1>


                            <p
                                className="
                                text-slate-500
                                capitalize
                                "
                            >

                                {user?.role}

                            </p>


                        </div>


                    </div>



                    <button

                        onClick={() =>
                            navigate(
                                "/dashboard/profile/edit"
                            )
                        }

                        className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        "
                    >

                        <FiEdit />

                        Edit

                    </button>


                </div>





                {/* Details */}

                <div
                    className="
                    mt-8
                    space-y-5
                    "
                >


                    <div
                        className="
                        flex
                        items-center
                        gap-3
                        text-slate-700
                        "
                    >

                        <FiMail />

                        {user?.email}

                    </div>



                    <div
                        className="
                        flex
                        items-center
                        gap-3
                        text-slate-700
                        "
                    >

                        <FiPhone />

                        {user?.phone || "No phone added"}

                    </div>




                    <div
                        className="
                        flex
                        items-center
                        gap-3
                        text-slate-700
                        "
                    >

                        <FiMapPin />

                        {user?.address || "No address added"}

                    </div>


                </div>





                <button

                    onClick={() =>
                        navigate(
                            "/dashboard/profile/change-password"
                        )
                    }

                    className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    border
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-slate-100
                    "

                >

                    <FiLock />

                    Change Password

                </button>


            </div>


        </div>

    );

}


export default Profile;