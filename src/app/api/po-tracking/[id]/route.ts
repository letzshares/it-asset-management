import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { poNumber, requestor, vendorId, startDate, endDate, status } = await request.json();

    const updatedPO = await prisma.purchaseOrder.update({
      where: { id: parseInt(params.id) },
      data: {
        poNumber,
        requestor,
        vendorId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
      include: {
        vendor: true,
      },
    });

    return NextResponse.json(updatedPO);
  } catch (error) {
    console.error('Error updating purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to update purchase order' },
      { status: 500 }
    );
  }
} 