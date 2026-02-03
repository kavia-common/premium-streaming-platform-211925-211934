import { Request, Response } from "express";
import { JsonStore } from "../data/store";
import { FeatureFlags } from "../models/types";

// PUBLIC_INTERFACE
export function getFeatureFlags(store: JsonStore) {
  /** Handler that returns the current feature flags object. */
  return (_req: Request, res: Response) => {
    res.json(store.getFeatureFlags());
  };
}

// PUBLIC_INTERFACE
export function setFeatureFlags(store: JsonStore) {
  /** Handler that overwrites feature flags with the provided JSON object (Record<string, boolean>). */
  return (req: Request, res: Response) => {
    const body = req.body as unknown;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Body must be a JSON object of boolean feature flags.",
        requestId: req.requestId
      });
    }

    const nextFlags: FeatureFlags = {};
    for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
      if (typeof v !== "boolean") {
        return res.status(400).json({
          error: "BAD_REQUEST",
          message: `Feature flag '${k}' must be boolean.`,
          requestId: req.requestId
        });
      }
      nextFlags[k] = v;
    }

    const updated = store.setFeatureFlags(nextFlags);
    res.json(updated);
  };
}
