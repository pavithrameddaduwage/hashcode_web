"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageBlock, PageTheme } from "@/types/page-builder";
import { useProjects } from "@/context/ProjectsContext";
import { ProjectCard } from "@/components/ProjectCard";
import {
  ChevronDown,
  ChevronUp,
  Terminal as TerminalIcon,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface BlockRendererProps {
  block: PageBlock;
  theme: PageTheme;
}

export function BlockRenderer({ block, theme }: BlockRendererProps) {
  if (!block.enabled) return null;

  const accent = theme.accentColor || "#D4FF00";

  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} accent={accent} />;
    case "terminal":
      return <TerminalBlock data={block.data} accent={accent} />;
    case "projects":
      return <ProjectsBlock data={block.data} accent={accent} />;
    case "features":
      return <FeaturesBlock data={block.data} accent={accent} />;
    case "metrics":
      return <MetricsBlock data={block.data} accent={accent} />;
    case "testimonial":
      return <TestimonialBlock data={block.data} accent={accent} />;
    case "cta":
      return <CtaBlock data={block.data} accent={accent} />;
    case "faq":
      return <FaqBlock data={block.data} accent={accent} />;
    case "rich-text":
      return <RichTextBlock data={block.data} accent={accent} />;
    default:
      return null;
  }
}

