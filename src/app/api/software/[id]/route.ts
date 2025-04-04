import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, version, licenseKey, expiryDate, assetId } = await request.json();

    const updatedSoftware = await prisma.software.update({
      where: { id: params.id },
      data: {
        name,
        version,
        licenseKey,
        expiryDate: new Date(expiryDate),
        assetId,
      },
      include: {
        asset: true,
      },
    });

    return NextResponse.json(updatedSoftware);
  } catch (error) {
    console.error('Error updating software:', error);
    return NextResponse.json(
      { error: 'Failed to update software' },
      { status: 500 }
    );
  }
} 