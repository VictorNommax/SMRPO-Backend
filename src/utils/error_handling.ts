import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {Response, NextFunction} from "express";

export const general_error_handler = (err: any, res: Response, next: NextFunction) => {
    if (err instanceof PrismaClientKnownRequestError) {
        prisma_error_handler(err, res, next);
    } else {
        next(err);
    }
}

export const prisma_error_handler = async (err: PrismaClientKnownRequestError, res: Response, next: NextFunction) => {
    if (err.code === "P2002") {
        res.status(409).json({
            status: "failed",
            error: {
                code: err.code,
                path: err.meta?.target,
                message: "Write to DB failed due to unique constraint violation",
            }
        })
    } else if (err.code === "P2025") {
        res.status(409).json({
            status: "failed",
            error: {
                code: err.code,
                message: "Item not found",
            }
        })
    } else {
        console.log("unknown error code: ", err.code);
        next(err);
    }
}