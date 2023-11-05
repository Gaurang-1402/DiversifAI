import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { OAuth2Client, auth } from 'google-auth-library';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { AuthType } from '../callback/route';



export async function GET(request: NextRequest) {
  try {

    const authType=request.nextUrl.searchParams.get("authType")

    if (authType !== AuthType.LOGIN && authType !== AuthType.REGISTER_AS_STUDENT && authType !== AuthType.REGISTER_AS_RECRUITER) {
      throw new Error("Invalid state provided")
  }

    const authUrl = googleOAuth2ClientInstance.generateAuthUrl({
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      state: JSON.stringify({
        authType
      }),
    });
    return NextResponse.redirect(authUrl);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/error", request.nextUrl));
  }

}
