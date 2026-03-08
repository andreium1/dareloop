"use client"

import { useState } from "react"
import dares from "../dareloop_1000_dares.json"

export default function Home() {

const [dare, setDare] = useState("Press SPIN to get a dare 😈")

function spinDare() {
  const random = dares[Math.floor(Math.random()*dares.length)]
  setDare(random.text)
}

return (
  <main style={{
    background:"#0f172a",
    color:"white",
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"Arial"
  }}>

<h1 style={{fontSize:"40px"}}>DARELOOP</h1>

<p style={{margin:"20px",fontSize:"20px",textAlign:"center"}}>
{dare}
</p>

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

</main>
)
}
