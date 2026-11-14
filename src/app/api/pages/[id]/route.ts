import { NextRequest, NextResponse } from "next/server";
import { getPageById, saveOrUpdatePage, deletePage } from "@/lib/pages";
import { CustomPage } from "@/types/page-builder";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const page = getPageById(id);
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  return NextResponse.json({ page });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const pageToSave: CustomPage = {
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    const saved = saveOrUpdatePage(pageToSave);
    return NextResponse.json({ page: saved });
  } catch (error) {
    console.error("Failed to update page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const deleted = deletePage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

