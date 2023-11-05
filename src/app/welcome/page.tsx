import { ButtonPrimarySmall } from '@/app/components/Buttons'
import { AUTH_SCREEN } from '@/app/routes-config'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { BottomNavbar } from '../components/BottomNavbar'
import { getUser } from '../utils/GetUser'

export default function Welcome() {
  return (
    <Link href={AUTH_SCREEN}>
      <div className='w-full h-screen bg-purple-600 flex justify-center items-center'>
        <Image src="/effect.png" objectFit="cover" layout="fill" alt='effect' className="opacity-100" />
        <div className="flex flex-col items-center">
          <img src="/diversifai-logo.png" alt="apply" className="absolute top-[33%] w-36 h-36" />

          <h1 className="absolute top-[50%] text-white font-bold text-4xl">Diversif<span className="text-[#98F9FF]">AI</span></h1>
          <div className="absolute border-purple-800 border-t-2 bottom-0 py-3 bg-purple-50 w-full text-center text-black">
            <div className=''>Tap to continue</div>
          </div>
        </div>

        <h1></h1>
      </div>
    </Link>

  )
}
