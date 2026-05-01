import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const THEME_KEY = "excal-static-theme";

export const DocsLayout = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return (window.localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="docs-page" data-theme={theme}>
      <nav className="site-nav">
        <div className="site-nav-inner">
          <Link className="site-nav-brand" to="/about">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M5 22 Q4 14 8 9 Q14 3 22 6 Q26 9 24 16 Q21 23 13 23 Q8 23 5 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M10 14 L18 14 M14 10 L14 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Excalidraw
          </Link>
          <div className="site-nav-links">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
            <NavLink to="/features" className={({ isActive }) => (isActive ? "active" : "")}>
              Features
            </NavLink>
            <NavLink to="/showcase" className={({ isActive }) => (isActive ? "active" : "")}>
              Showcase
            </NavLink>
            <a href="/">Open the app →</a>
          </div>
          <div className="site-nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </nav>

      <main className="shell">
        <Outlet />
      </main>

      <footer className="site-footer">
        Built with Excalidraw ·{" "}
        <a href="https://github.com/excalidraw/excalidraw" target="_blank" rel="noreferrer">
          GitHub
        </a>{" "}
        · <a href="/">Open the app</a>
      </footer>
    </div>
  );
};
