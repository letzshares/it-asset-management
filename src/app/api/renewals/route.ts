import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const renewals = await prisma.licenseRenewal.findMany({
      include: {
        software: true,
      },
    });

    return NextResponse.json(renewals);
  } catch (error) {
    console.error('Error fetching renewals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch renewals' },
      { status: 500 }
    );
  }
} 