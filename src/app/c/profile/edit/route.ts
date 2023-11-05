import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/utils/GetUser';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { prisma } from '@/db';



export async function POST(request: NextRequest, { params }: { params: { jobId: string } }) {
    try {

        const user = getUser()
        if (!user) {
            throw new Error("not authenticated")
        }

        const data = await request.json()

        // use LLM to get the desired info
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                {
                    content: `Your task is to revise resumes to ensure they are focused solely on the individual's skills, experiences, and qualifications relevant to the job they are applying for. You must carefully edit out any direct and indirect references to the applicant's gender, ethnicity, religion, sexual orientation, or any other personal identifiers that could potentially lead to bias. Here are the specific guidelines:

            Names and Contact Information: Replace names with 'Applicant,' specific addresses to a local area, and remove any links to personal websites or profiles that might contain identity-revealing information.

            Objective/Summary: Focus on professional goals and skills without mentioning personal background or demographic-specific aspirations.

            Education: Omit details of associations, clubs, or societies that indicate ethnicity, gender, or cultural background. If the association's role is relevant to the job, replace it with a neutral equivalent.

            Experience: Neutralize company names or roles if they reveal ethnic or cultural identity. Focus on the tasks and achievements that are universally applicable.

            Skills: Maintain technical and professional skills. Remove languages unless they are relevant to the job. Do not include skills that are directly tied to cultural or demographic identity.

            Volunteer Work and Extracurricular Activities: Edit to remove references to specific demographic groups or causes. Highlight the skills gained and contributions made.

            Awards and Certifications: Only include those that are relevant to the job and do not reveal personal demographics.

            I'm sharing the data in json format. anonymize the values in the json, and return the anonymized json with the same keys.`,
                    role: 'system'
                },
                {
                    content: JSON.stringify(data),
                    role: 'user'
                }
            ],
            model: 'gpt-3.5-turbo'
        })

        console.log(chatCompletion.choices[0].message.content)

        // update it in the database
        const json = JSON.parse(chatCompletion.choices[0].message.content as string)

        const newCandidateProfile = {
            professionalSummary: json.professionalSummary,
            experienceTitle: json.experienceTitle,
            experienceCompany: json.experienceCompany,
            experienceLocation: json.experienceLocation,
            experienceDates: json.experienceDates,
            experienceDescription: json.experienceDescription,
            educationSchoolName: json.educationSchoolName,
            educationDegree: json.educationDegree,
            educationDates: json.educationDates,
            educationDescription: json.educationDescription,
            skills: json.skills,
            volunteerWork: json.volunteerWork,
            awardsCertifications: json.awardsCertifications,
        }

        const response = await prisma.candidateProfile.update({
            where: {
                id: user.id
            },
            data: newCandidateProfile,
        })

        console.log(response)

        return NextResponse.json({
            error: false,
            newCandidateProfile
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({
            error: true,
            message: err.message
        })
    }

}
