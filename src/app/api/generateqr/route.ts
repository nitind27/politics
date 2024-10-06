// app/api/generate-qr/route.ts
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { count } = await req.json();

  if (!count || count < 1) {
    return NextResponse.json({ error: 'Count must be a positive number.' }, { status: 400 });
  }

  try {
    const codes = [];
    for (let i = 1; i <= count; i++) {
      const qrCodeUrl = `https://vishalnawle.in/politics/member.php?pl=${i}`;
      codes.push(qrCodeUrl);

      await prisma.qrcodes.create({
        data: {
          qr_code_no: i,
          status: 'Pending',
          allocated_date: new Date(),
        },
      });
    }

    return NextResponse.json({ message: 'QR codes generated successfully.', codes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while generating QR codes.' }, { status: 500 });
  }
}