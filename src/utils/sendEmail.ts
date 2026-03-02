import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",      // ← explicit host instead of service: "gmail"
      port: 587,                    // ← port 587 with STARTTLS
      secure: false,                // ← false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CMS Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
      text: "Please view this email in HTML-supported client",
    });

    console.log(`Email sent to ${to}`);
  } catch (error: any) {
    console.error("sendEmail error:", error.message);
    console.error("   Code:", error.code);
    console.error("   Response:", error.response);
    throw error;
  }
};