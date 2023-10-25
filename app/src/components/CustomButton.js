import React from "react";

const CustomButton = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-full md:w-[200px] h-[40px] rounded-lg bg-white border border-gray-300 px-2 space-x-2 hover:bg-gray-300 transition duration-300 ease-in-out"
    >
      {children}
    </div>
  );
};

export default CustomButton;