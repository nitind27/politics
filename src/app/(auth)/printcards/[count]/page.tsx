// app/print/[count]/page.tsx
import React from "react";
import PrintCard from "@/components/manage/PrintCard";
import { Qrcodes } from "@/components/dashboard/type";
import prisma from "@/lib/db";

const PrintPage = async ({ params }: { params: { count: string } }) => {
  // Convert count to a number, and provide a default value of 0 if not present
  const imageCount = parseInt(params.count, 10) || 0;

  let qrcodes: Qrcodes[] = [];

  try {
    qrcodes = await prisma.qrcodes.findMany(); // Fetch all QR codes
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return (
      <div>
        <h1>Error fetching QR codes</h1>
      </div>
    );
  }

  const pendingCount = qrcodes.filter(
    (Qrcodes) => Qrcodes.status === "Pending"
  ).length;

  // Check if imageCount is greater than pendingCount
  if (imageCount > pendingCount) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ color: 'red' }}>Error</h1>
        <p style={{ fontSize: '18px' }}>
          The requested number of images ({imageCount}) exceeds the available pending images ({pendingCount}).
        </p>
        <p>Please adjust the number of images you want to print.</p>
      </div>
    );
  }

  return (
    <div>
      <PrintCard count={imageCount} qrcodes={qrcodes} />
    </div>
  );
};

export default PrintPage;