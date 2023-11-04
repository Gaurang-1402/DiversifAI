

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';

export default function CandidateJobsAll() {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    return <div>
        Candidate Applied Jobs

        <BottomNavbar user={user} />
    </div>
}
