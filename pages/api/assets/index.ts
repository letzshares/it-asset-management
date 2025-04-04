import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const assets = await prisma.asset.findMany({
        include: {
          history: {
            orderBy: {
              modifiedDate: 'desc',
            },
            take: 1,
          },
        },
      });

      const formattedAssets = assets.map((asset) => ({
        ...asset,
        dateAcquired: asset.dateAcquired.toISOString(),
        createdAt: asset.createdAt.toISOString(),
        updatedAt: asset.updatedAt.toISOString(),
        history: asset.history.map((history) => ({
          ...history,
          modifiedDate: history.modifiedDate.toISOString(),
          lastVisited: history.lastVisited.toISOString(),
        })),
      }));

      res.status(200).json(formattedAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
      res.status(500).json({ error: 'Failed to fetch assets' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 