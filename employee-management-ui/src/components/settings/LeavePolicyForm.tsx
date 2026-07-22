const LeavePolicyForm = ({
    data
}: any) => {


    return (

        <div className="bg-white shadow rounded-xl p-5">


            <h2 className="font-semibold text-lg">
                Leave Policy
            </h2>



            <div className="grid grid-cols-3 gap-4 mt-4">


                <input

                    className="border p-2"

                    defaultValue={
                        data?.leavePolicy.casualLeave
                    }

                    placeholder="Casual Leave"

                />



                <input

                    className="border p-2"

                    defaultValue={
                        data?.leavePolicy.sickLeave
                    }

                />



                <input

                    className="border p-2"

                    defaultValue={
                        data?.leavePolicy.earnedLeave
                    }

                />


            </div>



            <button

                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"

            >
                Save Leave Policy
            </button>


        </div>

    )

}


export default LeavePolicyForm;