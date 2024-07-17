import { createContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const windowQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return windowQuery.matches;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const darkModeChange = useCallback((event: MediaQueryListEvent) => {
    setDarkMode(event.matches);
  }, []);

  useEffect(() => {
    const windowQuery = window.matchMedia("(prefers-color-scheme: dark)");
    windowQuery.addEventListener("change", darkModeChange);
    return () => {
      windowQuery.removeEventListener("change", darkModeChange);
    };
  }, [darkModeChange]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
