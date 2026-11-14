import { NextRequest, NextResponse } from "next/server";
import { getPages, saveOrUpdatePage } from "@/lib/pages";
import { CustomPage } from "@/types/page-builder";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = getPages();
  return NextResponse.json({ pages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = (body.title || "Untitled Page").trim();
    const baseSlug = (body.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPage: CustomPage = {
      id: body.id || `page-${Date.now()}`,
      slug: baseSlug || `page-${Date.now().toString().slice(-4)}`,
      title,
      description: body.description || "Created with #code Studio Page Builder.",
      status: body.status || "published",
      theme: {
        accentColor: body.theme?.accentColor || "#D4FF00",
        fontFamily: body.theme?.fontFamily || "space-grotesk",
        surfaceMode: body.theme?.surfaceMode || "light",
      },
      blocks: Array.isArray(body.blocks) ? body.blocks : [],
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = saveOrUpdatePage(newPage);
    return NextResponse.json({ page: saved }, { status: 201 });
  } catch (error) {
    console.error("Failed to save page:", error);
    return NextResponse.json(
      { error: "Failed to create or save page" },
      { status: 500 }
    );
  }
}

