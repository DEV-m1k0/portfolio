"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Trophy,
  Briefcase,
  GraduationCap,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Проекты", icon: FolderKanban },
  { href: "/admin/skills", label: "Навыки", icon: Wrench },
  { href: "/admin/achievements", label: "Достижения", icon: Trophy },
  { href: "/admin/experience", label: "Опыт работы", icon: Briefcase },
  { href: "/admin/education", label: "Образование", icon: GraduationCap },
  { href: "/admin/about", label: "О себе", icon: User },
  { href: "/admin/reviews", label: "Отзывы", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            <Icon size={18} />
            {link.label}
          </Link>
        );
      })}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 12px",
          borderRadius: 10,
          background: "none",
          border: "none",
          color: "var(--text-2)",
          cursor: "pointer",
          fontSize: "0.9rem",
        }}
      >
        <LogOut size={18} />
        Выйти
      </button>
    </aside>
  );
}
