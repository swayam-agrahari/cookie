"use client";
import { ThemeProvider } from "./ThemeContext";

export default function ThemeProviderWrapper({ children }: any) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
