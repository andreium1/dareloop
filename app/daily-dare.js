"use client"

import { useMemo, useState } from "react"
import dares from "../../dareloop_1000_dares.json"

export default function DailyDarePage() {
  const [completed, setCompleted] = useState(false)

  const dailyDare = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    let hash = 0

    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash)
    }

    const index = Math.abs(hash) % dares.length
    return dares[index]
  }, [])

  function completeDailyDare() {
    setCompleted(true)
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e1b4b, #111827)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "24px",
          padding: "40px 24px",
          boxShadow: "0 0 30px rgba(168,85,247,0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          DAILY DARE
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Come back every day for a new challenge 😈
        </p>

        <div
          style={{
            display: "inline-block",
            marginBottom: "20px",
            padding: "8px 16px",
            borderRadius: "999px",
            background: "rgba(34,197,94,0.15)",
            color: "#86efac",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Category: {dailyDare.category}
        </div>

        <div
          style={{
            minHeight: "160px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "30px",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "1.5",
            marginBottom: "28px",
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.04)",
          }}
        >
          {dailyDare.text}
        </div>

        {!completed ? (
          <button
            onClick={completeDailyDare}
            style={{
              padding: "16px 32px",
              fontSize: "18px",
              fontWeight: "700",
              background: "linear-gradient(90deg, #22c55e, #06b6d4)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(34,197,94,0.35)",
            }}
          >
            ✅ Complete Daily Dare
          </button>
        ) : (
          <div
            style={{
              marginTop: "10px",
              padding: "18px",
              borderRadius: "16px",
              background: "rgba(34,197,94,0.12)",
              color: "#bbf7d0",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            Daily Dare completed. Bonus unlocked: +10 spins 🎉
          </div>
        )}

        <div style={{ marginTop: "30px" }}>
          <a
            href="/"
            style={{
              color: "#93c5fd",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ← Back to Dareloop
          </a>
        </div>
      </div>
    </main>
  )
}
