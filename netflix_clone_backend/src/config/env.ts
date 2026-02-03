import path from "path";

/**
 * We avoid adding dotenv as a dependency; instead we rely on runtime env injection.
 * In local dev, you can still use tools (like a shell) to export vars, or extend this later.
 */

export interface EnvConfig {
  port: number;
  adminApiToken: string;
  corsOrigin: string;
  nodeEnv: string;
  dataDir: string;
}

// PUBLIC_INTERFACE
export function loadEnv(): EnvConfig {
  /** Load and validate environment configuration for the server. */
  const port = Number.parseInt(process.env.PORT ?? "4000", 10);
  const adminApiToken = (process.env.ADMIN_API_TOKEN ?? "").trim();
  const corsOrigin = (process.env.CORS_ORIGIN ?? "http://localhost:3000").trim();
  const nodeEnv = (process.env.NODE_ENV ?? "development").trim();

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("Invalid PORT. Please set PORT to a valid number.");
  }
  if (!adminApiToken) {
    throw new Error(
      "Missing ADMIN_API_TOKEN. Please set ADMIN_API_TOKEN in the environment (.env.example provided)."
    );
  }

  // dataDir is relative to compiled output; we resolve from project root at runtime.
  // When running from dist, process.cwd() should be container root.
  const dataDir = path.resolve(process.cwd(), "data");

  return { port, adminApiToken, corsOrigin, nodeEnv, dataDir };
}
