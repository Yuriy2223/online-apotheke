"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "@/shared/Container";
import { NavBar } from "./NavBar";
import { UserBar } from "./UserBar";
import { Logo } from "../Logo/Logo";
import { BurgerMenu } from "./BurgerMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
      <Container className="flex items-center justify-between h-16 max-tablet:h-[84px] tablet:h-[100px]">
        <Logo variant="white" />
        <div className="hidden desktop:block">
          <NavBar />
        </div>
        <div className="hidden desktop:block">
          <UserBar />
        </div>

        <button
          onClick={openMenu}
          className="desktop:hidden transition-transform duration-200 hover:scale-110 "
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8 text-white transition-transform duration-300 ease-in-out hover:rotate-360 hover:scale-110 active:scale-95" />
        </button>
      </Container>
      {isMenuOpen && <BurgerMenu onClose={closeMenu} />}
    </>
  );
};
