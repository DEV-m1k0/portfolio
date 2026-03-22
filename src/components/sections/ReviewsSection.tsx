"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Star, Send } from "lucide-react";
import type { Review } from "@/types";

interface Props {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          fill={i <= rating ? "var(--accent)" : "none"}
          stroke={i <= rating ? "var(--accent)" : "var(--text-2)"}
          style={{ opacity: i <= rating ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}

function ReviewForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({ authorName: "", authorRole: "", textRu: "", rating: 5 });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName.trim() || !form.textRu.trim()) return;

    setSending(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ authorName: "", authorRole: "", textRu: "", rating: 5 });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="glass review-form">
        <p style={{ color: "var(--accent-3)", textAlign: "center", margin: 0 }}>
          {t("review.sent")}
        </p>
      </div>
    );
  }

  return (
    <form className="glass review-form" onSubmit={handleSubmit}>
      <h3>{t("review.leaveReview")}</h3>

      <div className="form-group">
        <label>{t("review.name")} *</label>
        <input
          type="text"
          value={form.authorName}
          onChange={(e) => setForm({ ...form, authorName: e.target.value })}
          required
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label>{t("review.role")}</label>
        <input
          type="text"
          value={form.authorRole}
          onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label>{t("review.rating")}</label>
        <div className="star-input">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              className={i <= form.rating ? "active" : ""}
              onClick={() => setForm({ ...form, rating: i })}
            >
              <Star size={24} fill={i <= form.rating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>{t("review.text")} *</label>
        <textarea
          value={form.textRu}
          onChange={(e) => setForm({ ...form, textRu: e.target.value })}
          required
          maxLength={1000}
        />
      </div>

      <button type="submit" className="btn primary" disabled={sending}>
        <Send size={16} />
        {t("review.submit")}
      </button>
    </form>
  );
}

export function ReviewsSection({ reviews }: Props) {
  const { locale, t } = useI18n();

  return (
    <section id="reviews" className="reviews-section">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("section.reviews")}
      </motion.h2>

      {reviews.length > 0 ? (
        <div className="reviews-grid">
          {reviews.map((review, index) => {
            const text = locale === "en" && review.textEn ? review.textEn : review.textRu;
            const initials = review.authorName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <motion.div
                key={review.id}
                className="glass review-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={fadeUp}
              >
                <StarRating rating={review.rating} />
                <p className="review-text">&ldquo;{text}&rdquo;</p>
                <div className="review-author">
                  <div className="review-avatar">{initials}</div>
                  <div>
                    <div className="review-name">{review.authorName}</div>
                    {review.authorRole && (
                      <div className="review-role">{review.authorRole}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ color: "var(--text-2)" }}
        >
          {t("review.noReviews")}
        </motion.p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <ReviewForm />
      </motion.div>
    </section>
  );
}
