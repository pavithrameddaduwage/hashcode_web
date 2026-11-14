"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { SiteTheme } from "@/lib/theme";

interface ThemeContextValue {
  theme: SiteTheme;
  setAccentColor: (hex: string, name?: string) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_CHANNEL = "hashtag_code_theme_sync";

export function ThemeProvider({
  children,
  initialTheme = { accentColor: "#D4FF00", accentName: "Lime Neon" },
}: {
  children: React.ReactNode;
  initialTheme?: SiteTheme;
}) {
  const [theme, setTheme] = useState<SiteTheme>(initialTheme);
  const [isLoading, setIsLoading] = useState(false);

  const applyCssVariables = useCallback((hex: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--accent-color", hex);
      // Contrast check for text
      const cleanHex = hex.replace("#", "");
      if (cleanHex.length === 6) {
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const contrast = brightness > 150 ? "#0a0a0a" : "#ffffff";
        document.documentElement.style.setProperty("--accent-contrast", contrast);
      }
    }
  }, []);

  const refreshTheme = useCallback(async () => {
    try {
      const res = await fetch("/api/theme", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.theme?.accentColor) {
          setTheme(data.theme);
          applyCssVariables(data.theme.accentColor);
        }
      }
    } catch (err) {
      console.error("Failed to fetch theme:", err);
    }
  }, [applyCssVariables]);

  const setAccentColor = async (hex: string, name?: string) => {
    try {
      setIsLoading(true);
      applyCssVariables(hex);
      setTheme({ accentColor: hex, accentName: name || "Custom" });

      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accentColor: hex, accentName: name }),
      });

      if (res.ok) {
        // Broadcast across tabs
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const ch = new BroadcastChannel(THEME_CHANNEL);
          ch.postMessage({ type: "THEME_UPDATED", accentColor: hex });
          ch.close();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    applyCssVariables(theme.accentColor);

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(THEME_CHANNEL);
      channel.onmessage = (event) => {
        if (event.data?.type === "THEME_UPDATED" && event.data.accentColor) {
          setTheme((prev) => ({ ...prev, accentColor: event.data.accentColor }));
          applyCssVariables(event.data.accentColor);
        }
      };
    }

    return () => {
      if (channel) channel.close();
    };
  }, [applyCssVariables, theme.accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, setAccentColor, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

