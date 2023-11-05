'use client'

import { BottomNavbar } from "@/app/components/BottomNavbar";
import { jwtUserPayloadType } from "@/app/utils/SetAuthTokenAsCookie";
import { UserTopNavbar } from "../../dash/UserTopNavbar";
import { useState } from "react";
import { ButtonPrimary } from "@/app/components/Buttons";
import { APPLY_JOB_API, CANDIDATE_APPLIED_JOBS } from "@/app/routes-config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export const CandidateJobDetailUI = ({ user, job }: { user: jwtUserPayloadType, job: { JobsApplied: { id: string; jobId: string; userId: string; appliedAt: Date; }[]; } & { id: string; title: string; description: string; location: string; company: string; companyLogo: string; salary: string; postedAt: Date; postedById: string; categories: string[]; } }) => {

    const [isApplying, setIsApplying] = useState(false)
    const router=useRouter()

    const handleApply = async () => {
        try {
            setIsApplying(true)

            const response = await fetch(APPLY_JOB_API(job.id), {
                method: 'POST'
            })
            const json = await response.json()
            if (json['error']) {
                throw new Error(json['error'])
            }
            toast.success('Applied successfully')
            router.push(CANDIDATE_APPLIED_JOBS)
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setIsApplying(false)
        }
    }
    return <div className="flex flex-col">
        <div className="mx-4 mt-4 mb-20">
            <UserTopNavbar user={user} />

            <div className="h-42 flex flex-col bg-[#8000FF] gap-6  px-6 rounded-3xl mt-10 py-4 my-4" key={job.id}>
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
                                lineHeight: "130%",
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

                <p className="text-white text-sm">
                    {job.description}
                </p>


                {job?.JobsApplied.length ? <div className="text-yellow-400 font-bold text-center">Already applied 🤞</div> :
                    <ButtonPrimary onClick={handleApply} disabled={isApplying}>
                        Apply
                    </ButtonPrimary>}

            </div>

        </div>
        <BottomNavbar user={user} />
    </div>;

}
