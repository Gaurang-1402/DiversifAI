import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ButtonPrimarySmall } from './components/Buttons'
import { AUTH_SCREEN, DASH, WELCOME_SCREEN } from './routes-config'
import { BottomNavbar } from './components/BottomNavbar'
import { getUser } from './utils/GetUser'
import { redirect } from 'next/navigation'

export default function Home() {

  const user = getUser()

  if(user){
    redirect(DASH)
  }else{
    redirect(WELCOME_SCREEN)
  }
  return null
}
