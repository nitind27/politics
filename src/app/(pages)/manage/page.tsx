import prisma from "@/lib/db"; // Ensure this path is correct
import { Member, Qrcodes } from "@/components/dashboard/type";
import Manage from "@/components/manage/Manage";


import React from "react";
import Loader from "@/components/Loader/Loader ";

const Page = async () => {
  let Qrcodes: Qrcodes[] = [];
  let members: Member[] = [];
  let loading = true; // Initialize loading state

  try {
    Qrcodes = await prisma.qrcodes.findMany(); // Fetch all QR codes
    members = await prisma.member.findMany(); // Fetch all members
    console.log("Fetched QR codes:", Qrcodes);
    loading = false; // Set loading to false after data fetch
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    return (
      <div>
        <h1>Error fetching QR codes</h1>
      </div>
    );
  }

  if (loading) {
    return <Loader />; // Render loading component
  }

  // Count the number of members with "Pending" and "Allocated" status
  const pendingCount = Qrcodes.filter(
    (qrcode) => qrcode.status === "Pending"
  ).length;
  const verifiedCount = Qrcodes.filter(
    (qrcode) => qrcode.status === "Allocated"
  ).length;

  return (
    <div>
      
      <Manage members={members} />
    </div>
  );
};

export default Page;