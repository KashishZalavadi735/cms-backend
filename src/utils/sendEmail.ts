import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();

  return transporter.sendMail({
    from: `"CMS Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent, // Send HTML instead of plain text
    text: "Please view this email in HTML-supported client",
  });
};
