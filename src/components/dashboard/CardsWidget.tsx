import React from "react";

import { Member } from "./type";
import Card from "@/common/Card";

type Props = {
  members: Member[];
};

const CardsWidget = ({ members }: Props) => {
  const totalMembers = members.length;

  return (
    <Card
      title={`${totalMembers} `}
      content={
        <>
          <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-20">
            Members
          </div>
        </>
      }
    />
  );
};

export default CardsWidget;
