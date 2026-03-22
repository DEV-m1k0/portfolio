"use client";

import { CrudPage } from "@/components/admin/CrudPage";

export default function AdminEducation() {
  return (
    <CrudPage
      title="Образование"
      apiPath="/api/education"
      columns={[
        { key: "institutionRu", label: "Учреждение" },
        { key: "degreeRu", label: "Степень" },
        { key: "sortOrder", label: "Порядок" },
      ]}
      fields={[
        { key: "institutionRu", label: "Учреждение (RU)", required: true },
        { key: "institutionEn", label: "Institution (EN)", required: true },
        { key: "degreeRu", label: "Степень (RU)", required: true },
        { key: "degreeEn", label: "Degree (EN)", required: true },
        { key: "fieldRu", label: "Направление (RU)" },
        { key: "fieldEn", label: "Field (EN)" },
        { key: "startDate", label: "Начало", type: "date", required: true },
        { key: "endDate", label: "Конец", type: "date" },
        { key: "sortOrder", label: "Порядок", type: "number" },
        { key: "visible", label: "Видим", type: "checkbox" },
      ]}
      defaultValues={{ visible: true, sortOrder: 0 }}
    />
  );
}
