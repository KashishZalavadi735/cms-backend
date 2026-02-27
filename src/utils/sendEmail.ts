import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
) => {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error(
      "Email credentials are missing. Please set EMAIL_USER and EMAIL_PASS.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  await transporter.verify();

  return transporter.sendMail({
    from: `"CMS Admin" <${emailUser}>`,
    to,
    subject,
    html: htmlContent, // Send HTML instead of plain text
    text: "Please view this email in HTML-supported client",
  });
};
