import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const renewals = await prisma.licenseRenewal.findMany({
        include: {
          software: true,
        },
      });

      res.status(200).json(renewals);
    } catch (error) {
      console.error('Error fetching renewals:', error);
      res.status(500).json({ error: 'Failed to fetch renewals' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 