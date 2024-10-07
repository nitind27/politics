import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { name, contact, address } = await request.json();

    try {
        // Check if the mobile number already exists
        const existingMember = await prisma.member.findFirst({
            where: {
                mobile_no: contact,
            },
        });

        // If a member with the same mobile number exists
        if (existingMember) {
            if (existingMember.status === 'Pending') {
                return NextResponse.json({ error: 'You are already registered with this mobile number.' }, { status: 400 });
            }
            // If status is Verified, we can proceed to insert a new member
        }

        // Create a new member
        const newMember = await prisma.member.create({
            data: {
                name,
                mobile_no: contact,
                address,
                qr_id: Math.floor(Math.random() * 1000000), // Example QR ID generation
                status: 'Pending', // Default status
            },
        });

        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
    }
}