"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleNavigation = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/");
          }}
        >
          LC-HOME
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
          <li>
            <Link
              href="/dashboard"
              className="hover:text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("dashboard");
              }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/project"
              className="hover:text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("project");
              }}
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              href="/finances"
              className="hover:text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("finances");
              }}
            >
              Finanças
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="hover:text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("settings");
              }}
            >
              Configurações
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/*  <ThemeToggle />  */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300">
            <li>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/project" onClick={() => setMenuOpen(false)}>
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/finances" onClick={() => setMenuOpen(false)}>
                Finanças
              </Link>
            </li>
            <li>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>
                Configurações
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
