import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const software = await prisma.software.findMany({
        include: {
          asset: true,
        },
      });

      res.status(200).json(software);
    } catch (error) {
      console.error('Error fetching software:', error);
      res.status(500).json({ error: 'Failed to fetch software' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 