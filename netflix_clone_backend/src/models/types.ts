/**
 * Shared types for admin APIs.
 */

export type ContentType = "movie" | "series";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  genre: string;
  year: number;
  maturityRating: string;
  description?: string;
  posterUrl?: string;
  backdropUrl?: string;
  durationMins?: number;
  isKids?: boolean;
}

export type FeatureFlags = Record<string, boolean>;

export interface ApiErrorShape {
  error: string;
  message: string;
  details?: unknown;
  requestId?: string;
}
