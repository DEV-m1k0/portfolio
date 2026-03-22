"use client";

import { useEffect, useState, useCallback } from "react";
import { Check, X, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: number;
  authorName: string;
  authorRole: string | null;
  textRu: string;
  textEn: string | null;
  rating: number;
  status: string;
  createdAt: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");

  const fetchReviews = useCallback(async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success(status === "approved" ? "Одобрено" : "Отклонено");
      fetchReviews();
    } catch {
      toast.error("Ошибка");
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      toast.success("Удалено");
      fetchReviews();
    } catch {
      toast.error("Ошибка");
    }
  };

  const filtered = reviews.filter((r) => r.status === tab);

  return (
    <div>
      <div className="admin-header">
        <h1>Отзывы</h1>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["pending", "approved", "rejected"] as const).map((t) => (
          <button
            key={t}
            className={`admin-btn ${tab === t ? "primary" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "pending" && "На модерации"}
            {t === "approved" && "Одобренные"}
            {t === "rejected" && "Отклонённые"}
            {" "}
            ({reviews.filter((r) => r.status === t).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-2)" }}>Нет отзывов</p>
      ) : (
        filtered.map((review) => (
          <div key={review.id} className="review-mod-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <strong>{review.authorName}</strong>
                {review.authorRole && (
                  <span style={{ color: "var(--text-2)", marginLeft: 8 }}>
                    {review.authorRole}
                  </span>
                )}
              </div>
              <span className={`badge ${review.status}`}>{review.status}</span>
            </div>

            <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i <= review.rating ? "var(--accent)" : "none"}
                  stroke={i <= review.rating ? "var(--accent)" : "var(--text-2)"}
                />
              ))}
            </div>

            <p style={{ color: "var(--text-1)", margin: "0 0 8px" }}>{review.textRu}</p>

            <div style={{ fontSize: "0.8rem", color: "var(--text-2)", marginBottom: 8 }}>
              {new Date(review.createdAt).toLocaleDateString("ru-RU")}
            </div>

            <div className="mod-actions">
              {review.status === "pending" && (
                <>
                  <button
                    className="admin-btn"
                    onClick={() => updateStatus(review.id, "approved")}
                    style={{ color: "var(--accent-3)" }}
                  >
                    <Check size={14} style={{ marginRight: 4 }} />
                    Одобрить
                  </button>
                  <button
                    className="admin-btn"
                    onClick={() => updateStatus(review.id, "rejected")}
                    style={{ color: "#ef4444" }}
                  >
                    <X size={14} style={{ marginRight: 4 }} />
                    Отклонить
                  </button>
                </>
              )}
              <button className="admin-btn danger" onClick={() => deleteReview(review.id)}>
                <Trash2 size={14} style={{ marginRight: 4 }} />
                Удалить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
