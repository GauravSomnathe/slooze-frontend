"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // keep navbar visible even when no user is logged in so theme toggle is accessible

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-neutral-900 dark:text-white">
              Slooze
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {user && user.role === "manager" && (
              <Link
                href="/dashboard"
                className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}

            <Link
              href="/products"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Products
            </Link>

            {/* Right side items */}
            <div className="flex items-center gap-4 border-l border-neutral-200 dark:border-neutral-700 pl-4">
              <ThemeToggle />

              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {user.email}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                        {user.role.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn btn-primary text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
