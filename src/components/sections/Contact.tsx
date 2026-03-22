"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import Image from "next/image";
import type { About } from "@/types";

interface Props {
  about: About;
}

export function Contact({ about }: Props) {
  const { t } = useI18n();

  return (
    <motion.section
      id="contact"
      className="glass contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div>
        <h2>{t("contact.title")}</h2>
        <p>{t("contact.desc")}</p>
      </div>
      <div className="contact-actions">
        <a
          className="btn ghost telegram"
          href={about.telegramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
        >
          <span className="icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21.8 4.3c.3-1.2-1.1-2.2-2.2-1.6L3.2 9.6c-1.3.6-1.2 2.5.1 2.9l4.7 1.6 1.8 5.3c.4 1.3 2.2 1.5 2.9.3l2.5-4.2 4.6 3.4c1.1.8 2.6.1 2.9-1.2l2.9-12.4ZM8.6 13.7l9.6-6.1-7.7 7.5-.3 3.6-1.5-4.2Z"
                fill="currentColor"
              />
            </svg>
          </span>
          {about.telegramHandle}
        </a>
      </div>
      <div className="email-box">
        <span className="label">{t("contact.email")}</span>
        <a href={`mailto:${about.email}`}>{about.email}</a>
      </div>
      <div className="glass qr-card">
        <Image
          src="/assets/qrcode-tg.png"
          alt="Telegram QR"
          className="qr-image"
          width={180}
          height={180}
        />
        <span>{t("contact.scanTg")}</span>
      </div>
    </motion.section>
  );
}
