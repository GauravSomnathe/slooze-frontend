"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded bg-gray-200 px-3 py-1 text-black dark:bg-gray-700 dark:text-white transition-colors hover:opacity-80 active:opacity-60"
      aria-label="Toggle theme"
      type="button"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
