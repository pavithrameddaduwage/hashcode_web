import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug, getPages } from "@/lib/pages";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { ArrowLeft, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found · #code",
      description: "The requested page does not exist.",
    };
  }

  return {
    title: `${page.title} · #code`,
    description: page.description,
  };
}

export default async function CustomDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || (page.status === "draft" && process.env.NODE_ENV === "production")) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24 px-4 text-center">
          <div className="max-w-md">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              404 // NOT FOUND
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">
              Page Not Found
            </h1>
            <p className="mt-3 text-neutral-600 text-sm">
              The page <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">/p/{slug}</code> does not exist or has not been published yet.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-black transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return Home
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
              >
                Open Studio CMS
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const accentColor = page.theme?.accentColor || "#D4FF00";
  const fontFamilyClass =
    page.theme?.fontFamily === "jetbrains-mono"
      ? "font-mono"
      : "";

  return (
    <div
      className={`min-h-screen bg-white text-neutral-900 selection:bg-[var(--page-accent)] selection:text-neutral-950 ${fontFamilyClass}`}
      style={
        {
          "--page-accent": accentColor,
        } as React.CSSProperties
      }
    >
      <Navbar />

      <main className="min-h-[70vh]">
        {page.blocks && page.blocks.length > 0 ? (
          page.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} theme={page.theme} />
          ))
        ) : (
          <div className="max-w-2xl mx-auto py-32 px-4 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              {page.title}
            </h2>
            <p className="mt-2 text-neutral-500">
              This page has no blocks yet. Open Studio CMS to drag and drop components.
            </p>
            <Link
              href="/admin"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#D4FF00] text-neutral-950"
            >
              Open Builder in Admin
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

