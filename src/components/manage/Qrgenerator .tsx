"use client"
import React, { useState } from "react";
import QRCode from "react-qr-code";

const Qrgenerator = () => {
  const [count, setCount] = useState<number>(1); // State to hold the number of QR codes
  const [qrCodes, setQrCodes] = useState<string[]>([]); // State to hold generated QR codes

  const generateQRCodes = () => {
    const codes = [];
    for (let i = 1; i <= count; i++) {
      // Create a URL with the user ID as a query parameter
      codes.push(`https://vishalnawle.in/politics/member.php?pl=${i}`); // Customize the base URL as needed
    }
    setQrCodes(codes);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Generate QR Codes</h1>
      <div>
        <label>
          Number of QR Codes:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min="1" // Ensures that the minimum value is 1
            style={{ margin: "0 10px", width: "60px" }}
          />
        </label>
        <button onClick={generateQRCodes} style={{ marginTop: "10px" }}>
          Generate QR Codes
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {qrCodes.map((code, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <QRCode value={code} />
            <p>{code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qrgenerator;