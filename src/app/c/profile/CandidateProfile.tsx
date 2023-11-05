'use client'

import { CandidateProfile } from "@prisma/client"
import { UserTopNavbar } from "../dash/UserTopNavbar"
import { jwtUserPayloadType } from "@/app/utils/SetAuthTokenAsCookie"
import { BottomNavbar } from "@/app/components/BottomNavbar"
import { ButtonPrimary, ButtonSecondary } from "@/app/components/Buttons"
import { useState } from "react"
import Link from "next/link"
import { CANDIDATE_PROFILE_SCREEN, EDIT_PROFILE_API, UPLOAD_PDF } from "@/app/routes-config"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"


export const CandidateProfileClient = ({ candidateProfile: tmpCandidateProfile, user }: {
    candidateProfile: CandidateProfile,
    user: jwtUserPayloadType
}) => {

    const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(tmpCandidateProfile)
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            setIsSubmitting(true)

            const response = await fetch(EDIT_PROFILE_API, {
                method: 'POST',
                body: JSON.stringify(candidateProfile)
            })
            const json = await response.json()
            if (json.error) {
                throw new Error(json.message)
            }
            toast.success("Profile updated successfully with anon info")
            setCandidateProfile(json.newCandidateProfile)
            router.push(CANDIDATE_PROFILE_SCREEN)
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <div className="px-4 mt-4">
                <UserTopNavbar user={user} />

                <h1 className="mt-5 text-xl font-medium mb-3">Candidate Profile</h1>


                <Link href={UPLOAD_PDF}>
                    <ButtonSecondary>
                        Pre-fill everything with our Resume parser
                    </ButtonSecondary>
                </Link>

                <div>
                    <form onSubmit={submitHandler} className="flex mt-5 flex-col gap-2 mb-20">

                        <label className="form-label">
                            <div className="label-text">Professional Summary</div>
                            <textarea rows={4} placeholder="Professional Summary" onChange={e => setCandidateProfile(f => ({ ...f, professionalSummary: e.target.value }))} value={candidateProfile?.professionalSummary ?? ""} />
                        </label>


                        <div>
                            <div className="text-lg font-medium">Clinical Experience</div>

                            <label className="form-label">
                                <div className="label-text">Title</div>
                                <input type="text" placeholder="Experience Title" onChange={e => setCandidateProfile(f => ({ ...f, experienceTitle: e.target.value }))} value={candidateProfile?.experienceTitle ?? ""} />
                            </label>

                            <label className="form-label">
                                <div className="label-text">Company</div>

                                <input type="text" placeholder="Experience Company" onChange={e => setCandidateProfile(f => ({ ...f, experienceCompany: e.target.value }))} value={candidateProfile?.experienceCompany ?? ""} />
                            </label>

                            <label className="form-label">
                                <div className="label-text">Location</div>

                                <input type="text" placeholder="Experience Location" onChange={e => setCandidateProfile(f => ({ ...f, experienceLocation: e.target.value }))} value={candidateProfile?.experienceLocation ?? ""} />
                            </label>

                            <label className="form-label">
                                <div className="label-text">Dates</div>

                                <input type="text" placeholder="Experience Dates" onChange={e => setCandidateProfile(f => ({ ...f, experienceDates: e.target.value }))} value={candidateProfile?.experienceDates ?? ""} />
                            </label>

                            <label className="form-label">
                                <div className="label-text">Description</div>

                                <textarea rows={4} placeholder="Experience Description" onChange={e => setCandidateProfile(f => ({ ...f, experienceDescription: e.target.value }))} value={candidateProfile?.experienceDescription ?? ""} />
                            </label>
                        </div>



                        <div>
                            <div className="text-lg font-medium" >Certifications</div>
                            <label className="form-label">
                                <div className="label-text">School</div>
                                <input type="text" placeholder="Education School Name" onChange={e => setCandidateProfile(f => ({ ...f, educationSchoolName: e.target.value }))} value={candidateProfile?.educationSchoolName ?? ""} />

                            </label>

                            <label className="form-label">
                                <div className="label-text">Degree</div>
                                <input type="text" placeholder="Education Degree" onChange={e => setCandidateProfile(f => ({ ...f, educationDegree: e.target.value }))} value={candidateProfile?.educationDegree ?? ""} />

                            </label>

                            <label className="form-label">
                                <div className="label-text">Dates</div>
                                <input type="text" placeholder="Education Dates" onChange={e => setCandidateProfile(f => ({ ...f, educationDates: e.target.value }))} value={candidateProfile?.educationDates ?? ""} />

                            </label>

                            <label className="form-label">
                                <div className="label-text">Description</div>
                                <textarea rows={4} placeholder="Education Description" onChange={e => setCandidateProfile(f => ({ ...f, educationDescription: e.target.value }))} value={candidateProfile?.educationDescription ?? ""} />
                            </label>

                        </div>

                        <label className="form-label">
                            <div className="label-text">Skills</div>
                            <textarea rows={4} placeholder="Skills" onChange={e => setCandidateProfile(f => ({ ...f, skills: e.target.value }))} value={candidateProfile?.skills ?? ""} />

                        </label>

                        <label className="form-label">
                            <div className="label-text">Volunteer Work</div>
                            <textarea rows={4} placeholder="Volunteer Work" onChange={e => setCandidateProfile(f => ({ ...f, volunteerWork: e.target.value }))} value={candidateProfile?.volunteerWork ?? ""} />

                        </label>

                        <label className="form-label">
                            <div className="label-text">Awards Certifications</div>
                            <textarea rows={4} placeholder="Awards Certifications" onChange={e => setCandidateProfile(f => ({ ...f, awardsCertifications: e.target.value }))} value={candidateProfile?.awardsCertifications ?? ""} />

                        </label>

                        <label className="form-label">
                            <div className="label-text">Cover Letter</div>
                            <textarea rows={4} placeholder="Cover Letter" onChange={e => setCandidateProfile(f => ({ ...f, coverLetter: e.target.value }))} value={candidateProfile?.coverLetter ?? ""} />
                        </label>

                        <ButtonPrimary disabled={isSubmitting} type="submit">Anonymize & Save</ButtonPrimary>
                    </form>

                </div>
            </div>
            <BottomNavbar user={user} />

        </>
    )
}

