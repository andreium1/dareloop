"use client"

import { useState } from "react"
import dares from "../../dareloop_1000_dares.json"

export default function ChallengePage() {

  const random = dares[Math.floor(Math.random() * dares.length)]

  const [dare] = useState(random.text)

  function shareChallenge() {

    const message = encodeURIComponent(
      `I dare you 😈\n\n${dare}\n\nPlay Dareloop:\n${window.location.origin}`
    )

    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  function copyLink() {

    navigator.clipboard.writeText(window.location.origin)

    alert("Link copied!")
  }

  return (

    <main style={{
      background:"#0f172a",
      color:"white",
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      fontFamily:"Arial"
    }}>

      <div style={{
        maxWidth:"600px",
        textAlign:"center"
      }}>

        <h1 style={{fontSize:"42px"}}>
          Challenge a Friend
        </h1>

        <p style={{opacity:0.7}}>
          Send this dare to someone 😈
        </p>

        <div style={{
          marginTop:"30px",
          marginBottom:"30px",
          fontSize:"22px"
        }}>
          {dare}
        </div>

        <button
          onClick={shareChallenge}
          style={{
            padding:"14px 28px",
            background:"#22c55e",
            border:"none",
            borderRadius:"10px",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          Challenge on WhatsApp
        </button>

        <br/><br/>

        <button
          onClick={copyLink}
          style={{
            padding:"10px 20px",
            background:"#7c3aed",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Copy Link
        </button>

        <div style={{marginTop:"20px"}}>
          <a href="/">← Back</a>
        </div>

      </div>

    </main>
  )
}
