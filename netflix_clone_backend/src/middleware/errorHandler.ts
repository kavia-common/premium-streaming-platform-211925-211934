import { NextFunction, Request, Response } from "express";
import { ApiErrorShape } from "../models/types";

// PUBLIC_INTERFACE
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  /** Express error handler returning a consistent JSON error payload. */
  const payload: ApiErrorShape = {
    error: "INTERNAL_ERROR",
    message: "An unexpected error occurred.",
    requestId: req.requestId
  };

  // Basic safe details for development
  if (process.env.NODE_ENV !== "production") {
    payload.details =
      err instanceof Error
        ? { name: err.name, message: err.message, stack: err.stack }
        : { value: err };
  }

  // eslint-disable-next-line no-console
  console.error(`[${req.requestId}]`, err);

  res.status(500).json(payload);
}
