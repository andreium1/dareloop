"use client"

import { useMemo, useState } from "react"

export default function SpinWheel({ dares, category, onResult, disabled }) {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const options = useMemo(() => {
    if (!dares || dares.length === 0) return []

    if (category === "mix") {
      return dares.slice(0, 8)
    }

    const filtered = dares.filter((item) => item.category === category)
    return filtered.length > 0 ? filtered.slice(0, 8) : dares.slice(0, 8)
  }, [dares, category])

  function handleSpin() {
    if (disabled || isSpinning || options.length === 0) return

    const randomIndex = Math.floor(Math.random() * options.length)
    const segmentAngle = 360 / options.length
    const extraTurns = 360 * 5
    const targetRotation =
      rotation + extraTurns + (360 - randomIndex * segmentAngle)

    setIsSpinning(true)
    setRotation(targetRotation)

    setTimeout(() => {
      setIsSpinning(false)
      onResult(options[randomIndex])
    }, 3200)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "28px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "280px",
          height: "280px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "22px solid #f8fafc",
            zIndex: 3,
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "8px solid rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? "transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
              : "none",
            boxShadow: "0 0 30px rgba(168,85,247,0.25)",
            background:
              "conic-gradient(#22c55e 0deg 45deg, #06b6d4 45deg 90deg, #7c3aed 90deg 135deg, #f59e0b 135deg 180deg, #ef4444 180deg 225deg, #14b8a6 225deg 270deg, #3b82f6 270deg 315deg, #a855f7 315deg 360deg)",
          }}
        >
          {options.map((item, index) => {
            const angle = (360 / options.length) * index
            return (
              <div
                key={`${item.text}-${index}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "120px",
                  transform: `rotate(${angle}deg) translateY(-112px) translateX(-50%)`,
                  transformOrigin: "center 112px",
                  textAlign: "center",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "700",
                  textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                  pointerEvents: "none",
                }}
              >
                {item.category.toUpperCase()}
              </div>
            )
          })}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#0f172a",
              border: "4px solid rgba(255,255,255,0.14)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "800",
              zIndex: 2,
            }}
          >
            GO
          </div>
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={disabled || isSpinning}
        style={{
          padding: "14px 28px",
          fontSize: "18px",
          fontWeight: "700",
          background:
            disabled || isSpinning
              ? "#475569"
              : "linear-gradient(90deg, #22c55e, #06b6d4)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: disabled || isSpinning ? "not-allowed" : "pointer",
          boxShadow: "0 0 18px rgba(34,197,94,0.35)",
        }}
      >
        {isSpinning ? "Spinning..." : "🎡 Spin the Wheel"}
      </button>
    </div>
  )
}
