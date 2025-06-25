import React from "react";

/**
 * Renders shared layout for a card
 */
const CardContainer: React.FC<{ onClick?: () => void; children?: React.ReactNode }> = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer rounded-lg border p-4 shadow hover:shadow-md transition"
  >
    {children}
  </div>
);

export default CardContainer;