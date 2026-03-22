"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { easeCurve } from "@/animations/variants";
import { Navbar } from "./Navbar";
import { IntroOverlay } from "./IntroOverlay";
import { BackgroundBlobs } from "./BackgroundBlobs";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page" style={{ paddingTop: 80 }}>
      <IntroOverlay />
      <BackgroundBlobs />
      <Navbar />
      <motion.main
        className="wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={showIntro ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeCurve }}
      >
        {children}
      </motion.main>
    </div>
  );
}
