import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  console.log('GET /api/jobs');
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Unable to fetch jobs" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
