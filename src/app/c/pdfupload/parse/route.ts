import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/utils/GetUser';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { prisma } from '@/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';


const pdfUtil = require('pdf-to-text');

export async function POST(request: NextRequest, { params }: { params: { jobId: string } }) {
  try {

    const user = getUser()
    if (!user) {
      throw new Error("not authenticated")
    }

    // var pdf_path = "/Users/subhmx/Desktop/Demo_Resume.pdf";

    const body = await request.formData()
    const file = body?.get("file") as File // file
    if (!file || !file.name) {
        return NextResponse.json({ error: "no file key or it is invalid" })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const pdf_path = path.join(process.cwd(), file.name)
    await writeFile(pdf_path, buffer)

    const pdfText = await new Promise<string>((res, rej) => {
      pdfUtil.pdfToText(pdf_path, function (err: any, data: any) {
        if (err) rej(err);
        res(data);
      });
    })

    console.log(pdfText);

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

          Please maintain the integrity of the professional qualifications and experiences while ensuring that the resume does not give away any unnecessary personal demographic information. And return the response in key value pair json with the following keys:

          professionalSummary String

          experienceTitle       String
          experienceCompany     String
          experienceLocation String
          experienceDates        String
          experienceDescription String

          educationSchoolName  String
          educationDegree      String
          educationDates        String
          educationDescription String

          skills String

          volunteerWork String

          awardsCertifications String


          If there are more than one experience or education, please return the latest one only. for experienceDates & educationDates please return the start and end date in the format of "Jan 2019 - Dec 2020" or "Jan 2019 - Present". If end date is not given, assume it to be Present.
          
          If no input is provided, return an empty string for all the fields.`,
          role: 'system'
        },
        {
          content: pdfText,
          role: 'user'
        }
      ],
      model: 'gpt-3.5-turbo'
    })

    console.log(chatCompletion.choices[0].message.content)




    const json = JSON.parse(chatCompletion.choices[0].message.content as string)
    await prisma.candidateProfile.update({
      where: {
        id: user.id
      },
      data: {
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
    })

    return NextResponse.json({
      error: false,
      parsedData: json,
      pdfText: pdfText,

    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({
      error: true,
      message: err.message
    })
  }

}
