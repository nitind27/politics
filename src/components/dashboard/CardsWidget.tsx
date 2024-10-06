import React from "react";

import { Qrcodes } from "./type";
import Card from "@/common/Card";

type Props = {
  qrcodes: Qrcodes[];
};

const CardsWidget = ({ qrcodes }: Props) => {
  const totalQrcodes = qrcodes.length;

  return (
    <Card
      title={`${totalQrcodes} `}
      backgroundColor="#F1416C"
      content={
        <>
          <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-20">
            
            <span
              style={{
                fontSize: "30px",
              }}
            >
              QrCode
            </span>
          </div>
        </>
      }
    />
  );
};

export default CardsWidget;
