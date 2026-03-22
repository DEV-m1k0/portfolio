"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "checkbox" | "select";
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface CrudPageProps {
  title: string;
  apiPath: string;
  columns: Column[];
  fields: Field[];
  defaultValues?: Record<string, unknown>;
}

export function CrudPage({ title, apiPath, columns, fields, defaultValues = {} }: CrudPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const res = await fetch(apiPath);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [apiPath]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openNew = () => {
    setEditing({ ...defaultValues });
    setIsNew(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editing) return;

    try {
      const url = isNew ? apiPath : `${apiPath}/${editing.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(isNew ? "Создано" : "Обновлено");
      setEditing(null);
      fetchItems();
    } catch {
      toast.error("Ошибка сохранения");
    }
  };

  const handleDelete = async (id: unknown) => {
    if (!confirm("Удалить?")) return;

    try {
      const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Удалено");
      fetchItems();
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const updateField = (key: string, value: unknown) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  return (
    <div>
      <div className="admin-header">
        <h1>{title}</h1>
        <button className="admin-btn primary" onClick={openNew}>
          <Plus size={16} style={{ marginRight: 4 }} />
          Добавить
        </button>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-2)" }}>Загрузка...</p>
      ) : items.length === 0 ? (
        <p style={{ color: "var(--text-2)" }}>Нет записей</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item.id)}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key] ?? "")}
                  </td>
                ))}
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn" onClick={() => openEdit(item)}>
                      <Pencil size={14} />
                    </button>
                    <button
                      className="admin-btn danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{isNew ? "Создать" : "Редактировать"}</h2>

            {fields.map((field) => (
              <div className="form-group" key={field.key}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={String(editing[field.key] ?? "")}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!editing[field.key]}
                    onChange={(e) => updateField(field.key, e.target.checked)}
                    style={{ width: "auto" }}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(editing[field.key] ?? "")}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--glass)",
                      color: "var(--text-0)",
                      fontFamily: "inherit",
                    }}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={String(editing[field.key] ?? "")}
                    onChange={(e) =>
                      updateField(
                        field.key,
                        field.type === "number" ? Number(e.target.value) : e.target.value
                      )
                    }
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="modal-footer">
              <button className="admin-btn" onClick={() => setEditing(null)}>
                Отмена
              </button>
              <button className="admin-btn primary" onClick={handleSave}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
