

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { RedirectToAPageWithToast } from '../../components/RedirectToAPageWithToast';

export default function InterviewPrep() {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    if(user.isRecruiter){
        return <RedirectToAPageWithToast route='/' text='You are not allowed to access this page' />
    }

    return <div>
        Interview Prep

        <BottomNavbar user={user} />
    </div>
}
