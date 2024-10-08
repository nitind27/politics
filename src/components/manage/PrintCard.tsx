"use client"
import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";
import { Qrcodes } from "../dashboard/type";

interface PrintCardProps {
  count: number; // Number of images to display
  qrcodes: Qrcodes[];
}

const PrintCard: React.FC<PrintCardProps> = ({ count, qrcodes }) => {
  // Filter pending QR codes
  const pendingCount = qrcodes.filter((qrcode) => qrcode.status === "Pending");

  // Limit the number of images to the lesser of count and pendingCount length
  const limitedCount = Math.min(count, pendingCount.length);

  const images = Array.from({ length: limitedCount }, (_, index) => {
    const qrCodeData = pendingCount[index]; // Get corresponding QR code data

    return (
      <div className="col-md-6 mb-4" key={index} style={{ pageBreakInside: 'avoid' }}>
        <div className="card text-white" style={{ backgroundColor: '#007bff', margin: '10px', padding: '20px', borderRadius: '10px' }}>
          <div className="card-body d-flex align-items-center">
            <div className="me-3">
              <Image
                src="/media/images/navle.png" // Adjust the image path as necessary
                alt="Print Image"
                className="img-fluid rounded" // Ensures responsive image
                width={400}
                height={100}
              />
            </div>

            <div
              className="qr-code-container"
              style={{ position: "relative", width: "150px", height: "150px" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#fff", // Background color for QR code
                  borderRadius: "10px", // Rounded corners
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "none", // Remove shadow for print
                }}
              >
                <QRCode
                  value={`http://localhost:3000/addmember`} // Use id from pendingCount
                  size={130}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-8">
      <button onClick={handlePrint} className="btn btn-success btn-sm mb-4" style={{ display: 'block', }}>
        Print QR Codes
      </button>
      <div className="row">{images}</div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .btn {
            display: none; /* Hide button during print */
          }

          .card {
            background-color: #007bff !important; /* Ensure card background is blue */
            color: white !important; /* Ensure text is white */
          }
        }
      `}</style>
    </div>
  );
};

export default PrintCard;