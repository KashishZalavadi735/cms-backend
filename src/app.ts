import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import superAdminRoutes from "./routes/superAdmin.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/admin", adminRoutes);

export default app;