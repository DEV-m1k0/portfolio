"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { Project } from "@/types";

interface Props {
  projects: Project[];
}

export function ProjectsGrid({ projects }: Props) {
  const { locale, t } = useI18n();

  const openRepo = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openRepo(url);
    }
  };

  return (
    <section id="top-projects" className="projects">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("section.topProjects")}
      </motion.h2>
      <div className="project-grid">
        {projects.map((project, index) => {
          const title = locale === "ru" ? project.titleRu : project.titleEn;
          const desc = locale === "ru" ? project.descRu : project.descEn;
          const status = locale === "ru" ? project.statusRu : project.statusEn;
          const stack = typeof project.stack === "string" ? JSON.parse(project.stack) : project.stack;

          return (
            <motion.article
              key={project.id}
              className="glass project project-clickable"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeUp}
              onClick={() => openRepo(project.githubUrl)}
              onKeyDown={(e) => handleKeyDown(e, project.githubUrl)}
              role="link"
              tabIndex={0}
              aria-label={`Open ${title} on GitHub`}
            >
              <div className="project-head">
                <h3>{title}</h3>
                <div className="project-links">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                  <span className="status-badge ghost">{status}</span>
                </div>
              </div>
              <p>{desc}</p>
              <div className="tags">
                {stack.map((tag: string) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
