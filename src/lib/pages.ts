import fs from "fs";
import path from "path";
import { CustomPage } from "@/types/page-builder";
import initialPages from "@/data/pages.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "pages.json");
const TMP_FILE_PATH = "/tmp/hashcode-pages.json";

export function getPages(): CustomPage[] {
  for (const filePath of [TMP_FILE_PATH, DATA_FILE_PATH]) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw) as CustomPage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // try next path
    }
  }
  return initialPages as CustomPage[];
}

export function savePages(pages: CustomPage[]): void {
  const json = JSON.stringify(pages, null, 2);
  try {
    fs.writeFileSync(TMP_FILE_PATH, json, "utf-8");
  } catch {
    // ignore tmp write failure
  }
  try {
    fs.writeFileSync(DATA_FILE_PATH, json, "utf-8");
  } catch {
    // read-only filesystem in serverless environments (e.g. Vercel)
  }
}

export function getPageBySlug(slug: string): CustomPage | undefined {
  const all = getPages();
  const cleanSlug = slug.toLowerCase().trim();
  return all.find(
    (p) => p.slug.toLowerCase() === cleanSlug || p.id === cleanSlug
  );
}

export function getPageById(id: string): CustomPage | undefined {
  const all = getPages();
  return all.find((p) => p.id === id);
}

export function saveOrUpdatePage(page: CustomPage): CustomPage {
  const all = getPages();
  const existingIndex = all.findIndex((p) => p.id === page.id);
  const now = new Date().toISOString();

  let updatedPages: CustomPage[];
  let finalPage: CustomPage;

  if (existingIndex >= 0) {
    finalPage = {
      ...all[existingIndex],
      ...page,
      updatedAt: now,
    };
    updatedPages = [...all];
    updatedPages[existingIndex] = finalPage;
  } else {
    finalPage = {
      ...page,
      createdAt: page.createdAt || now,
      updatedAt: now,
    };
    updatedPages = [finalPage, ...all];
  }

  savePages(updatedPages);
  return finalPage;
}

export function deletePage(id: string): boolean {
  const all = getPages();
  const filtered = all.filter((p) => p.id !== id && p.slug !== id);
  if (filtered.length !== all.length) {
    savePages(filtered);
    return true;
  }
  return false;
}

