import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";


export const defaultActiveStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.statusId) {
            return next();
        }

        const activeStatus = await prisma.enumTable.findFirst({
            where: {
                enumType: "STATUS_ENUM",
                enumValue: "Active",
            },
            select: { id: true }
        });

        if (!activeStatus) {
            return res.status(500).json({
                message: "Active status not found"
            });
        }

        req.body.statusId = activeStatus.id;

        next();
    } catch (error) {
        next(error);
    }
}