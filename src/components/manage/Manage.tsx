"use client";
import React from "react";
import BasicTable from "./QrData";
import { Member } from "../dashboard/type"; // Ensure the correct path for the Member interface

type ManageProps = {
  members: Member[];
};

// Function to format the date
const formatDate = (dateString: string): string => {
  // Create a Date object from the input string
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // If the date is invalid, return a fallback string or handle as needed
    return "Invalid Date"; // or return an empty string, etc.
  }
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  // Return the formatted date as a string
  return date.toLocaleDateString('en-IN', options);
};

const Manage: React.FC<ManageProps> = ({ members }) => {
  // Prepare data for the table
  const data = members.map((member) => ({
    id: member.id,
    name: member.name,
    mobile_no: member.mobile_no,
    address: member.address,
    qr_id: member.qr_id,
    status: member.status,
    // Check if ins_date_time is a Date object or string, and handle accordingly
    ins_date_time: typeof member.ins_date_time === 'string'
    ? formatDate(member.ins_date_time) 
    : formatDate(member.ins_date_time.toISOString()), // Convert Date to string using toISOString()
    verify_date_time: typeof member.verify_date_time === 'string'
    ? formatDate(member.verify_date_time) 
    : formatDate(member.verify_date_time.toISOString()),
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "mobile_no",
      header: "Contact No",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "qr_id",
      header: "Code",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "ins_date_time",
      header: "Add Time",
    }, 
    {
      accessorKey: "verify_date_time",
      header: "Verify Date",
    },
  ];

  return (
    <div>
      <BasicTable data={data} columns={columns} />
    </div>
  );
};

export default Manage;
