import fs from "fs";
import path from "path";

export const getEmailTemplate = (
  name: string,
  email: string,
  branch: string,
  subjects: string[],
  setPasswordLink: string,
) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "ProfessorEmail.html",
  );
  let template = fs.readFileSync(templatePath, "utf-8");

  const subjectHtml =
    subjects.length > 0
      ? subjects.map((s) => `<li>${s}</li>`).join("")
      : "<li>No subjects assigned yet</li>";

  template = template
    .replace("{{name}}", name)
    .replace("{{email}}", email)
    .replace("{{branch}}", branch)
    .replace("{{subjects}}", subjectHtml)
    .replace("{{setPasswordLink}}", setPasswordLink);

  return template;
};
