import prisma from "@/lib/db"; // Ensure this path is correct
import { Qrcodes } from "@/components/dashboard/type";
import Manage from "@/components/manage/Manage";
import React from "react";

const Page = async () => {
  let Qrcodes: Qrcodes[] = [];

  try {
    Qrcodes = await prisma.qrcodes.findMany(); // Fetch all QR codes
    console.log("Fetched QR codes:", Qrcodes);
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return (
      <div>
        <h1>Error fetching QR codes</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Total QR Codes: {Qrcodes.length}</h1>
    
      <Manage Qrcodes={Qrcodes} /> 
    </div>
  );
};

export default Page;