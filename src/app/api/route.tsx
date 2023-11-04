import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    console.log('GET /api/jobs');
    try {
      const jobs = await prisma.job.findMany();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch jobs" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP methods as needed, or send a 405 Method Not Allowed status
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