/* ---------------- Hero Block ---------------- */
function HeroBlock({ data, accent }: { data: any; accent: string }) {
  const terminalLines = data.terminalLines || [
    { type: "cmd", text: "$ code verify --cluster" },
    { type: "add", text: "+ healthy and synced across all nodes" },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 border-b border-neutral-200/80">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[110px] opacity-25"
        style={{ backgroundColor: accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            {data.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 bg-neutral-50/90 text-[11px] font-mono tracking-widest uppercase text-neutral-700 mb-6 shadow-sm">
                <span
                  className="h-2 w-2 rounded-full animate-ping"
                  style={{ backgroundColor: accent }}
                />
                <span className="font-semibold">{data.badge}</span>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.08]">
              {data.heading}{" "}
              {data.highlightText && (
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-neutral-950 mt-1"
                  style={{ backgroundColor: accent }}
                >
                  {data.highlightText}
                </span>
              )}
            </h1>

            {data.subtitle && (
              <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                {data.subtitle}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {data.primaryButtonText && (
                <Link
                  href={data.primaryButtonLink || "#"}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-neutral-950 shadow-sm transition-all hover:opacity-95 hover:shadow-md"
                  style={{ backgroundColor: accent }}
                >
                  <span>{data.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {data.secondaryButtonText && (
                <Link
                  href={data.secondaryButtonLink || "#"}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors"
                >
                  {data.secondaryButtonText}
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-3 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 font-semibold text-neutral-700">
                    terminal.sh
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                  LIVE RUNTIME
                </span>
              </div>

              {data.terminalCommand && (
                <div className="font-mono text-xs text-neutral-800 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200/60 mb-3 flex items-center gap-2">
                  <span className="text-neutral-400">$</span>
                  <span className="font-semibold">{data.terminalCommand}</span>
                </div>
              )}

              <div className="space-y-1.5 font-mono text-xs">
                {terminalLines.map((line: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      line.type === "cmd"
                        ? "text-neutral-900 font-semibold"
                        : line.type === "add"
                        ? "text-emerald-600 font-medium"
                        : "text-neutral-500"
                    }`}
                  >
                    <span className="text-neutral-300 select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Terminal Block ---------------- */
function TerminalBlock({ data, accent }: { data: any; accent: string }) {
  const lines = data.lines || [];

  return (
    <section className="py-16 sm:py-24 border-b border-neutral-200/80 bg-neutral-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200/80 bg-neutral-100/60 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="ml-3 text-neutral-600 font-medium">
                {data.path || "~/code/runtime"}
              </span>
            </div>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-semibold text-neutral-900"
              style={{ backgroundColor: accent }}
            >
              ACTIVE
            </span>
          </div>

          <div className="p-6 font-mono text-xs sm:text-sm space-y-2 bg-[#FAFAF9]">
            {lines.map((line: any, i: number) => {
              const colorClass =
                line.type === "cmd"
                  ? "text-neutral-900 font-bold"
                  : line.type === "add"
                  ? "text-emerald-600 font-medium"
                  : line.type === "err"
                  ? "text-rose-600"
                  : "text-neutral-500";

              return (
                <div key={i} className={`flex items-start gap-3 ${colorClass}`}>
                  <span className="text-neutral-300 select-none font-normal">
                    {line.num || String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects Block ---------------- */
function ProjectsBlock({ data }: { data: any; accent: string }) {
  const { projects } = useProjects();

  let filtered = [...projects];
  if (data.categoryFilter && data.categoryFilter !== "ALL") {
    filtered = filtered.filter((p) => p.category === data.categoryFilter);
  }
  if (data.limit && data.limit > 0) {
    filtered = filtered.slice(0, data.limit);
  }

  return (
    <section className="py-20 sm:py-28 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            {data.title || "Selected Projects"}
          </h2>
          {data.subtitle && (
            <p className="mt-3 text-lg text-neutral-600 max-w-2xl">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features Block ---------------- */
function FeaturesBlock({ data, accent }: { data: any; accent: string }) {
  const items = data.items || [];

  return (
    <section className="py-20 sm:py-28 border-b border-neutral-200/80 bg-neutral-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          {data.tag && (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span>{data.tag}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mt-3 text-lg text-neutral-600">{data.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-neutral-400 font-semibold">
                  {item.number || String(idx + 1).padStart(2, "0")}
                </span>
                {item.tag && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-neutral-100 text-neutral-600">
                    {item.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Metrics Block ---------------- */
function MetricsBlock({ data, accent }: { data: any; accent: string }) {
  const items = data.items || [];

  return (
    <section className="py-16 sm:py-24 border-b border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.title && (
          <div className="mb-10 text-center">
            {data.tag && (
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
                {data.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950">
              {data.title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((m: any, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200/90 bg-neutral-50/60 p-6 text-center"
            >
              <div
                className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                style={{ color: "#000000" }}
              >
                {m.metric}
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-wider text-neutral-700 font-medium">
                {m.label}
              </div>
              {m.description && (
                <div className="mt-2 text-xs text-neutral-500">
                  {m.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonial Block ---------------- */
function TestimonialBlock({ data, accent }: { data: any; accent: string }) {
  return (
    <section className="py-20 sm:py-28 border-b border-neutral-200/80 bg-neutral-950 text-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ backgroundColor: accent }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-neutral-950 mb-8"
          style={{ backgroundColor: accent }}
        >
          CLIENT VERIFICATION
        </span>
        <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-snug text-neutral-100">
          &ldquo;{data.quote}&rdquo;
        </blockquote>
        <div className="mt-8">
          <div className="font-bold text-base text-white">{data.author}</div>
          <div className="text-sm font-mono text-neutral-400 mt-1">
            {data.role}
            {data.company ? ` · ${data.company}` : ""}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA Block ---------------- */
function CtaBlock({ data, accent }: { data: any; accent: string }) {
  return (
    <section className="py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="rounded-3xl border border-neutral-200 p-8 sm:p-14 text-center relative overflow-hidden shadow-lg"
          style={{
            background: `linear-gradient(135deg, #FFFFFF 0%, #F8F8F6 100%)`,
          }}
        >
          {data.badge && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-neutral-950 mb-6"
              style={{ backgroundColor: accent }}
            >
              {data.badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 max-w-3xl mx-auto leading-tight">
            {data.heading}
          </h2>
          <p className="mt-5 text-lg text-neutral-600 max-w-2xl mx-auto">
            {data.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={data.buttonLink || "#"}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-neutral-950 shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: accent }}
            >
              <span>{data.buttonText || "Get in Touch"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {data.secondaryButtonText && (
              <Link
                href={data.secondaryButtonLink || "#"}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                {data.secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ Block ---------------- */
function FaqBlock({ data, accent }: { data: any; accent: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = data.items || [];

  return (
    <section className="py-20 sm:py-28 border-b border-neutral-200/80 bg-neutral-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          {data.tag && (
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
              {data.tag}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950">
            {data.title || "Frequently Asked Questions"}
          </h2>
          {data.subtitle && (
            <p className="mt-2 text-neutral-600">{data.subtitle}</p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-base text-neutral-900 pr-4">
                    {item.question}
                  </span>
                  <span
                    className="p-1 rounded-full transition-transform"
                    style={{
                      backgroundColor: isOpen ? accent : "#F3F4F6",
                    }}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-neutral-900" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Rich Text Block ---------------- */
function RichTextBlock({ data }: { data: any; accent: string }) {
  return (
    <section className="py-16 sm:py-20 border-b border-neutral-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-neutral">
        <div className="text-neutral-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
          {data.content}
        </div>
      </div>
    </section>
  );
}

