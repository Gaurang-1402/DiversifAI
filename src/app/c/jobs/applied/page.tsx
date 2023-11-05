

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/db";
import Link from 'next/link';
import { UserTopNavbar } from '../../dash/UserTopNavbar';

export default async function CandidateJobsAll() {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    // Replace 'user.id' with the actual property that contains the logged-in user's ID.
    const jobsApplied = await prisma.jobsApplied.findMany({
        where: {
            userId: user.id,
        },
        include: {
            job: true,  // Include the job details
        },
    });

    return <div>

        <div className="w-full px-4 mt-4">
            <UserTopNavbar user={user} />

            <div className="flex w-full justify-center">
                <div className='w-full'>
                    <p className='text-xl mt-4 font-bold'>
                        Applied Job Applications
                    </p>
                </div>

            </div>
            {
                jobsApplied.map((jobApplied) => (
                    <div key={jobApplied.jobId} className="flex flex-row justify-between shadow-lg mt-7 px-6 py-6 rounded-lg">
                        <div className="flex flex-row items-center gap-4">
                            {/* Replace with actual logo if available */}
                            <img className='rounded-full w-10' src={jobApplied.job.companyLogo} alt="avatar" />
                            <div className="flex flex-col gap-2">
                                {/* Use job title from the job data */}
                                <p className="font-bold">
                                    {jobApplied.job.title}
                                </p>
                                {/* Use company name from the job data */}
                                <p className="text-black opacity-50">
                                    {jobApplied.job.company}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {/* Use salary from the job data, ensure it's formatted correctly */}
                            <p>{jobApplied.job.salary}/yr</p>
                            {/* Use location from the job data */}
                            <p className="text-black opacity-50 mt-2">
                                {jobApplied.job.location}
                            </p>
                            <Link href={`/c/interview-prep/${jobApplied.jobId}`}>
                                <button className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-purple-700 w-36 mt-4">
                                    <p className="text-white">Interview</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            }


        </div>
        <BottomNavbar user={user} />
    </div>
}
