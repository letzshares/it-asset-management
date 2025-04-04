import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const software = await prisma.software.findMany({
      include: {
        asset: true,
      },
    });

    return NextResponse.json(software);
  } catch (error) {
    console.error('Error fetching software:', error);
    return NextResponse.json(
      { error: 'Failed to fetch software' },
      { status: 500 }
    );
  }
} 