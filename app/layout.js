import "./globals.css"

export const metadata = { title: "Dareloop" }

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
