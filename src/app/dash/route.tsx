import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { OAuth2Client, auth } from 'google-auth-library';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../utils/GetUser';
import { CANDIDATE_ALL_JOBS, RECRUITER_VIEW_ALL_JOB } from '../routes-config';



export async function GET(request: NextRequest) {
  try {

    // check if authenticated
    const user=getUser()

    if(!user){
        throw new Error("Not authenticated")
    }
    // if authenticated, find if it's student or recruiter
    const url = new URL(request.url);
    url.pathname = (user.isRecruiter? RECRUITER_VIEW_ALL_JOB: CANDIDATE_ALL_JOBS)
    return NextResponse.redirect(url);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/error", request.url));
  }

}
