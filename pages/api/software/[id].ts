import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, version, licenseKey, expiryDate, assetId } = req.body;

      const updatedSoftware = await prisma.software.update({
        where: { id: Number(id) },
        data: {
          name,
          version,
          licenseKey,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          assetId,
        },
      });

      res.status(200).json(updatedSoftware);
    } catch (error) {
      console.error('Error updating software:', error);
      res.status(500).json({ error: 'Failed to update software' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 