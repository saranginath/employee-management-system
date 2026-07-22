import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiEdit,
    FiLock,
    FiBriefcase,
    FiUser
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
    console.log(data)




    return (


        <div className="min-h-screen bg-slate-50 p-6">



            {/* Header */}

            <div className="mb-6">

                <h1 className="
                    text-3xl
                    font-bold
                    text-slate-900
                ">

                    My Profile

                </h1>


                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                ">

                    Manage your personal information and account settings

                </p>


            </div>






            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-6
            ">



                {/* Profile Card */}


                <div className="
                    rounded-3xl
                    bg-white
                    border
                    border-slate-100
                    shadow-sm
                    overflow-hidden
                ">



                    {/* Banner */}

                    <div className="
                        h-28
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                    " />





                    <div className="
                        px-6
                        pb-6
                        text-center
                    ">



                        <img

                            src={
                                user?.profilePicture ??
                                `https://ui-avatars.com/api/?name=${user?.firstName}`
                            }


                            className="
                                mx-auto
                                -mt-14
                                h-28
                                w-28
                                rounded-full
                                border-4
                                border-white
                                object-cover
                            "

                        />




                        <h2 className="
                            mt-4
                            text-xl
                            font-bold
                            text-slate-900
                        ">

                            {user?.firstName} {user?.lastName}

                        </h2>




                        <span className="
                            mt-2
                            inline-flex
                            rounded-full
                            bg-blue-50
                            px-4
                            py-1
                            text-sm
                            font-semibold
                            text-blue-600
                            capitalize
                        ">

                            {user?.role}

                        </span>





                        <button

                            onClick={() =>
                                navigate(
                                    "/dashboard/profile/edit"
                                )
                            }


                            className="
                                mt-6
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                            "

                        >

                            <FiEdit />

                            Edit Profile


                        </button>


                    </div>


                </div>









                {/* Details */}


                <div className="
                    lg:col-span-2
                    space-y-6
                ">



                    {/* Personal Information */}


                    <div className="
                        rounded-3xl
                        bg-white
                        border
                        border-slate-100
                        p-6
                        shadow-sm
                    ">



                        <div className="
                            flex
                            items-center
                            gap-2
                            mb-6
                        ">

                            <FiUser
                                className="text-blue-600"
                            />

                            <h2 className="
                                text-xl
                                font-bold
                                text-slate-900
                            ">

                                Personal Information

                            </h2>


                        </div>






                        <div className="
                            grid
                            md:grid-cols-2
                            gap-5
                        ">



                            <InfoCard

                                icon={<FiMail />}

                                title="Email"

                                value={
                                    user?.email ??
                                    "Not available"
                                }

                            />




                            <InfoCard

                                icon={<FiPhone />}

                                title="Phone"

                                value={
                                    user?.phone ??
                                    "No phone added"
                                }

                            />





                            <InfoCard

                                icon={<FiMapPin />}

                                title="Address"

                                value={
                                    user?.address ??
                                    "No address added"
                                }

                            />





                            <InfoCard

                                icon={<FiBriefcase />}

                                title="Department"

                                value={
                                    user?.department?.name ??
                                    "Not Assigned"
                                }

                            />


                        </div>


                    </div>









                    {/* Account Security */}


                    <div className="
                        rounded-3xl
                        bg-white
                        border
                        border-slate-100
                        p-6
                        shadow-sm
                    ">


                        <div className="
                            flex
                            justify-between
                            items-center
                        ">


                            <div>


                                <h2 className="
                                    text-xl
                                    font-bold
                                ">

                                    Account Security

                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                ">

                                    Keep your account secure

                                </p>


                            </div>





                            <FiLock
                                className="
                                    text-blue-600
                                    text-2xl
                                "
                            />


                        </div>




                        <button

                            onClick={() =>
                                navigate(
                                    "/dashboard/profile/change-password"
                                )
                            }


                            className="
                                mt-5
                                rounded-xl
                                border
                                px-5
                                py-3
                                font-semibold
                                text-slate-700
                                transition
                                hover:bg-slate-100
                            "

                        >

                            Change Password

                        </button>



                    </div>




                </div>



            </div>


        </div>

    );

}




const InfoCard = ({
    icon,
    title,
    value
}: {
    icon: any;
    title: string;
    value: string;
}) => {


    return (

        <div className="
            flex
            items-center
            gap-4
            rounded-2xl
            bg-slate-50
            p-4
        ">


            <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
            ">

                {icon}

            </div>




            <div>


                <p className="
                    text-xs
                    text-slate-400
                ">

                    {title}

                </p>



                <p className="
                    font-semibold
                    text-slate-700
                ">

                    {value}

                </p>


            </div>



        </div>

    );

}



export default Profile;