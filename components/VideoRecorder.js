"use client"

import { useRef, useState } from "react"

export default function VideoRecorder({ dare }) {
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const [recording, setRecording] = useState(false)
  const [videoURL, setVideoURL] = useState(null)

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      videoRef.current.srcObject = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        setVideoURL(url)

        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setRecording(true)

    } catch (err) {
      alert("Camera access denied.")
    }
  }

  function stopRecording() {
    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  function downloadVideo() {
    const a = document.createElement("a")
    a.href = videoURL
    a.download = "dareloop-proof.webm"
    a.click()
  }

  function shareLink() {
    const text = encodeURIComponent(
      `I got this Dareloop challenge 😈\n\n${dare}\n\nTry it here:\n${window.location.origin}`
    )
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  return (
    <div style={{marginTop:"30px"}}>

      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          width:"100%",
          maxWidth:"420px",
          borderRadius:"12px",
          marginBottom:"12px"
        }}
      />

      {!recording && !videoURL && (
        <button onClick={startRecording}>
          🎬 Record Dare
        </button>
      )}

      {recording && (
        <button onClick={stopRecording}>
          ⏹ Stop Recording
        </button>
      )}

      {videoURL && (
        <div style={{marginTop:"10px"}}>
          <button onClick={downloadVideo}>⬇ Download Video</button>
          <button onClick={shareLink} style={{marginLeft:"10px"}}>
            Share Dare
          </button>
        </div>
      )}

    </div>
  )
}
