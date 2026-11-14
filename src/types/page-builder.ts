export type BlockType =
  | "hero"
  | "terminal"
  | "projects"
  | "features"
  | "metrics"
  | "testimonial"
  | "cta"
  | "faq"
  | "rich-text";

export interface HeroBlockData {
  badge?: string;
  heading: string;
  highlightText?: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  terminalCommand?: string;
  terminalLines?: Array<{ type: "cmd" | "add" | "out"; text: string }>;
}

export interface TerminalBlockData {
  title?: string;
  path?: string;
  lines: Array<{ num: string; text: string; type: "cmd" | "add" | "out" | "err" }>;
}

export interface ProjectsBlockData {
  title: string;
  subtitle?: string;
  categoryFilter?: "ALL" | "WEB" | "ERP";
  limit?: number;
  layout?: "grid" | "carousel";
}

export interface FeaturesBlockData {
  tag?: string;
  title: string;
  subtitle?: string;
  items: Array<{
    number: string;
    tag?: string;
    title: string;
    description: string;
  }>;
}

export interface MetricsBlockData {
  tag?: string;
  title?: string;
  items: Array<{
    metric: string;
    label: string;
    description?: string;
  }>;
}

export interface TestimonialBlockData {
  quote: string;
  author: string;
  role: string;
  company?: string;
  rating?: number;
}

export interface CtaBlockData {
  badge?: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface FaqBlockData {
  tag?: string;
  title: string;
  subtitle?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface RichTextBlockData {
  content: string; // Markdown or clean text
}

export type PageBlockData =
  | { type: "hero"; data: HeroBlockData }
  | { type: "terminal"; data: TerminalBlockData }
  | { type: "projects"; data: ProjectsBlockData }
  | { type: "features"; data: FeaturesBlockData }
  | { type: "metrics"; data: MetricsBlockData }
  | { type: "testimonial"; data: TestimonialBlockData }
  | { type: "cta"; data: CtaBlockData }
  | { type: "faq"; data: FaqBlockData }
  | { type: "rich-text"; data: RichTextBlockData };

export interface PageBlock {
  id: string;
  type: BlockType;
  title?: string; // friendly admin title
  enabled: boolean;
  data: any;
}

export interface PageTheme {
  accentColor: string; // hex code like "#D4FF00", "#00F0FF", "#00FF66", "#FF6B00", "#B026FF"
  fontFamily: "space-grotesk" | "jetbrains-mono" | "system";
  surfaceMode: "light" | "dark";
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "published" | "draft";
  theme: PageTheme;
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
}

