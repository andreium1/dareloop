"use client"

import { useState } from "react"
import dares from "../dareloop_1000_dares.json"

export default function Home() {
  const [dare, setDare] = useState("Press SPIN to get a dare 🎲")
  const [spins, setSpins] = useState(20)
  const [category, setCategory] = useState("mix")

  function spinDare() {
    if (spins <= 0) {
      alert("No spins left. Share Dareloop to unlock more 🔓")
      return
    }

    let pool = dares

    if (category !== "mix") {
      pool = dares.filter((item) => item.category === category)
    }

    const random = pool[Math.floor(Math.random() * pool.length)]
    setDare(random.text)
    setSpins(spins - 1)
  }

  function unlockSpins() {
    const message = encodeURIComponent(
      `I dare you 😈\n\nPlay Dareloop here:\n${window.location.href}`
    )

    window.open(`https://wa.me/?text=${message}`, "_blank")
    setSpins(spins + 10)
  }

  function shareDare() {
    const text = encodeURIComponent(`${dare}\n\nPlay here: ${window.location.href}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
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
          maxWidth: "760px",
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
            fontSize: "54px",
            marginBottom: "10px",
            fontWeight: "800",
            letterSpacing: "1px",
          }}
        >
          DARELOOP
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            marginBottom: "24px",
          }}
        >
          Spin the dare. Challenge your friends. Go viral. 😈
        </p>

        <div style={{ marginBottom: "18px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              background: "#1e293b",
              color: "white",
              outline: "none",
            }}
          >
            <option value="mix">Mix</option>
            <option value="funny">Funny</option>
            <option value="party">Party</option>
            <option value="spicy">Spicy</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "12px",
            fontSize: "16px",
            color: "#cbd5e1",
            fontWeight: "600",
          }}
        >
          Spins left: {spins}
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
          {dare}
        </div>

        <button
          onClick={spinDare}
          style={{
            padding: "16px 42px",
            fontSize: "22px",
            fontWeight: "700",
            background: "linear-gradient(90deg, #22c55e, #06b6d4)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            marginBottom: "22px",
            boxShadow: "0 0 20px rgba(34,197,94,0.35)",
          }}
        >
          🎲 SPIN
        </button>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "22px",
          }}
        >
          <button
            onClick={shareDare}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              background: "#334155",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Share Dare
          </button>

          <button
            onClick={unlockSpins}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Unlock 10 Spins
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <a href="/daily-dare" style={{ color: "#93c5fd", textDecoration: "none", fontWeight: "600" }}>
            Daily Dare
          </a>

          <a href="/challenge" style={{ color: "#93c5fd", textDecoration: "none", fontWeight: "600" }}>
            Challenge Friend
          </a>
        </div>
      </div>
    </main>
  )
}
