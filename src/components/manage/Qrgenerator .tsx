// components/Qrgenerator.tsx
import React, { useState } from "react";

import { toast } from "react-toastify"; // Import toast functions

const Qrgenerator: React.FC = () => {
  const [count, setCount] = useState<number>(0); // State to hold the number of QR codes
  const [qrCodes, setQrCodes] = useState<string[]>([]); // State to hold generated QR codes
  const [error, setError] = useState<string>(""); // State to hold error messages

  const generateQRCodes = async () => {
    if (count < 1) {
      setError("Please enter a valid number greater than 0.");
      return; // Ensure count is valid
    }

    setError(""); // Clear any previous errors

    try {
      const response = await fetch("/api/generateqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }), // Send count in request body
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR codes");
      }

      const data = await response.json();
      setQrCodes(data.codes); // Set the generated QR codes

      // Show success toast message
      toast.success(`${data.codes.length} QR codes generated successfully!`);
    } catch (error) {
      console.error(error);

      // Show error toast message
      toast.error("Error generating QR codes");
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="qrCount" className="fw-bold">Quantity</label>
        <input
          id="qrCount"
          type="number" // Change input type to number for better UX
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className={`form-control ${error ? 'is-invalid' : ''}`} // Add invalid class if there's an error
        />
        {error && <div className="invalid-feedback">{error}</div>} {/* Display error message */}
        <button onClick={generateQRCodes} className="btn btn-primary mt-3">
          Generate
        </button>
      </div>

    </div>
  );
};

export default Qrgenerator;