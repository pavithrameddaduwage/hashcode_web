import type { Metadata } from "next";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import "./code-loader.css";
import { CodeLoader } from "@/components/CodeLoader";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { getProjects } from "@/lib/projects";
import { getTheme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "#code",
  description:
    "An engineering-first software studio in Colombo. Web platforms, custom ERP and POS, automation and backends for growing businesses.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialProjects = getProjects();
  const initialTheme = getTheme();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          id="theme-accent-style"
          dangerouslySetInnerHTML={{
            __html: `:root { --accent-color: ${initialTheme.accentColor}; }`,
          }}
        />
      </head>
      <body
        className="antialiased selection:bg-[var(--accent-color)] selection:text-neutral-950"
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={initialTheme}>
          <CodeLoader />
          <ProjectsProvider initialProjects={initialProjects}>
            {children}
          </ProjectsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
