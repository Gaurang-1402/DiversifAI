import { AuthRedirectToLandingPageWithToast } from "@/app/components/AuthRedirectToLandingPageWithToast";
import { RedirectToAPageWithToast } from "@/app/components/RedirectToAPageWithToast";
import { getUser } from "@/app/utils/GetUser";
import { PrismaClient, Role } from "@prisma/client";
import { CandidateProfileClient } from "./CandidateProfile";


export default async function Profile({ params }: any) {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    if (user.isRecruiter) {
        return <RedirectToAPageWithToast route='/' text='You are not allowed to access this page' />
    }

    const prisma = new PrismaClient()
    // get user data
    const candidateProfile = await prisma.candidateProfile.findFirst({
        where: {
            id: user.id
        }
    })

    if(!candidateProfile){
        return <RedirectToAPageWithToast route='/c/profile/edit' text='Logic err' />
    }



    // render the form
    return (
        <CandidateProfileClient user={user} candidateProfile={candidateProfile} />
    );

}
