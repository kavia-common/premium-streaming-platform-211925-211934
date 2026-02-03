import { Router } from "express";
import { JsonStore } from "../data/store";
import { getHealth } from "../controllers/healthController";
import { getFeatureFlags, setFeatureFlags } from "../controllers/featureFlagsController";
import { createContent, deleteContent, listContent, updateContent } from "../controllers/contentController";
import { getMockData, resetMockData } from "../controllers/mockDataController";

// PUBLIC_INTERFACE
export function buildAdminApiRouter(store: JsonStore): Router {
  /** Build the admin API router (mounted under `/admin/api`). */
  const router = Router();

  router.get("/health", getHealth);

  router.get("/feature-flags", getFeatureFlags(store));
  router.post("/feature-flags", setFeatureFlags(store));

  router.get("/content", listContent(store));
  router.post("/content", createContent(store));
  router.put("/content/:id", updateContent(store));
  router.delete("/content/:id", deleteContent(store));

  router.get("/mock-data", getMockData(store));
  router.post("/mock-data", resetMockData(store));

  return router;
}
