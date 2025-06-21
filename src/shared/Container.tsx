import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(
        // "w-full max-w-[374px] mx-auto px-2.5",
        // "w-full",
        "border border-red-500" /**потім видали */,
        "max-w-[374px] mx-auto",
        "sm:max-w-[375px] sm:px-4",
        "md:max-w-[768px] md:px-5",
        "xl:max-w-[1440px] xl:px-5 xl:py-10",
        className
      )}
    >
      {children}
    </div>
  );
};
