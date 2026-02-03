import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { loadEnv } from "./config/env";
import { JsonStore } from "./data/store";
import { requestIdMiddleware } from "./middleware/requestId";
import { adminAuthMiddleware } from "./middleware/adminAuth";
import { errorHandler } from "./middleware/errorHandler";
import { buildAdminApiRouter } from "./routes/adminApi";
import { renderAdminDashboardHtml } from "./admin/dashboardHtml";

/**
 * Entry point for the netflix_clone_backend service.
 *
 * Exposes token-protected admin APIs under `/admin/api` and an optional lightweight
 * admin dashboard under `/admin`.
 *
 * Env vars:
 * - PORT: server port
 * - ADMIN_API_TOKEN: required bearer token for all /admin routes
 * - CORS_ORIGIN: allowed origin for CORS (defaults to http://localhost:3000)
 */
async function main() {
  const env = loadEnv();
  const store = new JsonStore(env.dataDir);

  const app = express();

  // Basic request correlation
  app.use(requestIdMiddleware);

  // Basic logging (includes request id in a custom token)
  morgan.token("rid", (req: Request) => req.requestId ?? "-");
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms rid=:rid", {
      skip: (_req, res) => res.statusCode < 400
    })
  );
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms rid=:rid", {
      skip: (_req, res) => res.statusCode >= 400
    })
  );

  // CORS for local frontend preview (port 3000) and token-based admin requests.
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: false,
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );

  app.use(express.json({ limit: "1mb" }));

  // Public ping (not under /admin)
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ ok: true, service: "netflix_clone_backend" });
  });

  // Protect all /admin routes
  app.use("/admin", adminAuthMiddleware(env.adminApiToken));

  // Admin UI
  app.get("/admin", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(renderAdminDashboardHtml());
  });

  // Admin APIs
  app.use("/admin/api", buildAdminApiRouter(store));

  // 404 handler (JSON for API routes)
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.path}`,
      requestId: req.requestId
    });
  });

  // Error handler
  app.use(errorHandler);

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`netflix_clone_backend listening on http://localhost:${env.port}`);
    // eslint-disable-next-line no-console
    console.log(`Admin UI: http://localhost:${env.port}/admin`);
    // eslint-disable-next-line no-console
    console.log(`Admin API: http://localhost:${env.port}/admin/api`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Fatal startup error:", err);
  process.exit(1);
});
