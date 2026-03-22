"use client";

import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "#top-projects", label: t("nav.projects") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#achievements", label: t("nav.achievements") },
    { href: "#reviews", label: t("nav.reviews") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">AK</a>

      <div className="navbar-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <div className="navbar-controls">
        <button
          className="lang-toggle"
          onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
          aria-label="Toggle language"
        >
          {locale === "ru" ? "EN" : "RU"}
        </button>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </button>

        <button
          className="icon-btn mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--glass-bg)",
              borderBottom: "1px solid var(--border)",
              backdropFilter: "blur(16px)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ color: "var(--text-1)", fontSize: "0.95rem" }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
