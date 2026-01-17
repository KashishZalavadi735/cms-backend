import fs from "fs";
import path from "path";

export const getEmailTemplate = (name: string, email: string, otp: string) => {
    const templatePath = path.join(process.cwd(), "src", "templates", "otpEmail.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    template = template.replace("{{name}}", name).replace("{{email}}", email).replace("{{otp}}", otp);

    return template;
};