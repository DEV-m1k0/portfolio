"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Calendar } from "lucide-react";
import type { Experience } from "@/types";

interface Props {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: Props) {
  const { locale, t } = useI18n();

  if (experiences.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="experience" className="timeline-section">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("section.experience")}
      </motion.h2>
      <div className="timeline-list">
        {experiences.map((exp, index) => {
          const company = locale === "ru" ? exp.companyRu : exp.companyEn;
          const position = locale === "ru" ? exp.positionRu : exp.positionEn;
          const desc = locale === "ru" ? exp.descRu : exp.descEn;
          const isCurrent = !exp.endDate;

          return (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeUp}
            >
              <span className={`timeline-dot ${isCurrent ? "current" : ""}`} />
              <div className="glass timeline-card">
                <h3>{company}</h3>
                <p className="timeline-role">{position}</p>
                <p className="timeline-period">
                  <Calendar size={14} />
                  {formatDate(exp.startDate)} —{" "}
                  {exp.endDate ? formatDate(exp.endDate) : t("experience.present")}
                  {exp.location && ` · ${exp.location}`}
                </p>
                {desc && <p className="timeline-desc">{desc}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
