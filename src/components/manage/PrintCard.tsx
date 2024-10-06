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
      <div className="col-md-6 mb-4 p-5" key={index}>
        <div className="card bg-primary text-white d-flex flex-row">
          <div className="card-body d-flex align-items-center">
            <div className="me-3">
              <Image
                src="/media/images/navle.png" // Adjust the image path as necessary
                alt="Print Image"
                className="img-fluid" // Ensures responsive image
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
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
                }}
              >
                <QRCode
                  value={`https://vishalnawle.in/politics/member.php?pl=${qrCodeData.id}`} // Use id from pendingCount
                  size={130}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{images}</div>
    </div>
  );
};

export default PrintCard;
