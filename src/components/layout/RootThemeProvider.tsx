"use client";

import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme";

export default function RootThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider {...{ theme }}>{children}</ThemeProvider>;
}
