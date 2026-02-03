import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

declare global {
  // eslint-disable-next-line no-var
  var __requestIdBrand: never;
}

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

// PUBLIC_INTERFACE
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  /** Adds an `X-Request-Id` header and attaches `req.requestId` for logging/error responses. */
  const requestId = crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
}
