"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Achievement } from "@/types";

interface Props {
  achievements: Achievement[];
}

export function AchievementsGrid({ achievements }: Props) {
  const { locale, t } = useI18n();

  return (
    <section id="achievements" className="achievements">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("section.achievements")}
      </motion.h2>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => {
          const title = locale === "ru" ? achievement.titleRu : achievement.titleEn;
          const items: { textRu: string; textEn: string }[] =
            typeof achievement.items === "string"
              ? JSON.parse(achievement.items)
              : achievement.items;

          return (
            <motion.article
              key={achievement.id}
              className="glass achievement-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeUp}
            >
              <h3>{title}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {locale === "ru" ? item.textRu : item.textEn}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
