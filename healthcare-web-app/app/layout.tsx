import React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, DM_Sans } from "next/font/google"

import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "RutuChakra - PCOD Risk Prediction & Management",
  description:
    "A professional healthcare platform for PCOD risk prediction and lifestyle management. Understand your risk, get personalized recommendations.",
}

export const viewport: Viewport = {
  themeColor: "#d4637a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
