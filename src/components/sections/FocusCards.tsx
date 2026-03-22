"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function FocusCards() {
  const { t } = useI18n();

  return (
    <section className="grid">
      <motion.div
        className="glass card focus"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        variants={fadeUp}
      >
        <h2>{t("focus.title")}</h2>
        <p>{t("focus.desc")}</p>
      </motion.div>

      <motion.div
        className="glass card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        variants={fadeUp}
      >
        <h2>{t("approach.title")}</h2>
        <p>{t("approach.desc")}</p>
      </motion.div>

      <motion.div
        className="glass card accent"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={fadeUp}
      >
        <h2>{t("results.title")}</h2>
        <p>{t("results.desc")}</p>
        <div className="stats">
          <div>
            <strong>{t("results.experience")}</strong>
            <span>{t("results.inBusiness")}</span>
          </div>
          <div>
            <strong>{t("results.backend")}</strong>
            <span>{t("results.scaling")}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
