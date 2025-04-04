import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { poNumber, requestor, vendorId, startDate, endDate, status } = req.body;

      const updatedPO = await prisma.purchaseOrder.update({
        where: { id: Number(id) },
        data: {
          poNumber,
          requestor,
          vendorId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status,
        },
      });

      res.status(200).json(updatedPO);
    } catch (error) {
      console.error('Error updating purchase order:', error);
      res.status(500).json({ error: 'Failed to update purchase order' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 