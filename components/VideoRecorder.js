"use client"

import { useRef, useState } from "react"

export default function VideoRecorder({ dare }) {
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const [recording, setRecording] = useState(false)
  const [videoURL, setVideoURL] = useState(null)
  const [hasCamera, setHasCamera] = useState(false)

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setHasCamera(true)
      videoRef.current.srcObject = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        setVideoURL(url)

        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (error) {
      alert("Camera or microphone access was denied.")
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  function downloadVideo() {
    if (!videoURL) return

    const link = document.createElement("a")
    link.href = videoURL
    link.download = "dareloop-proof.webm"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function getShareText() {
    return `I got this Dareloop challenge 😈\n\n${dare}\n\nTry it here:\n${window.location.origin}`
  }

  function shareNative() {
    const text = getShareText()

    if (navigator.share) {
      navigator.share({
        title: "Dareloop",
        text,
        url: window.location.origin,
      })
    } else {
      alert("Native share is not available on this device.")
    }
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(getShareText())
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  function shareTelegram() {
    const text = encodeURIComponent(getShareText())
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${text}`,
      "_blank"
    )
  }

  function shareTwitter() {
    const text = encodeURIComponent(`I got this Dareloop challenge 😈\n\n${dare}`)
    const url = encodeURIComponent(window.location.origin)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  function shareFacebook() {
    const url = encodeURIComponent(window.location.origin)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.origin)
    alert("Link copied ✅")
  }

  function copyCaption() {
    navigator.clipboard.writeText(getShareText())
    alert("Caption copied ✅")
  }

  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {hasCamera && !videoURL && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "16px",
            marginBottom: "14px",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
      )}

      {videoURL && (
        <video
          src={videoURL}
          controls
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "16px",
            marginBottom: "14px",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
      )}

      {!recording && !videoURL && (
        <button
          onClick={startRecording}
          style={{
            padding: "12px 22px",
            fontSize: "16px",
            background: "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(14,165,233,0.35)",
          }}
        >
          🎬 Record Dare
        </button>
      )}

      {recording && (
        <button
          onClick={stopRecording}
          style={{
            padding: "12px 22px",
            fontSize: "16px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(239,68,68,0.35)",
          }}
        >
          ⏹ Stop Recording
        </button>
      )}

      {videoURL && (
        <>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={downloadVideo}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              ⬇ Download Video
            </button>

            <button
              onClick={shareNative}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              📲 Share
            </button>

            <button
              onClick={shareWhatsApp}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#25D366",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              WhatsApp
            </button>

            <button
              onClick={shareTelegram}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#229ED9",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Telegram
            </button>

            <button
              onClick={shareTwitter}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#1D9BF0",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              X / Twitter
            </button>

            <button
              onClick={shareFacebook}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#1877F2",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Facebook
            </button>

            <button
              onClick={copyCaption}
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: "#475569",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Copy Caption
            </button>

            <button
              onClick={copyLink}
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
              Copy Link
            </button>
          </div>

          <p
            style={{
              marginTop: "14px",
              fontSize: "14px",
              color: "#cbd5e1",
              textAlign: "center",
              maxWidth: "520px",
              lineHeight: "1.5",
            }}
          >
            Download your video and post it on TikTok or Instagram Reels.
            Direct video posting to those apps is not reliably supported from a website.
          </p>
        </>
      )}
    </div>
  )
}
