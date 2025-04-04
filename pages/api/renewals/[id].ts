import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { softwareId, expiryDate, status } = req.body;

      const updatedRenewal = await prisma.licenseRenewal.update({
        where: { id: String(id) },
        data: {
          softwareId,
          expiryDate: new Date(expiryDate),
          status,
        },
        include: {
          software: true,
        },
      });

      res.status(200).json(updatedRenewal);
    } catch (error) {
      console.error('Error updating renewal:', error);
      res.status(500).json({ error: 'Failed to update renewal' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 