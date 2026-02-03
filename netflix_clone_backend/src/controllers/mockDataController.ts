import { Request, Response } from "express";
import { JsonStore } from "../data/store";

// PUBLIC_INTERFACE
export function getMockData(store: JsonStore) {
  /** Handler that returns the entire store state for inspection/debugging. */
  return (_req: Request, res: Response) => {
    res.json(store.inspect());
  };
}

// PUBLIC_INTERFACE
export function resetMockData(store: JsonStore) {
  /** Handler that resets feature flags + content to seed data. */
  return (_req: Request, res: Response) => {
    const state = store.resetToSeed();
    res.json({
      ok: true,
      reset: true,
      state
    });
  };
}
