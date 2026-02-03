import { Request, Response } from "express";

// PUBLIC_INTERFACE
export function getHealth(_req: Request, res: Response) {
  /** Health check endpoint for admin backend. */
  res.json({
    ok: true,
    service: "netflix_clone_backend",
    timestamp: new Date().toISOString()
  });
}
