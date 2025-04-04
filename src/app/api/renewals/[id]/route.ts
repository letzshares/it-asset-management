import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { softwareId, expiryDate, status } = await request.json();

    const updatedRenewal = await prisma.licenseRenewal.update({
      where: { id: params.id },
      data: {
        softwareId,
        expiryDate: new Date(expiryDate),
        status,
      },
      include: {
        software: true,
      },
    });

    return NextResponse.json(updatedRenewal);
  } catch (error) {
    console.error('Error updating renewal:', error);
    return NextResponse.json(
      { error: 'Failed to update renewal' },
      { status: 500 }
    );
  }
} 