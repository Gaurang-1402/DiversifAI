import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainerWrap } from './utils/ToastContainerWrap'
import { useEffect, useState } from 'react'
import { Interceptor } from './Interceptor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DiversifAI',
  description: "We're meritocratic, not biased.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <>

    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainerWrap />
      </body>
      <Interceptor />

    </html>
  </>
}
