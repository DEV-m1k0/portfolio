"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { About, Skill } from "@/types";

interface Props {
  about: About;
  skills: Skill[];
}

export function Hero({ about, skills }: Props) {
  const { locale, t } = useI18n();

  const name = locale === "ru" ? about.nameRu : about.nameEn;
  const [firstName, lastName] = name.split(" ");
  const subtitle = locale === "ru" ? about.subtitleRu : about.subtitleEn;

  return (
    <motion.header
      className="glass hero"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <div className="hero-grid">
        <div className="hero-left">
          <div className="hero-top">
            {about.availableForWork && (
              <>
                <span className="pill">{t("hero.available")}</span>
                <span className="ping" />
              </>
            )}
          </div>
          <h1>
            {firstName} <span>{lastName}</span>
          </h1>
          <p className="subtitle">{subtitle}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#contact">
              {t("hero.hire")}
            </a>
            <a className="btn ghost" href="#top-projects">
              {t("hero.topProjects")}
            </a>
          </div>
          <div className="meta">
            <span>{t("hero.backendFocus")}</span>
            <span>{t("hero.businessProjects")}</span>
            <span>{t("hero.stack")}</span>
            <span>Telegram: {about.telegramHandle}</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass mini-card">
            <div className="mini-head">
              <span>{t("hero.inWork")}</span>
              <strong>3 {t("hero.products")}</strong>
            </div>
            <div className="pulse-bar" />
            <div className="mini-metrics">
              <div>
                <strong>6</strong>
                <span>{t("hero.keyProjects")}</span>
              </div>
              <div>
                <strong>Backend</strong>
                <span>{t("hero.specialization")}</span>
              </div>
              <div>
                <strong>API</strong>
                <span>{t("hero.integrations")}</span>
              </div>
            </div>
          </div>
          <div className="glass mini-card alt">
            <h3>{t("hero.skills")}</h3>
            <ul className="chips">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
