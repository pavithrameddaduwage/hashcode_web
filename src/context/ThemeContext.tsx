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
const LOCAL_STORAGE_ACCENT_KEY = "hashcode_theme_accent";
const LOCAL_STORAGE_NAME_KEY = "hashcode_theme_name";

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
    // 1. Check local storage first (instant client persistence on Netlify / Vercel)
    if (typeof window !== "undefined") {
      try {
        const localSaved = localStorage.getItem(LOCAL_STORAGE_ACCENT_KEY);
        if (localSaved) {
          const localName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY) || "Custom";
          setTheme({ accentColor: localSaved, accentName: localName });
          applyCssVariables(localSaved);
          return;
        }
      } catch (e) {
        // ignore
      }
    }

    // 2. Fetch from API fallback
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

      // 1. Persist to localStorage (guaranteed survival on static / serverless hosts like Netlify)
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOCAL_STORAGE_ACCENT_KEY, hex);
          if (name) localStorage.setItem(LOCAL_STORAGE_NAME_KEY, name);
          // 2. Also persist to Cookie for 1 year
          document.cookie = `hashcode_theme_accent=${encodeURIComponent(
            hex
          )}; path=/; max-age=31536000; SameSite=Lax`;
        } catch (e) {
          // ignore
        }
      }

      // 3. Save to server API
      try {
        await fetch("/api/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accentColor: hex, accentName: name }),
        });
      } catch (e) {
        // ignore serverless write failure if on static host
      }

      // 4. Broadcast across tabs
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        const ch = new BroadcastChannel(THEME_CHANNEL);
        ch.postMessage({ type: "THEME_UPDATED", accentColor: hex });
        ch.close();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Hydrate from localStorage on client mount if present
    if (typeof window !== "undefined") {
      try {
        const savedHex = localStorage.getItem(LOCAL_STORAGE_ACCENT_KEY);
        if (savedHex) {
          const savedName = localStorage.getItem(LOCAL_STORAGE_NAME_KEY) || "Custom";
          setTheme({ accentColor: savedHex, accentName: savedName });
          applyCssVariables(savedHex);
        } else {
          applyCssVariables(theme.accentColor);
        }
      } catch (e) {
        applyCssVariables(theme.accentColor);
      }
    } else {
      applyCssVariables(theme.accentColor);
    }

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
