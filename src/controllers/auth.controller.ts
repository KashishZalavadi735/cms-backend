import { Request, Response } from "express";
import { loginService, signupService } from "../services/auth.service";

// login
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    if (!result.status) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// signup only for student
export const signupController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      contactNumber,
      password,
      branchId,
      semesterId,
      yearId,
    } = req.body;

    if (
      !name ||
      !email ||
      !contactNumber ||
      !password ||
      !branchId ||
      !semesterId ||
      !yearId
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const result = await signupService(req.body);

    if (!result.status) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Student signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
