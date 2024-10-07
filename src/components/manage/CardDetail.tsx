"use client";
import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import PrintCard from "./PrintCard";
import Qrgenerator from "./Qrgenerator ";
import { KTIcon } from "@/_metronic/helpers";

interface CardDetailProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  totalData: number;
  pending: number;
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
  const router = useRouter();
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [imageCount, setImageCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  const handleShowPrint = () => setShowPrintModal(true);
  const handleClosePrint = () => {
    setShowPrintModal(false);
    setImageCount(0);
    setError("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setImageCount(value);

    if (value < 1) {
      setError("Please enter a number greater than or equal to 1.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (imageCount < 1) {
      setError("Please enter a valid number greater than or equal to 1.");
      return;
    }

    if (imageCount > pending) {
      setError(`You can only generate a maximum of ${pending} images.`);
      return;
    }

    router.push(`/printcards/${imageCount}`);
    handleClosePrint();
  };

  return (
    <Card className="text-center mt-5">
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "100% 50%",
          minHeight: "100px",
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
          <div className="mb-3 mb-md-0 flex-grow-1">
            <div className="d-flex ">
              <h5 className="fw-bold text-start text-primary ">
                Total QR
              <span className="text-primary ms-3">{totalData}</span>
              </h5>
            </div>
            <div className="d-flex ">
              <h6 className="text-start ">
                Allocated
              <span className="text-success ms-3">{allocated}</span>
              </h6>
            </div>
            <div className="d-flex">
              <h6 className="text-start ">
                Pending
              <span className="text-danger ms-3">{pending}</span>
              </h6>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <Button
              variant="primary"
              className="me-2 btn-sm mb-2 mb-md-0"
              onClick={handleShowQr}
              style={{ minWidth: '120px' }}
            >
              <KTIcon iconName={"scan-barcode"} className="fs-3" iconType="solid" />
              Generate QR
            </Button>

            <Button
              variant="success"
              onClick={handleShowPrint}
              className="btn-sm"
              style={{ minWidth: '120px' }}
            >
              <KTIcon iconName={"printer"} className="fs-3" iconType="solid" />
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="imageCount">
              <Form.Label>Enter Number of Images:</Form.Label>
              <Form.Control
                type="number"
                value={imageCount}
                onChange={handleInputChange}
                placeholder="Enter a number"
                min={1}
                isInvalid={!!error}
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
