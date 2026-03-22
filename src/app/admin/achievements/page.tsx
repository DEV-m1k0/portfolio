"use client";

import { CrudPage } from "@/components/admin/CrudPage";

export default function AdminAchievements() {
  return (
    <CrudPage
      title="Достижения"
      apiPath="/api/achievements"
      columns={[
        { key: "titleRu", label: "Название" },
        { key: "sortOrder", label: "Порядок" },
      ]}
      fields={[
        { key: "titleRu", label: "Название (RU)", required: true },
        { key: "titleEn", label: "Title (EN)", required: true },
        {
          key: "items",
          label: "Пункты (JSON)",
          type: "textarea",
          placeholder: '[{"textRu": "...", "textEn": "..."}]',
        },
        { key: "sortOrder", label: "Порядок", type: "number" },
        { key: "visible", label: "Видим", type: "checkbox" },
      ]}
      defaultValues={{ visible: true, sortOrder: 0, items: "[]" }}
    />
  );
}
