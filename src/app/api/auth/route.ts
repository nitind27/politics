import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Adjust import based on your structure

export async function POST(request: Request) {
  try {
    // Parse the JSON body of the request
    const { sup_contact, sup_password } = await request.json();

    // Log input values (ensure sensitive data isn't logged in production)
    console.log('Received sup_contact:', sup_contact);

    // Check if sup_contact and sup_password exist in the request
    if (!sup_contact || !sup_password) {
      return NextResponse.json({ message: 'Missing credentials' }, { status: 400 });
    }

    // Find supervisor by contact (username)
    const supervisor = await prisma.supervisor.findFirst({
      where: { sup_contact },
    });

    // Log the supervisor result for debugging
    console.log('Supervisor found:', supervisor);

    // Check if supervisor exists
    if (!supervisor) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Compare the passwords as plain text
    if (sup_password !== supervisor.sup_password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // If everything is correct, return a success message
    return NextResponse.json({ message: 'Login successful' });

  } catch (error) {
    // Log the error message
    console.error('Error during authentication:', error);

    // Respond with an error message
    return NextResponse.json({ message: 'An error occurred during authentication', error }, { status: 500 });
  }
}
