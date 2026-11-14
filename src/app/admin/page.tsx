"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Star,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Upload,
  LayoutGrid,
  Layers,
  Palette,
  Eye,
  Save,
  MoveUp,
  MoveDown,
  ChevronDown,
  ChevronUp,
  Terminal,
  Sparkles,
  Sliders,
  Type,
  HelpCircle,
  BarChart3,
  Quote,
  Check,
  Globe,
  Settings,
  GripVertical,
  Lock,
  LogOut,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import { useProjects } from "@/context/ProjectsContext";
import { useTheme } from "@/context/ThemeContext";
import { ProjectCategory } from "@/types/project";
import { CustomPage, PageBlock, BlockType } from "@/types/page-builder";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

const COLOR_PRESETS = [
  { name: "Lime Neon", hex: "#D4FF00", textDark: true },
  { name: "Cyber Cyan", hex: "#00F0FF", textDark: true },
  { name: "Neon Emerald", hex: "#00FF66", textDark: true },
  { name: "Radiant Orange", hex: "#FF6B00", textDark: false },
  { name: "Electric Violet", hex: "#A855F7", textDark: false },
  { name: "Hot Magenta", hex: "#FF007F", textDark: false },
  { name: "Minimal Mono", hex: "#18181B", textDark: false },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<"projects" | "pages" | "theme">("projects");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Check session
    const saved = localStorage.getItem("hashcode_admin_auth");
    if (saved === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser.trim() === "dev" && loginPass === "123456") {
      localStorage.setItem("hashcode_admin_auth", "authenticated");
      setIsAuthenticated(true);
      setLoginError(false);
      showToast("Access granted. Welcome to Studio CMS!");
    } else {
      setLoginError(true);
      showToast("Invalid credentials. Try dev / 123456");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hashcode_admin_auth");
    setIsAuthenticated(false);
    setLoginUser("");
    setLoginPass("");
    showToast("Logged out of Studio CMS.");
  };

  // Prevent flash while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center">
        <div className="text-xs font-mono text-neutral-400 animate-pulse">
          VERIFYING ACCESS //...
        </div>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-between p-4">
        <div className="pt-6 px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO SITE</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)]">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4FF00] text-black font-extrabold px-1.5 py-0.5 rounded text-sm font-mono leading-none">
                #
              </span>
              <span className="font-bold text-lg text-neutral-950 tracking-tight">
                code
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">
              STUDIO // GATE
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
              Admin Access
            </h1>
            <p className="mt-1 text-xs text-neutral-500">
              Enter engineering credentials to manage projects & pages.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>Incorrect credentials. Default: dev / 123456</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-600 mb-1.5">
                USERNAME
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="dev"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-600 mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-black text-[#D4FF00] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Unlock Studio CMS</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <span className="text-[11px] font-mono text-neutral-400">
              DEFAULT DEMO // <strong className="text-neutral-700 font-semibold">dev</strong> · <strong className="text-neutral-700 font-semibold">123456</strong>
            </span>
          </div>
        </div>

        <div className="pb-6 text-center text-xs font-mono text-neutral-400">
          #CODE STUDIO · SECURE ARCHITECTURE
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-neutral-900 font-sans pb-24">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-xs font-mono text-white shadow-2xl border border-neutral-800 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-[#D4FF00]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>EXIT STUDIO</span>
            </Link>
            <div className="h-4 w-[1px] bg-neutral-200" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-neutral-950">
                #code
              </span>
              <span className="bg-[#D4FF00] text-neutral-950 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                CMS · STUDIO
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <nav className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200/80">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "projects"
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Projects</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pages")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "pages"
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Page Builder</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("theme")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "theme"
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme & Styling</span>
            </button>
          </nav>

          {/* Logout button (replaced the previous ONLINE · SYNCED tag) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              title="Logout from CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === "projects" && <ProjectsManagerTab showToast={showToast} />}
        {activeTab === "pages" && <PageBuilderTab showToast={showToast} />}
        {activeTab === "theme" && <ThemeCustomizerTab showToast={showToast} />}
      </main>
    </div>
  );
}

/* =======================================================================
   TAB 1: PROJECTS MANAGER
   ======================================================================= */
function ProjectsManagerTab({ showToast }: { showToast: (msg: string) => void }) {
  const { projects, addProject, updateProject, deleteProject, isLoading } =
    useProjects();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("WEB");
  const [location, setLocation] = useState("Sri Lanka");
  const [liveUrl, setLiveUrl] = useState("");
  const [image, setImage] = useState("");
  const [featuredOnHome, setFeaturedOnHome] = useState(true);
  const [summary, setSummary] = useState("");
  const [stack, setStack] = useState("Next.js · TypeScript · PostgreSQL");
  const [bottleneck, setBottleneck] = useState("");
  const [theFix, setTheFix] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const created = await addProject({
        title: title.trim(),
        subtitle:
          subtitle.trim() ||
          `${category === "ERP" ? "Custom ERP" : "Website"} · ${location}`,
        category,
        location,
        liveUrl: liveUrl.trim(),
        image: image.trim(),
        featuredOnHome,
        summary: summary.trim() || undefined,
        stack: stack.trim() || undefined,
        bottleneck: bottleneck.trim() || undefined,
        theFix: theFix.trim() || undefined,
      });

      if (created) {
        setTitle("");
        setSubtitle("");
        setLiveUrl("");
        setImage("");
        setSummary("");
        setBottleneck("");
        setTheFix("");
        showToast(`Project "${created.title}" saved to database!`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await updateProject(id, { featuredOnHome: !current });
    showToast(
      !current
        ? "Added to Home page Selected Work!"
        : "Removed from Home page Selected Work."
    );
  };

  const handleDelete = async (id: string, projTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${projTitle}"?`)) return;
    await deleteProject(id);
    showToast(`Project "${projTitle}" removed.`);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(filterText.toLowerCase()) ||
      p.category.toLowerCase().includes(filterText.toLowerCase()) ||
      p.location?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Intro Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Project Architecture
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Manage production case studies, live links, and hero showcase features.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search projects..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-3.5 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Add Project */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="w-4 h-4 text-neutral-900" />
            <h2 className="text-base font-bold text-neutral-950">
              Add New Project
            </h2>
          </div>

          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Logistics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                >
                  <option value="WEB">WEB PLATFORM</option>
                  <option value="ERP">CUSTOM ERP / POS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                  LOCATION
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sri Lanka / UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                SUBTITLE / SCOPE
              </label>
              <input
                type="text"
                placeholder="e.g. Supply chain dashboard · Colombo"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                LIVE URL (OPTIONAL)
              </label>
              <input
                type="url"
                placeholder="https://client-domain.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                THUMBNAIL IMAGE (URL OR UPLOAD)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="/projects/image1.webp or https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                />
                <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Browse</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                TECH STACK
              </label>
              <input
                type="text"
                placeholder="Next.js · TypeScript · PostgreSQL"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                SUMMARY
              </label>
              <textarea
                rows={2}
                placeholder="Brief project mission and architecture overview..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featuredOnHome}
                onChange={(e) => setFeaturedOnHome(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-[#D4FF00]"
              />
              <label
                htmlFor="featured"
                className="text-xs font-medium text-neutral-700 cursor-pointer"
              >
                Feature on Homepage &ldquo;Selected Work&rdquo;
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting || !title.trim()}
              className="w-full mt-4 py-3 rounded-xl bg-neutral-950 hover:bg-black text-[#D4FF00] font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{submitting ? "Saving..." : "Add to Projects"}</span>
            </button>
          </form>
        </div>

        {/* Right List: Existing Projects */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-base font-bold text-neutral-950">
              Live Projects Directory ({filteredProjects.length})
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              CLICK STAR TO TOGGLE HOME SHOWCASE
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-xs font-mono text-neutral-400 bg-white rounded-2xl border border-neutral-200">
              Syncing projects...
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-white border border-neutral-200/90 rounded-2xl shadow-sm hover:border-neutral-300 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-12 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-neutral-400">
                          #CODE
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-900 truncate">
                          {p.title}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-neutral-100 text-neutral-600 font-semibold">
                          {p.category}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 truncate">
                        {p.subtitle} · {p.location || "Global"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      title={
                        p.featuredOnHome
                          ? "Featured on Home page"
                          : "Click to feature on Home page"
                      }
                      onClick={() => handleToggleFeatured(p.id, p.featuredOnHome)}
                      className={`p-2 rounded-xl transition-colors ${
                        p.featuredOnHome
                          ? "bg-[#D4FF00] text-neutral-950 font-bold"
                          : "bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    <Link
                      href={`/work/${p.slug}`}
                      target="_blank"
                      title="View live case study"
                      className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      title="Delete project"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================
   TAB 2: VISUAL PAGE BUILDER (WITH REAL DRAG & DROP)
   ======================================================================= */
function PageBuilderTab({ showToast }: { showToast: (msg: string) => void }) {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);

  // Active page editing state
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);

  // Drag & drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
        if (data.pages?.length > 0 && !selectedPageId) {
          setSelectedPageId(data.pages[0].id);
          setEditingPage(data.pages[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSelectPage = (page: CustomPage) => {
    setSelectedPageId(page.id);
    setEditingPage(JSON.parse(JSON.stringify(page)));
  };

  const handleCreateNewPage = () => {
    const newId = `page-${Date.now()}`;
    const newPage: CustomPage = {
      id: newId,
      slug: `page-${Date.now().toString().slice(-4)}`,
      title: "New Landing Page",
      description: "Custom digital platform engineered by #code.",
      status: "published",
      theme: {
        accentColor: "#D4FF00",
        fontFamily: "space-grotesk",
        surfaceMode: "light",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [
        {
          id: `blk-${Date.now()}-1`,
          type: "hero",
          enabled: true,
          title: "Page Hero Section",
          data: {
            badge: "STUDIO // DEPLOYMENT",
            heading: "High-Performance Platforms.",
            highlightText: "Built to Scale.",
            subtitle: "Turnkey software solutions, custom ERP architectures and high-concurrency cloud systems.",
            primaryButtonText: "Explore Solutions",
            primaryButtonLink: "#contact",
            terminalCommand: "code init --runtime=prod",
          },
        },
      ],
    };

    setPages([newPage, ...pages]);
    setSelectedPageId(newId);
    setEditingPage(newPage);
    showToast("New page created! Use drag & drop to compose blocks.");
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });

      if (res.ok) {
        showToast(`Page "${editingPage.title}" published to /p/${editingPage.slug}!`);
        await fetchPages();
      } else {
        showToast("Error saving page.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!window.confirm(`Delete page "${title}"?`)) return;
    await fetch(`/api/pages/${id}`, { method: "DELETE" });
    showToast(`Page "${title}" deleted.`);
    const remaining = pages.filter((p) => p.id !== id);
    setPages(remaining);
    if (remaining.length > 0) {
      handleSelectPage(remaining[0]);
    } else {
      setSelectedPageId(null);
      setEditingPage(null);
    }
  };

  /* Drag and drop block reordering logic */
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${index}`);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!editingPage) return;
    const sourceIndex = draggedIndex;
    if (sourceIndex === null || sourceIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const blocks = [...editingPage.blocks];
    const [removed] = blocks.splice(sourceIndex, 1);
    blocks.splice(dropIndex, 0, removed);

    setEditingPage({ ...editingPage, blocks });
    setDraggedIndex(null);
    setDragOverIndex(null);
    showToast("Block position reordered!");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    if (!editingPage) return;
    const blocks = [...editingPage.blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const temp = blocks[index];
    blocks[index] = blocks[targetIndex];
    blocks[targetIndex] = temp;

    setEditingPage({ ...editingPage, blocks });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!editingPage) return;
    const blocks = editingPage.blocks.filter((b) => b.id !== blockId);
    setEditingPage({ ...editingPage, blocks });
    showToast("Block removed.");
  };

  const handleAddBlock = (type: BlockType) => {
    if (!editingPage) return;
    const newBlockId = `blk-${Date.now()}`;
    let newBlockData: any = {};
    let friendlyTitle = "";

    switch (type) {
      case "hero":
        friendlyTitle = "Hero Header";
        newBlockData = {
          badge: "NEW ANNOUNCEMENT",
          heading: "Engineered for speed.",
          highlightText: "Proven in production.",
          subtitle: "Clear architecture, sub-second responses and rock-solid uptime.",
          primaryButtonText: "Get in touch",
          primaryButtonLink: "mailto:hasgtagcode.solutions@gmail.com",
          terminalCommand: "code deploy --fast",
        };
        break;
      case "terminal":
        friendlyTitle = "Terminal Diagnostics";
        newBlockData = {
          path: "~/studio/cluster",
          lines: [
            { num: "01", type: "cmd", text: "$ code status --all" },
            { num: "02", type: "add", text: "+ API response: 9ms" },
            { num: "03", type: "out", text: "> Uptime: 99.9%" },
          ],
        };
        break;
      case "projects":
        friendlyTitle = "Projects Showcase";
        newBlockData = {
          title: "Selected Client Deployments",
          subtitle: "Explore our real-world web platforms and custom business systems.",
          categoryFilter: "ALL",
          limit: 6,
        };
        break;
      case "features":
        friendlyTitle = "Feature Pillars";
        newBlockData = {
          tag: "CAPABILITIES",
          title: "Modular Engineering Pillars",
          subtitle: "Built to match your business workflow without messy workarounds.",
          items: [
            {
              number: "01",
              tag: "CORE",
              title: "High-Speed APIs",
              description: "Structured REST endpoints optimized for 12ms responses.",
            },
            {
              number: "02",
              tag: "DATABASE",
              title: "PostgreSQL Architecture",
              description: "Indexed tables and automated daily encrypted snapshots.",
            },
          ],
        };
        break;
      case "metrics":
        friendlyTitle = "Performance Metrics";
        newBlockData = {
          tag: "METRICS",
          title: "Verified Production Benchmarks",
          items: [
            { metric: "<0.8s", label: "average page load" },
            { metric: "99.9%", label: "system uptime" },
            { metric: "0", label: "layout shift" },
          ],
        };
        break;
      case "testimonial":
        friendlyTitle = "Client Testimonial";
        newBlockData = {
          quote: "Our digital operations are faster and more reliable than ever.",
          author: "Operations Lead",
          role: "Managing Director",
          company: "Enterprise Client",
        };
        break;
      case "cta":
        friendlyTitle = "Call to Action";
        newBlockData = {
          badge: "NEXT STEPS",
          heading: "Ready to launch your project?",
          description: "Schedule a discovery consultation with our senior engineers.",
          buttonText: "Schedule Call",
          buttonLink: "mailto:hasgtagcode.solutions@gmail.com",
        };
        break;
      case "faq":
        friendlyTitle = "FAQ Accordion";
        newBlockData = {
          tag: "QUESTIONS",
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How long does a typical build take?",
              answer: "Most production systems ship in 3 to 6 weeks with clear milestone deliverables.",
            },
          ],
        };
        break;
      case "rich-text":
        friendlyTitle = "Editorial Content";
        newBlockData = {
          content: "We believe in writing code with engineering discipline...",
        };
        break;
    }

    const newBlock: PageBlock = {
      id: newBlockId,
      type,
      title: friendlyTitle,
      enabled: true,
      data: newBlockData,
    };

    setEditingPage({
      ...editingPage,
      blocks: [...editingPage.blocks, newBlock],
    });
    setShowAddBlockModal(false);
    showToast(`Added ${friendlyTitle} block!`);
  };

  const handleUpdateBlockData = (blockId: string, updatedData: any) => {
    if (!editingPage) return;
    const blocks = editingPage.blocks.map((b) =>
      b.id === blockId ? { ...b, data: updatedData } : b
    );
    setEditingPage({ ...editingPage, blocks });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Visual Page Composer
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Drag & drop blocks to reorder, configure and publish dynamic pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCreateNewPage}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-900 hover:bg-neutral-50 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Page</span>
          </button>

          {editingPage && (
            <>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  previewMode
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? "Exit Preview" : "Live Preview"}</span>
              </button>

              <button
                type="button"
                onClick={handleSavePage}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF00] hover:bg-[#c3ec00] text-neutral-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? "Publishing..." : "Publish Page"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Pages Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200/60 no-scrollbar">
        {pages.map((p) => {
          const isSelected = p.id === selectedPageId;
          return (
            <div
              key={p.id}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all flex-shrink-0 ${
                isSelected
                  ? "bg-neutral-950 text-white shadow-sm"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
              }`}
              onClick={() => handleSelectPage(p)}
            >
              <span>{p.title}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected
                    ? "bg-[#D4FF00] text-neutral-950 font-bold"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                /p/{p.slug}
              </span>
            </div>
          );
        })}
      </div>

      {/* Editor & Preview Area */}
      {editingPage ? (
        previewMode ? (
          /* Live Preview Mode */
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
            <div className="px-6 py-3 border-b border-neutral-200 bg-neutral-100/70 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-neutral-800">
                  LIVE PREVIEW: /p/{editingPage.slug}
                </span>
              </div>
              <Link
                href={`/p/${editingPage.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-950"
              >
                <span>Open in tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="p-0">
              {editingPage.blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  theme={editingPage.theme}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Visual Block Builder Mode */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Page Meta Settings & Theme */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-neutral-950 border-b border-neutral-100 pb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-neutral-600" />
                  <span>Page Settings</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                    PAGE TITLE
                  </label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                    URL SLUG (/p/[slug])
                  </label>
                  <input
                    type="text"
                    value={editingPage.slug}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]+/g, "-"),
                      })
                    }
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                    META DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    value={editingPage.description}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                {/* Accent Color Picker for this page */}
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 mb-2">
                    PAGE ACCENT PALETTE
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {COLOR_PRESETS.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() =>
                          setEditingPage({
                            ...editingPage,
                            theme: { ...editingPage.theme, accentColor: col.hex },
                          })
                        }
                        title={col.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          editingPage.theme.accentColor === col.hex
                            ? "border-neutral-900 scale-110 shadow-sm"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingPage.theme.accentColor}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          theme: {
                            ...editingPage.theme,
                            accentColor: e.target.value,
                          },
                        })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-200"
                    />
                    <input
                      type="text"
                      value={editingPage.theme.accentColor}
                      onChange={(e) =>
                        setEditingPage({
                          ...editingPage,
                          theme: {
                            ...editingPage.theme,
                            accentColor: e.target.value,
                          },
                        })
                      }
                      className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 uppercase"
                    />
                  </div>
                </div>

                {/* Font Selector */}
                <div>
                  <label className="block text-xs font-mono font-medium text-neutral-700 mb-1">
                    PRIMARY TYPOGRAPHY
                  </label>
                  <select
                    value={editingPage.theme.fontFamily}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        theme: {
                          ...editingPage.theme,
                          fontFamily: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  >
                    <option value="space-grotesk">Space Grotesk (Editorial Tech)</option>
                    <option value="jetbrains-mono">JetBrains Mono (Full Terminal)</option>
                    <option value="system">Modern Sans System</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100">
                  <Link
                    href={`/p/${editingPage.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public URL</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDeletePage(editingPage.id, editingPage.title)}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700"
                  >
                    Delete Page
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Block Sequence & Drag & Drop */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-base font-bold text-neutral-950">
                    Page Blocks Sequence ({editingPage.blocks.length})
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    DRAG THE GRIP HANDLE OR USE ARROWS TO REORDER
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddBlockModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-black text-[#D4FF00] font-bold text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Block</span>
                </button>
              </div>

              {editingPage.blocks.length === 0 ? (
                <div className="p-12 text-center bg-white border border-dashed border-neutral-300 rounded-2xl">
                  <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                  <div className="text-sm font-bold text-neutral-800">
                    No blocks added yet
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">
                    Choose from Hero, Terminal, Features, Metrics, FAQs and more.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddBlockModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4FF00] text-neutral-950 font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert First Block</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {editingPage.blocks.map((block, idx) => (
                    <BlockEditorCard
                      key={block.id}
                      block={block}
                      index={idx}
                      total={editingPage.blocks.length}
                      isDragging={draggedIndex === idx}
                      isDragOver={dragOverIndex === idx}
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={(e) => handleDrop(e, idx)}
                      onDragEnd={handleDragEnd}
                      onMoveUp={() => handleMoveBlock(idx, "up")}
                      onMoveDown={() => handleMoveBlock(idx, "down")}
                      onDelete={() => handleDeleteBlock(block.id)}
                      onUpdateData={(newData) =>
                        handleUpdateBlockData(block.id, newData)
                      }
                      accentColor={editingPage.theme.accentColor}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="p-16 text-center bg-white border border-neutral-200 rounded-2xl">
          <Layers className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h2 className="text-base font-bold text-neutral-800">
            Select or Create a Page
          </h2>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Manage landing pages, custom service pages and client presentations.
          </p>
          <button
            type="button"
            onClick={handleCreateNewPage}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4FF00] text-neutral-950 font-bold text-xs shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Page</span>
          </button>
        </div>
      )}

      {/* Add Block Modal */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-950">
                  Select a Reusable Component
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Pick a signature `#code` block to insert into this page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBlockModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {[
                {
                  type: "hero" as BlockType,
                  title: "Hero Header",
                  desc: "Signature title, typewriter badge, CTA buttons & live runtime mockup.",
                  icon: Sparkles,
                },
                {
                  type: "terminal" as BlockType,
                  title: "Terminal Window",
                  desc: "macOS styled command line terminal with syntax output.",
                  icon: Terminal,
                },
                {
                  type: "projects" as BlockType,
                  title: "Projects Showcase",
                  desc: "Live project gallery connected directly to your portfolio.",
                  icon: LayoutGrid,
                },
                {
                  type: "features" as BlockType,
                  title: "Feature Pillars",
                  desc: "4-column technical cards with numbers, tags and descriptions.",
                  icon: Sliders,
                },
                {
                  type: "metrics" as BlockType,
                  title: "Metrics Counter",
                  desc: "High-impact SLA benchmarks e.g. <0.8s, 99.9% uptime.",
                  icon: BarChart3,
                },
                {
                  type: "testimonial" as BlockType,
                  title: "Client Testimonial",
                  desc: "Editorial dark banner with client verification quote.",
                  icon: Quote,
                },
                {
                  type: "cta" as BlockType,
                  title: "Call to Action Banner",
                  desc: "Clean card with primary and secondary contact links.",
                  icon: Globe,
                },
                {
                  type: "faq" as BlockType,
                  title: "FAQ Accordion",
                  desc: "Collapsible questions and answers for technical clarity.",
                  icon: HelpCircle,
                },
                {
                  type: "rich-text" as BlockType,
                  title: "Editorial Copy",
                  desc: "Simple typography paragraph block for long-form content.",
                  icon: Type,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleAddBlock(item.type)}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-neutral-200 hover:border-neutral-900 bg-neutral-50/50 hover:bg-white text-left transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-white border border-neutral-200 group-hover:bg-[#D4FF00] group-hover:text-neutral-950 transition-colors">
                      <Icon className="w-5 h-5 text-neutral-800" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-neutral-950 group-hover:text-black">
                        {item.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Individual Block Editor Card (Drag and Drop Supported) ---------------- */
function BlockEditorCard({
  block,
  index,
  total,
  isDragging,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onMoveUp,
  onMoveDown,
  onDelete,
  onUpdateData,
  accentColor,
}: {
  block: PageBlock;
  index: number;
  total: number;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onUpdateData: (newData: any) => void;
  accentColor: string;
}) {
  const [expanded, setExpanded] = useState(true);

  const blockData = block.data || {};

  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-200 ${
        isDragging ? "opacity-35 scale-[0.98]" : "opacity-100"
      } ${
        isDragOver
          ? "border-neutral-950 ring-2 ring-[#D4FF00] shadow-lg translate-y-1"
          : "border-neutral-200/90"
      }`}
    >
      {/* Block Header with Drag Handle */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 bg-neutral-50/70 border-b border-neutral-200/60">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Native HTML5 Drag Handle */}
          <div
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            title="Drag to reorder"
            className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-neutral-200/80 text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <span className="font-mono text-xs text-neutral-400 font-semibold select-none">
            #{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold text-neutral-950 select-none"
            style={{ backgroundColor: accentColor }}
          >
            {block.type}
          </span>
          <span className="font-bold text-sm text-neutral-900 truncate max-w-[140px] sm:max-w-xs">
            {block.title || `${block.type} section`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={onMoveUp}
            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 text-neutral-600 transition-colors"
            title="Move up"
          >
            <MoveUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={onMoveDown}
            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-30 text-neutral-600 transition-colors"
            title="Move down"
          >
            <MoveDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-rose-50 text-rose-600 transition-colors"
            title="Delete block"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 transition-colors ml-1"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Block Inline Config Fields */}
      {expanded && (
        <div className="p-5 space-y-4 text-xs">
          {block.type === "hero" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    BADGE TEXT
                  </label>
                  <input
                    type="text"
                    value={blockData.badge || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, badge: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    HIGHLIGHTED TEXT
                  </label>
                  <input
                    type="text"
                    value={blockData.highlightText || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, highlightText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  MAIN HEADING
                </label>
                <input
                  type="text"
                  value={blockData.heading || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, heading: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  SUBTITLE
                </label>
                <textarea
                  rows={2}
                  value={blockData.subtitle || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, subtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    PRIMARY CTA TEXT
                  </label>
                  <input
                    type="text"
                    value={blockData.primaryButtonText || ""}
                    onChange={(e) =>
                      onUpdateData({
                        ...blockData,
                        primaryButtonText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    PRIMARY CTA LINK
                  </label>
                  <input
                    type="text"
                    value={blockData.primaryButtonLink || ""}
                    onChange={(e) =>
                      onUpdateData({
                        ...blockData,
                        primaryButtonLink: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  TERMINAL COMMAND
                </label>
                <input
                  type="text"
                  value={blockData.terminalCommand || ""}
                  onChange={(e) =>
                    onUpdateData({
                      ...blockData,
                      terminalCommand: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 font-mono rounded-xl border border-neutral-200"
                />
              </div>
            </div>
          )}

          {block.type === "terminal" && (
            <div className="space-y-3">
              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  TERMINAL PATH
                </label>
                <input
                  type="text"
                  value={blockData.path || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, path: e.target.value })
                  }
                  className="w-full px-3 py-2 font-mono rounded-xl border border-neutral-200"
                />
              </div>
            </div>
          )}

          {block.type === "projects" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    SECTION TITLE
                  </label>
                  <input
                    type="text"
                    value={blockData.title || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    CATEGORY FILTER
                  </label>
                  <select
                    value={blockData.categoryFilter || "ALL"}
                    onChange={(e) =>
                      onUpdateData({
                        ...blockData,
                        categoryFilter: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  >
                    <option value="ALL">ALL PROJECTS</option>
                    <option value="WEB">WEB PLATFORMS</option>
                    <option value="ERP">CUSTOM ERP / POS</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {block.type === "cta" && (
            <div className="space-y-3">
              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  HEADING
                </label>
                <input
                  type="text"
                  value={blockData.heading || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, heading: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>
              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={blockData.description || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={blockData.buttonText || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, buttonText: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    BUTTON LINK
                  </label>
                  <input
                    type="text"
                    value={blockData.buttonLink || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, buttonLink: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>
            </div>
          )}

          {block.type === "testimonial" && (
            <div className="space-y-3">
              <div>
                <label className="block font-mono text-neutral-600 mb-1">
                  QUOTE
                </label>
                <textarea
                  rows={2}
                  value={blockData.quote || ""}
                  onChange={(e) =>
                    onUpdateData({ ...blockData, quote: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    AUTHOR
                  </label>
                  <input
                    type="text"
                    value={blockData.author || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, author: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    ROLE
                  </label>
                  <input
                    type="text"
                    value={blockData.role || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-mono text-neutral-600 mb-1">
                    COMPANY
                  </label>
                  <input
                    type="text"
                    value={blockData.company || ""}
                    onChange={(e) =>
                      onUpdateData({ ...blockData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>
            </div>
          )}

          {block.type === "rich-text" && (
            <div>
              <label className="block font-mono text-neutral-600 mb-1">
                CONTENT (PLAIN OR FORMATTED TEXT)
              </label>
              <textarea
                rows={4}
                value={blockData.content || ""}
                onChange={(e) =>
                  onUpdateData({ ...blockData, content: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-neutral-200"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =======================================================================
   TAB 3: THEME & COLOR PALETTE CUSTOMIZER
   ======================================================================= */
function ThemeCustomizerTab({ showToast }: { showToast: (msg: string) => void }) {
  const { theme, setAccentColor, isLoading } = useTheme();
  const [selectedAccent, setSelectedAccent] = useState(theme.accentColor || "#D4FF00");
  const [customHex, setCustomHex] = useState(theme.accentColor || "#D4FF00");

  useEffect(() => {
    if (theme.accentColor) {
      setSelectedAccent(theme.accentColor);
      setCustomHex(theme.accentColor);
    }
  }, [theme.accentColor]);

  const handleApplyColor = async (hex: string, name?: string) => {
    setSelectedAccent(hex);
    setCustomHex(hex);
    await setAccentColor(hex, name);
    showToast(`Global theme saved: ${hex}! Entire website frontend updated.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
          Global Design System & Theme Engine
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Select or enter an accent color. Any change here automatically updates the <strong>entire frontend</strong> (Navbar, Hero spotlights, Buttons, Scroll Line, Badges, and all Pages) in real time.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-neutral-950 mb-2">
            Preset Accent Colors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COLOR_PRESETS.map((col) => {
              const active = selectedAccent.toLowerCase() === col.hex.toLowerCase();
              return (
                <button
                  key={col.hex}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleApplyColor(col.hex, col.name)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    active
                      ? "border-neutral-950 shadow-md ring-2 ring-neutral-950/10"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="w-full h-10 rounded-xl mb-3 shadow-inner flex items-center justify-end pr-2"
                    style={{ backgroundColor: col.hex }}
                  >
                    {active && (
                      <span className="p-1 rounded-full bg-neutral-950 text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-neutral-900">
                    {col.name}
                  </div>
                  <div className="font-mono text-xs text-neutral-400">
                    {col.hex}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Hex Picker */}
        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="font-bold text-sm text-neutral-950">
              Custom Hex Color
            </div>
            <div className="text-xs text-neutral-500">
              Enter any brand color hex code
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer border border-neutral-200"
            />
            <input
              type="text"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="px-3 py-2 text-sm font-mono uppercase rounded-xl border border-neutral-200 w-32"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleApplyColor(customHex, "Custom Accent")}
              className="px-4 py-2 rounded-xl bg-neutral-950 text-white font-semibold text-xs hover:bg-black transition-colors"
            >
              {isLoading ? "Saving..." : "Apply Global Color"}
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-md">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-3">
          GLOBAL COMPONENT SIMULATION
        </span>
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded text-xs font-mono font-bold text-neutral-950"
              style={{ backgroundColor: selectedAccent }}
            >
              #CODE · THEME
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              ACTIVE PALETTE: {selectedAccent}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-neutral-950">
            High-Performance Web Platforms & ERPs
          </h3>

          <p className="text-sm text-neutral-600 max-w-xl">
            This card and all elements across the entire website (Navbar, Footer, Buttons, Typewriter Dot, Scroll Line, and Case Studies) automatically use this accent color.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-neutral-950 shadow-sm"
              style={{ backgroundColor: selectedAccent }}
            >
              Primary Action Button
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-white border border-neutral-200 text-neutral-800"
            >
              Secondary Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
