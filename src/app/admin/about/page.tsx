"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

interface AboutData {
  nameRu: string;
  nameEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  telegramHandle: string;
  telegramUrl: string;
  email: string;
  avatarUrl: string;
  availableForWork: boolean;
}

export default function AdminAbout() {
  const [form, setForm] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Сохранено");
    } catch {
      toast.error("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p style={{ color: "var(--text-2)" }}>Загрузка...</p>;

  const update = (key: keyof AboutData, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>О себе</h1>
        <button className="admin-btn primary" onClick={handleSave} disabled={saving}>
          <Save size={16} style={{ marginRight: 4 }} />
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 800 }}>
        <div className="form-group">
          <label>Имя (RU)</label>
          <input value={form.nameRu} onChange={(e) => update("nameRu", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name (EN)</label>
          <input value={form.nameEn} onChange={(e) => update("nameEn", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Заголовок (RU)</label>
          <input value={form.titleRu} onChange={(e) => update("titleRu", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Title (EN)</label>
          <input value={form.titleEn} onChange={(e) => update("titleEn", e.target.value)} />
        </div>
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Подзаголовок (RU)</label>
          <textarea value={form.subtitleRu} onChange={(e) => update("subtitleRu", e.target.value)} />
        </div>
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Subtitle (EN)</label>
          <textarea value={form.subtitleEn} onChange={(e) => update("subtitleEn", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Telegram Handle</label>
          <input value={form.telegramHandle} onChange={(e) => update("telegramHandle", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Telegram URL</label>
          <input value={form.telegramUrl} onChange={(e) => update("telegramUrl", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Avatar URL</label>
          <input value={form.avatarUrl || ""} onChange={(e) => update("avatarUrl", e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.availableForWork}
              onChange={(e) => update("availableForWork", e.target.checked)}
              style={{ width: "auto" }}
            />
            Доступен для работы
          </label>
        </div>
      </div>
    </div>
  );
}
