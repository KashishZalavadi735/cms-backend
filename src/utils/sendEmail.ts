import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
): Promise<void> => {
  try {
    // Create a transporter object using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password goes here
      },
    });

    // Verify SMTP (optional but recommended)
    await transporter.verify();

    // Send the email
    await transporter.sendMail({
      from: `"CMS Admin" <${process.env.EMAIL_USER}>`, 
      to, 
      subject, 
      html: htmlContent, 
      text: "Please view this email in HTML-supported client", 
    });
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
};