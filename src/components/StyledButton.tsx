import React from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-36 h-10 px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-200"
    >
      {children}
    </button>
  );
};

export default StyledButton;
