import { CANDIDATE_DASH, RECRUITER_DASH } from '../routes-config';
import { getUser } from '../utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  // check if authenticated
  const user = getUser()
  try {
    if (!user) {
      return NextResponse.json({ message: "Please login" })
    }
    // if authenticated, find if it's student or recruiter
    const url = new URL(request.nextUrl)
    url.pathname = (user?.isRecruiter ? RECRUITER_DASH : CANDIDATE_DASH)

    return NextResponse.redirect(url)
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message })
  }
}
