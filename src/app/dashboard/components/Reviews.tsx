"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/reviews", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    if (!content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating }),
      });
      if (res.ok) {
        const r = await res.json();
        setReviews((prev) => [r, ...prev]);
        setContent("");
        setRating(5);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-1">
          revisões
        </p>
        <h2 className="text-lg font-semibold">Registro de aprendizados</h2>
        <p className="text-xs text-slate-400 mt-1">
          Use revisões para registrar insights, dificuldades e resumos rápidos.
        </p>
      </header>

      <div className="hc-card p-4 space-y-3">
        <h3 className="text-sm font-medium">Criar nova revisão</h3>
        <textarea
          rows={3}
          className="hc-input text-xs resize-none"
          placeholder="O que você aprendeu hoje? Escreva um resumo rápido..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Clareza:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-lg ${
                  rating >= star ? "text-amber-400" : "text-slate-600"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="hc-btn-primary text-xs px-4 py-1.5 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar revisão"}
          </button>
        </div>
      </div>

      <div className="hc-card p-4">
        <h3 className="text-sm font-medium mb-3">Histórico</h3>
        {loading ? (
          <p className="text-xs text-slate-500">Carregando revisões...</p>
        ) : reviews.length === 0 ? (
          <p className="text-xs text-slate-500">
            Nenhuma revisão cadastrada ainda.
          </p>
        ) : (
          <ul className="space-y-2 text-xs">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-amber-300">
                    {"★".repeat(r.rating)}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-slate-100">{r.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
