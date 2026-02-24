import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS not defined");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // not 'service: gmail'
    port: 587,
    secure: false, // true only for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: `"CMS Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent, // Send HTML instead of plain text
    text: "Please view this email in HTML-supported client",
  });
};
