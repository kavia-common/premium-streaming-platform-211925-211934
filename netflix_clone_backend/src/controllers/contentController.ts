import { Request, Response } from "express";
import { JsonStore } from "../data/store";
import { ContentItem } from "../models/types";
import crypto from "crypto";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

// PUBLIC_INTERFACE
export function listContent(store: JsonStore) {
  /** Handler that returns the current content catalog array. */
  return (_req: Request, res: Response) => {
    res.json(store.getContent());
  };
}

// PUBLIC_INTERFACE
export function createContent(store: JsonStore) {
  /** Handler that creates a content item and prepends it to the catalog. */
  return (req: Request, res: Response) => {
    const body = req.body as Partial<ContentItem> | undefined;

    if (!body || typeof body !== "object") {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Body must be a JSON object.",
        requestId: req.requestId
      });
    }

    if (!isNonEmptyString(body.title) || !isNonEmptyString(body.type) || !isNonEmptyString(body.genre)) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Missing required fields: title, type, genre.",
        requestId: req.requestId
      });
    }

    const id = body.id && isNonEmptyString(body.id) ? body.id : `t_${crypto.randomUUID()}`;
    const item: ContentItem = {
      id,
      title: body.title,
      type: body.type === "movie" ? "movie" : "series",
      genre: body.genre,
      year: typeof body.year === "number" ? body.year : new Date().getFullYear(),
      maturityRating: isNonEmptyString(body.maturityRating) ? body.maturityRating : "TV-MA",
      description: isNonEmptyString(body.description) ? body.description : undefined,
      posterUrl: isNonEmptyString(body.posterUrl) ? body.posterUrl : undefined,
      backdropUrl: isNonEmptyString(body.backdropUrl) ? body.backdropUrl : undefined,
      durationMins: typeof body.durationMins === "number" ? body.durationMins : undefined,
      isKids: typeof body.isKids === "boolean" ? body.isKids : false
    };

    store.addContent(item);
    res.status(201).json(item);
  };
}

// PUBLIC_INTERFACE
export function updateContent(store: JsonStore) {
  /** Handler that updates an existing content item by id. */
  return (req: Request, res: Response) => {
    const id = req.params.id;
    const patch = req.body as Partial<ContentItem> | undefined;

    if (!id || !isNonEmptyString(id)) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Missing content id.",
        requestId: req.requestId
      });
    }
    if (!patch || typeof patch !== "object") {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Body must be a JSON object.",
        requestId: req.requestId
      });
    }

    const updated = store.updateContent(id, patch);
    if (!updated) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: `Content '${id}' not found.`,
        requestId: req.requestId
      });
    }

    res.json(updated);
  };
}

// PUBLIC_INTERFACE
export function deleteContent(store: JsonStore) {
  /** Handler that deletes a content item by id. */
  return (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id || !isNonEmptyString(id)) {
      return res.status(400).json({
        error: "BAD_REQUEST",
        message: "Missing content id.",
        requestId: req.requestId
      });
    }

    const deleted = store.deleteContent(id);
    if (!deleted) {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: `Content '${id}' not found.`,
        requestId: req.requestId
      });
    }

    res.status(204).send();
  };
}
