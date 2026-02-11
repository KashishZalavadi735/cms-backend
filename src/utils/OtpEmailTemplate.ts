import fs from "fs";
import path from "path";

export const getEmailTemplate = (name: string, otp: string) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "OtpEmail.html",
  );
  let template = fs.readFileSync(templatePath, "utf-8");

  template = template.replace("{{name}}", name).replace("{{otp}}", otp);

  return template;
};
