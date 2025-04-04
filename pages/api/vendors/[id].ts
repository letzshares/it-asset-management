import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, contact, email, phone, address } = req.body;

      const updatedVendor = await prisma.vendor.update({
        where: { id: Number(id) },
        data: {
          name,
          contact,
          email,
          phone,
          address,
        },
      });

      res.status(200).json(updatedVendor);
    } catch (error) {
      console.error('Error updating vendor:', error);
      res.status(500).json({ error: 'Failed to update vendor' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 