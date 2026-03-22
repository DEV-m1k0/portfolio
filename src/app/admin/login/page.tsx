"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Неверный пароль");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="login-page">
      <div className="bg">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="grain" />
      </div>
      <form className="glass login-card" onSubmit={handleSubmit}>
        <h1>
          <Lock size={24} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
          Админ-панель
        </h1>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
            autoFocus
          />
        </div>

        {error && (
          <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: "0 0 12px" }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
