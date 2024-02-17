"use client";

import { AVAILABLE_THEMES } from "@/lib/constants";
import { useGameStore } from "@/lib/stores/gameStore";
import { ReactNode, useEffect } from "react";

export const ThemeProvider = ({
  children,
  userThemeName,
}: {
  children: ReactNode;
  userThemeName?: string | null;
}) => {
  const { themeName, setThemeName } = useGameStore();

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (htmlElement) htmlElement.dataset.theme = `theme-${themeName}`;
  }, [themeName]);

  useEffect(() => {
    const localThemeName = localStorage.getItem("theme");
    if (
      userThemeName ||
      (localThemeName && AVAILABLE_THEMES.includes(localThemeName))
    ) {
      const savedTheme: string = userThemeName
        ? userThemeName
        : (localThemeName as string);
      setThemeName(savedTheme);

      const htmlElement = document.querySelector("html");

      if (htmlElement) htmlElement.dataset.theme = `theme-${savedTheme}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
