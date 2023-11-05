import { ButtonPrimarySmall } from '@/app/components/Buttons'
import { LOGIN, REGISTER_AS_RECRUITER_SCREEN, REGISTER_AS_STUDENT_SCREEN } from '@/app/routes-config'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { BottomNavbar } from '../components/BottomNavbar'
import { getUser } from '../utils/GetUser'

export default function AuthStart() {
    const user = getUser()
    return (
        <div>
            <BottomNavbar user={user} />
            <div className='px-8 mt-14 flex flex-col max-w-xs'>
            <h1 className="text-[#8000FF] font-bold text-4xl">Diversif<span className="text-[#18C7D2]">AI</span></h1>
            <h2 className="text-gray-500 font-medium text-2xl mt-2">Register</h2>
            
                <div className="absolute inset-0 flex items-center justify-center">
                    <Link href={LOGIN}>
                        <button className="flex items-center justify-center gap-8 py-3 rounded-[12px] bg-white px-6 mt-4 border-4 border-[#8000FF]">
                            <p className="text-[#8000FF] font-bold text-lg">Sign in with Google</p>
                            <img src="/google.png" alt="search" width={30} height={30} className="" />
  
                        </button>
                    </Link>
                </div>
                {/* <Link href={REGISTER_AS_RECRUITER_SCREEN}>
                    <ButtonPrimarySmall>
                        Register as Recuiter
                    </ButtonPrimarySmall>
                </Link>
                <Link href={REGISTER_AS_STUDENT_SCREEN}>
                    <ButtonPrimarySmall>
                        Register as Student
                    </ButtonPrimarySmall>
                </Link> */}
            </div>
        </div>

    )
}
