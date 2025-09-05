import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "w-full mx-auto",
        "max-mobile:max-w-[374px] max-mobile:px-2",
        "mobile:max-w-[375px] mobile:px-4",
        "tablet:max-w-[768px] tablet:px-8",
        "desktop:max-w-[1440px] desktop:px-[50px]",
        className
      )}
    >
      {children}
    </div>
  );
};
