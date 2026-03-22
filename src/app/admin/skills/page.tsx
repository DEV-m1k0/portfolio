"use client";

import { CrudPage } from "@/components/admin/CrudPage";

export default function AdminSkills() {
  return (
    <CrudPage
      title="Навыки"
      apiPath="/api/skills"
      columns={[
        { key: "name", label: "Название" },
        { key: "category", label: "Категория" },
        { key: "sortOrder", label: "Порядок" },
      ]}
      fields={[
        { key: "name", label: "Название", required: true },
        {
          key: "category",
          label: "Категория",
          type: "select",
          options: [
            { label: "Backend", value: "backend" },
            { label: "Frontend", value: "frontend" },
            { label: "DevOps", value: "devops" },
            { label: "Data", value: "data" },
          ],
        },
        { key: "sortOrder", label: "Порядок", type: "number" },
        { key: "visible", label: "Видим", type: "checkbox" },
      ]}
      defaultValues={{ visible: true, sortOrder: 0, category: "backend" }}
    />
  );
}
