"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient();

export const Providers = ({
  children,
  userThemeName,
}: {
  children: React.ReactNode;
  userThemeName?: string | null;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider userThemeName={userThemeName}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
