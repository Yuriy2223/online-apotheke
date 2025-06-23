import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`
        w-[100px] h-10 
        rounded-lg 
        flex items-center justify-center text-center 
        gap-2 
        bg-gray-100 text-gray-900 
        border border-gray-900 
        hover:bg-white hover:shadow-[0_0_26px_rgba(0,0,0,0.3)]
        active:bg-white active:shadow-[0_0_26px_rgba(0,0,0,0.3)]
        transition-all duration-200
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
