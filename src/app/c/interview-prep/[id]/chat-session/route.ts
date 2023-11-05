import { getUser } from '@/app/utils/GetUser';
import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { PrismaClient } from '@prisma/client';
import { OAuth2Client, auth } from 'google-auth-library';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {
  const { id: jobId } = useParams();
  try {
    const user = getUser()


    if (!user) {
      throw new Error("not authenticated")
    }

    const userId = user.id


    const primsa = new PrismaClient()

    const messages = await primsa.interviewBotMessage.findMany({
      where: {
        jobId: jobId as string,
        userId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    return NextResponse.json(messages);
  } catch (err:any) {
    console.error(err);
    return NextResponse.json({
      error: true,
      message: err.message
    })
  }

}
