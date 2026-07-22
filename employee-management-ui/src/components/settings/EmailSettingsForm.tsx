const EmailSettingsForm = ({
    data
}: any) => {


    return (

        <div className="bg-white shadow rounded-xl p-5">


            <h2 className="font-semibold text-lg">
                Email Settings
            </h2>



            <input

                className="border p-2 w-full mt-4"

                placeholder="SMTP Host"

                defaultValue={
                    data?.emailSettings.smtpHost
                }

            />



            <input

                className="border p-2 w-full mt-3"

                placeholder="SMTP Username"

                defaultValue={
                    data?.emailSettings.username
                }

            />



            <button

                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"

            >

                Save Email Settings

            </button>



        </div>

    )

}


export default EmailSettingsForm;