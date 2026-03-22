"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { GraduationCap } from "lucide-react";
import type { Education } from "@/types";

interface Props {
  education: Education[];
}

export function EducationTimeline({ education }: Props) {
  const { locale, t } = useI18n();

  if (education.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="education" className="timeline-section">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("section.education")}
      </motion.h2>
      <div className="timeline-list">
        {education.map((edu, index) => {
          const institution = locale === "ru" ? edu.institutionRu : edu.institutionEn;
          const degree = locale === "ru" ? edu.degreeRu : edu.degreeEn;
          const field = locale === "ru" ? edu.fieldRu : edu.fieldEn;

          return (
            <motion.div
              key={edu.id}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeUp}
            >
              <span className={`timeline-dot ${!edu.endDate ? "current" : ""}`} />
              <div className="glass timeline-card">
                <h3>{institution}</h3>
                <p className="timeline-role">
                  <GraduationCap size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                  {degree}{field ? ` — ${field}` : ""}
                </p>
                <p className="timeline-period">
                  {formatDate(edu.startDate)} —{" "}
                  {edu.endDate ? formatDate(edu.endDate) : t("experience.present")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
