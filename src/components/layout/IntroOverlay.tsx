"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeCurve } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";

export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setShow(false)}
        >
          <motion.div
            className="intro-card"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: easeCurve }}
          >
            <span className="intro-kicker">{t("intro.welcome")}</span>
            <h2>{t("intro.title")}</h2>
            <p>{t("intro.subtitle")}</p>
            <span className="intro-hint">{t("intro.hint")}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
