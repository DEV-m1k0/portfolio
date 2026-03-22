"use client";

import { CrudPage } from "@/components/admin/CrudPage";

export default function AdminExperience() {
  return (
    <CrudPage
      title="Опыт работы"
      apiPath="/api/experience"
      columns={[
        { key: "companyRu", label: "Компания" },
        { key: "positionRu", label: "Должность" },
        { key: "sortOrder", label: "Порядок" },
      ]}
      fields={[
        { key: "companyRu", label: "Компания (RU)", required: true },
        { key: "companyEn", label: "Company (EN)", required: true },
        { key: "positionRu", label: "Должность (RU)", required: true },
        { key: "positionEn", label: "Position (EN)", required: true },
        { key: "descRu", label: "Описание (RU)", type: "textarea" },
        { key: "descEn", label: "Description (EN)", type: "textarea" },
        { key: "location", label: "Локация" },
        { key: "startDate", label: "Начало", type: "date", required: true },
        { key: "endDate", label: "Конец (пусто = текущая)", type: "date" },
        { key: "sortOrder", label: "Порядок", type: "number" },
        { key: "visible", label: "Видим", type: "checkbox" },
      ]}
      defaultValues={{ visible: true, sortOrder: 0 }}
    />
  );
}
