"use client";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "green" | "white";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  variant = "green",
}) => {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      scroll={false}
      className={clsx(
        "flex items-center justify-center gap-2 cursor-pointer",
        className
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Image
        src={isWhite ? "/images/logo-white.webp" : "/images/logo-green.webp"}
        alt="E-Pharmacy Logo"
        width={44}
        height={44}
        sizes="(max-width: 767px) 32px, (max-width: 1440px) 44px"
        className=" h-auto"
        priority
      />
      <span
        className={clsx(
          "text-base font-semibold transition-colors",
          isWhite ? "text-white-true" : "text-green-dark"
        )}
      >
        E-Pharmacy
      </span>
    </Link>
  );
};
