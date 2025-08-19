// import React, { useState, forwardRef, useCallback } from "react";
// import clsx from "clsx";

// interface TextInputProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
//   name: string;
//   width?: string;
//   height?: string;
//   label: string;
//   error?: string;
//   onClearError?: () => void;
//   onValidate?: () => void;
//   button?: React.ReactNode;
//   variant?: "default" | "outlined" | "filled";
//   size?: "sm" | "md" | "lg";
// }

// export const Input = forwardRef<HTMLInputElement, TextInputProps>(
//   (
//     {
//       name,
//       width = "100%",
//       height,
//       label,
//       error,
//       button,
//       onChange,
//       onFocus,
//       onBlur,
//       onClearError,
//       onValidate,
//       className = "",
//       variant = "default",
//       size = "md",
//       disabled,
//       ...rest
//     },
//     ref
//   ) => {
//     const [isFocused, setIsFocused] = useState(false);
//     const [value, setValue] = useState(rest.value || rest.defaultValue || "");

//     const hasError = !!error;
//     const hasValue = !!String(value).trim();
//     const isFloating = isFocused || hasValue;

//     const handleFocus = useCallback(
//       (e: React.FocusEvent<HTMLInputElement>) => {
//         setIsFocused(true);
//         onFocus?.(e);
//         onClearError?.();
//       },
//       [onFocus, onClearError]
//     );

//     const handleBlur = useCallback(
//       (e: React.FocusEvent<HTMLInputElement>) => {
//         setIsFocused(false);
//         onBlur?.(e);
//         onValidate?.();
//       },
//       [onBlur, onValidate]
//     );

//     const handleChange = useCallback(
//       (e: React.ChangeEvent<HTMLInputElement>) => {
//         setValue(e.target.value);
//         onChange?.(e);
//       },
//       [onChange]
//     );

//     const sizeClasses = {
//       sm: {
//         input: "text-sm px-3 py-2",
//         label: "text-xs px-1.5",
//         height: height || "36px",
//         labelTop: "-top-2",
//       },
//       md: {
//         input: "text-base px-3 py-3",
//         label: "text-sm px-1.5",
//         height: height || "48px",
//         labelTop: "-top-2.5",
//       },
//       lg: {
//         input: "text-lg px-4 py-4",
//         label: "text-base px-2",
//         height: height || "56px",
//         labelTop: "-top-3",
//       },
//     };

//     const currentSize = sizeClasses[size];

//     const getInputClasses = () => {
//       const baseClasses = `
//         w-full border-2 rounded-lg outline-none transition-all duration-300
//         disabled:opacity-50 disabled:cursor-not-allowed
//         ${currentSize.input}
//       `;

//       const stateClasses = (() => {
//         if (disabled) return "bg-gray-50 border-gray-200 text-gray-400";
//         if (hasError)
//           return "border-red-500 bg-red-50/30 text-gray-900 hover:border-red-600 focus:border-red-600 focus:ring-2 focus:ring-red-500/20";
//         if (isFocused)
//           return "border-blue-500 bg-white text-gray-900 ring-2 ring-blue-500/20";
//         return "border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
//       })();

//       const variantClasses = {
//         default: stateClasses,
//         outlined: `${stateClasses} bg-transparent`,
//         filled: `${stateClasses} bg-gray-50 focus:bg-white`,
//       };

//       return `${baseClasses} ${variantClasses[variant]}`;
//     };

//     const getLabelClasses = () => {
//       const baseClasses = `
//         absolute left-3.5 bg-white transition-all duration-200 pointer-events-none
//         ${currentSize.label}
//       `;

//       const positionClasses = isFloating
//         ? `${currentSize.labelTop} translate-y-0`
//         : "top-1/2 -translate-y-1/2";

//       const colorClasses = (() => {
//         if (disabled) return "text-gray-400";
//         if (hasError) return "text-red-500";
//         if (isFocused) return "text-blue-500";
//         return "text-gray-600";
//       })();

//       return `${baseClasses} ${positionClasses} ${colorClasses}`;
//     };

//     return (
//       <div className="relative mb-6" style={{ width }}>
//         <input
//           {...rest}
//           ref={ref}
//           name={name}
//           value={value}
//           onChange={handleChange}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           disabled={disabled}
//           className={clsx(getInputClasses(), className)}
//           style={{ height: currentSize.height }}
//           aria-invalid={hasError}
//           aria-describedby={hasError ? `${name}-error` : undefined}
//         />

//         <label htmlFor={name} className={clsx(getLabelClasses())}>
//           {label}
//         </label>

//         {button && (
//           <div className="absolute right-2 top-1/2 -translate-y-1/2">
//             {button}
//           </div>
//         )}

//         {hasError && (
//           <div
//             id={`${name}-error`}
//             className="absolute -bottom-5 left-1 text-red-500 text-xs flex items-center gap-1"
//             role="alert"
//           >
//             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {error}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";
