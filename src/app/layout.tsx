import type { Metadata } from "next";
import { cookies } from "next/headers";
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
import { getTheme, SiteTheme } from "@/lib/theme";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialProjects = getProjects();
  let initialTheme: SiteTheme = getTheme();

  try {
    const cookieStore = await cookies();
    const cookieAccent = cookieStore.get("hashcode_theme_accent")?.value;
    if (cookieAccent && cookieAccent.startsWith("#")) {
      initialTheme = {
        accentColor: cookieAccent,
        accentName: "Custom Accent",
      };
    }
  } catch {
    // fallback
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Synchronous pre-hydration theme injector: Prevents color flicker on refresh */}
        <script
          id="theme-prehydrate-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('hashcode_theme_accent');
                  if (saved && saved.indexOf('#') === 0) {
                    document.documentElement.style.setProperty('--accent-color', saved);
                    var clean = saved.replace('#', '');
                    if (clean.length === 6) {
                      var r = parseInt(clean.substring(0, 2), 16);
                      var g = parseInt(clean.substring(2, 4), 16);
                      var b = parseInt(clean.substring(4, 6), 16);
                      var bright = (r * 299 + g * 587 + b * 114) / 1000;
                      document.documentElement.style.setProperty('--accent-contrast', bright > 150 ? '#0a0a0a' : '#ffffff');
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
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
