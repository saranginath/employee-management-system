import {
    useGetLeavesQuery
} from "../../features/leave/leaveApi";

import LeaveTable from "../../components/leave/LeaveTable";


const LeaveDashboard = () => {


    const {
        data,
        isLoading
    } = useGetLeavesQuery();



    if (isLoading)
        return <p>Loading...</p>



    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold">
                Leave Management
            </h1>



            <div className="grid grid-cols-3 gap-5 mt-6">


                <div className="bg-white shadow p-5 rounded">

                    <h3>
                        Annual Leave
                    </h3>

                    <p>
                        15 Remaining
                    </p>

                </div>


                <div className="bg-white shadow p-5 rounded">

                    <h3>
                        Sick Leave
                    </h3>

                    <p>
                        8 Remaining
                    </p>

                </div>


                <div className="bg-white shadow p-5 rounded">

                    <h3>
                        Casual Leave
                    </h3>

                    <p>
                        10 Remaining
                    </p>

                </div>


            </div>



            <h2 className="mt-8 text-xl font-bold">
                Leave History
            </h2>



            <LeaveTable
                leaves={data?.data}
            />


        </div>

    )

}


export default LeaveDashboard;