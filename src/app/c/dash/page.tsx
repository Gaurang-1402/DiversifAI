

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/db";
import { PrismaClient, User } from '@prisma/client';
import { UserTopNavbar } from './UserTopNavbar';
import Link from 'next/link';
import { CANDIDATE_JOB_DETAILS } from '@/app/routes-config';

export default async function CandidateJobsAll() {

    // const jobsss=(new PrismaClient()).job.findMany();

    // (await jobsss).forEach(job => {



    // })

    // const ressss=(new PrismaClient).job.updateMany({
    //     data: {
    //         categories: ["Full-Time", "Caretaker"],
    //         company: "Mount Sinai Hospital",
    //         companyLogo: "https://mms.businesswire.com/media/20200306005051/en/778057/4/mshs_logo_horizontal.jpg?download=1"

    //     },
    //     where: {

    //     }
    // })
    // console.log(await ressss)


    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }


    const jobs = await prisma.job.findMany({
        include: {
            JobsApplied: {
                where: {
                    userId: user.id
                },
            }
        }
    });
    console.log(jobs)

    return <div className="flex flex-col" >
        <div className="mx-4 mt-4 mb-20" >
            <UserTopNavbar user={user} />

            <div className="mt-6 w-full flex items-center justify-between">
                <div className="flex items-center border-2 rounded-lg w-3/4 flex-grow overflow-hidden">
                    <img src="/magnifying-glass.svg" alt="search" className="px-2" />
                    <input type="text" placeholder="Search" className="w-full py-2 px-4" />
                </div>
                <button className="border-2 rounded-lg py-2 px-2 ml-4">
                    <img src="/filter-icon.svg" alt="filter" />
                </button>
            </div>

            {
                jobs.map((job) => {
                    const isApplied = job.JobsApplied.length > 0
                    return (
                        (

                            <Link href={CANDIDATE_JOB_DETAILS(job.id)} className="h-42 flex flex-col bg-[#8000FF] gap-6  px-6 rounded-3xl mt-10 py-4 my-4" key={job.id}>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row items-center gap-4">
                                        <div>
                                            <img className='rounded-full w-10' src={job.companyLogo} alt="avatar" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p style={{
                                                color: "var(--Pure-White, #FFF)",
                                                fontSize: "20px",
                                                fontStyle: "normal",
                                                fontWeight: 600,
                                                lineHeight: "130%", /* 20.8px */
                                                letterSpacing: "-0.16px"
                                            }}>
                                                {job.title}
                                            </p>
                                            <p className="text-white">
                                                {job.company} {/* Assuming there is a company field in job */}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="">

                                        {isApplied ?<img className='w-10' src="https://img.icons8.com/ios/100/ffffff/instagram-check-mark.png" alt="instagram-check-mark"/>
                                        :<img className='w-10'  src="https://img.icons8.com/ios/100/ffffff/hourglass.png" alt="hourglass"/>}

                                    </button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    {job.categories.map(category => (
                                        <div className="inline-flex p-1 px-4 items-start rounded-full bg-[#37007F]" key={category}>
                                            <p className="text-white">
                                                {category}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-white">
                                        {job.salary}
                                    </p>
                                    <p className="text-white">
                                        {job.location}
                                    </p>
                                </div>
                            </Link>
                        )
                    )
                })
            }

        </div>
        <BottomNavbar user={user} />
    </div>
}




