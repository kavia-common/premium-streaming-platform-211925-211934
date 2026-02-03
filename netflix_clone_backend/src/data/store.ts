import fs from "fs";
import path from "path";
import { ContentItem, FeatureFlags } from "../models/types";

type StoreState = {
  featureFlags: FeatureFlags;
  content: ContentItem[];
};

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJsonFile(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function ensureDirExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

export class JsonStore {
  private readonly dataDir: string;
  private readonly featureFlagsPath: string;
  private readonly contentPath: string;

  private state: StoreState;

  constructor(dataDir: string) {
    this.dataDir = dataDir;
    this.featureFlagsPath = path.join(this.dataDir, "featureFlags.json");
    this.contentPath = path.join(this.dataDir, "content.json");

    ensureDirExists(this.dataDir);

    // Initialize from disk if present, else seed.
    const featureFlags = readJsonFile<FeatureFlags>(this.featureFlagsPath);
    const content = readJsonFile<ContentItem[]>(this.contentPath);

    if (featureFlags && content) {
      this.state = { featureFlags, content };
    } else {
      this.state = this.loadSeeds();
      this.persistAll();
    }
  }

  private loadSeeds(): StoreState {
    const seedFlagsPath = path.resolve(process.cwd(), "data", "featureFlags.seed.json");
    const seedContentPath = path.resolve(process.cwd(), "data", "content.seed.json");

    const featureFlags =
      readJsonFile<FeatureFlags>(seedFlagsPath) ?? {
        enableKidsMode: true
      };

    const content = readJsonFile<ContentItem[]>(seedContentPath) ?? [];

    return { featureFlags, content };
  }

  private persistAll(): void {
    writeJsonFile(this.featureFlagsPath, this.state.featureFlags);
    writeJsonFile(this.contentPath, this.state.content);
  }

  getFeatureFlags(): FeatureFlags {
    return this.state.featureFlags;
  }

  setFeatureFlags(next: FeatureFlags): FeatureFlags {
    this.state.featureFlags = next;
    writeJsonFile(this.featureFlagsPath, this.state.featureFlags);
    return this.state.featureFlags;
  }

  getContent(): ContentItem[] {
    return this.state.content;
  }

  addContent(item: ContentItem): ContentItem {
    this.state.content = [item, ...this.state.content];
    writeJsonFile(this.contentPath, this.state.content);
    return item;
  }

  updateContent(id: string, patch: Partial<ContentItem>): ContentItem | null {
    const idx = this.state.content.findIndex((c) => c.id === id);
    if (idx === -1) return null;

    const updated: ContentItem = { ...this.state.content[idx], ...patch, id };
    this.state.content[idx] = updated;
    writeJsonFile(this.contentPath, this.state.content);
    return updated;
  }

  deleteContent(id: string): boolean {
    const before = this.state.content.length;
    this.state.content = this.state.content.filter((c) => c.id !== id);
    const after = this.state.content.length;
    if (after !== before) {
      writeJsonFile(this.contentPath, this.state.content);
      return true;
    }
    return false;
  }

  resetToSeed(): StoreState {
    this.state = this.loadSeeds();
    this.persistAll();
    return this.state;
  }

  inspect(): StoreState {
    return this.state;
  }
}
