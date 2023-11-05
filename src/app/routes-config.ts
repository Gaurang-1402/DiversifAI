
export const LOGOUT_API= "/auth/logout"


export const WELCOME_SCREEN='/welcome/'
export const AUTH_SCREEN='/auth/'
export const SELECTOR='/selector/'
export const RESUME_UPLOAD='/pdfupload/'

export const LOGIN='/auth/proxy?authType=LOGIN'
export const REGISTER_AS_STUDENT_SCREEN='/auth/proxy?authType=REGISTER_AS_STUDENT'
export const REGISTER_AS_RECRUITER_SCREEN='/auth/proxy?authType=REGISTER_AS_RECRUITER'


export const DASH='/dash'
export const CANDIDATE_DASH='/c/dash'


// export const
// export const CANDIDATE_PROFILE_SCREEN='/c/profile'


export const RECRUITER_CREATE_JOB='/r/jobs/new/'

// show all jobs created by the recruiter
// export const RECRUITER_VIEW_ALL_JOBS='/r/jobs/all/'

// can be accessed by the recruiter only if they had created it
// we will also show some stats like number of candidates applied etc
// and list of all candidates who have applied it
export const RECRUITER_JOB_DETAILS=(id: string) => `/r/jobs/${id}`

export const RECUITER_CANDIDATE_DETAILS=(candidateId: string, jobsId: string) => `/r/jobs/${jobsId}/${candidateId}`



export const RECRUITER_DASH='/r/dash'
export const CANDIDATE_APPLIED_JOBS= `/c/jobs/applied`
export const INTERVIEW_PREP='/c/interview-prep'


export const CANDIDATE_JOB_DETAILS=(id: string) => `/c/jobs/${id}`
export const CANDIDATE_APPLY_JOB=(id: string) => `/c/jobs/${id}/apply`
