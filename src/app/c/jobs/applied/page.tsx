

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
        <div className="w-full px-4 mt-4">
            <div className="flex w-full justify-center">
                <p style={{
                    color: "var(--Black, #0D0D26)",
                    textAlign: "center",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "130%", /* 20.8px */
                    letterSpacing: "-0.16px",
                }}>
                    Applied 
                </p>
            </div>
            {/* APPLIED LIST */}
            <div className="flex flex-row justify-between shadow-lg mt-7 px-6 py-6 rounded-lg">
                <div className="flex flex-row items-center gap-4 ">
                    <p>logo</p>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">
                            Jr Executive
                        </p>
                        <p className="text-black opacity-50">
                        Google
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p>$87,000/yr</p>
                    <p className="text-black opacity-50 mt-2">
                        Los Angelos, CA
                    </p>
                    <button className="flex items-center justify-center gap-2 px-5 py-1 rounded-full bg-purple-700 w-36 mt-4">
                        <p className="text-white">Interview</p>
                    </button>
                </div>
            </div>
            {/* STATUS: IN REVIEW */}
            <div className="flex flex-row justify-between shadow-lg mt-7 px-6 py-6 rounded-lg">
                <div className="flex flex-row items-center gap-4 ">
                    <p>logo</p>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold">
                            Jr Executive
                        </p>
                        <p className="text-black opacity-50">
                        Google
                        </p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p>$87,000/yr</p>
                    <p className="text-black opacity-50 mt-2">
                        Los Angelos, CA
                    </p>
                    <div className="flex flex-row items-center justify-center mt-4 gap-2 px-3 py-1 rounded-full bg-gray-300 w-36">
                    <img src="/clock-icon.svg" alt="search" className="" />
                     <p className="text-gray-700 text-center">Pending</p>
                    </div>
                </div>
            </div>

        </div>
        <BottomNavbar user={user} />
    </div>
}
