

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { RedirectToAPageWithToast } from '../../../components/RedirectToAPageWithToast';
import { prisma } from "@/db"; // Adjust the path to where your Prisma instance is exported
import OpenAI from 'openai';
import { m } from 'framer-motion';
import { UserTopNavbar } from '../../dash/UserTopNavbar';
import { PrismaClient, Role } from '@prisma/client';
import { assert } from 'console';
import { NEW_MESSAGE_API } from '@/app/routes-config';
import { InterviewMessagePageClient } from './InterviewMessagePageClient';
import { ObjectId } from 'bson';



const AIchatText = "Hello! How can I assist you with your interview preparation?";

const userChatText = "You are very nice.";

export default async function InterviewPrep({ params }: any) {
    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    if (user.isRecruiter) {
        return <RedirectToAPageWithToast route='/' text='You are not allowed to access this page' />
    }

    const prisma = new PrismaClient()
    const { id: jobId } = params;


    const job = await prisma.job.findUnique({
        where: {
            id: jobId as any,
        },
    });

    if (!job) {
        return <RedirectToAPageWithToast route='/' text='Job not found' />
    }

    // find messages
    const messages = await prisma.interviewBotMessage.findMany({
        where: {
            jobId: params.id,
            userId: user.id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const prospectiveMessages: any = []

    if (!messages.length) {

        console.log('messages not found.... openaiii..')
        prospectiveMessages.push(
            {
                createdAt: new Date(),
                jobId,
                userId: user.id,
                role: Role.system,
                content: `Keep the response short about 30 words Based on the following job description, help the candidate prepare for an interview: "${job.description}"`
            })
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
        });


        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: prospectiveMessages.map((e: any) => ({ role: e.role, content: e.content })),
        });

        const response = chatCompletion.choices[0].message.content ?? "Something went wrong";
        prospectiveMessages.push({
            role: Role.assistant,
            content: response,
            createdAt: new Date(),
            jobId,
            userId: user.id,
            id: (new ObjectId()).toString()
        })

        prisma.interviewBotMessage.createMany({
            data: prospectiveMessages
        }).then(e => {
            console.log(`Response from db: ${e.count}`)
        })
    }


    const initialMessages = messages.length ? messages : prospectiveMessages
    assert(initialMessages.length > 0, "Initial messages should be greater than 0")




    return (
        <InterviewMessagePageClient jobId={jobId} user={user} messages={initialMessages} />
    );

}
