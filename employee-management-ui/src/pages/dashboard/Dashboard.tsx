import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiBriefcase,
    FiClock,
    FiUsers,
    FiCheck,
    FiCircle,
    FiUserPlus,
    FiCalendar,
    FiFileText,
    FiTrendingUp,
    FiArrowRight,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../api/store";


const stats = [
    {
        title: "Total Employees",
        value: 248,
        growth: "+12%",
        icon: <FiUsers />,
        color: "from-blue-500 to-blue-600",
    },
    {
        title: "Present Today",
        value: 186,
        growth: "+8%",
        icon: <FiBriefcase />,
        color: "from-emerald-500 to-green-600",
    },
    {
        title: "Pending Leaves",
        value: 14,
        growth: "-3%",
        icon: <FiClock />,
        color: "from-orange-400 to-orange-500",
    },
];


const schedule = [
    {
        id: 1,
        task: "Team meeting",
        time: "10:00 AM",
        done: false
    },
    {
        id: 2,
        task: "Payroll review",
        time: "01:00 PM",
        done: false
    },
    {
        id: 3,
        task: "New onboarding",
        time: "03:30 PM",
        done: false
    }
];


const quickActions = [
    {
        label: "Add Employee",
        icon: <FiUserPlus />,
        path: "/dashboard/employees/new"
    },
    {
        label: "Approve Leave",
        icon: <FiCalendar />,
        path: "/dashboard/leaves"
    },
    {
        label: "Generate Report",
        icon: <FiFileText />,
        path: "/dashboard/reports"
    }
];

function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good Morning";
    }

    if (hour < 18) {
        return "Good Afternoon";
    }

    return "Good Evening";
}

function useCountUp(target: number) {
    const user = useSelector((state: RootState) => state.auth.user);

    const [value, setValue] = useState(0);


    useEffect(() => {

        let current = 0;

        const timer = setInterval(() => {

            current += Math.ceil(target / 40);

            if (current >= target) {
                setValue(target);
                clearInterval(timer);
            }
            else {
                setValue(current);
            }

        }, 20);


        return () => clearInterval(timer);

    }, [target]);


    return value;
}




function StatCard({ item }: any) {

    const count = useCountUp(item.value);


    return (

        <div
            className="
            rounded-3xl
            bg-white
            border
            border-slate-200
            p-6
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-xl
            "
        >

            <div className="flex justify-between">

                <div
                    className={`
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-r
                ${item.color}
                flex
                items-center
                justify-center
                text-white
                text-xl
                shadow-lg
                `}
                >
                    {item.icon}
                </div>


                <div
                    className="
                flex
                items-center
                gap-1
                text-sm
                text-emerald-600
                "
                >
                    <FiTrendingUp />
                    {item.growth}
                </div>


            </div>


            <p className="mt-5 text-sm text-slate-500">
                {item.title}
            </p>


            <h2 className="
            mt-1
            text-3xl
            font-bold
            text-slate-800
            ">
                {count}
            </h2>


        </div>

    )
}



function Dashboard() {


    const navigate = useNavigate();


    const [tasks, setTasks] = useState(schedule);

    const greeting = getGreeting();
    const user = useSelector(
        (state: RootState) => state.auth.user
    );

    const toggleTask = (id: number) => {

        setTasks(prev =>
            prev.map(item =>
                item.id === id
                    ?
                    {
                        ...item,
                        done: !item.done
                    }
                    :
                    item
            )
        )

    }



    return (

        <div className="ml-5
    min-h-screen
    bg-slate-50
    space-y-10">


            {/* HEADER */}

            <section
                className="
rounded-3xl
bg-gradient-to-r
from-blue-700
via-blue-600
to-indigo-700
p-8
text-white
shadow-xl
"
            >


                <div className="flex justify-between items-center">


                    <div>

                        <p className="
text-xs
uppercase
tracking-[0.3em]
text-blue-200
">
                            Dashboard
                        </p>


                        <h1 className="
mt-3
text-4xl
font-bold
">
                            {greeting}, {user?.firstName || "Admin"} 👋
                        </h1>


                        <p className="
mt-3
text-blue-100
max-w-xl
">
                            Manage employees, attendance,
                            leaves and company operations
                            from one powerful dashboard.
                        </p>

                    </div>



                    <div
                        className="
hidden
md:block
rounded-3xl
bg-white/10
p-6
backdrop-blur-md
"
                    >

                        <p className="text-sm">
                            Today's Attendance
                        </p>

                        <h2 className="
text-4xl
font-bold
mt-2
">
                            75%
                        </h2>


                        <div className="
mt-3
h-2
w-48
rounded-full
bg-white/30
">

                            <div
                                className="
h-2
w-3/4
rounded-full
bg-white
"
                            />

                        </div>

                    </div>


                </div>


            </section>



            {/* STATS */}

            <section
                className="
grid
gap-5
md:grid-cols-3
"
            >

                {
                    stats.map(item =>
                        <StatCard
                            key={item.title}
                            item={item}
                        />
                    )
                }

            </section>




            <section
                className="
grid
gap-6
lg:grid-cols-3
"
            >


                {/* Schedule */}

                <div
                    className="
lg:col-span-2
rounded-3xl
bg-white
border
p-6
shadow-sm
"
                >


                    <div className="flex justify-between">


                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Today's Schedule
                            </h3>


                            <p className="text-sm text-slate-500">
                                Manage your daily tasks
                            </p>

                        </div>



                        <button
                            onClick={() => navigate("/dashboard/schedule")}
                            className="
bg-blue-600
text-white
px-4
py-2
rounded-xl
text-sm
hover:bg-blue-700
"
                        >
                            View
                        </button>


                    </div>



                    <div className="mt-5 space-y-3">


                        {
                            tasks.map(task => (

                                <button
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className={`
w-full
flex
justify-between
items-center
rounded-2xl
p-4
transition

${task.done
                                            ?
                                            "bg-green-50 text-green-700"
                                            :
                                            "bg-slate-50 hover:bg-slate-100"
                                        }

`}
                                >


                                    <div className="flex gap-3 items-center">


                                        {
                                            task.done
                                                ?
                                                <FiCheck />
                                                :
                                                <FiCircle />
                                        }


                                        <div>

                                            <p className={
                                                task.done
                                                    ?
                                                    "line-through"
                                                    :
                                                    ""
                                            }>
                                                {task.task}
                                            </p>


                                            <p className="text-xs opacity-70">
                                                {task.time}
                                            </p>

                                        </div>


                                    </div>


                                    <FiArrowRight />

                                </button>

                            ))

                        }


                    </div>



                </div>





                {/* Actions */}

                <div
                    className="
rounded-3xl
bg-white
border
p-6
shadow-sm
"
                >


                    <h3 className="font-semibold">
                        Quick Actions
                    </h3>



                    <div className="mt-5 space-y-3">


                        {
                            quickActions.map(action => (

                                <button
                                    key={action.label}
                                    onClick={() => navigate(action.path)}
                                    className="
flex
items-center
justify-between
w-full
rounded-xl
border
p-4
hover:bg-blue-50
hover:border-blue-300
transition
"
                                >


                                    <span className="flex gap-3 items-center">
                                        {action.icon}
                                        {action.label}
                                    </span>


                                    <FiArrowRight />


                                </button>


                            ))
                        }



                    </div>



                </div>



            </section>



        </div>

    )

}


export default Dashboard;