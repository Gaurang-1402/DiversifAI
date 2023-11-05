import { getUser } from '@/app/utils/GetUser';
import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { PrismaClient, Role } from '@prisma/client';
import assert from 'assert';
import { OAuth2Client, auth } from 'google-auth-library';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';



export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getUser()
    if (!user) {
      throw new Error("not authenticated")
    }

    const id=params.id

    const userId = user.id
    // get the chat from user
    const json = await request.json()
    const message = json['message']

    const prisma = new PrismaClient()
    const previousMessages = await prisma.interviewBotMessage.findMany({
      where: {
        jobId: id as string,
        userId
      }
    })

    const newMessages = []


    newMessages.push({
      content: message,
      createdAt: new Date(),
      jobId: id as string,
      role: Role.user,
      userId
    })

    const messages = [
      ...previousMessages.map(e => ({ role: e.role, content: e.content })),
      {
        content: message,
        role: Role.user,
      }
    ]

    // ensure that the first message is system message
    assert(messages[0].role === "system", "first message is not system message")



    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
    });


    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });


    // stream the response back

    // get the corresponding response from the bot
    const response = chatCompletion.choices[0].message.content ?? "Something went wrong";

    newMessages.push({
      content: response,
      createdAt: new Date(),
      jobId: id as string,
      role: Role.assistant,
      userId
    })

    prisma.interviewBotMessage.createMany({
      data: newMessages
    }).then(e => {
      console.log(`created ${e.count} messages`)
    })



    return NextResponse.json({
      error: false,
      assistantMessage: newMessages[1]
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({
      error: true,
      message: err.message
    });
  }

}
