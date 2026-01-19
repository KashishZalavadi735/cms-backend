import { Request, Response } from "express";

// Assign Assignment (Admin & Professor)
export const createAssignment = async (req:Request, res: Response) => {
    const assignment = await createAssignmentService(req.user!, req.body);
}