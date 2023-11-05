import { getUser } from '@/app/utils/GetUser';
import { googleOAuth2ClientInstance } from '@/app/utils/GoogleOAuth2ClientInstance';
import { InterviewBotMessage, PrismaClient, Role } from '@prisma/client';
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

    const id = params.id

    const userId = user.id
    // get the chat from user
    const json = await request.json()
    const message = json['message']

    if (!message) {
      throw new Error("message is empty")
    }

    const prisma = new PrismaClient()
    const previousMessages = await prisma.interviewBotMessage.findMany({
      where: {
        jobId: id as string,
        userId
      }
    })
    const newMessages: Omit<InterviewBotMessage, 'id'>[] = []

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
      stream: true
    });

    const streams = chatCompletion.toReadableStream().tee()

    const myStream=new TransformStream()
    // create a response which returns the stream
    const response = new NextResponse(myStream.readable, {
      headers: {
      }
    })




    const writer=myStream.writable.getWriter()

    console.log(writer.closed, writer.ready, myStream.readable.getReader());
    writer.write("messageTxtxxx")


    writer.write('xxxxxxx12')

    new Promise(async (resolve, reject) => {
      let str = ''
      writer.write('xxxx2')

      const reader = streams[1].getReader()
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          writer.close()
          break
        }

        console.log()

        const json = JSON.parse(new TextDecoder().decode(value))
        if (json.choices[0]['finish_reason'] === 'stop') {
          break
        }
        const messageTxt = json.choices[0].delta.content
        writer.write(messageTxt)
        str += messageTxt
      }
      writer.write('lkxxxxxnwxx12')

      newMessages.push({
        content: str,
        createdAt: new Date(),
        jobId: id as string,
        role: Role.assistant,
        userId
      })

      prisma.interviewBotMessage.createMany({
        data: newMessages
      }).then(e => {
        console.log(`createdxx ${e.count} messages`)
      })

      resolve(0)
    }).then(e => {
      console.log(e)
    })



    return response
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({
      error: true,
      message: err.message
    });
  }

}
