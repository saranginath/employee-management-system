const WorkingHoursForm = ({
    data,
    onSave
}: any) => {


    return (

        <div className="bg-white shadow rounded-xl p-5">


            <h2 className="font-semibold text-lg mb-4">
                Working Hours
            </h2>


            <div className="grid grid-cols-2 gap-4">


                <input

                    className="border p-2"

                    defaultValue={
                        data?.workingHours.startTime
                    }

                    placeholder="Start Time"

                />



                <input

                    className="border p-2"

                    defaultValue={
                        data?.workingHours.endTime
                    }

                    placeholder="End Time"

                />


            </div>



            <button

                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"

            >
                Save Working Hours
            </button>


        </div>

    )

}


export default WorkingHoursForm;