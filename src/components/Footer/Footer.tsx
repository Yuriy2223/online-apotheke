"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { Container } from "@/shared/Container";
import { NavBarFooter } from "../NavBar/NavBarFooter";
import { Logo } from "../Logo/Logo";

export const Footer = () => {
  return (
    <Container className="flex flex-col gap-[20px] text-white-true p-5">
      <div className="flex flex-col gap-[20px] tablet:flex-row tablet:justify-between ">
        <div className="flex justify-start">
          <Logo variant="white" />
        </div>
        <div className="flex items-center justify-center h-">
          <NavBarFooter />
        </div>
      </div>

      <div
        className="flex flex-col gap-5 tablet:flex-row tablet:items-center
       tablet:justify-center"
      >
        <p className="text-lg leading-relaxed max-w-2xl tablet:w-[50%]">
          Get the medicine to help you feel better, get back to your active
          life, and enjoy every moment.
        </p>
        <div className="flex gap-6 items-center justify-center tablet:w-[50%]">
          <a
            href="https://www.facebook.com"
            className="w-10 h-10 tablet:w-12 tablet:h-12 border border-white-true/30 
            rounded-lg flex items-center justify-center hover:bg-white-true/10 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 tablet:w-6 tablet:h-6" />
          </a>
          <a
            href="https://www.instagram.com"
            className="w-10 h-10 tablet:w-12 tablet:h-12 border border-white-true/30
             rounded-lg flex items-center justify-center hover:bg-white-true/10 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 tablet:w-6 tablet:h-6" />
          </a>
          <a
            href="https://www.youtube.com"
            className="w-10 h-10 tablet:w-12 tablet:h-12 border border-white-true/30 
            rounded-lg flex items-center justify-center hover:bg-white-true/10 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5 tablet:w-6 tablet:h-6" />
          </a>
        </div>
      </div>
      <div
        className="flex flex-col gap-5 border-t pt-4 border-white-true tablet:gap-0
       tablet:flex-row-reverse tablet:items-center tablet:justify-center"
      >
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-white-true hover:text-blue-dark transition-colors"
          >
            Privacy Policy
            <span className="hidden text-white-true tablet:inline mx-2">|</span>
          </a>
          <a
            href="#"
            className="text-white-true hover:text-blue-dark transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
        <p className="flex items-center justify-center">
          © E-Pharmacy 2025. All Rights Reserved
          <span className="hidden tablet:inline mx-2">|</span>
        </p>
      </div>
    </Container>
  );
};
