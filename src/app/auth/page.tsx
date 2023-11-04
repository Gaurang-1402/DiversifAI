import { ButtonPrimarySmall } from '@/app/components/Buttons'
import { LOGIN, REGISTER_AS_RECRUITER_SCREEN, REGISTER_AS_STUDENT_SCREEN } from '@/app/routes-config'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function AuthStart() {
    return (
        <div className='px-20 my-20 flex flex-col gap-10 max-w-xs'>


            <Link href={LOGIN}>
                <ButtonPrimarySmall>
                    Login
                </ButtonPrimarySmall>
            </Link>


            <Link href={REGISTER_AS_RECRUITER_SCREEN}>
                <ButtonPrimarySmall>
                    Login as Recuiter
                </ButtonPrimarySmall>
            </Link>




            <Link href={REGISTER_AS_STUDENT_SCREEN}>
                <ButtonPrimarySmall>
                    Login as Student
                </ButtonPrimarySmall>
            </Link>
        </div>
    )
}
