import "@/app/globals.css"
import { Outfit, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

// Outfit for body text - clean, modern sans-serif
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

// Space Grotesk for headings and special elements - slightly techy feel
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>FastIQ</title>
      </head>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableSystemTheme>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
