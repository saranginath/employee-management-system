import {
    FiClock,
    FiCalendar,
    FiUser,
    FiFileText
} from "react-icons/fi";

import StatCard from "../../../components/dashboard/StatCard";

import {
    useGetEmployeeDashboardQuery
} from "../../../features/dashboard/employeeDashboardApi";

import { getGreeting } from "../../../utils/greeting";


const EmployeeDashboard = () => {


    const {
        data,
        isLoading,
        isError,
        error
    } = useGetEmployeeDashboardQuery();



    console.log(
        "Dashboard Response:",
        data
    );


    console.log(
        "Dashboard Error:",
        error
    );



    const todayDate = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );



    if (isLoading) {

        return (

            <div className="p-6">

                Loading Dashboard...

            </div>

        );

    }




    if (isError) {

        return (

            <div className="
                p-6
                bg-white
                rounded-xl
                shadow
            ">

                <h2 className="
                    text-xl
                    font-bold
                    text-slate-700
                ">

                    Welcome Employee 👋

                </h2>


                <p className="
                    mt-2
                    text-slate-500
                ">

                    Dashboard data is currently unavailable.

                </p>


            </div>

        );

    }




    const dashboard = data?.data ?? data;


    console.log(
        "Dashboard Details:",
        dashboard
    );




    return (


        <div className="
            space-y-10
            ml-4
            lg:ml-6
        ">



            {/* Header */}


            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-6
                flex
                justify-between
                items-center
            ">


                <div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-slate-800
                    ">


                        {getGreeting()},{" "}


                        {
                            dashboard?.profile?.name
                            ??
                            "Employee"
                        }


                        👋


                    </h1>




                    <p className="
                        text-slate-500
                        mt-2
                    ">

                        Hope you are having a great day.
                        Here is your employee activity overview.

                    </p>




                    <p className="
                        mt-3
                        text-sm
                        font-medium
                        text-blue-600
                    ">

                        {todayDate}

                    </p>


                </div>





                <div className="
                    hidden
                    md:block
                    bg-blue-50
                    px-5
                    py-4
                    rounded-xl
                ">


                    <p className="
                        text-sm
                        text-slate-500
                    ">

                        Role

                    </p>


                    <p className="
                        font-semibold
                        text-blue-600
                    ">

                        Employee

                    </p>


                </div>



            </div>









            {/* Stats Cards */}


            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-6
            ">



                <StatCard

                    title="Attendance"

                    value={
                        `${dashboard?.attendance?.percentage ?? 0}%`
                    }

                    icon={<FiClock />}

                />





                <StatCard

                    title="Approved Leaves"

                    value={
                        dashboard?.leaves?.approved ?? 0
                    }

                    icon={<FiCalendar />}

                />





                <StatCard

                    title="Pending Leaves"

                    value={
                        dashboard?.leaves?.pending ?? 0
                    }

                    icon={<FiFileText />}

                />





                <StatCard

                    title="Designation"

                    value={
                        dashboard?.profile?.designation
                        ??
                        "N/A"
                    }

                    icon={<FiUser />}

                />



            </div>









            {/* Profile Section */}


            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-6
            ">



                <h2 className="
                    text-xl
                    font-bold
                    text-slate-800
                    mb-6
                ">

                    My Profile

                </h2>





                <div className="
                    grid
                    md:grid-cols-4
                    gap-6
                ">



                    {/* Name */}


                    <div>


                        <p className="
                            text-sm
                            text-slate-400
                        ">

                            Full Name

                        </p>


                        <p className="
                            font-semibold
                            text-slate-700
                        ">


                            {
                                dashboard?.profile?.name
                                ??
                                "N/A"
                            }


                        </p>


                    </div>







                    {/* Email */}


                    <div>


                        <p className="
                            text-sm
                            text-slate-400
                        ">

                            Email

                        </p>



                        <p className="
                            font-semibold
                            text-slate-700
                        ">


                            {
                                dashboard?.profile?.email
                                ??
                                "N/A"
                            }


                        </p>



                    </div>









                    {/* Department */}


                    <div>


                        <p className="
                            text-sm
                            text-slate-400
                        ">

                            Department

                        </p>



                        <p className="
                            font-semibold
                            text-slate-700
                        ">


                            {
                                dashboard?.profile?.department?.name
                                ??
                                "Not Assigned"
                            }


                        </p>



                    </div>









                    {/* Designation */}


                    <div>


                        <p className="
                            text-sm
                            text-slate-400
                        ">

                            Designation

                        </p>




                        <p className="
                            font-semibold
                            text-slate-700
                        ">


                            {
                                dashboard?.profile?.designation
                                ??
                                "Not Assigned"
                            }


                        </p>


                    </div>



                </div>



            </div>









            {/* Recent Leaves */}


            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-6
            ">




                <div className="
                    flex
                    justify-between
                    items-center
                    mb-5
                ">



                    <h2 className="
                        text-xl
                        font-bold
                    ">

                        Recent Leaves

                    </h2>





                    <button className="
                        text-blue-600
                        text-sm
                        font-medium
                    ">

                        View All

                    </button>



                </div>







                {

                    dashboard?.recentLeaves?.length ?


                        (

                            <div className="
                            space-y-4
                        ">


                                {
                                    dashboard.recentLeaves.map(
                                        (leave: any) => (


                                            <div

                                                key={leave._id}

                                                className="
                                                border
                                                rounded-xl
                                                p-4
                                                flex
                                                justify-between
                                                items-center
                                                hover:bg-slate-50
                                            "

                                            >


                                                <div>


                                                    <p className="
                                                    font-semibold
                                                ">

                                                        {
                                                            leave.type
                                                        }

                                                    </p>



                                                    <p className="
                                                    text-sm
                                                    text-slate-500
                                                ">

                                                        {
                                                            leave.reason
                                                        }

                                                    </p>


                                                </div>






                                                <span className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-blue-50
                                                text-blue-600
                                                text-sm
                                                capitalize
                                            ">


                                                    {
                                                        leave.status
                                                    }


                                                </span>




                                            </div>


                                        )
                                    )
                                }


                            </div>


                        )

                        :


                        (

                            <p className="
                            text-slate-500
                        ">

                                No recent leaves

                            </p>

                        )

                }




            </div>






        </div>


    );

};


export default EmployeeDashboard;