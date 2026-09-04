import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../utils/errors";
import { env } from "../config/env";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: `Route ${req.method} ${req.originalUrl} not found` },
  });
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Known, operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details },
    });
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: err.flatten(),
      },
    });
  }

  // Prisma known request errors (unique constraint, FK violation, not found, etc.)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: `A record with this ${(err.meta?.target as string[])?.join(", ") ?? "value"} already exists`,
        },
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Record not found" },
      });
    }
    return res.status(400).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Database request could not be processed" },
    });
  }

  // Fallback — log full error server-side, hide internals from the client
  console.error("[unhandled error]", err);
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong on our end",
      ...(env.isProduction ? {} : { debug: err instanceof Error ? err.stack : err }),
    },
  });
}
