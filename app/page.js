"use client"

import { useState } from "react"
import dares from "../dareloop_1000_dares.json"

export default function Home() {

  const [dare, setDare] = useState("Press SPIN to get a dare 🎲")
  const [spins, setSpins] = useState(20)

  function spinDare() {

    if (spins <= 0) {
      alert("No spins left. Share to unlock more 🔓")
      return
    }

    const random = dares[Math.floor(Math.random() * dares.length)]

    setDare(random.text)
    setSpins(spins - 1)
  }

  function unlockSpins() {

    const message = encodeURIComponent(
      `I dare you 😈\n\nPlay Dareloop:\n${window.location.href}`
    )

    window.open(`https://wa.me/?text=${message}`, "_blank")

    setSpins(spins + 10)
  }

  return (
    <main
      style={{
        background: "#0f172a",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >

      <h1 style={{fontSize:"42px",marginBottom:"10px"}}>
        DARELOOP
      </h1>

      <p style={{opacity:0.7}}>
        Spins left: {spins}
      </p>

      <div
        style={{
          marginTop:"30px",
          marginBottom:"30px",
          fontSize:"24px",
          maxWidth:"500px",
          textAlign:"center"
        }}
      >
        {dare}
      </div>

      <button
        onClick={spinDare}
        style={{
          padding:"15px 40px",
          fontSize:"20px",
          background:"#22c55e",
          border:"none",
          borderRadius:"10px",
          cursor:"pointer"
        }}
      >
        🎲 SPIN
      </button>

      {spins === 0 && (

        <button
          onClick={unlockSpins}
          style={{
            marginTop:"20px",
            padding:"12px 30px",
            fontSize:"16px",
            background:"#7c3aed",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          🔓 Unlock 10 more spins
        </button>

      )}

    </main>
  )
}
