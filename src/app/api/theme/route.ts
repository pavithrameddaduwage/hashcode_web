import { NextRequest, NextResponse } from "next/server";
import { getTheme, saveTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";

export async function GET() {
  const theme = getTheme();
  return NextResponse.json({ theme });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const accentColor = (body.accentColor || "#D4FF00").trim();
    const accentName = (body.accentName || "Custom Accent").trim();

    const saved = saveTheme({ accentColor, accentName });
    return NextResponse.json({ theme: saved });
  } catch (error) {
    console.error("Failed to update theme:", error);
    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}

