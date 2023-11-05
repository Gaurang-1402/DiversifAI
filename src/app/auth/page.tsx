import { ButtonPrimarySmall } from '@/app/components/Buttons'
import { LOGIN, REGISTER_AS_RECRUITER_SCREEN, REGISTER_AS_STUDENT_SCREEN } from '@/app/routes-config'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { BottomNavbar } from '../components/BottomNavbar'
import { getUser } from '../utils/GetUser'
import { GoogleIcon } from './GoogleIcon'

export default function AuthStart() {
    const user = getUser()
    return (
        <div>
            <BottomNavbar user={user} />
            <div className='px-8 mt-14 flex flex-col max-w-xs bg-purple-600 form-container'>

                <div className='flex flex-col gap-1 justify-center items-center mb-6'>
                    <img src="/diversifai-logo.png" alt="apply" className="h-36" />
                    <h1 className=" text-white font-bold -mt-7 text-4xl">Diversif<span className="text-[#98F9FF]">AI</span></h1>
                </div>


                <div className="flex flex-col gap-4 my-2">
                    <Link href={LOGIN}>
                        <div
                            className="bg-white h-fit text-black hover:text-white hover:bg-gray-600 border-purple-900 border btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"
                        >
                            <span>
                                <GoogleIcon />
                            </span>{" "}
                            <span>Continue with Google</span>
                        </div>
                    </Link>
                </div>

                <div className="flex flex-col gap-4 my-2">
                    <Link href={REGISTER_AS_STUDENT_SCREEN}>
                        <div
                            className="bg-white h-fit text-black hover:text-white hover:bg-gray-600 border-purple-900 border btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"
                        >
                            <span>
                                <img className='w-6' src="https://img.icons8.com/ios-filled/100/nurse-female.png" alt="nurse-female" />
                            </span>{" "}
                            <span> Register as Student</span>
                        </div>
                    </Link>
                </div>

                <div className="flex flex-col gap-4 my-2">
                    <Link href={REGISTER_AS_RECRUITER_SCREEN}>
                        <div
                            className="bg-white h-fit text-black hover:text-white hover:bg-gray-600 border-purple-900 border btn rounded-md shadow-xl py-3 flex justify-center items-center gap-2"
                        >
                            <span>
                                <img className='w-6' src="https://img.icons8.com/fluency/96/hospital.png" alt="hospital" />
                            </span>{" "}
                            <span> Register as Recuiter</span>
                        </div>
                    </Link>
                </div>

            </div>
        </div>

    )
}


