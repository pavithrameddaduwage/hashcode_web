import fs from "fs";
import path from "path";

export interface SiteTheme {
  accentColor: string;
  accentName?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "theme.json");
const TMP_FILE_PATH = "/tmp/hashcode-theme.json";

const DEFAULT_THEME: SiteTheme = {
  accentColor: "#D4FF00",
  accentName: "Lime Neon",
};

export function getTheme(): SiteTheme {
  for (const filePath of [TMP_FILE_PATH, DATA_FILE_PATH]) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.accentColor === "string") {
          return parsed;
        }
      }
    } catch {
      // try next path
    }
  }
  return DEFAULT_THEME;
}

export function saveTheme(theme: SiteTheme): SiteTheme {
  const normalized: SiteTheme = {
    accentColor: theme.accentColor || "#D4FF00",
    accentName: theme.accentName || "Custom Accent",
  };
  const json = JSON.stringify(normalized, null, 2);

  try {
    fs.writeFileSync(TMP_FILE_PATH, json, "utf-8");
  } catch {
    // ignore
  }

  try {
    fs.writeFileSync(DATA_FILE_PATH, json, "utf-8");
  } catch {
    // ignore
  }

  return normalized;
}

