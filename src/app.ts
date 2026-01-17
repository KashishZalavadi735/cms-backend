import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import superAdminRoutes from "./routes/superAdmin.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);

export default app;