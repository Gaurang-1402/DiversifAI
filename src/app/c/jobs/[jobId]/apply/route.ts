import { useParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/utils/GetUser';
import { PrismaClient } from '@prisma/client';



export async function POST(request: NextRequest, { params }: { params: { jobId: string }}) {
  try {

    const user=getUser()
    if(!user){
        throw new Error("not authenticated")
    }

    const primsa=new PrismaClient()

    const response=await primsa.jobsApplied.create({
        data: {
            jobId: params.jobId as string,
            userId:user.id
        }
    })

    return NextResponse.json({
        error: false,
        jobApplied: response
    });
  } catch (err:any) {
    console.error(err);
    return NextResponse.json({
        error: true,
        message: err.message
    })
  }

}
