"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Wrench, MessageSquare, Trophy } from "lucide-react";

interface Stats {
  projects: number;
  skills: number;
  pendingReviews: number;
  achievements: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/reviews").then((r) => r.json()),
      fetch("/api/achievements").then((r) => r.json()),
    ]).then(([projects, skills, reviews, achievements]) => {
      setStats({
        projects: projects.length,
        skills: skills.length,
        pendingReviews: reviews.filter((r: { status: string }) => r.status === "pending").length,
        achievements: achievements.length,
      });
    });
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <FolderKanban size={24} style={{ color: "var(--accent)", marginBottom: 8 }} />
          <div className="stat-value">{stats?.projects ?? "—"}</div>
          <div className="stat-label">Проектов</div>
        </div>
        <div className="admin-stat-card">
          <Wrench size={24} style={{ color: "var(--accent-2)", marginBottom: 8 }} />
          <div className="stat-value">{stats?.skills ?? "—"}</div>
          <div className="stat-label">Навыков</div>
        </div>
        <div className="admin-stat-card">
          <MessageSquare size={24} style={{ color: "var(--accent-3)", marginBottom: 8 }} />
          <div className="stat-value">{stats?.pendingReviews ?? "—"}</div>
          <div className="stat-label">Отзывов на модерации</div>
        </div>
        <div className="admin-stat-card">
          <Trophy size={24} style={{ color: "var(--accent)", marginBottom: 8 }} />
          <div className="stat-value">{stats?.achievements ?? "—"}</div>
          <div className="stat-label">Достижений</div>
        </div>
      </div>
    </div>
  );
}
