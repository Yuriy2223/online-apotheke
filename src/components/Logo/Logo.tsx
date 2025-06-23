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
  const logoSrc = isWhite
    ? "/images/logo-white.webp"
    : "/images/logo-green.webp";

  return (
    <Link
      href="/"
      scroll={false}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={clsx(
        "flex items-center justify-center max-tablet:gap-2 tablet:gap-3",
        className
      )}
    >
      <Image
        src={logoSrc}
        alt="E-Pharmacy Logo"
        width={44}
        height={44}
        sizes="(max-width: 767px) 32px, 44px"
        className="w-[32px] tablet:w-[44px] h-auto"
        priority
      />
      <span
        className={clsx(
          "text-base tablet:text-xl font-semibold transition-colors  ",
          isWhite ? "text-white-true" : "text-green-dark"
        )}
      >
        E-Pharmacy
      </span>
    </Link>
  );
};
