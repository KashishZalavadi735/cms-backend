import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import setPasswordRoutes from "./routes/setPassword.routes";
import forgotPasswordRoutes from "./routes/forgotPassword.routes";
import superAdminRoutes from "./routes/superAdmin.routes";
import adminRoutes from "./routes/admin.routes";
import professorRoutes from "./routes/professor.routes";
import studentRoutes from "./routes/student.routes";
import assignmentRoutes from "./routes/assignment.routes";
import branchStudentRoutes from "./routes/branchStudents.routes";
import enumRoutes from "./routes/enum.routes";
import notificationRoutes from "./routes/notifications.routes";

dotenv.config();

const app = express();

// Image import
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(cors({
  origin: [
    "https://cms-frontend-smoky-zeta.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// THIS LINE IS REQUIRED
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/set-password", setPasswordRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/branch-student", branchStudentRoutes);
app.use("/api/enums", enumRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
