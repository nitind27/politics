"use client";
import React from "react";
import { Member } from "./type";
import Card from "@/common/Card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  members: Member[];
};

const CardsStatus = ({ members }: Props) => {
  const totalMembers = members.length;

  // Count the number of members with "Pending" and "Verified" status
  const pendingCount = members.filter(
    (member) => member.status === "Pending"
  ).length;
  const verifiedCount = members.filter(
    (member) => member.status === "Verified"
  ).length;

  // Data for the doughnut chart
  const data = {
    labels: ["Pending", "Verified"],
    datasets: [
      {
        data: [pendingCount, verifiedCount],
        backgroundColor: ["#F1416C", "#5DD787"], // Colors for each segment
        hoverBackgroundColor: ["#FF6F61", "#81C784"], // Hover colors
      },
    ],
  };

  // Options to customize the doughnut chart appearance
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height and width
    cutout: "70%", // Makes the doughnut thinner
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
    },
  };

  return (
    <Card
      title={` ${totalMembers}`} // Display total number of members
      backgroundColor="#17C653"
      content={
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ padding: "20px" }}
        >
          {/* Doughnut Chart */}
          <div
            className="doughnut-chart"
            style={{ position: "relative", height: "150px", width: "150px" }}
          >
            <Doughnut data={data} options={options} />
          </div>

          {/* Member Status Counts */}
          <div className="ms-5 text-white">
            <div className="fw-bold fs-2 mb-5">
              Pending: {pendingCount}
            </div>
            <div className="fw-bold fs-2 ">
              Verified: {verifiedCount}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CardsStatus;
