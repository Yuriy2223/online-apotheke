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

// import React from "react";
// import clsx from "clsx";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "outline";
// }

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   className = "",
//   variant = "outline",
//   type = "button",
//   ...rest
// }) => {
//   const variantClasses = {
//     primary:
//       "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:shadow-lg",
//     secondary:
//       "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 hover:shadow-md",
//     outline:
//       "bg-gray-100 text-gray-900 border border-gray-900 hover:bg-white hover:shadow-[0_0_26px_rgba(0,0,0,0.3)]",
//   };

//   return (
//     <button
//       {...rest}
//       type={type}
//       className={clsx(
//         "w-[100px] h-10 rounded-lg flex items-center justify-center gap-2",
//         "transition-all duration-200 focus:outline-none",
//         "disabled:opacity-50 disabled:cursor-not-allowed",
//         variantClasses[variant],
//         className
//       )}
//     >
//       {children}
//     </button>
//   );
// };
