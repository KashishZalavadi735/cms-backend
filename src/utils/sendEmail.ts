import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465, // 🔥 CHANGE
    secure: true, // 🔥 MUST be true
    auth: {
      user: "apikey",
      pass: process.env.BREVO_SMTP_KEY,
    },
    connectionTimeout: 20_000, // 🔥 prevent timeout
  });

  return transporter.sendMail({
    from: "CMS <kashishzalavadi@gmail.com>",
    to,
    subject,
    html,
  });
};
