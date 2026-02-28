import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.BREVO_SMTP_KEY,
    },
  });

  return transporter.sendMail({
    from: "CMS <kashishzalavadi@gmail.com>",
    to,
    subject,
    html,
  });
};