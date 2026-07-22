import { useState } from "react";
import {
    useCreateLeaveMutation
} from "../../features/leave/leaveApi";


const ApplyLeave = () => {


    const [createLeave] = useCreateLeaveMutation();


    const [form, setForm] = useState({

        type: "sick",

        startDate: "",

        endDate: "",

        reason: ""

    });



    const submit = async (e: React.FormEvent) => {

        e.preventDefault();

        await createLeave(form);

        alert("Leave Applied");


    };



    return (

        <div className="p-6">


            <h1 className="text-2xl font-bold">
                Apply Leave
            </h1>



            <form
                onSubmit={submit}
                className="space-y-4 mt-5"
            >


                <select

                    className="border p-2 w-full"

                    value={form.type}

                    onChange={(e) =>
                        setForm({
                            ...form,
                            type: e.target.value as any
                        })
                    }

                >

                    <option value="sick">
                        Sick Leave
                    </option>


                    <option value="casual">
                        Casual Leave
                    </option>


                    <option value="earned">
                        Earned Leave
                    </option>


                    <option value="unpaid">
                        Unpaid Leave
                    </option>


                </select>




                <input

                    type="date"

                    className="border p-2 w-full"

                    onChange={(e) =>
                        setForm({
                            ...form,
                            startDate: e.target.value
                        })
                    }

                />




                <input

                    type="date"

                    className="border p-2 w-full"

                    onChange={(e) =>
                        setForm({
                            ...form,
                            endDate: e.target.value
                        })
                    }

                />




                <textarea

                    placeholder="Reason"

                    className="border p-2 w-full"

                    onChange={(e) =>
                        setForm({
                            ...form,
                            reason: e.target.value
                        })
                    }

                />



                <button

                    className="bg-blue-600 text-white px-5 py-2 rounded"

                >

                    Apply Leave

                </button>



            </form>


        </div>

    )

}


export default ApplyLeave;