"use client";
import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import PrintCard from "./PrintCard"; // Import PrintCard component
import Qrgenerator from "./Qrgenerator ";

interface CardDetailProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  totalData: number;
  pending: number; // Number of pending items
  allocated: number;
}

const CardDetail: React.FC<CardDetailProps> = ({
  title,
  subtitle,
  imageUrl,
  linkUrl,
  totalData,
  pending,
  allocated,
}) => {
  const router = useRouter(); // Initialize router
  const [showQrModal, setShowQrModal] = useState(false); // State for QR code modal visibility
  const [showPrintModal, setShowPrintModal] = useState(false); // State for print modal visibility
  const [imageCount, setImageCount] = useState<number>(0); // State to hold user input for print
  const [error, setError] = useState<string>(""); // State to hold error messages

  const handleShowQr = () => setShowQrModal(true); // Show QR code modal
  const handleCloseQr = () => setShowQrModal(false); // Hide QR code modal

  const handleShowPrint = () => setShowPrintModal(true); // Show print modal
  const handleClosePrint = () => {
    setShowPrintModal(false);
    setImageCount(0); // Reset input on close
    setError(""); // Clear any previous errors
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setImageCount(value); // Update image count based on user input

    if (value < 1) {
      setError("Please enter a number greater than or equal to 1."); // Set error message if invalid
    } else {
      setError(""); // Clear error message if valid
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh

    if (imageCount < 1) {
      setError("Please enter a valid number greater than or equal to 1.");
      return; // Exit if input is invalid
    }

    if (imageCount > pending) {
      setError(`You can only generate a maximum of ${pending} images.`); // Set error message if exceeds pending
      return; // Exit if input exceeds pending
    }

    router.push(`/printcards/${imageCount}`); // Redirect to print page with count as a URL parameter
    handleClosePrint(); // Close print modal after submission
  };

  return (
    <Card className="text-center mt-5">
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "100% 50%",
          height: "100px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold text-start">
              Total QR{" "}
              <span className="float-end text-primary ms-2">{totalData}</span>
            </h5>
            <h6 className="text-start">
              Allocated{" "}
              <span className="float-end text-primary">{allocated}</span>
            </h6>
            <h6 className="text-start">
              Pending{" "}
              <span className="float-end text-primary">{pending}</span>
            </h6>
          </div>

          <div>
            <Button
              variant="primary"
              className="me-2"
              onClick={handleShowQr}
            >
              Generate QR Code
            </Button>

            <Button variant="success" onClick={handleShowPrint}>
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for QR Code Generation */}
      <Modal show={showQrModal} onHide={handleCloseQr}>
        <Modal.Header closeButton>
          <Modal.Title>Generate QR Codes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Qrgenerator />
        </Modal.Body>
      </Modal>

      {/* Modal for Print */}
      <Modal show={showPrintModal} onHide={handleClosePrint}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Print Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input for image count */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="imageCount">
              <Form.Label>Enter Number of Images:</Form.Label>
              <Form.Control
                type="number"
                value={imageCount}
                onChange={handleInputChange}
                placeholder="Enter a number"
                min={1}
                isInvalid={!!error} // Show invalid state if there's an error
              />
              {error && (
                <div style={{ color: "red", marginTop: "0.25rem" }}>
                  {error}
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-5">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default CardDetail;