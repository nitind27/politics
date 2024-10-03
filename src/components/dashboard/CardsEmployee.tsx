import React from "react";

import { Supervisor } from "./type";
import Card from "@/common/Card";

type Props = {
  supervisors: Supervisor[];
};

const CardsEmployee = ({ supervisors }: Props) => {
  const totalMembers = supervisors.length;

  return (
    <Card
      title={`${totalMembers} `}
      content={
        <>
          <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-20">
            Supervisor
          </div>
        </>
      }
    />
  );
};

export default CardsEmployee;
