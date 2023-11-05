

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/db";
import { PrismaClient, User } from '@prisma/client';
import Link from 'next/link';
import { CANDIDATE_JOB_DETAILS } from '@/app/routes-config';
import { UserTopNavbar } from '../../dash/UserTopNavbar';
import { jwtUserPayloadType } from '@/app/utils/SetAuthTokenAsCookie';
import { CandidateJobDetailUI } from './CandidateJobDetailUI';

export default async function CandidateJobsAll({ params }: {params:{ jobId: string }}) {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }
    const jobId=params.jobId

    if(!jobId){
        return <div>Job not found</div>
    }

    console.log(jobId)
    const job = await prisma.job.findFirst({
        where: {
            id: jobId
        },
        include: {
            JobsApplied: {
                where: {
                    userId: user.id,
                    jobId
                }
            }
        }
    });

    console.log(job)
    if (!job) {
        return <div>Job not found</div>
    }

    return <CandidateJobDetailUI user={user} job={job} />
}





