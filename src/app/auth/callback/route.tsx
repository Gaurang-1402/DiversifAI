import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'
import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { PrismaClient, User } from '@prisma/client';
import { setAuthTokenAsCookie } from '@/app/utils/SetAuthTokenAsCookie';
import { UPLOAD_PDF } from '@/app/routes-config';


export enum AuthType {
    REGISTER_AS_STUDENT = 'REGISTER_AS_STUDENT',
    REGISTER_AS_RECRUITER = 'REGISTER_AS_RECRUITER',
    LOGIN = 'LOGIN'
}


export async function GET(request: NextRequest) {
    const state = request.nextUrl.searchParams.get('state')
    const code = request.nextUrl.searchParams.get('code');

    try {
        if (!state) {
            throw new Error("No state provided")
        }

        const authType = JSON.parse(state)?.authType as any as AuthType

        console.log(authType)
        if (authType !== AuthType.LOGIN && authType !== AuthType.REGISTER_AS_STUDENT && authType !== AuthType.REGISTER_AS_RECRUITER) {
            throw new Error("Invalid state provided")
        }

        try {
            if (!code) {
                throw new Error("No code provided");
            }

            let { tokens } = await googleOAuth2ClientInstance.getToken(code);
            googleOAuth2ClientInstance.setCredentials(tokens);

            // get data
            // also we're damn sure that the token integrity is okay
            const data: any = jwt.decode(tokens.id_token as string);

            const {
                given_name: firstName,
                family_name: lastName,
                email,
                picture: profilePicUrl,
            } = data;


            const prisma = new PrismaClient();
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            let userInstance: User
            if (user && authType === AuthType.LOGIN) {
                // login user
                userInstance = user
            } else if (user && authType !== AuthType.LOGIN) {
                throw new Error("User already exists")
            } else if (!user && authType === AuthType.LOGIN) {
                throw new Error("User does not exist")
            } else {
                // register user
                userInstance = await prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        profilePicUrl,
                        email,
                        isRecruiter: (authType === AuthType.REGISTER_AS_RECRUITER),
                    }
                })
            }

            const response = NextResponse.redirect(new URL(UPLOAD_PDF, request.nextUrl));
            setAuthTokenAsCookie(response, userInstance)

            if(authType===AuthType.REGISTER_AS_STUDENT){
                await prisma.candidateProfile.create({
                    data: {
                        id: userInstance.id
                    }
                })
            }

            return response;
        } catch (err: any) {
            throw new Error(err);
        }
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ err: err.message });
    }

}

