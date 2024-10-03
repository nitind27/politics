import React from "react";

type CardProps = {
  title: string;
  content: React.ReactNode;
  backgroundColor?: string;
};

const Card = ({ title, content, backgroundColor = "#F1416C" }: CardProps) => {
  return (
    <div
      className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10 "
      style={{ backgroundColor }}
    >
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">
            {title}
          </span>
        </div>
      </div>

      <div className="card-body d-flex align-items-end pt-0">
        <div className="d-flex align-items-center flex-column mt-3 w-100">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Card;
