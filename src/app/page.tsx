import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ButtonPrimarySmall } from './components/Buttons'
import { AUTH_SCREEN } from './routes-config'

export default function Home() {
  return (
  <div className="h-screen w-full bg-[#8000FF] flex items-center justify-center">
    <Link href={AUTH_SCREEN}>
      <Image src="/logo.png" alt="Logo" width={150} height={150} />

    </Link>
  </div>
  )
}
