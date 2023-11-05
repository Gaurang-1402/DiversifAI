'use client'

import { BottomNavbar } from "@/app/components/BottomNavbar"
import { UserTopNavbar } from "../../dash/UserTopNavbar";
import { $Enums, Role } from "@prisma/client";
import { useRef, useState } from "react";
import { jwtUserPayloadType } from "@/app/utils/SetAuthTokenAsCookie";
import { NEW_MESSAGE_API } from "@/app/routes-config";


function AIChatBubble({ text }: { text: string }) {
    return (
        <div className="max-w-xs md:max-w-md bg-purple-600 text-white p-4 ml-5 rounded-lg shadow">
            <p>{text}</p>
        </div>
    );
}

// UserChatBubble.jsx or UserChatBubble.tsx if using TypeScript

function UserChatBubble({ text }: { text: string }) {
    return (
        <div className="max-w-xs md:max-w-md bg-slate-300 text-black p-4 mr-5 rounded-lg shadow ml-auto">
            <p>{text}</p>
        </div>
    );
}

export const InterviewMessagePageClient = ({ user, messages: tmpMessages, jobId }: {
    user: jwtUserPayloadType,
    messages: {
        id: string;
        content: string;
        role: $Enums.Role;
        createdAt: Date;
        jobId: string;
        userId: string;
    }[],
    jobId: string
}) => {
    const [messages, setMessages] = useState(tmpMessages)
    const [isLoading, setIsLoading] = useState(false)

    const chatWindowRef=useRef<HTMLDivElement>(null)

    const handleNewMessage = async (message: string) => {
        try {
            if (isLoading) return

            setIsLoading(true)
            setMessages(e => ([...e, {
                content: message,
                createdAt: new Date(),
                id: Date.now().toString(),
                jobId,
                role: Role.user,
                userId: user.id
            }]))
            setTimeout(() => {
                chatWindowRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 1000)
            const response = await fetch(NEW_MESSAGE_API(jobId), {
                body: JSON.stringify({
                    message
                }),
                method: 'POST'
            })

            const reader = response.body?.getReader()
            if (!reader) {
                throw new Error("No reader")
            }
            setMessages(e => ([...e, {
                content: "Loading...",
                createdAt: new Date(),
                id: Date.now().toString(),
                jobId,
                role: Role.assistant,
                userId: user.id
            }]))
            setTimeout(() => {
                chatWindowRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 1000)


            new Promise(async (resolve, reject) => {
                let str = ''
                await new Promise((req, rek) => req(4000))
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) {
                        break
                    }
                    const values = new TextDecoder().decode(value).split('\n')
                    const valuesss = values.filter(e => e.trim() !== '')
                    valuesss.forEach(e => {
                        const json = JSON.parse(e)
                        if (json.choices[0]['finish_reason'] === 'stop') {
                            return;
                        }
                        const messageTxt = json.choices[0].delta.content
                        str += messageTxt
                    })

                    setMessages(e => ([...e.slice(0, e.length - 1), {
                        ...(e[e.length - 1]),
                        content: str,
                    }]))
                }
                resolve(1)
            })
        } finally {
            setIsLoading(false)
        }
    }

    const [newMessage, setNewMessage] = useState('')



    return (
        <div className="flex flex-col min-h-screen px-3 mt-5">
            <UserTopNavbar user={user} />

            <div ref={chatWindowRef} className="mt-5 flex-grow gap-2 flex flex-col mb-40">
                {messages.map((message) => (
                    message.role !== Role.user ? (
                        (
                            message.role !== Role.system ? <AIChatBubble key={message.id} text={message.content.trim()} /> : null
                        )
                    ) : (
                        <UserChatBubble key={message.id} text={message.content.trim()} />
                    )
                ))}

                {isLoading && <AIChatBubble key={"message.id"} text="Loading..." />}
            </div>
            <div className="fixed inset-x-0 bottom-0 p-4 bg-white">
                {/* This is the input box container */}
                <div >
                    <form
                        className="flex items-center p-1 bg-white rounded-full shadow-md mb-16"
                        onClick={(e) => {
                            e.preventDefault()
                            // on enter, send the message to the server
                            if (!newMessage.trim()) {
                                return
                            }
                            handleNewMessage(newMessage)
                            setNewMessage('')
                        }}>

                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Let's interview"
                            className="flex-1 pl-4 pr-2 py-2 rounded-full text-gray-800 focus:outline-none"
                        />
                        <button className="bg-purple-500 p-2 rounded-full text-white shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </form>

                </div>
            </div>

            <div className="fixed inset-x-0 bottom-0">
                {/* This is your BottomNavbar */}
                <BottomNavbar user={user} />
            </div>
        </div>
    )
}
