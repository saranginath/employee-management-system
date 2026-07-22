import { useState } from "react";


const CompanyForm = ({
    data,
    onSave
}: any) => {


    const [form, setForm] = useState({

        companyName: data?.companyName || "",

        companyEmail: data?.companyEmail || "",

        companyPhone: data?.companyPhone || "",

        address: data?.address || ""

    });



    const submit = () => {

        onSave(form);

    };



    return (

        <div className="bg-white rounded-xl shadow p-5">


            <h2 className="text-lg font-semibold mb-4">
                Company Information
            </h2>


            <input

                className="border p-2 w-full mb-3"

                placeholder="Company Name"

                value={form.companyName}

                onChange={
                    e => setForm({
                        ...form,
                        companyName: e.target.value
                    })
                }

            />


            <input

                className="border p-2 w-full mb-3"

                placeholder="Email"

                value={form.companyEmail}

                onChange={
                    e => setForm({
                        ...form,
                        companyEmail: e.target.value
                    })
                }

            />


            <input

                className="border p-2 w-full mb-3"

                placeholder="Phone"

                value={form.companyPhone}

                onChange={
                    e => setForm({
                        ...form,
                        companyPhone: e.target.value
                    })
                }

            />



            <textarea

                className="border p-2 w-full"

                placeholder="Address"

                value={form.address}

                onChange={
                    e => setForm({
                        ...form,
                        address: e.target.value
                    })
                }

            />



            <button

                onClick={submit}

                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"

            >
                Save Company
            </button>


        </div>

    )

}


export default CompanyForm;