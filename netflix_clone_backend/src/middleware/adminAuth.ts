import { NextFunction, Request, Response } from "express";

// PUBLIC_INTERFACE
export function adminAuthMiddleware(expectedToken: string) {
  /** Express middleware that enforces `Authorization: Bearer <ADMIN_API_TOKEN>` for admin routes. */
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";

    if (!token || token !== expectedToken) {
      return res.status(401).json({
        error: "UNAUTHORIZED",
        message: "Missing or invalid admin token.",
        requestId: req.requestId
      });
    }

    next();
  };
}
