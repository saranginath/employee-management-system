import nodemailer from "nodemailer";

export const createTransporter = (
  smtpHost: string,
  smtpPort: number,
  username: string,
  password: string,
  secure: boolean,
) => {
  return nodemailer.createTransport({
    host: smtpHost,

    port: smtpPort,

    secure,

    auth: {
      user: username,
      pass: password,
    },
  });
};
