import express from "express";
import { getEnumsByType } from "../controllers/enum.controller";

const router = express.Router();

router.get("/:type", getEnumsByType);

export default router;
