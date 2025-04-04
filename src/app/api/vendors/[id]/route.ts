import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, contact, email, phone, address } = await request.json();

    const updatedVendor = await prisma.vendor.update({
      where: { id: params.id },
      data: {
        name,
        contact,
        email,
        phone,
        address,
      },
    });

    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
} 