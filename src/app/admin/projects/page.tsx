"use client";

import { CrudPage } from "@/components/admin/CrudPage";

export default function AdminProjects() {
  return (
    <CrudPage
      title="Проекты"
      apiPath="/api/projects"
      columns={[
        { key: "titleRu", label: "Название" },
        { key: "statusRu", label: "Статус" },
        { key: "sortOrder", label: "Порядок" },
        {
          key: "visible",
          label: "Видимость",
          render: (v) => (v ? "Да" : "Нет"),
        },
      ]}
      fields={[
        { key: "titleRu", label: "Название (RU)", required: true },
        { key: "titleEn", label: "Title (EN)", required: true },
        { key: "descRu", label: "Описание (RU)", type: "textarea", required: true },
        { key: "descEn", label: "Description (EN)", type: "textarea", required: true },
        { key: "stack", label: "Стек (через запятую)", placeholder: "Python, Django, Docker" },
        { key: "githubUrl", label: "GitHub URL", required: true },
        { key: "liveUrl", label: "Live URL" },
        { key: "statusRu", label: "Статус (RU)", required: true, placeholder: "В процессе" },
        { key: "statusEn", label: "Status (EN)", required: true, placeholder: "In Progress" },
        { key: "sortOrder", label: "Порядок", type: "number" },
        { key: "visible", label: "Видим", type: "checkbox" },
      ]}
      defaultValues={{ visible: true, sortOrder: 0, statusRu: "В процессе", statusEn: "In Progress" }}
    />
  );
}
