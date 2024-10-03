"use client";
import React from "react";
import BasicTable from "./QrData";
import { Qrcodes } from "@prisma/client";

type ManageProps = {
  Qrcodes: Qrcodes[];
};
const Manage = ({ Qrcodes }: ManageProps) => {
  // Prepare data for the table
  const data = Qrcodes.map((qr) => ({
    id: qr.id,
    status: qr.status,
    qr_code_no: qr.qr_code_no,
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "qr_code_no",
      header: "QR Code Number",
    },
  ];

  return (
    <div>
      <BasicTable data={data} columns={columns} />
    </div>
  );
};

export default Manage;
