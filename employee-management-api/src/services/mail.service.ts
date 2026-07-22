import { createTransporter } from "../config/mail";


interface SendMailProps {

    smtpHost: string;

    smtpPort: number;

    secure: boolean;

    username: string;

    password: string;

    senderEmail: string;

    senderName: string;

    receiverEmail: string;

}



export const sendTestEmail = async (
    data: SendMailProps
) => {


    const transporter =
        createTransporter(
            data.smtpHost,
            data.smtpPort,
            data.username,
            data.password,
            data.secure
        );



    await transporter.sendMail({

        from: `${data.senderName} <${data.senderEmail}>`,

        to: data.receiverEmail,

        subject: "EMS Email Configuration Test",

        html: `
            <h2>Email Configuration Successful</h2>

            <p>
            Your EMS email settings are working correctly.
            </p>
        `

    });


};