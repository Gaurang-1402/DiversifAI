

import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';
import { getUser } from '@/app/utils/GetUser';
import { NextRequest, NextResponse } from 'next/server';
import { RedirectToAPageWithToast } from '../../../components/RedirectToAPageWithToast';
import { prisma } from "@/db"; // Adjust the path to where your Prisma instance is exported
import OpenAI from 'openai';
import { m } from 'framer-motion';

function AIChatBubble({ text }) {
    return (
        <div className="max-w-xs md:max-w-md bg-purple-600 text-white p-4 ml-5 rounded-lg shadow">
            <p>{text}</p>
        </div>
    );
}

// UserChatBubble.jsx or UserChatBubble.tsx if using TypeScript

function UserChatBubble({ text }) {
    return (
        <div className="max-w-xs md:max-w-md bg-slate-300 text-black p-4 mr-5 rounded-lg shadow ml-auto">
            <p>{text}</p>
        </div>
    );
}

// export async function loader({ params }) {

//     // ... existing code to get user and job
//     const { id } = params;

//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
//     });
//     const job = await prisma.job.findUnique({
//         where: {
//             id: params.id,
//         },
//     });

//     if (!job) {
//         throw new Response('Not Found', { status: 404 });
//     }

//     let interviewPrepContent = '';

//     try {
//         // Make the call to the OpenAI API

//         const chatCompletion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ "role": "system", "content": `Based on the following job description, help the candidate prepare for an interview: "${job.description}"` }],
//         });

//         interviewPrepContent = chatCompletion.choices[0].message;
//         console.log(interviewPrepContent);
//     } catch (error) {
//         console.error('Error calling the OpenAI API:', error);
//         // Handle the error appropriately. Perhaps return a default message or rethrow the error.
//     }

//     // Add the interview preparation content to the props returned for the page
//     return {
//         props: {
//             nothing: {}
//             // job,
//             // user,
//             // interviewPrepContent, // This will be passed to your page component
//         },
//     };
// }


const AIchatText = "Hello! How can I assist you with your interview preparation?";

const userChatText = "You are very nice.";

export default async function InterviewPrep({ params }) {
    const user = getUser()
    let messageId = 0

    let messages = [];

    const { id } = params;

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
    });
    const job = await prisma.job.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!job) {
        throw new Response('Not Found', { status: 404 });
    }

    let interviewPrepContent = '';

    try {
        // Make the call to the OpenAI API

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                "role": "system",
                "content": `Keep the response short about 30 words Based on the following job description, help the candidate prepare for an interview: "${job.description}"`
            }],
        });

        interviewPrepContent = chatCompletion.choices[0].message.content;
        messages.push({ messageId: 1, role: "AI", content: interviewPrepContent });
        messageId += 1;
        console.log(interviewPrepContent);
    } catch (error) {
        console.error('Error calling the OpenAI API:', error);
        // Handle the error appropriately. Perhaps return a default message or rethrow the error.
    }

    // TODO remove this
    messages.push({ messageId: messageId, role: "user", content: userChatText });
    messageId += 1;

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }

    if (user.isRecruiter) {
        return <RedirectToAPageWithToast route='/' text='You are not allowed to access this page' />
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="mx-4 mt-4" >
                <div className="flex flex-row justify-between items-center   ">
                    <div className="flex flex-col">
                        <p style={{
                            color: "var(--grey-60, #95969D)",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "150%", /* 21px */
                            letterSpacing: "-0.14px"
                        }}>
                            Welcome back!
                        </p>
                        <p style={{
                            color: "var(--Black, #0D0D26)",
                            marginTop: "5px",
                            fontSize: "22px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "120%", /* 26.4px */
                            letterSpacing: "-0.33px"
                        }}>
                            Keshia Taylor 👋
                        </p>
                    </div>
                    <div>
                        <p>Avatar</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex-grow">
                {messages.map((message) => (
                    message.role === "AI" ? (
                        <AIChatBubble key={message.messageId} text={message.content.trim()} />
                    ) : (
                        <UserChatBubble key={message.messageId} text={message.content.trim()} />
                    )
                ))}
            </div>
            <div className="fixed inset-x-0 bottom-0 p-4 bg-white">
                {/* This is the input box container */}
                <div className="flex items-center p-1 bg-white rounded-full shadow-md mb-16">
                    <input
                        type="text"
                        placeholder="Let's interview"
                        className="flex-1 pl-4 pr-2 py-2 rounded-full text-gray-800 focus:outline-none"
                    />
                    <button className="bg-purple-500 p-2 rounded-full text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0">
                {/* This is your BottomNavbar */}
                <BottomNavbar user={user} />
            </div>
        </div>
    );

}
