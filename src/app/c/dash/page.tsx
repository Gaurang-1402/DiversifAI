

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/db";

export default async function CandidateJobsAll() {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    // console.log(prisma)

    const jobs = await prisma.job.findMany();

    return <div className="flex flex-col" >
        <div className="mx-4 mt-4" >
            <div className="flex flex-row justify-between items-center   ">
                <div className="flex flex-col">
                    <p style={{
                        color: "var(--grey-60, #95969D)",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "150%", /* 21px */
                        letterSpacing: "-0.14px"
                    }}>
                        Welcome back!
                    </p>
                    <p style={{
                        color: "var(--Black, #0D0D26)",
                        fontFamily: "Poppins",
                        fontSize: "22px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "120%", /* 26.4px */
                        letterSpacing: "-0.33px"
                    }}>
                        Keshia Taylor 👋
                    </p>
                </div>
                <div>
                    <p>Avatar</p>
                </div>
            </div>
            <div className="mt-6 w-full flex items-center">
                <div className="flex items-center border-2 rounded-lg w-3/4 overflow-hidden">
                    <img src="/magnifying-glass.svg" alt="search" className="px-2" />
                    <input type="text" placeholder="Search" className="w-full py-2 px-4" />
                </div>
                <button className="border-2 rounded-lg py-2 px-2 ml-4">
                    <img src="/filter-icon.svg" alt="filter" />
                </button>
            </div>

            {
                jobs.map((job) => (
                    <div className="h-42 flex flex-col bg-[#8000FF] gap-6  px-6 rounded-3xl mt-10 py-4 my-4" key={job.id}>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center gap-4">
                                <div>
                                    Avatar
                                </div>
                                <div className="flex flex-col">
                                    <p style={{
                                        color: "var(--Pure-White, #FFF)",
                                        fontFamily: "Poppins",
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
                                <img src="/apply-icon.svg" alt="apply" />
                            </button>
                        </div>
                        <div className="flex flex-row justify-between">
                            {/* Assuming categories like 'Administration', 'Full-Time', 'Junior' are dynamic, replace them accordingly */}
                            {/* Example: */}
                            {/* job.categories.map(category => (
                    <div className="inline-flex p-1 px-4 items-start rounded-full bg-[#37007F]" key={category}>
                        <p className="text-white">
                            {category}
                        </p>
                    </div>
                )) */}
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-white">
                                {job.salary}
                            </p>
                            <p className="text-white">
                                {job.location}
                            </p>
                        </div>
                    </div>
                ))
            }

        </div>
        <BottomNavbar user={user} />
    </div>
}
