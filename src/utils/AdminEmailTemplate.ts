import fs from "fs";
import path from "path";

export const getEmailTemplate = (
  name: string,
  email: string,
  branch: string,
  setPasswordLink: string,
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "AdminEmail.html",
  );

  let template = fs.readFileSync(templatePath, "utf-8");

  const baseUrl = process.env.BACKEND_URL;

  if (!baseUrl) {
    throw new Error("BASE_URL is not defined in environment variables");
  }

  template = template
    .replace("{{name}}", name)
    .replace("{{email}}", email)
    .replace("{{branch}}", branch)
    .replace("{{setPasswordLink}}", setPasswordLink)

  return template;
};